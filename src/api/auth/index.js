import HTTP from '../HTTP';

const URL_BASE_CREATE = 'tasks/user/create';
const URL_BASE_LOGIN = 'auth/login';

export async function create(infoUser) {
  const response = await HTTP.post(URL_BASE_CREATE, infoUser);
  return response;
}

export async function login(infoUser) {
  const response = await HTTP.post(URL_BASE_LOGIN, infoUser);
  return response;
}
