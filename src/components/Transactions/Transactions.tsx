import { useState } from 'react';
import { useFetchTransactions } from '../../hooks/useFetchTransactions';
import type { TransactionState } from '../../types';
import { TransactionsFilter } from '../TransactionsFilter/TransactionsFilter';

function formatMillisecToDate(value: number): string {
  return new Date(value).toLocaleString('en-GB', { timeZone: 'UTC' });
}

export function Transactions() {
  const { transactions, isLoading, error } = useFetchTransactions();

  const [state, setState] = useState<TransactionState>('COMPLETED');
  const filteredTransactions = transactions.filter(
    (transaction) => transaction.state === state,
  );

  return (
    <div>
      <TransactionsFilter onChangeState={setState} state={state} />

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
