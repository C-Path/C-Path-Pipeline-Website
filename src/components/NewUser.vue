<template lang="html">
  <div>
    <a>
      <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect log-out">Log In</button>
    </a>
    <h2 v-if="success"> New user: {{email}} was successfully created.</h2>
    <h2 v-if="!success"> An error occured: {{error}}</h2>
  </div>
</template>

<script>
import axios from "axios";
import jwt from "jsonwebtoken";
import config from "../../config";

export default {
  data() {
    return {
      email: "",
      success: false,
      error: ""
    }
  },
  mounted() {
    var $vm = this;
    $vm.email = this.$route.query.email
    axios
      .post(process.env.SERVER_URL + "/requestUser", {
        params: {
          email: this.$route.query.email
        }
      })
      .then(function(res) {
        if (res.data.errors) {
          $vm.error = res.data.message
        }
        else {
          $vm.success = true
          $vm.response = res.data;
        }

      })
      .catch(function(error) {
        $vm.error = res.data.message
        console.log(error);
      });
  },
  methods: {

  }
};
</script>

<style scoped>

</style>
