import VModal from 'vue-js-modal';
import Vue from 'vue';
import App from './App';
import router from './router';


Vue.config.productionTip = false;

Vue.use(VModal, {
  dialog: true
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
