import type { IPermission } from "../specs";

export function showUsersMenu(permissions: IPermission[]) {
  const validPermissions = ["users:full", "users:search", "keymaker"];
  return permissions.some((item) => {
    return validPermissions.includes(item.permission);
  });
}
export function showInvitationsMenu(permissions: IPermission[]) {
  const validPermissions = ["invitations:full", "invitations:search", "keymaker"];
  return permissions.some((item) => {
    return validPermissions.includes(item.permission);
  });
}

export function showTransactionsMenu(permissions: IPermission[]) {
  const validPermissions = ["transactions:full", "transactions:search", "keymaker"];
  return permissions.some((item) => {
    return validPermissions.includes(item.permission);
  });
}

export function showPermissionsMenu(permissions: IPermission[]) {
  const validPermissions = ["permissions:full", "permissions:search", "keymaker"];
  return permissions.some((item) => {
    return validPermissions.includes(item.permission);
  });
}
