import axios from "axios";
import { accessTokenAtom, nexusAtom, store } from "./store";

export let httpClient = axios.create();

export function setupHttpClient() {
  const accessToken = store.get(accessTokenAtom);
  const nexus = store.get(nexusAtom);
  httpClient = axios.create({ headers: { Authorization: `Bearer ${accessToken}` }, baseURL: nexus });
}
