<template lang="pug">
progress-bar.monospace(
  :name="file.name"
  :current="bytesUploaded"
  :total="file.size")
</template>

<script>
import ProgressBar from './ProgressBar';

export default {
  components: {
    ProgressBar,
  },
  props: {
    upload: {
      type: Boolean,
      default: false,
    },
    file: {
      type: File,
      required: true,
    },
    hash: {
    },
  },
  beforeDestroy() {
    this.file.abort();
  },
  watch: {
    upload(newValue) {
      switch(newValue) {
        case true:
          this.tus.options.onProgress = (bytesUploaded) => {
            this.bytesUploaded = bytesUploaded;
          };
          // this.tus.options.onSuccess = () => {
          // };
          // this.tus.options.onError = (e) => {
          // };
          this.file.start();
          break;
        case false:
          this.file.abort();
          break;
        default:
          // TODO: Display error
      }
    }
};
</script>
