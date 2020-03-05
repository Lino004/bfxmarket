import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    enDev: false,
    sizeTopBar: null,
    sizeFooter: null,
    valueScrollVideo: null,
    drawer: false,
  },
  mutations: {
    SET_EN_DEV(state, val) {
      state.enDev = val;
    },
    SET_SIZE_TOP_BAR(state, val) {
      state.sizeTopBar = val;
    },
    SET_SIZE_FOOTER(state, val) {
      state.sizeFooter = val;
    },
    SET_VALUE_SCROLL_VIDEO(state, val) {
      state.valueScrollVideo = val;
    },
    SET_DRAWER(state, val) {
      state.drawer = val;
    },
  },
  actions: {
    setEnDev(context, val) {
      context.commit('SET_EN_DEV', val);
    },
    setSizeTopBar(context, val) {
      context.commit('SET_SIZE_TOP_BAR', val);
    },
    setSizeFooter(context, val) {
      context.commit('SET_SIZE_FOOTER', val);
    },
    setValueScrollVideo(context, val) {
      context.commit('SET_VALUE_SCROLL_VIDEO', val);
    },
    setDrawer(context, val) {
      context.commit('SET_DRAWER', val);
    },
  },
  getters: {
    enDev: state => state.enDev,
    sizeTopBar: state => state.sizeTopBar,
    sizeFooter: state => state.sizeFooter,
    valueScrollVideo: state => state.valueScrollVideo,
    drawer: state => state.drawer,
  },
  modules: {
  },
});
