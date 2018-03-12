<template>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    Sign in with Google
  </g-signin-button>
</template>

<script>
import auth from "../auth";
export default {
  data() {
    return {
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object}
       */
      googleSignInParams: {
        client_id: process.env.CLIENT_ID + ".apps.googleusercontent.com"
      }
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      // var $vm = this;
      const profile = googleUser.getBasicProfile();
      var role = auth.verifyThenProceed(profile.U3, googleUser.Zi.access_token);
      localStorage.setItem("token", googleUser.Zi.access_token);
      localStorage.setItem("username", profile.U3);
      console.log("This role: ", role)
      // console.log("This vm role: ", $vm.role)
      if (role === "DATA_MANAGER") {
        console.log("redirecting to data manager")
        this.$router.push("/datamanager");
      } else {
        this.$router.push("/dashboard");
      }
    },
    onSignInError(error) {
      console.log("error: ", error);
    }
  }
};
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