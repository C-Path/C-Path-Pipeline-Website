import Vue from 'vue';
import Vuex from 'vuex';
import VueAxios from 'vue-axios';
import { VueAuthenticate } from 'vue-authenticate';
import axios from 'axios';

import providers from './providers';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const vueAuth = new VueAuthenticate(Vue.prototype.$http, {
  tokenName: 'access_token',
  providers,
});

export default new Vuex.Store({
  getters: {
    isAuthenticated() {
      return vueAuth.isAuthenticated();
    },
  },

  actions: {
    login(context, payload) {
      vueAuth.login(payload.user, payload.requestOptions).then(response => {
        context.commit('isAuthenticated', {
          isAuthenticated: vueAuth.isAuthenticated(),
        });
      });
    },
  },
});
