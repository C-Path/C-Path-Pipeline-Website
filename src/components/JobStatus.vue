<template lang="html">
  <html>
    <head>
    </head>
    <body>
      <h3 class="margin-left-3">Pipeline Job Status</h3>
      <div class="tableBody">
        <table class="mdl-data-table mdl-shadow--2dp">
          <tr>
            <th class="mdl-data-table__cell--non-numeric">Job ID</th>
            <th class="mdl-data-table__cell--non-numeric">Status</th>
            <th class="mdl-data-table__cell--non-numeric">Position</th>
            <th>Delete</th>
            <th>Contribute</th>
          </tr>
          <tr v-for="job in jobs">
            <td class="mdl-data-table__cell--non-numeric">{{job.id}}</td>
            <td class="mdl-data-table__cell--non-numeric">{{job.status}}</td>
            <td class="mdl-data-table__cell--non-numeric">{{job.position}}</td>
            <td><input class="mdl-checkbox" type="checkbox"></td>
            <td><input class="mdl-checkbox" type="checkbox"></td>
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
          <a href="/#/dashboard"><button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Home</button></a>
        </div>
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

.margin-left-3 {
    margin-left: 3em;
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
