import HTTP from '../HTTP';

export async function sendMail(data) {
  const response = await HTTP.put('tasks/mail/contact', data);
  return response;
}

export async function retourneRien() {
  return 'rien';
}
