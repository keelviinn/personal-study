import axios from 'axios';

const axiosInstace = axios.create({
  baseURL: 'https://interview-mock-bank.revolut.com/api',
  headers: {
    Accept: 'application/json',
  },
});



export async function getCurrentUser(): Promise<User | Error> {
  const tokenFromCookie =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA1ZDg4MDlmLTA2Y2YtNDAyNS1hM2I5LTViNjFiMzcxZGQzMiIsImNyZWF0ZWREYXRlIjoxNzU5NzYzMDEwNDg0LCJmaXJzdE5hbWUiOiJJc2FiZWwiLCJsYXN0TmFtZSI6IkZsb3dlcnMiLCJzdGF0ZSI6IkFDVElWRSIsImliYW4iOiJHQjAwQkFSQzI3NTMxODUzNTk4NzY1IiwiYmFua05hbWUiOiJSZXZvbHV0Iiwic29ydENvZGUiOiJTb3J0IENvZGUiLCJhY2NvdW50TnVtYmVyIjoiNDI1MTU2MDkiLCJhZGRyZXNzIjoiOTM0NyBUaGUgR3JvdmUsIExvbmRvbiwgWU80NiA0VFAiLCJjdXJyZW5jeSI6IkdCUCIsImlhdCI6MTc1OTc2MzAxMCwiZXhwIjoxNzYwOTcyNjEwfQ.UQ5yO_0dxXzedZviiGTnxqLXtmzqMVc3OSykRDY4vKY';

  return await axiosInstace
    .get<User | Error>('/api/user', {
      headers: {
        'x-access-token': tokenFromCookie,
      },
    })
    .then((user) => user)
    .catch((error) => {
      console.log(error);
      // Sentry handler
      throw Error('Error loading the user');
    });
}
