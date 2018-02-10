<template lang="html">
    <html>
    <head>
    </head>
    <body>
      <div class="tableBody">
      <table>
        <tr>
          <th>Job ID</th>
          <th>Status</th>
          <th>Position</th>
          <th>Delete</th>
          <th>Contribute</th>
        </tr>
        <tr v-for="job in jobs">
          <td>{{job.id}}</td>
          <td>{{job.status}}</td>
          <td>{{job.position}}</td>
          <td><input type="checkbox"></td>
          <td><input type="checkbox"></td>
        </tr>
      </table>
      <div class="queueInfo">
        <label>Current WGS Queue Size: </label>
        <input v-model="wsgQueue" disabled>
        <br>
        <label>Current TGS Queue Size: </label>
        <input v-model="tgsQueue" disabled>
      </div>
      <div class="uploadBtn">
        <a href="/#/dashboard"><button>Home</button></a>
    </div>
    </form>
  </div>
    </body>

    </html>
</template>

<script>
export default {
  methods: {

  },
  data() {
    return {
      jobs: [{id: "T1345",status: "Queued", position: 5}, {id: "T1333",status: "Complete", position: 0}, {id: "W2047",status: "Uploading", position: 1}],
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

table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}

table {
  margin: auto;
  margin-bottom: 50px;
}

th {
  background-color: #D3D3D3;
  padding: 20px;
}

.tableBody {
  margin: auto;
  width: 80%;
  border: 3px solid gray;
  padding: 40px;
  text-align: center;
}

.queueInfo input {
  width: 50px;
}

.uploadBtn {
  margin-top: 25px;
  text-align: center;
}
</style>
