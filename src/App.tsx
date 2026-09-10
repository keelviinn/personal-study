import { useEffect, useState } from 'react';
import './App.css';

type Transaction = {
  id: string;
  amount: number;
  createdDate: number;
  currency: string;
  description: string;
  state: string;
};

function formatMillisecToDate(value: number): string {
  return new Date(value).toLocaleString('en-GB', { timeZone: 'UTC' });
}

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

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

        if (!res.ok) {
          console.log('error loading transactions');
          setError(`error loading transactions: ${res.status}`);
          return;
        }

        setTransactions(await res.json());
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
      ) : !transactions.length ? (
        <span>No transactions found!</span>
      ) : (
        <ul>
          {transactions.map((t) => {
            return (
              <li key={t.id}>
                <div>
                  <p>{t.description}</p>
                  <p>
                    {Intl.NumberFormat('en-GB', {
                      style: 'currency',
                      currency: t.currency,
                    }).format(t.amount)}
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
