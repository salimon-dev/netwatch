import { useAtomValue } from "jotai";
import { accessTokenAtom } from "./store";

export function useAccessToken() {
  const accessToken = useAtomValue(accessTokenAtom);
  return accessToken;
}

export function useIsLoggedIn() {
  const accessToken = useAccessToken();
  return !!accessToken;
}
