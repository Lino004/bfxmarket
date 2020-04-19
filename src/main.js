import Vue from 'vue';
import VideoBg from 'vue-videobg';
import VAnimateCss from 'v-animate-css';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

window.$crisp = [];
window.CRISP_WEBSITE_ID = 'a07e6a43-b836-4f0a-be6b-015ba22ea2ce';

// eslint-disable-next-line wrap-iife
(function crisp() {
  const d = document;
  const s = d.createElement('script');
  s.src = 'https://client.crisp.chat/l.js';
  s.async = 1;
  d.getElementsByTagName('head')[0].appendChild(s);
})();

Vue.component('video-bg', VideoBg);

Vue.use(VAnimateCss);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
