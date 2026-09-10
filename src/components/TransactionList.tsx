import { useState, useEffect } from 'react';
import { fetchTransactions, type Transaction } from '../transactions';

export function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(false);

      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <h1>TransactionList</h1>

      {isLoading && <span>Loading transactions...</span>}

      {!isLoading && error && (
        <span role="alert">
          We encountered an error fetching the transactions
        </span>
      )}

      {!isLoading && !error && transactions.length > 0 && (
        <ul>
          {transactions.map((t) => {
            return (
              <li key={`${t.id}`} style={{ listStyle: 'none' }}>
                <p>{t.description}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
