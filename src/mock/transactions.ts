import type { Transaction } from "../types";

export const mockTransactions: Transaction[] = [
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