import { type ChangeEvent } from 'react';
import type { TransactionState } from '../../types';

const TRANSACTION_STATES: TransactionState[] = [
  'COMPLETED',
  'PENDING',
  'FAILED',
];

interface TransactionsFilter {
  state: TransactionState;
  onChangeState: (value: TransactionState) => void;
}

export function TransactionsFilter({
  state,
  onChangeState,
}: TransactionsFilter) {
  function handleStateSelect(event: ChangeEvent<HTMLInputElement>) {
    if (!event) {
      return;
    }

    const value = event.target.value as TransactionState;
    onChangeState(value);
  }

  return (
    <form>
      <p>Select your favorite state:</p>

      {TRANSACTION_STATES.map((transactionState) => (
        <label key={transactionState}>
          <input
            type="radio"
            name="state"
            value={transactionState}
            checked={state === transactionState}
            onChange={handleStateSelect}
          />
          {transactionState}
        </label>
      ))}
    </form>
  );
}
