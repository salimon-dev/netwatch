import type { IInvitation, ICollection, IInvitationView } from "../specs";
import { httpClient } from "../Store/rest";
import type { SearchParams } from "./common";

export interface InvitationSearchParams extends SearchParams {
  code?: string;
}
export async function searchInvitations(params: InvitationSearchParams) {
  return await httpClient
    .get<ICollection<IInvitationView>>("/admin/invitations/search", { params })
    .then((response) => response.data);
}

export interface CreateInvitationParams {
  code: string;
  usage_remaining: number;
  expires_at?: string;
  status: number;
}
export async function createInvitation(params: CreateInvitationParams) {
  return await httpClient.put<IInvitation>("/admin/invitations", params).then((response) => response.data);
}

export async function updateInvitation(id: string, params: Partial<CreateInvitationParams>) {
  return await httpClient
    .put<IInvitation>(`/admin/invitations/${id}`, params)
    .then((response) => response.data);
}
