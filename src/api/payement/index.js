import axios from 'axios';

const CONFIG = {
  baseURL: 'https://backend.wfxschool.com/payment/api',
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
  },
};
const HTTP = axios.create(CONFIG);

export async function initPayement(id, info) {
  const response = await HTTP.put(`transaction/${id}`, info);
  return response;
}

export default HTTP;
