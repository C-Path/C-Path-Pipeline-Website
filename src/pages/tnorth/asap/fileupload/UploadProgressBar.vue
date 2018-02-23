<template lang="pug">
//- TODO: Add aria-valuenow et al. to div.progress-bar
  https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-valuenow_attribute
  v-bind:aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"

div.progress-bar-container(v-bind:class="{'text-danger': !!errorMessage}")
  div.progress-bar(
    role="progressbar"
    v-bind:style="{width: progressPercent}"
    v-if="!isSuccess")
  div.progress-bar-content.d-flex.justify-content-between
    div.col(v-text="upload.file.name")
    div.col
      button.btn(type="button" v-on:click="upload.start()" v-bind:class="{'btn-outline-primary': !isSuccess, 'btn-success': isSuccess}")
        span.font-size-1-5 {{progressPercent}} ({{bytesUploaded}} / {{bytesTotal}})
    //-
      div.col(v-if="checksum")
        //- TODO: display the checksum if available
            TODO: indicate a success status if the checksum has been verified with the server
            FIXME: the class logic is probably not correct
        button.btn(
          type="button"
          v-bind:class="{'btn-outline-secondary': !checksum, 'btn-success': !!checksum}"
          v-text="checksum")

    div.col-auto(v-text="errorMessage" v-if="errorMessage")
  //-
    span.col(v-text="sample.name")
    //- span.col-auto.text-nowrap 10:00:59
    div.col
      div.progress
        span(v-text="sample.progress")
</template>

<script>
import 'bootstrap/scss/bootstrap.scss';
import { Upload } from 'tus-js-client';

export default {
  props: {
    file: {
      type: File,
      required: true,
    },
    metadata: {
      type: Promise,
      required: true,
    },
    // start is a flag indicating whether the upload should be active or idle.
    start: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      bytesUploaded: 0,
      bytesTotal: this.file.size,
      isSuccess: false,
      errorMessage: '',
    };
  },
  computed: {
    progressPercent() {
      // prettier-ignore
      return `${((this.bytesUploaded / this.bytesTotal) * 100).toFixed(2)}%`;
    },
  },
  watch: {
    // This function will run whenever 'start' changes.
    start(isTrue) {
      if (isTrue) {
        // Reset any prior success/error state before starting a new upload.
        this.isSuccess = false;
        this.errorMessage = '';
        this.metadata.then(metadata => {
          this.upload.options.metadata = metadata;
          this.upload.start();
        });
      } else {
        this.upload.abort();
      }
    },
  },
  created() {
    const vm = this; // vm is the View Model (VueJs instance)
    const { file } = vm;
    vm.upload = new Upload(file, {
      endpoint: '/api/files',
      retryDelays: [0, 1000, 3000, 5000],
      /*
      metadata: {
        name: file.name,
        size: file.size,
        lastModified: file.lastModified,
        type: file.type,
        project: this.project,
        sampleName: this.sampleName,
        // sha256
      },
      */
      onError(e) {
        vm.errorMessage = e.toString();
        vm.$emit('onError', e);
      },
      onSuccess() {
        vm.isSuccess = true;
        vm.$emit('onSuccess');
      },
      // eslint-disable-next-line no-unused-vars
      onProgress(bytesUploaded, bytesTotal) {
        vm.bytesUploaded = bytesUploaded;
      },
    });
  },
  beforeDestroy() {
    // TODO: review this code
    // This is intended as a failsafe cleanup should the upload not be aborted
    // by the parent component. I am concerned about the side-effect this may
    // introduce given the start/abort calls introduce a race condition.
    //
    // The issue might be resolved by updating the Upload library to return
    // Promises
    this.upload.abort();
  },
};
</script>

<style scoped>
/*
https://developer.mozilla.org/en-US/docs/Web/CSS/position
https://developer.mozilla.org/en-US/docs/Web/CSS/All_About_The_Containing_Block

Positioning the sliding bar as a background behind the text requires
the following position combination:

1. root element/containing block position: relative
2. sliding bar                   position: absolute
3: text/everything else          position: relative
 */
.progress-bar-container {
  position: relative;
  display: flex;
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: lightblue;
}

.font-size-1-5 {
  font-size: 1.5rem;
}

.progress-bar-content {
  position: relative;
  width: 100%;
  /*color: white;*/
}
</style>
