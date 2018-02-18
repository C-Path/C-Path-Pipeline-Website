<template>
  <div id="app">
    <div class="header">
      <img src="../static/images/ReSeqTB.png" alt="c-path logo">
      <router-link v-if="loggedIn" to="/logout">
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect log-out">Log Out</button>
      </router-link>
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
</style>
