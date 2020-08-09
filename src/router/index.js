import Vue from 'vue';
import goTo from 'vuetify/es5/services/goto';
import VueRouter from 'vue-router';
import Bfx from '@/views/home/index.vue';
import Home from '@/views/home/Home.vue';
import Faq from '@/views/home/Faq.vue';
import Blog from '@/views/home/Blog.vue';
import Article from '@/views/home/Article.vue';
import Guide from '@/views/home/Guide.vue';
import QueFaisonsNous from '@/views/home/QueFaisonsNous.vue';
import NosFormations from '@/views/home/NosFormations.vue';
import Parrainage from '@/views/home/Parrainage.vue';
import ResponseTransaction from '@/views/home/ResponseTransaction.vue';
import AttentConfirmation from '@/views/home/AttentConfirmation.vue';
import ResetPassword from '@/views/home/ResetPassword.vue';
import InitResetPassword from '@/views/home/InitResetPassword.vue';
import formation from '@/components/site/formation/formation.vue';
import modules from '@/components/site/formation/module.vue';
import chapitre from '@/components/site/formation/chapitre.vue';
import BackOffice from '@/views/backOffice/index.vue';
import ConfigPageAccueil from '@/views/backOffice/ConfigPageAccueil.vue';
import QueFaisonsNousBackOffice from '@/views/backOffice/QueFaisonsNous.vue';
import PolitiqueEtConf from '@/views/backOffice/PolitiqueEtConf.vue';
import TermeEtCondition from '@/views/backOffice/TermeEtCondition.vue';
import ListeGuide from '@/views/backOffice/ListeGuide.vue';
import AddChapGuide from '@/views/backOffice/AddChapGuide.vue';
import DetailChapGuide from '@/views/backOffice/DetailChapGuide.vue';
import FAQ from '@/views/backOffice/FAQ.vue';
import ListeFormation from '@/views/backOffice/formation/ListeFormation.vue';
import ModifierFormation from '@/views/backOffice/formation/ModifierFormation.vue';
import AjouterFormation from '@/views/backOffice/formation/AjouterFormation.vue';
import ListeModules from '@/views/backOffice/modules/ListeModules.vue';
import ModifierModule from '@/views/backOffice/modules/ModifierModule.vue';
import AjouterModule from '@/views/backOffice/modules/AjouterModule.vue';
import ListeChapitres from '@/views/backOffice/chapitres/ListeChapitres.vue';
import ModifierChapitre from '@/views/backOffice/chapitres/ModifierChapitre.vue';
import AjouterChapitre from '@/views/backOffice/chapitres/AjouterChapitre.vue';
import ListeUsers from '@/views/backOffice/users/ListeUsers.vue';
import ListeArtilces from '@/views/backOffice/article/liste.vue';
import AjoutArtilces from '@/views/backOffice/article/ajout.vue';
import CommentUser from '@/views/backOffice/Comment.vue';
import PrivateConnexion from '@/views/PrivateConnexion.vue';
import { confirmeUser, get } from '@/api/auth/index';
// import ComingSoon from '@/views/ComingSoon.vue';
import { accesRoute } from '@/configuration/user';
import store from '../store/index';

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
  /* {
    path: '/comming-song',
    name: 'comming-song',
    component: ComingSoon,
  }, */
  {
    path: '/private-connexion',
    name: 'private-connexion',
    component: PrivateConnexion,
  },
  {
    path: '/backoffice',
    component: BackOffice,
    children: [
      {
        path: '',
        name: 'back-office-config-home',
        component: ConfigPageAccueil,
        beforeEnter: async (to, from, next) => {
          if ((!store.getters.userAdmin
              || !store.getters.userAdmin.is_ad)
              && !accesRoute(to.name)) {
            next({ name: from.name });
          } else {
            next();
          }
        },
      },
      {
        path: '/backoffice/que-faisons-nous',
        name: 'back-office-que-faisons-nous',
        component: QueFaisonsNousBackOffice,
      },
      {
        path: '/backoffice/politique-conf',
        name: 'back-office-politique-conf',
        component: PolitiqueEtConf,
        beforeEnter: async (to, from, next) => {
          if ((!store.getters.userAdmin
              || !store.getters.userAdmin.is_ad)
              && !accesRoute(to.name)) {
            next({ name: from.name });
          } else {
            next();
          }
        },
      },
      {
        path: '/backoffice/termes-conditions',
        name: 'back-office-termes-conditions',
        component: TermeEtCondition,
        beforeEnter: async (to, from, next) => {
          if ((!store.getters.userAdmin
              || !store.getters.userAdmin.is_ad)
              && !accesRoute(to.name)) {
            next({ name: from.name });
          } else {
            next();
          }
        },
      },
      {
        path: '/backoffice/liste-chap-guide-trading',
        name: 'back-office-liste-chap-guide-trading',
        component: ListeGuide,
        beforeEnter: async (to, from, next) => {
          if ((!store.getters.userAdmin
              || !store.getters.userAdmin.is_ad)
              && !accesRoute(to.name)) {
            next({ name: from.name });
          } else {
            next();
          }
        },
      },
      {
        path: '/backoffice/add-chap-guide-trading/',
        name: 'back-office-add-chap-guide-trading',
        component: AddChapGuide,
        beforeEnter: async (to, from, next) => {
          if ((!store.getters.userAdmin
              || !store.getters.userAdmin.is_ad)
              && !accesRoute(to.name)) {
            next({ name: from.name });
          } else {
            next();
          }
        },
      },
      {
        path: '/backoffice/modif-chap-guide-trading/:id',
        name: 'back-office-modif-chap-guide-trading',
        component: DetailChapGuide,
        beforeEnter: async (to, from, next) => {
          if ((!store.getters.userAdmin
              || !store.getters.userAdmin.is_ad)
              && !accesRoute(to.name)) {
            next({ name: from.name });
          } else {
            next();
          }
        },
      },
      {
        path: '/backoffice/page-faq',
        name: 'back-office-faq',
        component: FAQ,
        beforeEnter: async (to, from, next) => {
          if ((!store.getters.userAdmin
              || !store.getters.userAdmin.is_ad)
              && !accesRoute(to.name)) {
            next({ name: from.name });
          } else {
            next();
          }
        },
      },
      {
        path: '/backoffice/liste-fromation',
        name: 'back-office-liste-formation',
        component: ListeFormation,
        beforeEnter: async (to, from, next) => {
          if ((!store.getters.userAdmin
              || !store.getters.userAdmin.is_ad)
              && !accesRoute(to.name)) {
            next({ name: from.name });
          } else {
            next();
          }
        },
      },
      {
        path: '/backoffice/ajout-formation',
        name: 'back-office-ajout-formation',
        component: AjouterFormation,
        beforeEnter: async (to, from, next) => {
          if ((!store.getters.userAdmin
              || !store.getters.userAdmin.is_ad)
              && !accesRoute(to.name)) {
            next({ name: from.name });
          } else {
            next();
          }
        },
      },
      {
        path: '/backoffice/modifier-formation/:id',
        name: 'back-office-modifier-formation',
        component: ModifierFormation,
        beforeEnter: async (to, from, next) => {
          if ((!store.getters.userAdmin
              || !store.getters.userAdmin.is_ad)
              && !accesRoute(to.name)) {
            next({ name: from.name });
          } else {
            next();
          }
        },
      },
      {
        path: '/backoffice/liste-modules',
        name: 'back-office-liste-modules',
        component: ListeModules,
        beforeEnter: async (to, from, next) => {
          if ((!store.getters.userAdmin
              || !store.getters.userAdmin.is_ad)
              && !accesRoute(to.name)) {
            next({ name: from.name });
          } else {
            next();
          }
        },
      },
      {
        path: '/backoffice/ajout-module/',
        name: 'back-office-ajout-module',
        component: AjouterModule,
        beforeEnter: async (to, from, next) => {
          if ((!store.getters.userAdmin
              || !store.getters.userAdmin.is_ad)
              && !accesRoute(to.name)) {
            next({ name: from.name });
          } else {
            next();
          }
        },
      },
      {
        path: '/backoffice/modifier-module/:id',
        name: 'back-office-modifier-module',
        component: ModifierModule,
        beforeEnter: async (to, from, next) => {
          if ((!store.getters.userAdmin
              || !store.getters.userAdmin.is_ad)
              && !accesRoute(to.name)) {
            next({ name: from.name });
          } else {
            next();
          }
        },
      },
      {
        path: '/backoffice/liste-chapitres',
        name: 'back-office-liste-chapitres',
        component: ListeChapitres,
        beforeEnter: async (to, from, next) => {
          if ((!store.getters.userAdmin
              || !store.getters.userAdmin.is_ad)
              && !accesRoute(to.name)) {
            next({ name: from.name });
          } else {
            next();
          }
        },
      },
      {
        path: '/backoffice/ajout-chapitre/',
        name: 'back-office-ajout-chapitre',
        component: AjouterChapitre,
        beforeEnter: async (to, from, next) => {
          if ((!store.getters.userAdmin
              || !store.getters.userAdmin.is_ad)
              && !accesRoute(to.name)) {
            next({ name: from.name });
          } else {
            next();
          }
        },
      },
      {
        path: '/backoffice/modifier-chapitre/:id',
        name: 'back-office-modifier-chapitre',
        component: ModifierChapitre,
        beforeEnter: async (to, from, next) => {
          if ((!store.getters.userAdmin
              || !store.getters.userAdmin.is_ad)
              && !accesRoute(to.name)) {
            next({ name: from.name });
          } else {
            next();
          }
        },
      },
      {
        path: '/backoffice/liste-users',
        name: 'back-office-liste-users',
        component: ListeUsers,
        beforeEnter: async (to, from, next) => {
          if ((!store.getters.userAdmin
              || !store.getters.userAdmin.is_ad)
              && !accesRoute(to.name)) {
            next({ name: from.name });
          } else {
            next();
          }
        },
      },
      {
        path: '/backoffice/liste-article',
        name: 'back-office-liste-article',
        component: ListeArtilces,
        beforeEnter: async (to, from, next) => {
          if ((!store.getters.userAdmin
              || !store.getters.userAdmin.is_ad)
              && !accesRoute(to.name)) {
            next({ name: from.name });
          } else {
            next();
          }
        },
      },
      {
        path: '/backoffice/ajout-article',
        name: 'back-office-ajout-article',
        component: AjoutArtilces,
        beforeEnter: async (to, from, next) => {
          if ((!store.getters.userAdmin
              || !store.getters.userAdmin.is_ad)
              && !accesRoute(to.name)) {
            next({ name: from.name });
          } else {
            next();
          }
        },
      },
      {
        path: '/backoffice/modifier-article/:id',
        name: 'back-office-modifier-article',
        component: AjoutArtilces,
        beforeEnter: async (to, from, next) => {
          if ((!store.getters.userAdmin
              || !store.getters.userAdmin.is_ad)
              && !accesRoute(to.name)) {
            next({ name: from.name });
          } else {
            next();
          }
        },
      },
      {
        path: '/backoffice/comment',
        name: 'back-office-comment',
        component: CommentUser,
        beforeEnter: async (to, from, next) => {
          if ((!store.getters.userAdmin
              || !store.getters.userAdmin.is_ad)
              && !accesRoute(to.name)) {
            next({ name: from.name });
          } else {
            next();
          }
        },
      },
    ],
    beforeEnter: async (to, from, next) => {
      if (!store.getters.userAdmin || !store.getters.userAdmin.is_ad) {
        next({ name: 'bfx-home' });
      } else {
        next();
      }
    },
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
        path: 'blog',
        name: 'bfx-blog',
        component: Blog,
      },
      {
        path: 'article/:id',
        name: 'bfx-article',
        component: Article,
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
        path: 'nos-formations',
        name: 'bfx-nos-formations',
        component: NosFormations,
      },
      {
        path: 'formation/:idFormation',
        name: 'bfx-formation',
        component: formation,
        meta: { requiresAuth: true },
      },
      {
        path: 'module/:idModule/',
        name: 'bfx-module',
        component: modules,
        meta: { requiresAuth: true },
      },
      {
        path: 'chapitre/:idChapitre',
        name: 'bfx-chapitre',
        component: chapitre,
        meta: { requiresAuth: true },
        beforeEnter: async (to, from, next) => {
          if (!store.getters.listeSouscript.includes(to.params.idChapitre)) {
            next(from.path);
          } else {
            next();
          }
        },
      },
      {
        path: 'parrainage/:id',
        name: 'bfx-parrainage',
        component: Parrainage,
        beforeEnter: async (to, from, next) => {
          const response = await store.dispatch('isConnect');
          if (response) {
            next({
              path: '/',
            });
          } else {
            next();
          }
        },
      },
      {
        path: 'transaction-response/:id/:idService/:idTypeService',
        name: 'bfx-transaction-response',
        component: ResponseTransaction,
        meta: { requiresAuth: true },
      },
      {
        path: 'en-attente-confirmation',
        name: 'bfx-en-attente-confirmation',
        component: AttentConfirmation,
      },
      {
        path: 'confirmation-inscription/:id',
        name: 'bfx-confirmation-inscription',
        beforeEnter: async (to, from, next) => {
          try {
            await confirmeUser(to.params.id);
            const user = (await get(to.params.id)).data;
            store.dispatch('setUser', user);
            store.dispatch('showSnackMsg', {
              color: 'success',
              msg: 'Votre inscription a été confirmé. Bienvenu',
            });
            next('/');
          } catch (error) {
            store.dispatch('showSnackMsg', {
              color: 'error',
              msg: error.response.data.error,
            });
            next('/');
          }
        },
      },
      {
        path: 'reset-password/:pass/:id',
        name: 'bfx-reset-password',
        component: ResetPassword,
        beforeEnter: async (to, from, next) => {
          const response = await store.dispatch('isConnect');
          if (response) {
            next({
              path: '/',
            });
          } else {
            next();
          }
        },
      },
      {
        path: 'init-reset-password',
        name: 'bfx-init-reset-password',
        component: InitResetPassword,
        beforeEnter: async (to, from, next) => {
          const response = await store.dispatch('isConnect');
          if (response) {
            next({
              path: '/',
            });
          } else {
            next();
          }
        },
      },
    ],
    beforeEnter: async (to, from, next) => {
      store.commit('SET_USER_ADMIN', {});
      next();
    },
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

router.beforeEach(async (to, from, next) => {
  const response = await store.dispatch('isConnect');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!response) {
      next({
        path: '/',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
