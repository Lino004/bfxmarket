import Vue from 'vue';
import Vuex from 'vuex';
import { get, logout } from '@/api/auth/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    enDev: false,
    sizeWindows: null,
    sizeTopBar: null,
    sizePageTitle: null,
    sizeFooter: null,
    valueScroll: null,
    drawer: false,
    user: null,
  },
  mutations: {
    SET_EN_DEV(state, val) {
      state.enDev = val;
    },
    SET_SIZE_WINDOWS(state, val) {
      state.sizeWindows = val;
    },
    SET_SIZE_TOP_BAR(state, val) {
      state.sizeTopBar = val;
    },
    SET_SIZE_PAGE_TITLE(state, val) {
      state.sizePageTitle = val;
    },
    SET_SIZE_FOOTER(state, val) {
      state.sizeFooter = val;
    },
    SET_VALUE_SCROLL(state, val) {
      state.valueScroll = val;
    },
    SET_DRAWER(state, val) {
      state.drawer = val;
    },
    SET_USER(state, val) {
      state.user = val;
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
    setValueScroll(context, val) {
      context.commit('SET_VALUE_SCROLL', val);
    },
    setDrawer(context, val) {
      context.commit('SET_DRAWER', val);
    },
    setUser(context, val) {
      localStorage.setItem('user', JSON.stringify(val));
      context.commit('SET_USER', val);
    },
    async getUser(context) {
      try {
        const user = (await get(context.getters.user.identifiant)).data;
        user.password = '';
        context.dispatch('setUser', user);
        return true;
      } catch (error) {
        return false;
      }
    },
    async logout(context) {
      await logout(context.getters.user.identifiant);
      context.dispatch('setUser', null);
    },
  },
  getters: {
    enDev: state => state.enDev,
    sizeWindows: state => state.sizeWindows,
    sizeTopBar: state => state.sizeTopBar,
    sizePageTitle: state => state.sizePageTitle,
    sizeFooter: state => state.sizeFooter,
    valueScroll: state => state.valueScroll,
    drawer: state => state.drawer,
    user: state => state.user,
  },
  modules: {
  },
});
