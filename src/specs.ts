export interface IAuthResponse {
  access_token: string;
  refresh_token: string;
  profile: IProfile;
  permissions: IPermission[];
  nexus: string;
}

export interface ICollection<T> {
  data: T[];
  page: number;
  page_size: number;
  total: number;
}

export interface IUser {
  id: string;
  username: string;
  password: string;
  base_url: string;
  description: string;
  is_public: boolean;
  score: number;
  credit: number;
  invitation_id?: string;
  status: number;
  registered_at: string;
  updated_at: string;
}

export interface IProfile {
  id: string;
  username: string;
  registered_at: string;
  updated_at: string;
}

export interface IPermission {
  id: string;
  user_id: string;
  permission: string;
  created_at: string;
  updated_at: string;
}

export interface IInvitation {
  id: string;
  created_by: string;
  code: string;
  usage_remaining: number;
  expires_at?: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface IInvitationView extends IInvitation {
  created_by_username: string;
}

export interface ITransaction {
  id: string;
  created_at: string;
  updated_at: string;
  amount: number;
  fee: number;
  status: number;
  source_id: number;
  target_id: number;
  category: string;
  description: string;
}

export interface ITransactionView extends ITransaction {
  source_username: string;
  target_username: string;
}
