import Vue from 'vue';
import goTo from 'vuetify/es5/services/goto';
import VueRouter from 'vue-router';
import Bfx from '@/views/home/index.vue';
import Home from '@/views/home/Home.vue';
import Faq from '@/views/home/Faq.vue';
import Guide from '@/views/home/Guide.vue';
import QueFaisonsNous from '@/views/home/QueFaisonsNous.vue';

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
      {
        path: 'guide-trading',
        name: 'bfx-guide',
        component: Guide,
      },
      {
        path: 'que-faisons-nous',
        name: 'bfx-faisons',
        component: QueFaisonsNous,
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
