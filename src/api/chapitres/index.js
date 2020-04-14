import HTTP from '../HTTP';

export async function createChapitre(info) {
  const response = await HTTP.post('tasks/chapitre/create', info);
  return response;
}

export async function listeChapitre() {
  const response = await HTTP.get('tasks/chapitre/list');
  return response;
}

export async function deleteChapitre(id) {
  const response = await HTTP.delete(`tasks/chapitre/delete/${id}`);
  return response;
}

export async function updateChapitre(id, data) {
  const response = await HTTP.put(`tasks/chapitre/update/${id}`, data);
  return response;
}

export async function getChapitre(id) {
  const response = await HTTP.get(`tasks/chapitre/${id}`);
  return response;
}
