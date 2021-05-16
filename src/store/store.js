import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    state: {},
  },
  getters: {
    getToken: (state) => {
      return state;
    },
  },
  mutations: {
    setToken(state, token) {
      state = token;
    },
  },
  actions: {},
});
