<template lang="pug">
div.container
  div.filename
    span(v-text='file.sampleName')
    span(v-text='file.file.name')
    span(v-text='file.file.size')
  div.bar
    div.progress(v-text='progress' v-bind:style="{ width: progress + '%' }")
    div.error(v-text='error' v-if='error')
</template>

<script>
import { Upload } from 'tus-js-client';

export default {
  props: ['file'],
  data() {
    return {
      bytesUploaded: 0,
      bytesTotal: 0,
      progress: 0,
      error: '',
    };
  },

  mounted() {
    /*
    if (!this.file.isIllumina) {
      return;
    }
      */

    const that = this;
    const upload = new Upload(this.file.file, {
      endpoint: '/api/files/',
      retryDelays: [0, 1000, 3000, 5000],
      // eslint-disable-next-line no-unused-vars
      onError(error) {
        // console.log(`Failed because: ${error}`);
        that.error = error;
      },
      onProgress(bytesUploaded, bytesTotal) {
        that.progress = ((bytesUploaded / bytesTotal) * 100);
      },
      onSuccess() {
        // console.log(`Download ${upload.file.name} from ${upload.url}`);
        // this.progress = 100;
      },
      metadata: {
        name: that.file.name,
        // FIXME: the database fileinfo created_at and last_modified fields should
        // both be in the same format. Currently one is a date and the other a
        // Unix timestamp.
        lastModified: that.file.lastModified,
        sampleName: that.file.sampleName,
      },
    });
    upload.start();
  },

  methods: {
    // eslint-disable-next-line no-unused-vars
    onFileChange(e) {
      // const files = e.target.files;

      // if (!files) return;
    },
  },
};
</script>

<style scoped>
.filename {
  display:flex;
  flex-direction: row;
  justify-content: space-between;
}

.progress {
  width: 0;
  height: 30px;
  background-color: #4CAF50;
  text-align: center; /* To center it horizontally (if you want) */
  line-height: 30px; /* To center it vertically */
  color: white; 
}

.bar {
  /*border: black solid;*/
}

span {
  text-align: left;
  width: 100%;
}
</style>
