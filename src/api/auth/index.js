import HTTP from '../HTTP';

const URL_BASE_CREATE = 'tasks/user/create';
const URL_BASE_LOGIN = 'auth/login';
const URL_BASE_LOGOUT = 'auth/logout';
const URL_BASE_GET = 'tasks/user';
const URL_BASE_PARRAINAGE = 'tasks/user/addDownline';
const URL_BASE_GET_SOUSCRIPT = 'tasks/user/souscript';
const URL_BASE_SOUSCRIPT = 'tasks/chapitre/subscribe';
const URL_BASE_SOUSCRIPT_ADMIN = 'tasks/chapitre/admin/subscribe';
const URL_BASE_CONFIRM_USER = 'tasks/user/confirm';
const URL_BASE_LISTE_USER = 'tasks/user/list';
const URL_BASE_ARCHIVE_USER = 'tasks/user/archive';
const URL_BASE_RESET_PASSWORD_INIT = 'auth/reset/password/init';
const URL_BASE_RESET_PASSWORD = 'auth/reset/password';

export async function create(infoUser) {
  const response = await HTTP.put(URL_BASE_CREATE, infoUser);
  return response;
}

export async function createByParraine(id, infoUser) {
  const response = await HTTP.put(`${URL_BASE_CREATE}/${id}`, infoUser);
  return response;
}

export async function login(infoUser) {
  const response = await HTTP.put(URL_BASE_LOGIN, infoUser);
  return response;
}

export async function logout(id) {
  const response = await HTTP.put(`${URL_BASE_LOGOUT}/${id}`);
  return response;
}

export async function get(id) {
  const response = await HTTP.get(`${URL_BASE_GET}/${id}`);
  return response;
}

export async function getListUser(id) {
  const response = await HTTP.get(`${URL_BASE_LISTE_USER}/${id}`);
  return response;
}

export async function confirmeUser(id) {
  const response = await HTTP.get(`${URL_BASE_CONFIRM_USER}/${id}`);
  return response;
}

export async function getSouscript(id) {
  const response = await HTTP.get(`${URL_BASE_GET_SOUSCRIPT}/${id}`);
  return response;
}

export async function souscript(data) {
  const response = await HTTP.put(URL_BASE_SOUSCRIPT, data);
  return response;
}

export async function souscriptAdmin(data) {
  const response = await HTTP.put(URL_BASE_SOUSCRIPT_ADMIN, data);
  return response;
}

export async function addDownline(id) {
  const response = await HTTP.put(`${URL_BASE_PARRAINAGE}/${id}`);
  return response;
}

export async function archiveUser(id, data) {
  const response = await HTTP.put(`${URL_BASE_ARCHIVE_USER}/${id}`, data);
  return response;
}

export async function initResetPassword(data) {
  const response = await HTTP.put(`${URL_BASE_RESET_PASSWORD_INIT}`, data);
  return response;
}


export async function resetPassword(data) {
  const response = await HTTP.put(`${URL_BASE_RESET_PASSWORD}`, data);
  return response;
}
