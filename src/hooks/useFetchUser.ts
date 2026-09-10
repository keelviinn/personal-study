import { useEffect, useState } from 'react';
import { getCurrentUser } from '../api/user';

export function useFetchUser() {
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{ message: string } | undefined>(
    undefined
  );

  async function fetchUserData() {
    try {
      const res = await getCurrentUser();
      if (!res.ok) {
        setError({ message: res.error });
        return;
      }
      setUser(res.data);
    } finally {
      setIsLoading(false);
    }
  }

  // Fetch user on page load
  useEffect(() => {
    if (user) {
      return;
    }

    fetchUserData();
  }, [user]);

  return {
    user,
    isLoading,
    error,
  };
}
