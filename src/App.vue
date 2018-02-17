<template>
  <div id="app">
    <div class="header">
      <img src="../static/images/ReSeqTB.png" alt="c-path logo">
      <router-link v-if="loggedIn" to="/logout">
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect log-out">Log Out</button>
      </router-link>
    </div>
    <template v-if="$route.matched.length">
      <router-view></router-view>
    </template>
  </div>
</template>

<script>
import auth from './auth'
export default {
  name: 'app',
  data () {
    return {
      loggedIn: auth.loggedIn()
    }
  },
  created () {
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn
    }
  }
}
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
