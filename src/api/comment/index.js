import HTTP from '../HTTP';

export async function createComment(info) {
  const response = await HTTP.put('tasks/comment/create', info);
  return response;
}

export async function listeComment() {
  const response = await HTTP.get('tasks/comment/list');
  return response;
}

export async function deleteComment(id) {
  const response = await HTTP.delete(`tasks/comment/delete/${id}`);
  return response;
}

export async function getComment(id) {
  const response = await HTTP.get(`tasks/comment/${id}`);
  return response;
}
