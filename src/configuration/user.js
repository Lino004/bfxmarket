import store from '@/store/index';

export const ADMIN = 'ADMIN_PRINCIPAL';
export const FORMA = 'FORMATEUR';
export const MARK = 'MARKETEUR';
export const DEV = 'DEVELOPPEUR';
export const PART = 'PARTENAIRE';

export const LISTE = [
  { libelle: 'Administrateur', role: ADMIN },
  { libelle: 'Formateur', role: FORMA },
  { libelle: 'Marketeur', role: MARK },
  { libelle: 'Partenaire', role: PART },
  { libelle: 'Developpeur', role: DEV },
];

export function accesRoute(routeName) {
  if (!store.getters.userAdmin) return false;
  if ([ADMIN, DEV, MARK].includes(store.getters.userAdmin.role)) return true;
  if (store.getters.userAdmin.role === FORMA) {
    return [
      'formations',
      'back-office-comment',
      'back-office-liste-users',
      'back-office-liste-formation',
      'back-office-liste-modules',
      'back-office-liste-chapitres',
    ].includes(routeName);
  }
  if (store.getters.userAdmin.role === PART) {
    return [].includes(routeName);
  }
  return false;
}

export function accesActions(actionName) {
  if (!store.getters.userAdmin) return false;
  if ([ADMIN, DEV].includes(store.getters.userAdmin.role)) return true;
  if ([MARK].includes(store.getters.userAdmin.role)) {
    return [
      'm_info_contact',
      'envoi_email',
    ].includes(actionName);
  }
  if ([FORMA].includes(store.getters.userAdmin.role)) {
    return [
      'envoi_email',
    ].includes(actionName);
  }
  if ([PART].includes(store.getters.userAdmin.role)) {
    return [].includes(actionName);
  }
  return false;
}
