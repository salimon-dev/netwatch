import type { IAccessKey, ICollection } from "../specs";
import { httpClient } from "../Store/rest";
import type { SearchParams } from "./common";

export interface CreateAccessKeyParams {
  name: string;
  user_id: string;
}

export async function createAccessKey(params: CreateAccessKeyParams) {
  return httpClient.put<IAccessKey>("/admin/access-keys", params).then((response) => response.data);
}

export async function deleteAccessKey(id: string) {
  return httpClient.delete(`/admin/access-keys/${id}`).then((response) => response.data);
}
export async function regenerateAccessKey(id: string) {
  return httpClient.post(`/admin/access-keys/regenerate/${id}`).then((response) => response.data);
}

export interface SearchAccessKeyParams extends SearchParams {
  user_id?: string;
  name?: string;
  created_before?: string;
  created_after?: string;
  updated_before?: string;
  updated_after?: string;
}

export async function searchAccessKeys(params: SearchAccessKeyParams) {
  return httpClient
    .get<ICollection<IAccessKey>>(`/admin/access-keys`, { params })
    .then((response) => response.data);
}
