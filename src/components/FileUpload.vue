<template lang="html">
  <html>
    <head>
    </head>
    <body>
      <h3 class="margin-left-3">File Upload</h3>
      <form class="align-center text-align-center">
        <section>
          <label class="margin-right-2">Files to Submit</label>
          <input type="file" @change="fileChange">
        </section>
        <section>
          <input type="radio" value="WGS" v-model="type"> Whole Genome Sequence Pipeline
          <input type="radio" value="TSP" v-model="type"> Targeted Sequence Pipeline
        </section>
        <section>
          <label>Current WGS Queue Size: </label>
          <input class="width-2" v-model="wsgQueue" disabled>
          <label>Current TGS Queue Size: </label>
          <input class="width-2" v-model="tgsQueue" disabled>
        </section>
        <section class="text-align-center">
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" @click="submit">Upload</button>
        </section>
      </form>
      <section class="text-align-center">
        <a href="/dashboard">
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Home</button>
        </a>
      </section>
    </body>
  </html>
</template>

<script>
export default {
  methods: {
    fileChange(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return;
      this.files = files;
    },
    submit() {
      console.log('submitted')
      console.log('type: ', this.type)
      console.log('files: ', this.files)
    },
  },
  data() {
    return {
      type: 'WGS',
      files: '',
      wsgQueue: '84',
      tgsQueue: '35',
    };
  },
};
</script>

<style scoped>

</style>
