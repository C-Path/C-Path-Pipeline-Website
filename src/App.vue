<template>
  <div id="app">
    <div class="header">
      <div class="jumbo">
        <img src="../static/images/ReSeqTB-simple.png" alt="c-path logo">
        <h1 class="logo-text">Pipelines</h1>
      </div>
      <v-dialog/>
      <div class="menu">
        <a @click="showAlert" v-if="loggedIn">
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect log-out">Log Out</button>
        </a>
      </div>
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
    auth.onChange = (loggedIn) => {
      this.loggedIn = loggedIn;
    };
    var minutes = 60,
      the_interval = minutes * 60 * 1000;
    setInterval(function() {
      console.log("I am doing my 60 minute check");
      axios
        .delete(process.env.SERVER_URL + "/files")
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
      if (
        auth.parseJwt(JSON.parse(localStorage.getItem("token"))).role !=
        "DATA_MANAGER"
      ) {
        this.$modal.show("dialog", {
          title:
            '<html><head></head><body><p style="text-align:center;color:#F89641;font-size:3em;"><span class="glyphicon glyphicon-info-sign"></span></p><h4 style="text-align:center;">Warning!</h4></body></html>',
          text:
            "<p>All files marked for <strong>deletion</strong> will be deleted when logging off.</p>",
          buttons: [
            {
              title: "Log Out",
              handler: () => {
                window.location = "/logout";
              }
            },
            {
              title: "Cancel", // Button title
              default: true // Will be triggered by default if 'Enter' pressed.
            }
          ]
        });
      } else {
        window.location = "/logout";
      }
    },
    isUser() {
      if (localStorage.getItem("token") != null) {
        var userRole = auth.parseJwt(JSON.parse(localStorage.getItem("token")))
          .role;
        return userRole != "DATA_MANAGER";
      } else {
        return false;
      }
    }
  }
};
</script>

<style>
.log-out {
  background-color: white;
  margin: 0.75em
}

.header {
  height: 8em;
  padding: 2em;
  background-color: grey;
}

.vue-dialog-button:hover {
  background-color: #eee;
}

.jumbo * {
  color: white;
  float: left;
  padding-right: 1em;
}

.menu {
  float: right;
}
</style>
