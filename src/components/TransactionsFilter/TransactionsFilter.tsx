import type { TransactionState } from '../../types';

const TRANSACTION_STATES: TransactionState[] = [
  'COMPLETED',
  'PENDING',
  'FAILED',
];

interface TransactionsFilterProps {
  state: TransactionState;
  onChangeState: (value: TransactionState) => void;
}

export function TransactionsFilter({
  state,
  onChangeState,
}: TransactionsFilterProps) {
  return (
    <form>
      <fieldset>
        <legend>Select transaction state</legend>

        {TRANSACTION_STATES.map((transactionState) => (
          <label key={transactionState}>
            <input
              type="radio"
              name="state"
              value={transactionState}
              checked={state === transactionState}
              onChange={() => onChangeState(transactionState)}
            />
            {transactionState}
          </label>
        ))}
      </fieldset>
    </form>
  );
}
