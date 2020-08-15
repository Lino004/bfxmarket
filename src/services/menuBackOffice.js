import { accesRoute } from '@/configuration/user';


export default function getMenu() {
  return [
    {
      text: 'Reglage Page d\'accueil',
      to: { name: 'back-office-config-home' },
      icon: 'mdi-home-outline',
      disabled: false,
      show: accesRoute('back-office-config-home'),
    },
    {
      text: 'Page',
      icon: 'mdi-book-open-page-variant',
      show: accesRoute('page'),
      child: [
        {
          text: 'Que faisons nous?',
          to: { name: 'back-office-que-faisons-nous' },
          icon: 'mdi-information-outline',
          disabled: false,
          show: accesRoute('back-office-que-faisons-nous'),
        },
        {
          text: 'Guide de trading',
          to: { name: 'back-office-liste-chap-guide-trading' },
          icon: 'mdi-book-open-page-variant',
          disabled: false,
          show: accesRoute('back-office-liste-chap-guide-trading'),
        },
        {
          text: 'FAQ',
          to: { name: 'back-office-faq' },
          icon: 'mdi-help-circle-outline',
          disabled: false,
          show: accesRoute('back-office-faq'),
        },
        {
          text: 'Politique et confidentialité',
          to: { name: 'back-office-politique-conf' },
          icon: 'mdi-block-helper',
          disabled: false,
          show: accesRoute('back-office-politique-conf'),
        },
        {
          text: 'Termes et conditions',
          to: { name: 'back-office-termes-conditions' },
          icon: 'mdi-block-helper',
          disabled: false,
          show: accesRoute('back-office-termes-conditions'),
        },
      ],
    },
    {
      text: 'Formations',
      icon: 'mdi-school',
      show: accesRoute('formations'),
      child: [
        {
          text: 'Liste des services',
          to: { name: 'back-office-liste-formation' },
          icon: 'mdi-format-list-bulleted',
          disabled: false,
          show: false, // accesRoute('back-office-liste-formation'),
        },
        {
          text: 'Liste des formations',
          to: { name: 'back-office-liste-modules' },
          icon: 'mdi-format-list-bulleted',
          disabled: false,
          show: accesRoute('back-office-liste-modules'),
        },
        {
          text: 'Liste des chapitres',
          to: { name: 'back-office-liste-chapitres' },
          icon: 'mdi-format-list-bulleted',
          disabled: false,
          show: accesRoute('back-office-liste-chapitres'),
        },
      ],
    },
    {
      text: 'Liste des Utilisateurs',
      to: { name: 'back-office-liste-users' },
      icon: 'mdi-account-group',
      disabled: false,
      show: accesRoute('back-office-liste-users'),
    },
    {
      text: 'Blog',
      to: { name: 'back-office-liste-article' },
      icon: 'mdi-post',
      disabled: false,
      show: accesRoute('back-office-liste-article'),
    },
    {
      text: 'Témoignage',
      to: { name: 'back-office-comment' },
      icon: 'mdi-comment-text',
      disabled: false,
      show: accesRoute('back-office-comment'),
    },
  ];
}
