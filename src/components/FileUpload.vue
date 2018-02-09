<template lang="html">
    <html>
    <head>
    </head>
    <body>
      <div id='fileUpload'>
        <form class="formBody">
          <section class="fileSubmission">
            <label>Files to Submit</label>
            <input>
            <button>Browse</button>
          </section>
          <section class="pipelineSelection">
            <input type="radio" value="WGS" v-model="type"> Whole Genome Sequence Pipeline
            <input type="radio" value="TSP" v-model="type"> Targeted Sequence Pipeline
          </section>
          <h3>Selected: {{ type }}</h3>
          <div class="queueInfo">
            <label>Current WGS Queue Size: </label>
            <input v-model="wsgQueue" disabled>
            <label>Current TGS Queue Size: </label>
            <input v-model="tgsQueue" disabled>
          </div>
          <div class="uploadBtn">
          <button type="submit">Upload</button>
        </div>
        </form>
      </div>
    </body>

    </html>
</template>

<script>
export default {
  data() {
    return {
      type: 'WGS',
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
