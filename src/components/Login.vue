<template>
  <div class="signInArea col-md-offset-4">
    <h2 class="padding-title">Welcome, Sign in Here</h2>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    Sign in with Google
  </g-signin-button>
  </div>
</template>

<script>
import auth from "../auth";
import axios from "axios";
export default {
  data() {
    return {
      googleSignInParams: {
        client_id: process.env.CLIENT_ID + ".apps.googleusercontent.com"
      }
    };
  },
  methods: {
    onSignInSuccess(googleUser) {

     console.log("successfully authenticated")
      
    },
    onSignInError(error) {
      console.log("error: ", error);
    }
  }
};
</script>

<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
  width: 12em;
  height: 2em;
  font-size: 18px;
}

.padding-title {
  padding-top: 1em;
  padding-bottom: 1em;
}

.signInArea {
  background-color: gainsboro;
  width: 35%;
  margin-top: 2em;
  text-align: center;
  height: 14em;
}
</style>