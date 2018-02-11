<template>
  <div id="app">
        <router-link v-if="loggedIn" to="/logout">Log out</router-link>
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

</style>
