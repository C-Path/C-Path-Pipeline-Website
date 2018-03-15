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
        <p v-if="error" class="error">Incorrect username or password</p>
      </div>
      </section>
      <section class="text-align-center account-services">
        <p>If you would like an account, or if you forgot your credentials,<br> please click the link below to send us an email</p>
        <button @click="show()" class="margin-bottom-2 mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Contact Us</button>
        <modal class="" name="ContactUsModal" height="auto" :scrollable="true">
          <div class="text-align-center">
            <h3 class="text-underline">Request New Account</h3>
          </div>
          <div class="text-align-center">
            <p> 1. Sign in with the account you would like to be created.</p>
            <g-signin-button
              :params="googleSignInParams"
              @success="createSuccess"
              @error="createError">
              Sign in
            </g-signin-button>
            <div v-if="authWithGoogle">
              <p>2. Ok Great! Let's send a request to have the account <b>{{googleUser.w3.U3}}</b> created.</p>
              <button @click="sendRequest" class="margin-bottom-2 mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Send Request</button>
            </div>
            <div v-if="requestSent">
              <p >3. Easy as that! Once your request is reviewed, you will be notified at <b>{{googleUser.w3.U3}}</b>.</p>
              <button @click="close" class="margin-bottom-2 mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Close</button>
            </div>
          </div>
        </modal>
      </section>
      <a :href="myValue" id="mymailto" style="display:none"></a>
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
      username: "",
      pass: "",
      error: false,
      authWithGoogle: false,
      googleUser: "",
      myValue: "mailto:",
      requestSent: false
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      this.username = googleUser.w3.U3;
      this.pass = googleUser.w3.Eea;
      auth.login(this.username, this.pass, loggedIn => {
        if (!loggedIn) {
          this.error = true;
        } else {
          if (auth.isManager()) {
            this.$router.replace(this.$route.query.redirect || "/datamanager");
          } else {
            this.$router.replace(this.$route.query.redirect || "/dashboard");
          }
        }
      });
    },
    onSignInError(error) {
      console.log("error: ", error);
    },
    show() {
      this.$modal.show("ContactUsModal");
    },
    close() {
      this.authWithGoogle = false;
      this.googleUser = "";
      this.requestSent = false;
      this.$modal.hide("ContactUsModal");
    },
    createSuccess(googleUser) {
      this.googleUser = googleUser;
      this.authWithGoogle = true;
      var body =
        "body=Username: " +
        this.googleUser.w3.U3 +
        "%0d%0aID: " +
        this.googleUser.w3.Eea;
      this.myValue = "mailto:ken@cpath.com?subject=New Account Request&" + body;
    },
    createError(error) {
      console.log("error: ", error);
    },
    sendRequest() {
      document.getElementById("mymailto").click();
      this.requestSent = true;
    }
  }
};
</script>

<style>
.g-signin-button {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
  width: 12em;
  font-size: 18px;
  margin-bottom: 2em;
}

.error {
  font-size: 20px;
  font-weight: 500;
}
</style>