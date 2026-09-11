import { useEffect, useState } from "react";
import type { Transaction } from "../types";
import { getTransactions } from "../api/transactions";

const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: '125.50',
    createdDate: 1757509200000,
    currency: 'EUR',
    description: 'Grocery shopping',
    state: 'COMPLETED',
  },
  {
    id: '2',
    amount: '850.00',
    createdDate: 1757422800000,
    currency: 'EUR',
    description: 'Monthly salary',
    state: 'COMPLETED',
  },
  {
    id: '3',
    amount: '45.99',
    createdDate: 1757336400000,
    currency: 'USD',
    description: 'Online subscription',
    state: 'PENDING',
  },
  {
    id: '4',
    amount: '1200.00',
    createdDate: 1757246400000,
    currency: 'EUR',
    description: 'Rent payment',
    state: 'COMPLETED',
  },
  {
    id: '5',
    amount: '75.20',
    createdDate: 1757160000000,
    currency: 'GBP',
    description: 'Restaurant',
    state: 'FAILED',
  },
  {
    id: '6',
    amount: '300.00',
    createdDate: 1757073600000,
    currency: 'EUR',
    description: 'Transfer to savings',
    state: 'PENDING',
  },
];

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