export type TransactionState = 'COMPLETED' | 'PENDING' | 'FAILED';

export type Transaction = {
  id: string;
  amount: string;
  createdDate: number;
  currency: string;
  description: string;
  state: TransactionState;
};