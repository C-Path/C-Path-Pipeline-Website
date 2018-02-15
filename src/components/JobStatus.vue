<template lang="html">
  <html>
    <head>
    </head>
    <body>
      <h3 class="margin-left-3">Pipeline Job Status</h3>
      <table class="align-center mdl-data-table mdl-shadow--2dp">
        <tr>
          <th class="mdl-data-table__cell--non-numeric">Job ID</th>
          <th class="mdl-data-table__cell--non-numeric">Status</th>
          <th class="mdl-data-table__cell--non-numeric">Position</th>
          <th>Delete</th>
          <th>Contribute</th>
        </tr>
        <tr v-for="(job, index) in jobs">
          <td class="mdl-data-table__cell--non-numeric">{{job.id}}</td>
          <td class="mdl-data-table__cell--non-numeric">{{job.status}}</td>
          <td class="mdl-data-table__cell--non-numeric">{{job.position}}</td>
          <td><input class="mdl-radio" type="radio" v-model="jobs[index].dataUpdate" value="-1"></td>
          <td><input class="mdl-radio" type="radio" v-model="jobs[index].dataUpdate" value="1"></td>
        </tr>
      </table>
      <section class="text-align-center">
        <label>Current WGS Queue Size: </label>
        <input class="width-2" v-model="wsgQueue" disabled>
        <br>
        <label>Current TGS Queue Size: </label>
        <input class="width-2" v-model="tgsQueue" disabled>
      </section>
      <section class="text-align-center">
        <a href="/dashboard"><button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Home</button></a>
      </section>
    </body>
  </html>
</template>

<script>
export default {
  methods: {

  },
  data() {
    return {
      dataUpdate: 0,
      jobs: [{id: "T1345",status: "Queued", position: 5, dataUpdate: 1}, {id: "T1333",status: "Complete", position: 0, dataUpdate: 0}, {id: "W2047",status: "Uploading", position: 1, dataUpdate: -1}],
      wsgQueue: '84',
      tgsQueue: '35',
    };
  },
};
</script>

<style scoped>

</style>
