import Vue from 'vue';
import Vuex from 'vuex';
import {
  get,
  logout,
  addDownline,
  getSouscript,
} from '@/api/auth/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sizeWindows: null,
    sizeTopBar: null,
    sizePageTitle: null,
    sizeFooter: null,
    valueScroll: null,
    drawer: false,
    user: null,
    userAdmin: null,
    valueSnack: false,
    colorSnack: '',
    msgSnack: '',
    idParrainage: '',
    listeSouscript: [],
    minSize: null,
    idChapSouscrip: null,
  },
  mutations: {
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
    SET_USER_ADMIN(state, val) {
      state.userAdmin = val;
    },
    SET_VALUE_SNACK(state, val) {
      state.valueSnack = val;
    },
    SET_COLOR_SNACK(state, val) {
      state.colorSnack = val;
    },
    SET_MSG_SNACK(state, val) {
      state.msgSnack = val;
    },
    SET_ID_PARRAINAGE(state, val) {
      state.idParrainage = val;
    },
    SET_LISTE_SOUSCRIPT(state, val) {
      state.listeSouscript = val;
    },
    SET_MIN_SIZE(state, val) {
      state.minSize = val;
    },
    SET_ID_CHAP_SOUSCRIP(state, val) {
      state.idChapSouscrip = val;
    },
  },
  actions: {
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
    showSnackMsg(context, { msg, color }) {
      context.commit('SET_MSG_SNACK', msg);
      context.commit('SET_COLOR_SNACK', color);
      context.commit('SET_VALUE_SNACK', true);
    },
    async getUser(context) {
      try {
        const user = (await get(context.getters.user.identifiant)).data;
        user.password = '';
        context.dispatch('setUser', user);
        const tabSouscript = (await getSouscript(user.identifiant)).data.chapitre;
        context.commit('SET_LISTE_SOUSCRIPT', tabSouscript);
        return true;
      } catch (error) {
        return false;
      }
    },
    async logout(context) {
      await logout(context.getters.user.identifiant);
      context.dispatch('setUser', null);
    },
    async actionParrainage(context) {
      if (!context.getters.idParrainage) return false;
      await addDownline(context.getters.idParrainage);
      return true;
    },
    async isConnect(context) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (typeof user === 'object' && user) {
        await context.dispatch('getUser');
        if (context.getters.userStatus === 'Online') return true;
        return false;
      }
      return false;
    },
  },
  getters: {
    valueSnack: state => state.valueSnack,
    colorSnack: state => state.colorSnack,
    msgSnack: state => state.msgSnack,
    sizeWindows: state => state.sizeWindows,
    sizeTopBar: state => state.sizeTopBar,
    sizePageTitle: state => state.sizePageTitle,
    sizeFooter: state => state.sizeFooter,
    valueScroll: state => state.valueScroll,
    drawer: state => state.drawer,
    user: state => state.user,
    userAdmin: state => state.userAdmin,
    userStatus: (state) => {
      if (state.user) return state.user.status;
      return 'Offline';
    },
    idParrainage: state => state.idParrainage,
    listeSouscript: state => state.listeSouscript,
  },
  modules: {
  },
});
