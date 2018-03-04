<template lang="html">
  <html>
    <head>
    </head>
    <body>
      <h4 class="margin-left-1 error" v-if="$route.query.redirect && $route.query.redirect != '/login'">
        404: Url not found, redirected to /datamanager
      </h4>
      <h3 class="margin-left-3">Data Manager</h3>
      <table class="align-center mdl-data-table mdl-shadow--2dp">
        <tr>
          <th class="mdl-data-table__cell--non-numeric">Select</th>
          <th class="mdl-data-table__cell--non-numeric dataFile">Data File</th>
          <th class="mdl-data-table__cell--non-numeric dataFile">Submitted Date</th>
        </tr>
        <tr v-for="file in files">
          <td v-if="file.contribution"><input class="mdl-checkbox" type="checkbox" v-model=file.selected></td>
          <td v-if="file.contribution" class="mdl-data-table__cell--non-numeric">{{file.name}}</td>
          <td v-if="file.contribution" class="mdl-data-table__cell--non-numeric">{{new Date(file.last_modified).toUTCString()}}</td>
        </tr>
      </table>
      <section class="text-align-center">
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Transfer</button>
      </section>
    </body>
  </html>
</template>

<script>
import axios from 'axios';
import auth from '../auth.js'

export default {
  methods: {

  },
  data() {
    return {
      files: [],
      wsgQueue: '84',
      tgsQueue: '35',
    };
  },
mounted() {
  var $vm = this;
  var tokenParam = "?token=" + auth.getToken()

    axios.get(process.env.SERVER_URL + "/files" + tokenParam).then(function(response) {
      if (response.data.message === undefined) {
        $vm.files = response.data;
      } else {
        console.log(response.data.message)
      }})
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.dataFile {
  width: 45%;
}
</style>
