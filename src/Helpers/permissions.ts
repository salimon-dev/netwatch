import type { TreeDataNode } from "antd";
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

export function showAccessKeysMenu(permissions: IPermission[]) {
  const validPermissions = ["access-keys:full", "access-keys:search", "keymaker"];
  return permissions.some((item) => {
    return validPermissions.includes(item.permission);
  });
}

export const permissionsTree: TreeDataNode[] = [
  {
    title: "users:full",
    key: "users:full",
    children: [
      {
        title: "users:create",
        key: "users:create",
      },
      {
        title: "users:update",
        key: "users:update",
      },
      {
        title: "users:delete",
        key: "users:delete",
      },
      {
        title: "users:get",
        key: "users:get",
      },
      {
        title: "users:search",
        key: "users:search",
      },
    ],
  },
  {
    title: "invitations:full",
    key: "invitations:full",
    children: [
      {
        title: "invitations:create",
        key: "invitations:create",
      },
      {
        title: "invitations:update",
        key: "invitations:update",
      },
      {
        title: "invitations:delete",
        key: "invitations:delete",
      },
      {
        title: "invitations:get",
        key: "invitations:get",
      },
      {
        title: "invitations:search",
        key: "invitations:search",
      },
    ],
  },
  {
    title: "transactions:full",
    key: "transactions:full",
    children: [
      {
        title: "transactions:create",
        key: "transactions:create",
      },
      {
        title: "transactions:update",
        key: "transactions:update",
      },
      {
        title: "transactions:delete",
        key: "transactions:delete",
      },
      {
        title: "transactions:get",
        key: "transactions:get",
      },
      {
        title: "transactions:search",
        key: "transactions:search",
      },
    ],
  },
  {
    title: "permissions:full",
    key: "permissions:full",
    children: [
      {
        title: "permissions:create",
        key: "permissions:create",
      },
      {
        title: "permissions:update",
        key: "permissions:update",
      },
      {
        title: "permissions:delete",
        key: "permissions:delete",
      },
      {
        title: "permissions:get",
        key: "permissions:get",
      },
      {
        title: "permissions:search",
        key: "permissions:search",
      },
    ],
  },
];
