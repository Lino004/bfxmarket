import HTTP from '../HTTP';

export async function createTransaction(info) {
  const response = await HTTP.put('tasks/transaction/create', info);
  return response;
}

export async function updateStatusTransaction(id, status) {
  const response = await HTTP.put(`tasks/transaction/update/satus/${id}/${status}`);
  return response;
}
