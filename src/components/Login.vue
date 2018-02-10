<template lang="html">
    <html>
    <head>
    </head>
    <body>
        <h3 class="margin-left-3">C-Path Website Demo</h3>
        <section class="login">
          <div class="align-center text-align-center">
          	<main class="mdl-layout__content mdl-shadow--6dp">
          		<div class="mdl-card mdl-shadow--6dp">
          			<div class="mdl-card__title mdl-color--primary mdl-color-text--white">
          				<h2 class="mdl-card__title-text">Welcome.</h2>
          			</div>
          	  	<div class="mdl-card__supporting-text">
          				<form action="#">
          					<div class="mdl-textfield mdl-js-textfield">
          						<input class="mdl-textfield__input" type="text" id="username" />
          						<label class="mdl-textfield__label" for="username">Username</label>
          					</div>
          					<div class="mdl-textfield mdl-js-textfield">
          						<input class="mdl-textfield__input" type="password" id="userpass" />
          						<label class="mdl-textfield__label" for="userpass">Password</label>
          					</div>
          				</form>
          			</div>
                <a href="/#/dashboard">
          				<button class="margin-bottom-2 mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Log in</button>
                </a>
          		</div>
          	</main>
          </div>
        </section>
    </body>

    </html>
</template>

<script>
export default {

    data () {
        return {

        }
    },
  methods: {

  }
}

</script>

<style scoped>

</style>
