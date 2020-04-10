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
import ListeGuide from '@/views/backOffice/ListeGuide.vue';
import AddChapGuide from '@/views/backOffice/AddChapGuide.vue';
import DetailChapGuide from '@/views/backOffice/DetailChapGuide.vue';
import FAQ from '@/views/backOffice/FAQ.vue';
import AjouterFormation from '@/views/backOffice/AjouterFormation.vue';
import ComingSoon from '@/views/ComingSoon.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    redirect: '/coming-song',
  },
  {
    path: '/coming-song',
    name: 'comming-song',
    component: ComingSoon,
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
        path: '/backffice/que-faisons-nous',
        name: 'back-office-que-faisons-nous',
        component: QueFaisonsNousBackOffice,
      },
      {
        path: '/backffice/liste-chap-guide-trading',
        name: 'back-office-liste-chap-guide-trading',
        component: ListeGuide,
      },
      {
        path: '/backffice/add-chap-guide-trading/',
        name: 'back-office-add-chap-guide-trading',
        component: AddChapGuide,
      },
      {
        path: '/backffice/modif-chap-guide-trading/:id',
        name: 'back-office-modif-chap-guide-trading',
        component: DetailChapGuide,
      },
      {
        path: '/backffice/page-faq',
        name: 'back-office-faq',
        component: FAQ,
      },
      {
        path: '/backffice/ajout-fromation',
        name: 'back-office-ajout-formation',
        component: AjouterFormation,
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
