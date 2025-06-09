import type { ICollection, ITransaction } from "../specs";
import { httpClient } from "../Store/rest";
import type { SearchParams } from "./common";

export interface CreateTransactionParams {
  source_id: string;
  target_id: string;
  amount: number;
  description: string;
  status: number;
  category: string;
}

export async function createTransaction(params: CreateTransactionParams) {
  return httpClient.put<ITransaction>("/admin/transactions", params).then((response) => response.data);
}

export async function updateTransaction(id: string, params: Partial<CreateTransactionParams>) {
  return httpClient.put<ITransaction>(`/admin/transactions/${id}`, params).then((response) => response.data);
}

export async function deleteTransaction(id: string) {
  return httpClient.delete(`/admin/transactions/${id}`).then((response) => response.data);
}

export interface SearchTransactionParams extends SearchParams {
  source_id?: string;
  target_id?: string;
  status?: number;
  category?: string;
  description?: string;
  min_amount?: number;
  max_amount?: number;
  placed_before?: string;
  placed_after?: string;
  updated_before?: string;
  updated_after?: string;
}

export async function searchTransactions(params: SearchTransactionParams) {
  return httpClient
    .get<ICollection<ITransaction>>(`/admin/transactions`, { params })
    .then((response) => response.data);
}
