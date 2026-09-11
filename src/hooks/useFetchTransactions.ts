import { useEffect, useState } from "react";
import type { Transaction } from "../types";
import { getTransactions } from "../api/transactions";
import { mockTransactions } from "../mock/transactions";

export function useFetchTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  async function fetchTransactions() {
    try {
      // const res = await getTransactions()
      await new Promise(resolve => setTimeout(resolve, 1000))
      setTransactions(mockTransactions);
      // setTransactions(await res);
    } catch (error) {
      console.log('Network error');
      setError(`Network error`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    isLoading,
    error,
  }
}