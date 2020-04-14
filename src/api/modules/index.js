import HTTP from '../HTTP';

export async function createModule(info) {
  const response = await HTTP.post('tasks/module/create', info);
  return response;
}

export async function listeModule() {
  const response = await HTTP.get('tasks/module/list');
  return response;
}

export async function listeModuleByFormation(id) {
  const response = await HTTP.get(`tasks/module/list/${id}`);
  return response;
}

export async function deleteModule(id) {
  const response = await HTTP.delete(`tasks/module/delete/${id}`);
  return response;
}

export async function updateModule(id, data) {
  const response = await HTTP.put(`tasks/module/update/${id}`, data);
  return response;
}

export async function getModule(id) {
  const response = await HTTP.get(`tasks/module/${id}`);
  return response;
}
