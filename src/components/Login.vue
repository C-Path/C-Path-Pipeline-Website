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
          						<input class="mdl-textfield__input" type="text" id="username" v-model="username" placeholder="username"/>
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
          <p>If you would like an account, or if you forgot your credentials,<br> please click the link below to send us an email</p>
          <a href="mailto:isaac.c.lessard@gmail.com?subject=ReSeqTB Account Services">
            <button class="margin-bottom-2 mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Contact Us</button>
          </a>
        </section>
      </body>
    </html>
</template>

<script>
  import auth from '../auth'
  export default {
    data () {
      return {
        username: '',
        pass: '',
        error: false
      }
    },
    methods: {
      login () {
        auth.login(this.username, this.pass, (loggedIn) => {
          if (!loggedIn) {
            this.error = true
          } else {
            var user = JSON.parse(localStorage.getItem('user'))
            if (auth.isManager()) {
              this.$router.replace(this.$route.query.redirect || '/datamanager')
            } else {
              this.$router.replace(this.$route.query.redirect || '/dashboard')
            }
          }
        })
      }
    }
  }
</script>

<style>
  .error {
    color: red;
  }

  .account-services {
    padding: 4em;
  }
</style>
