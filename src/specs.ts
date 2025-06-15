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
  registered_at: number;
  updated_at: number;
}

export const UserStatusActive = 1;
export const UserStatusInactive = 2;

export const userStatusColor: { [key: number]: string } = {
  1: "success",
  2: "error",
};
export const userStatusText: { [key: number]: string } = {
  1: "Active",
  2: "Inactive",
};

export interface IProfile {
  id: string;
  username: string;
  registered_at: number;
  updated_at: number;
}

export interface IPermission {
  id: string;
  user_id: string;
  permission: string;
  created_at: number;
  updated_at: number;
}
export interface IPermissionView extends IPermission {
  username: string;
}

export interface IInvitation {
  id: string;
  created_by: string;
  code: string;
  usage_remaining: number;
  expires_at?: number;
  status: number;
  created_at: number;
  updated_at: number;
}

export interface IInvitationView extends IInvitation {
  created_by_username: string;
}

export const transactionStatuses = [
  { value: 1, label: "pending" },
  { value: 2, label: "accepted" },
  { value: 3, label: "rejected" },
];

export const transactionStatusText: { [key: number]: string } = {
  1: "pending",
  2: "accepted",
  3: "rejected",
};

export const transactionStatusColor: { [key: number]: string } = {
  1: "proccessing",
  2: "success",
  3: "error",
};

export const TransactionStatusPending = 1;
export const TransactionStatusAccepted = 2;
export const TransactionStatusRejected = 3;

export interface ITransaction {
  id: string;
  created_at: number;
  updated_at: number;
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

export interface IAccessKey {
  id: string;
  name: string;
  value: string;
  username: string;
  user_id: string;
  created_at: number;
  updated_at: number;
}
