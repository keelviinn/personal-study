type RequestParams = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
};

const BASE_URL = 'https://interview-mock-bank.revolut.com'
const ACCESS_TOKEN = 'fake_token'

export async function fetchClient(endpoint: string, { method = 'GET' }: RequestParams = {}) {
  const url = new URL(endpoint, BASE_URL)

  const response = await fetch(
    url,
    {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': ACCESS_TOKEN,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json();
}