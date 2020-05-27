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
      {
        text: 'Politique et confidentialité',
        to: { name: 'back-office-politique-conf' },
        icon: 'mdi-block-helper',
        disabled: false,
      },
      {
        text: 'Termes et conditions',
        to: { name: 'back-office-termes-conditions' },
        icon: 'mdi-block-helper',
        disabled: false,
      },
    ],
  },
  {
    text: 'Formations',
    icon: 'mdi-school',
    child: [
      {
        text: 'Liste des formations',
        to: { name: 'back-office-liste-formation' },
        icon: 'mdi-format-list-bulleted',
        disabled: false,
      },
      {
        text: 'Liste des modules',
        to: { name: 'back-office-liste-modules' },
        icon: 'mdi-format-list-bulleted',
        disabled: false,
      },
      {
        text: 'Liste des chapitres',
        to: { name: 'back-office-liste-chapitres' },
        icon: 'mdi-format-list-bulleted',
        disabled: false,
      },
    ],
  },
  {
    text: 'Utilisateurs',
    icon: 'mdi-account-multiple',
    child: [
      {
        text: 'Liste des Utilisateurs',
        to: { name: 'back-office-liste-users' },
        icon: 'mdi-account-group',
        disabled: false,
      },
    ],
  },
  {
    text: 'Blog',
    to: { name: 'back-office-liste-article' },
    icon: 'mdi-post',
    disabled: false,
  },
];
