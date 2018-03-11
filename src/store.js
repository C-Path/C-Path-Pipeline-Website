import Vue from 'vue';
import Vuex from 'vuex';
import VueAxios from 'vue-axios';
import VueAuthenticate from 'vue-authenticate';
import axios from 'axios';

import providers from './providers';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

/*
 I believe this is not required if we use the Vuex.Store.
Vue.use(VueAuthenticate, {
  tokenName: 'access_token',
  providers,
});
*/

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
      // eslint-disable-next-line no-unused-vars
      vueAuth.login(payload.user, payload.requestOptions).then(response => {
        context.commit('isAuthenticated', {
          isAuthenticated: vueAuth.isAuthenticated(),
        });
      });
    },
  },
});
