import type { ICollection, IUser } from "../specs";
import { httpClient } from "../Store/rest";
import type { SearchParams } from "./common";

export interface UserCreateParams {
  username: string;
  password: string;
  hook_url: string;
  description: string;
  is_public: boolean;
  credit: number;
  score: number;
  invitation_code?: string;
  status: number;
}

export async function createUser(params: UserCreateParams) {
  return httpClient.put<IUser>("/admin/users", params).then((response) => response.data);
}

export async function updateUser(id: string, params: Partial<UserCreateParams>) {
  return httpClient.put<IUser>(`/admin/users/${id}`, params).then((response) => response.data);
}

export interface UsersSearchParams extends SearchParams {
  username?: string;
}

export async function searchUsers(params: UsersSearchParams) {
  return httpClient.get<ICollection<IUser>>("/admin/users", { params }).then((response) => response.data);
}

export async function deleteUser(id: string) {
  return httpClient.delete(`/admin/users/${id}`).then((response) => response.data);
}
