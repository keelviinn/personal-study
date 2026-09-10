import { useEffect, useMemo, useState } from 'react';
import './App.css';

type TransactionState = 'COMPLETED' | 'PENDING' | 'FAILED';

type Transaction = {
  id: string;
  amount: string;
  createdDate: number;
  currency: string;
  description: string;
  state: TransactionState;
};

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

function formatMillisecToDate(value: number): string {
  return new Date(value).toLocaleString('en-GB', { timeZone: 'UTC' });
}

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [state] = useState<TransactionState>('COMPLETED');

  const filteredTransactions = useMemo(() => {
    if (transactions.length > 0) {
      return transactions.filter((t) => t.state === state);
    }

    return [];
  }, [state, transactions]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await fetch(
          'https://interview-mock-bank.revolut.com/api/transactions',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': 'token-here',
            },
          },
        );

        if (!res.ok && !mockTransactions) {
          console.log('error loading transactions');
          setError(`error loading transactions: ${res.status}`);
          return;
        }

        setTransactions(mockTransactions);
        // setTransactions(await res.json());
      } catch (error) {
        console.log('Network error');
        setError(`Network error`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  return (
    <div className="app">
      <h1>Personal Study</h1>
      <p>Frontend interview preparation.</p>

      {isLoading ? (
        <span>Loading transactions...</span>
      ) : !isLoading && error ? (
        <span>{error}</span>
      ) : !filteredTransactions.length ? (
        <span>No transactions found!</span>
      ) : (
        <ul>
          {filteredTransactions.map((t) => {
            return (
              <li key={t.id}>
                <div>
                  <p>{t.description}</p>
                  <p>
                    {Intl.NumberFormat('en-GB', {
                      style: 'currency',
                      currency: t.currency,
                    }).format(Number(t.amount))}
                  </p>
                  <p>{formatMillisecToDate(t.createdDate)}</p>
                  <p>{t.state}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
