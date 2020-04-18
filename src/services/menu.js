export default [
  {
    text: 'Accueil',
    to: { name: 'bfx-home' },
    icon: 'mdi-home-outline',
    disabled: false,
  },
  {
    text: 'FAQ',
    to: { name: 'bfx-faq' },
    icon: 'mdi-help-circle-outline',
    disabled: false,
  },
  {
    text: 'Guide trading',
    to: { name: 'bfx-guide' },
    icon: 'mdi-book',
    disabled: false,
  },
  {
    text: 'Que Faisons-nous ?',
    to: { name: 'bfx-faisons' },
    icon: 'mdi-information-outline',
    disabled: false,
  },
  /* {
    text: 'Formation',
    icon: 'mdi-book',
    child: [
      {
        text: 'Formation Débutant',
        to: { name: 'bfx-formation', params: { idFormation: 1 } },
        icon: 'mdi-book',
        disabled: false,
      },
      {
        text: 'Formation Avancée',
        to: { name: 'bfx-formation', params: { idFormation: 2 } },
        icon: 'mdi-book',
        disabled: true,
      },
      {
        text: 'Formation Professionnelle',
        to: { name: 'bfx-formation', params: { idFormation: 3 } },
        icon: 'mdi-book',
        disabled: true,
      },
    ],
  }, */
];
