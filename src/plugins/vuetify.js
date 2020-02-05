import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import fr from 'vuetify/es5/locale/fr';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#268dfb',
        secondary: '#2f5731',
      },
    },
  },
  lang: {
    locales: { fr },
    current: 'fr',
  },
  icons: {
    iconfont: 'mdi',
  },
});
