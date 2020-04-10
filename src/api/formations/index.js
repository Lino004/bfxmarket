import HTTP from '../HTTP';

// eslint-disable-next-line import/prefer-default-export
export async function createFormation(info) {
  const response = await HTTP.post('tasks/formation/create', info);
  return response;
}
