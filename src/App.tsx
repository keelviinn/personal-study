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

function formatSecToDate(sec: number): string {
  return new Date(sec).toLocaleString('en-GB', { timeZone: 'UTC' });
}

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await fetch(
          'https://interview-mock-bank.revolut.com/api/transactions',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (!res.ok) {
          console.log('error loading transactions');
        }

        setTransactions(await res.json());
      } catch (error) {
        console.log('Network error');
      }
    }

    fetchTransactions();
  }, []);

  return (
    <div className="app">
      <h1>Personal Study</h1>
      <p>Frontend interview preparation.</p>

      {transactions.length > 0 ? (
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
                    }).format(Number(t.amount))}
                  </p>
                  <p>{formatSecToDate(t.createdDate)}</p>
                  <p>{t.state}</p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <span>No transactions found!</span>
      )}
    </div>
  );
}

export default App;
