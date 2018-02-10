<template lang="html">
    <html>
    <head>
    </head>
    <body>
      <div id='fileUpload'>
        <form class="formBody">
          <section class="fileSubmission">
            <label>Files to Submit</label>
            <input type="file" @change="fileChange">
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
          <div class="uploadBtn">
          <button @click="submit">Upload</button>
        </div>
        </form>
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
.formBody {
  margin: auto;
  width: 80%;
  border: 3px solid gray;
  padding: 40px;
  text-align: center;
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
}

.uploadBtn {
  margin-top: 25px;
  text-align: center;
}
</style>
