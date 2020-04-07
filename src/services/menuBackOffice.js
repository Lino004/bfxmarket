export default [
  {
    text: 'Reglage Page d\'accueil',
    to: { name: 'back-office-config-home' },
    icon: 'mdi-home-outline',
    disabled: false,
  },
  {
    text: 'Page',
    icon: 'mdi-book-open-page-variant',
    child: [
      {
        text: 'Que faisons nous?',
        to: { name: 'back-office-que-faisons-nous' },
        icon: 'mdi-information-outline',
        disabled: false,
      },
    ],
  },
];
