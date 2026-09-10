export type Result<T> = { ok: true; data: T } | { ok: false; error: string };

export async function getCurrentUser(): Promise<Result<User>> {
  const url = 'https://example.org/products.json';
  const token = 'token';

  try {
    const res = await fetch(url, {
      headers: {
        'x-access-token': token,
      },
    });
    if (!res.ok) {
      return { ok: false, error: `HTTP ${res.status}` };
    }

    return {
      ok: true,
      data: await res.json(),
    };
  } catch {
    return { ok: false, error: 'Network connection' };
  }
}
