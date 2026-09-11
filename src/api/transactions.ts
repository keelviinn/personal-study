import { fetchClient } from "./clint";

export function getTransactions() {
  return fetchClient({ endpoint: '/api/transactions' })
}