import HTTP from '../HTTP';

export async function createArticle(info) {
  const response = await HTTP.put('tasks/blog/create', info);
  return response;
}

export async function listeArticle() {
  const response = await HTTP.get('tasks/blog/list');
  return response;
}

export async function deleteArticle(id) {
  const response = await HTTP.delete(`tasks/blog/delete/${id}`);
  return response;
}

export async function updateArticle(id, data) {
  const response = await HTTP.put(`tasks/blog/update/${id}`, data);
  return response;
}

export async function getArticle(id) {
  const response = await HTTP.get(`tasks/blog/${id}`);
  return response;
}
