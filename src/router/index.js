import Vue from 'vue';
import goTo from 'vuetify/es5/services/goto';
import VueRouter from 'vue-router';
import Bfx from '@/views/home/index.vue';
import Home from '@/views/home/Home.vue';
import Faq from '@/views/home/Faq.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    redirect: '/bluefxmarker',
  },
  {
    path: '/bluefxmarker',
    name: '',
    component: Bfx,
    children: [
      {
        path: '',
        name: 'bfx-home',
        component: Home,
      },
      {
        path: 'faq',
        name: 'bfx-faq',
        component: Faq,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }

    return goTo(scrollTo);
  },
  routes,
});

export default router;
