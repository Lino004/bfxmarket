import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    enDev: false,
  },
  mutations: {
    SET_EN_DEV(state, val) {
      state.enDev = val;
    },
  },
  actions: {
    setEnDev(context, val) {
      context.commit('SET_EN_DEV', val);
    },
  },
  getters: {
    enDev: state => state.enDev,
  },
  modules: {
  },
});
