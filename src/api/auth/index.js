import HTTP from '../HTTP';

const URL_BASE_CREATE = 'tasks/user/create';
const URL_BASE_LOGIN = 'auth/login';
const URL_BASE_GET = 'tasks/user';

export async function create(infoUser) {
  const response = await HTTP.put(URL_BASE_CREATE, infoUser);
  return response;
}

export async function login(infoUser) {
  const response = await HTTP.put(URL_BASE_LOGIN, infoUser);
  return response;
}

export async function get(id) {
  const response = await HTTP.get(`${URL_BASE_GET}/${id}`);
  return response;
}
