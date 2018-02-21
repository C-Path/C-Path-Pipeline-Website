<template>
  <div id="app">
    <div class="header">
      <img src="../static/images/ReSeqTB.png" alt="c-path logo">
      <!-- <router-link v-if="loggedIn" to="/logout"> -->
      <v-dialog/>
      <a @click="showAlert" v-if="loggedIn">
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect log-out">Log Out</button>
      </a>
      <a href="/dashboard" v-if="loggedIn">
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect log-out">Projects</button>
        </a>
    </div>
    <template v-if="$route.matched.length">
      <router-view></router-view>
    </template>
  </div>
</template>

<script>
import auth from "./auth";
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      loggedIn: auth.loggedIn()
    };
  },
  created() {
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn;
    };
    var minutes = 60,
      the_interval = minutes * 60 * 1000;
    setInterval(function() {
      console.log("I am doing my 60 minute check");
      axios
        .delete("http://localhost:3000/files")
        .then(function(response) {
          console.log("deleted files successfully: ", response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }, the_interval);
  },
  methods: {
    showAlert() {
      if (auth.parseJwt(JSON.parse(localStorage.getItem('token'))).role != "DATA_MANAGER") {
        this.$modal.show("dialog", {
          title: '<html><head></head><body><p style="text-align:center;color:#F89641;font-size:3em;"><span class="glyphicon glyphicon-info-sign"></span></p><h4 style="text-align:center;">Warning!</h4></body></html>',
          text: '<p>All files marked for <strong>deletion</strong> will be deleted when logging off.</p>',
          buttons: [
            {
              title: "Log Out",
              handler: () => {window.location = "/logout"; }

            },
            {
              title: "Cancel", // Button title
              default: true, // Will be triggered by default if 'Enter' pressed.

            },
          ]
        });
      } else {
        window.location = "/logout";
      }
    },
  }
};
</script>

<style>
.log-out {
  background-color: white;
  float: right;
  margin: 2em;
}

.header {
  padding: 2em;
  background-color: grey;
}

.vue-dialog-button:hover {
  background-color: #eee;
}
</style>
