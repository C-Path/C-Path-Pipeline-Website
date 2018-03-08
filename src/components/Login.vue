<template>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    Sign in with Google
  </g-signin-button>
</template>

<script>
 import auth from '../auth'
export default {
  data () {
    return {
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object}
       */
      googleSignInParams: {
        client_id: '444399542573-802e5tggcegcc20ei5idq9h9q6sqaurg' + '.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    onSignInSuccess (googleUser) {
      const profile = googleUser.getBasicProfile() // etc etc
      console.log("Profile: ", profile)
      //Send profile.U3 to DB for storage
      console.log("Google User: ", googleUser)
      console.log("Token: ", googleUser.Zi.access_token)
      localStorage.setItem('token', JSON.stringify(googleUser.Zi.access_token))
      localStorage.setItem('username', profile.U3)
      this.$router.push('/dashboard') 
      // this.$router.replace(this.$route.query.redirect || '/dashboard')
      // auth.login(profile.U3, googleUser.Zi.access_token, (loggedIn) => {
      //     if (!loggedIn) {
      //       this.error = true
      //     } else {
      //       if (auth.isManager()) {
      //         this.$router.replace(this.$route.query.redirect || '/datamanager')
      //       } else {
      //         this.$router.replace(this.$route.query.redirect || '/dashboard')
      //       }
      //     }
      //   })
      // window.location.href = "/dashboard"
    },
    onSignInError (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    }
  }
}
</script>


//   import auth from '../auth'
//   export default {
//     data () {
//       return {
//         username: '',
//         pass: '',
//         error: false
//       }
//     },
//     methods: {
//       login () {
//         auth.login(this.username, this.pass, (loggedIn) => {
//           if (!loggedIn) {
//             this.error = true
//           } else {
//             if (auth.isManager()) {
//               this.$router.replace(this.$route.query.redirect || '/datamanager')
//             } else {
//               this.$router.replace(this.$route.query.redirect || '/dashboard')
//             }
//           }
//         })
//       }
//     }
//   }
// </script>

<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>