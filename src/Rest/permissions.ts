import type { ICollection, IPermission } from "../specs";
import { httpClient } from "../Store/rest";
import type { SearchParams } from "./common";

export interface CreatePermissionParams {
  user_id: string;
  permission: string;
}

export async function createPermission(params: CreatePermissionParams) {
  return httpClient.put<IPermission>(`/admin/permissions`, params).then((res) => res.data);
}

export async function updatePermission(id: string, params: Partial<CreatePermissionParams>) {
  return httpClient.put<IPermission>(`/admin/permissions/${id}`, params).then((res) => res.data);
}

export interface SearchPermissionsParams extends SearchParams {
  user_id?: string;
}
export async function searchPermissions(params: SearchPermissionsParams) {
  return httpClient.get<ICollection<IPermission>>(`/admin/permissions`, { params }).then((res) => res.data);
}

export async function deletePermission(id: string) {
  return httpClient.delete(`/admin/permissions/${id}`).then((res) => res.data);
}
