import type { Transaction } from "../types";
import { fetchClient } from "./client";

export function getTransactions(): Promise<Transaction[]> {
  return fetchClient('/api/transactions')
}