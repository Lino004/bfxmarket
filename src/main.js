import Vue from 'vue';
import VueFbCustomerChat from 'vue-fb-customer-chat';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(VueFbCustomerChat, {
  page_id: 109259077302935,
  theme_color: '#268dfb',
  locale: 'en_US',
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
