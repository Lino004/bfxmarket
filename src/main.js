import Vue from 'vue';
import VideoBg from 'vue-videobg';
import VAnimateCss from 'v-animate-css';
import VueClipboard from 'vue-clipboard2';
import SocialSharing from 'vue-social-sharing';
import YimoVueEditor from 'yimo-vue-editor';
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

VueClipboard.config.autoSetContainer = true;

Vue.use(YimoVueEditor, {
  name: 'v-editor-app', // Custom name
  config: {
    uploadImgUrl: '/api/upload', // upload api
    printLog: false, // disabled console.log
  }, // wagnEditor config
  uploadHandler: (type, resTxt) => { // Upload processing hook
    // eslint-disable-next-line no-console
    console.log(type, resTxt);
    /* if (type === 'success') {
      const res = JSON.parse(resTxt);
      if (res.status !== 1) {
        return null;
      }
      return res.data;
    }
    if (type === 'error') {
      // todo toast
    } else if (type === 'timeout') {
      // todo toast
    }
    return 'upload failed__'; */
  },
});

Vue.use(VueClipboard);
Vue.use(VAnimateCss);
Vue.use(SocialSharing);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
