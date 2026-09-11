import { useEffect, useState } from "react";
import type { Transaction } from "../types";
import { getTransactions } from "../api/transactions";

export function useFetchTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  async function fetchTransactions() {
    try {
      const transactions = await getTransactions()
      setTransactions(transactions);
    } catch (error) {
      setError('Failed to fetch transactions');
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