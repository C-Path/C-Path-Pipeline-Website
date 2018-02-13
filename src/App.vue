<template>
  <div id="app">
      <img src="../static/images/pr-c-path-logo.png" alt="c-path logo">
        <router-link v-if="loggedIn" to="/logout">
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect log-out">Log Out</button>
        </router-link>
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
  float: right;
  margin: 2em;
}
</style>
