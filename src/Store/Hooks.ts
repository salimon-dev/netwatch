import { useAtomValue } from "jotai";
import { accessTokenAtom, permissionsAtom } from "./store";
import { useContext } from "react";
import { NotificationContext } from "../Components/Notification";

export function useAccessToken() {
  const accessToken = useAtomValue(accessTokenAtom);
  return accessToken;
}

export function useIsLoggedIn() {
  const accessToken = useAccessToken();
  return !!accessToken;
}

export function usePermissions() {
  const permissions = useAtomValue(permissionsAtom);
  return permissions;
}

export function useHasPermission(permissions: string[]) {
  const userPermissions = usePermissions();
  return userPermissions.some((userPermission) => {
    if (userPermission.permission === "keymaker") return true;
    return permissions.includes(userPermission.permission);
  });
}

export function useNotification() {
  const { api } = useContext(NotificationContext);
  return api;
}
