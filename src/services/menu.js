export default [
  {
    text: 'Accueil',
    to: { name: 'bfx-home' },
    icon: 'mdi-home',
  },
  {
    text: 'FAQ',
    to: { name: 'bfx-faq' },
    icon: 'mdi-frequently-asked-questions',
  },
  {
    text: 'Guide trading',
    to: { name: 'bfx-guide' },
    icon: 'mdi-book',
  },
  {
    text: 'Que Faisons-nous ?',
    to: { name: 'bfx-faisons' },
    icon: 'mdi-book',
  },
  {
    text: 'Formation',
    icon: 'mdi-book',
    child: [
      {
        text: 'Formation Débutant',
        to: { name: 'bfx-formation', params: { idFormation: 1 } },
        icon: 'mdi-book',
      },
      {
        text: 'Formation Avancée',
        to: { name: 'bfx-formation', params: { idFormation: 2 } },
        icon: 'mdi-book',
      },
      {
        text: 'Formation Professionnelle',
        to: { name: 'bfx-formation', params: { idFormation: 3 } },
        icon: 'mdi-book',
      },
    ],
  },
];
