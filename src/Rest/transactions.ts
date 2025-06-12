import type { ICollection, ITransaction, ITransactionView } from "../specs";
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
    .get<ICollection<ITransactionView>>(`/admin/transactions`, { params })
    .then((response) => response.data);
}

export async function updateTransactionStatus(id: string, status: "accept" | "reject") {
  return httpClient.post(`/admin/transactions/${id}/${status}`).then((response) => response.data);
}
