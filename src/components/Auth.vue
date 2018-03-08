// <template>
// <div class="index-component">
//   <div class="authentication-status" v-if="$auth.isAuthenticated()">
//     You are successfully authenticated
//     <div class="authentication-status__token">{{$auth.getToken()}}</div>
//   </div>
//   <button @click="authLogin()">Login</button>
//   <button @click="authRegister()">Register</button>
//   <button @click="authLogout()">Logout</button>

//   <hr />
//   <button @click="auth('github')" class="button--github">Auth github</button>
//   <button @click="auth('facebook')" class="button--facebook">Auth facebook</button>
//   <button @click="auth('google')" class="button--google">Auth google</button>
//   <button @click="auth('twitter')" class="button--twitter">Auth twitter</button>
//   <hr />

//   <button @click="auth('instagram')" class="button--instagram">Auth instagram</button>
//   <button @click="auth('bitbucket')" class="button--bitbucket">Auth bitbucket</button>
//   <button @click="auth('linkedin')" class="button--linkedin">Auth LinkedIn</button>
//   <button @click="auth('live')" class="button--live">Auth Live</button>
//   <pre class="response" v-if="response !== null">{{JSON.stringify(response, null, 2)}}</pre>
// </div>
// </template>

// <script>
// export default {
//   data: function() {
//     return {
//       access_token: null,
//       response: null,
//     };
//   },
//   methods: {
//     authLogin() {
//       var this_ = this;
//       let user = {
//         email: 'john.doe@domain.com',
//         password: 'pass123456',
//       };

//       if (this.$auth.isAuthenticated()) {
//         this.$auth.logout();
//       }

//       this.$auth.login(user).then(function(response) {
//         this_.response = response;
//       });
//     },

//     authRegister() {
//       var this_ = this;
//       let user = {
//         name: 'John Doe',
//         email: 'john.doe@domain.com',
//         password: 'pass123456',
//       };

//       if (this.$auth.isAuthenticated()) {
//         this.$auth.logout();
//       }

//       this.$auth.register(user).then(function(response) {
//         this_.response = response;
//       });
//     },

//     authLogout() {
//       this.$auth.logout().then(() => {
//         if (!this.$auth.isAuthenticated()) {
//           this.response = null;
//         }
//       });
//     },

//     auth(provider) {
//       if (this.$auth.isAuthenticated()) {
//         this.$auth.logout();
//       }

//       this.response = null;

//       var this_ = this;
//       this.$auth
//         .authenticate(provider)
//         .then(function(authResponse) {
//           if (provider === 'github') {
//             this_.$http
//               .get('https://api.github.com/user')
//               .then(function(response) {
//                 this_.response = response;
//               });
//           } else if (provider === 'facebook') {
//             this_.$http
//               .get('https://graph.facebook.com/v2.5/me', {
//                 params: { access_token: this_.$auth.getToken() },
//               })
//               .then(function(response) {
//                 this_.response = response;
//               });
//           } else if (provider === 'google') {
//             this_.$http
//               .get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
//               .then(function(response) {
//                 this_.response = response;
//               });
//           } else if (provider === 'twitter') {
//             this_.response = authResponse.body.profile;
//           } else if (provider === 'instagram') {
//             this_.response = authResponse;
//           } else if (provider === 'bitbucket') {
//             this_.$http
//               .get('https://api.bitbucket.org/2.0/user')
//               .then(function(response) {
//                 this_.response = response;
//               });
//           } else if (provider === 'linkedin') {
//             this_.response = authResponse;
//           } else if (provider === 'live') {
//             this_.response = authResponse;
//           }
//         })
//         .catch(function(err) {
//           this_.response = err;
//         });
//     },
//   },
// };
// </script>

// <style>
// *,
// html,
// body {
//   margin: 0;
//   padding: 0;
// }
// html {
//   font-size: 14px;
//   line-height: 1.5;
// }
// body {
//   font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
// }
// button {
//   background-color: transparent;
//   border: 1px solid #ddd;
//   border-radius: 3px;
//   font-size: inherit;
//   font-weight: 700;
//   line-height: 2rem;
//   padding: 0 2rem;
// }
// button:hover {
//   cursor: pointer;
// }
// .button--github {
//   color: #4078c0;
//   border: 1px solid #4078c0;
// }
// .button--facebook {
//   color: #3b5998;
//   border: 1px solid #3b5998;
// }
// .button--google {
//   color: #ea4335;
//   border: 1px solid #ea4335;
// }
// .button--twitter {
//   color: #1da1f2;
//   border: 1px solid #1da1f2;
// }
// .button--instagram {
//   color: #c13584;
//   border: 1px solid #c13584;
// }
// .button--bitbucket {
//   color: #205081;
//   border: 1px solid #205081;
// }
// .button--linkedin {
//   color: #0077b5;
//   border: 1px solid #0077b5;
// }
// .button--live {
//   color: #f65314;
//   border: 1px solid #f65314;
// }
// .authentication-status {
//   background-color: #42b983;
//   color: #fff;
//   left: 0;
//   padding: 16px 32px;
//   position: fixed;
//   right: 0;
//   text-align: center;
//   top: 0;
// }
// hr {
//   border: 0;
//   border-bottom: 1px solid #ddd;
//   margin: 2rem 0;
// }
// #app {
//   margin: 32px auto;
//   max-width: 640px;
//   padding-top: 53px;
//   word-break: break-all;
// }
// </style>
