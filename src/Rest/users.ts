import type { IUser } from "../specs";
import { httpClient } from "../Store/rest";

export interface UserCreateParams {
  username: string;
  password: string;
  base_url: string;
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
