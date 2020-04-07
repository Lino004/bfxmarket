import Vue from 'vue';
import goTo from 'vuetify/es5/services/goto';
import VueRouter from 'vue-router';
import Bfx from '@/views/home/index.vue';
import Home from '@/views/home/Home.vue';
import Faq from '@/views/home/Faq.vue';
import Guide from '@/views/home/Guide.vue';
import QueFaisonsNous from '@/views/home/QueFaisonsNous.vue';
import formation from '@/components/site/formation/formation.vue';
import modules from '@/components/site/formation/module.vue';
import chapitre from '@/components/site/formation/chapitre.vue';
import BackOffice from '@/views/backOffice/index.vue';
import ConfigPageAccueil from '@/views/backOffice/ConfigPageAccueil.vue';
import QueFaisonsNousBackOffice from '@/views/backOffice/QueFaisonsNous.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/backffice',
    component: BackOffice,
    children: [
      {
        path: '',
        name: 'back-office-config-home',
        component: ConfigPageAccueil,
      },
      {
        path: '/que-faisons-nous',
        name: 'back-office-que-faisons-nous',
        component: QueFaisonsNousBackOffice,
      },
    ],
  },
  {
    path: '/home',
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
      {
        path: 'formation/:idFormation',
        name: 'bfx-formation',
        component: formation,
      },
      {
        path: 'formation/:idFormation/module/:idModule',
        name: 'bfx-module',
        component: modules,
      },
      {
        path: 'formation/:idFormation/module/:idModule/chapitre/:idChapitre',
        name: 'bfx-chapitre',
        component: chapitre,
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
