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
                <form @submit.prevent="login">
                  <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" type="text" id="username" v-model="username" placeholder="email"/>
                  </div>
                  <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" type="password" id="pass" v-model="pass" placeholder="password"/>
                  </div>
                  <button class="margin-bottom-2 mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="submit">Log in</button>
                </form>
                <p v-if="error" class="error">Incorrect username or password</p>
              </div>
            </div>
          </main>
        </div>
      </section>
      <section class="text-align-center account-services">
        <a href="mailto:isaac.c.lessard@gmail.com?subject=ReSeqTB Account Services">
            <button class="margin-bottom-2 mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Contact Us</button>
        </a>
        <button @click="show()" class="margin-bottom-2 mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Request Account</button>
        <modal class="requestNewUser" name="ContactUsModal" height="auto" :scrollable="true">
          <div class="text-align-center">
            <h3 class="text-underline">Request New Account</h3>
          </div>
          <div class="text-align-center">
            <section v-if="!requestSent">
              <p> Please enter the email address you would like to use for the new account.</p>
              <form @submit.prevent="sendRequest">
                <input class="mdl-textfield__input newUserInput" type="email" id="newUserRequest" v-model="newUserEmail" placeholder="Email"/>
                <button class="margin-bottom-2 mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="submit">Request Account</button>
              </form>
            </section>
            <div v-if="requestSent">
              <p >Easy as that! Once your request is reviewed, you will be notified at<b>{{newUserEmail}}</b></p>
              <button @click="close" class="margin-bottom-2 mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Close</button>
            </div>
          </div>
        </modal>
      </section>
    </body>
  </html>
</template>

<script>
import auth from "../auth";
import axios from "axios";
export default {
  data () {
      return {
        username: '',
        pass: '',
        error: false,
        newUserEmail: '',
        requestSent: false,
      }
  },
  methods: {
    login () {
      auth.login(this.username, this.pass, (loggedIn) => {
        if (!loggedIn) {
          this.error = true
        } else {
          if (auth.isManager()) {
            this.$router.replace(this.$route.query.redirect || "/datamanager")
          } else {
            this.$router.replace(this.$route.query.redirect || "/dashboard")
          }
        }
      })
    },
    show() {
      this.$modal.show("ContactUsModal");
    },
    close() {
      this.requestSent = false;
      this.$modal.hide("ContactUsModal");
    },
    sendRequest() {
      var $vm = this
      axios
        .post(process.env.SERVER_URL + "/requestAccount", {
          Username: this.newUserEmail,
        })
        .then(function(res) {
          // email failure is logged on server
          $vm.requestSent = true;
        })
        .catch(function(error) {
          console.log("error: ", error);
        });
    }
  }
};
</script>

<style>

.account-services button {
    margin: 1em;
  }

.requestNewUser * {
  margin: 1em;
  text-align: center;
}

.newUserInput {
  margin: 0 auto;
  width: 80%;
}
</style>
