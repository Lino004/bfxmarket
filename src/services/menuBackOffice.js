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
      {
        text: 'Guide de trading',
        to: { name: 'back-office-liste-chap-guide-trading' },
        icon: 'mdi-book-open-page-variant',
        disabled: false,
      },
      {
        text: 'FAQ',
        to: { name: 'back-office-faq' },
        icon: 'mdi-help-circle-outline',
        disabled: false,
      },
    ],
  },
];
