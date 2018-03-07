import VModal from 'vue-js-modal';
import Vue from 'vue';
import App from './App';
import router from './router';
import GSignInButton from 'vue-google-signin-button'

Vue.config.productionTip = false;

Vue.use(VModal, { dialog: true })
Vue.use(GSignInButton)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});


