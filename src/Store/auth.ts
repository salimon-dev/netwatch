import axios from "axios";
import type { IAuthResponse } from "../specs";
import {
  accessTokenAtom,
  bootstrapStateAtom,
  nexusAtom,
  permissionsAtom,
  profileAtom,
  refreshTokenAtom,
  store,
} from "./store";
import { setupHttpClient } from "./rest";

export function storeAuthResponse(response: IAuthResponse, inLocalStorage = true) {
  store.set(nexusAtom, response.nexus);
  store.set(accessTokenAtom, response.access_token);
  store.set(refreshTokenAtom, response.refresh_token);
  store.set(profileAtom, response.profile);
  store.set(permissionsAtom, response.permissions);

  if (inLocalStorage) {
    localStorage.setItem("nexus", response.nexus);
    localStorage.setItem("access_token", response.access_token);
    localStorage.setItem("refresh_token", response.refresh_token);
    localStorage.setItem("profile", JSON.stringify(response.profile));
    localStorage.setItem("permissions", JSON.stringify(response.permissions));
  }
}

export function loadAuthFromLocalStorage(): IAuthResponse | undefined {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  const profile = localStorage.getItem("profile");
  const permissions = localStorage.getItem("permissions");
  const nexus = localStorage.getItem("nexus");

  if (access_token && refresh_token && profile && permissions && nexus) {
    return {
      nexus,
      access_token,
      refresh_token,
      profile: JSON.parse(profile),
      permissions: JSON.parse(permissions),
    };
  } else {
    return undefined;
  }
}

export async function validateAuthResponse(data: IAuthResponse): Promise<boolean> {
  try {
    await axios
      .get("/auth/profile", {
        headers: { Authorization: "Bearer " + data.access_token },
        baseURL: data.nexus,
      })
      .then((response) => response.data);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function loadAuth() {
  store.set(bootstrapStateAtom, "loading");
  const authData = loadAuthFromLocalStorage();
  if (!authData) {
    store.set(bootstrapStateAtom, "done");
    return;
  }
  const result = await validateAuthResponse(authData);
  if (!result) {
    clearAuth();
    store.set(bootstrapStateAtom, "done");
    return;
  }
  storeAuthResponse(authData);
  setupHttpClient();
  store.set(bootstrapStateAtom, "done");
}

export function clearAuth() {
  store.set(accessTokenAtom, undefined);
  store.set(refreshTokenAtom, undefined);
  store.set(profileAtom, undefined);
  store.set(permissionsAtom, []);
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("profile");
  localStorage.removeItem("permissions");
}
