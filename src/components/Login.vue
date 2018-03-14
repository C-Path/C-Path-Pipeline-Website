<template lang="html">
    <html>
    <head>
    </head>
    <body>
      <section class="text-align-center error">
          <h4 v-if="$route.query.redirect">
            Please log in to access this website.
          </h4>
      </section>
        <section class="login">
          <div class="align-center text-align-center">
          	<main class="mdl-layout__content mdl-shadow--6dp">
          		<div class="mdl-card mdl-shadow--6dp">
          			<div class="mdl-card__title mdl-color--primary mdl-color-text--white">
          				<h2 class="mdl-card__title-text">Welcome.</h2>
          			</div>
          	  	<div class="mdl-card__supporting-text">
                  <g-signin-button
                  :params="googleSignInParams"
                  @success="onSignInSuccess"
                  @error="onSignInError">
                  Sign in with Google
                </g-signin-button>
          			</div>
          		</div>
          	</main>
          </div>
        </section>
        <section class="text-align-center account-services">
          <p>If you would like an account, or if you forgot your credentials,<br> please click the link below to send us an email</p>
          <a href="mailto:isaac.c.lessard@gmail.com?subject=ReSeqTB Account Services">
            <button class="margin-bottom-2 mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Contact Us</button>
          </a>
        </section>
      </body>
    </html>
</template>

<script>
import auth from "../auth";
import axios from "axios";
export default {
  data() {
    return {
      googleSignInParams: {
        client_id: process.env.CLIENT_ID + ".apps.googleusercontent.com"
      },
      username: '',
        pass: '',
        error: false
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      this.username = googleUser.w3.U3
      this.pass = googleUser.w3.Eea
      auth.login(this.username, this.pass, (loggedIn) => {
          if (!loggedIn) {
            this.error = true
          } else {
            if (auth.isManager()) {
              this.$router.replace(this.$route.query.redirect || '/datamanager')
            } else {
              this.$router.replace(this.$route.query.redirect || '/dashboard')
            }
          }
        })
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
  font-size: 18px;
}
</style>