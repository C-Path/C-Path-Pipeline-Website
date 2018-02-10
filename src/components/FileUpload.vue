<template lang="html">
    <html>
    <head>
    </head>
    <body>
      <h3 class="margin-left-3">Data Transfer</h3>
      <div id='fileUpload'>
        <form class="formBody">
          <section class="fileSubmission">
            <label>Files to Submit</label>
            <input class="mdel-button mdl-button--raised" type="file" @change="fileChange">
          </section>
          <section class="pipelineSelection">
            <input type="radio" value="WGS" v-model="type"> Whole Genome Sequence Pipeline
            <input type="radio" value="TSP" v-model="type"> Targeted Sequence Pipeline
          </section>
          <div class="queueInfo">
            <label>Current WGS Queue Size: </label>
            <input v-model="wsgQueue" disabled>
            <label>Current TGS Queue Size: </label>
            <input v-model="tgsQueue" disabled>
          </div>
          <div class="button">
          <button class="mdel-button mdl-button--raised" @click="submit">Upload</button>
        </div>
        </form>
        <div class="button">
          <a href="/#/dashboard">
          <button class="mdel-button mdl-button--raised">Home</button>
        </a>
      </div>
      </div>
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
body {
  min-width: 750px;
}

.margin-left-3 {
    margin-left: 3em;
}

.formBody {
  margin: auto;
  width: 80%;
  border: 3px solid gray;
  padding: 40px;
}

.fileSubmission button {
  margin: 20px;
}

.fileSubmission input {
  margin: 20px;
}

.pipelineSelection input {
  margin: 20px;
}

.queueInfo input {
  width: 50px;
  text-align: center;
}

.button {
  margin-top: 25px;
  text-align: center;
}
</style>
