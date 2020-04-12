import HTTP from '../HTTP';

export async function createFormation(info) {
  const response = await HTTP.post('tasks/formation/create', info);
  return response;
}

export async function listeFormation() {
  const response = await HTTP.get('tasks/formation/list');
  return response;
}

export async function deleteFormation(id) {
  const response = await HTTP.delete(`tasks/formation/delete/${id}`);
  return response;
}

export async function updateFormation(id, data) {
  const response = await HTTP.put(`tasks/formation/update/${id}`, data);
  return response;
}

export async function getFormation(id) {
  const response = await HTTP.get(`tasks/formation/${id}`);
  return response;
}
