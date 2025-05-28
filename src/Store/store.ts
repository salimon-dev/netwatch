import { atom, createStore } from "jotai";
import type { IPermission, IProfile } from "../specs";

export const store = createStore();

export const bootstrapStateAtom = atom<"init" | "loading" | "done">("init");

export const nexusAtom = atom<string>("");
export const accessTokenAtom = atom<string | undefined>(undefined);
export const refreshTokenAtom = atom<string | undefined>(undefined);
export const profileAtom = atom<IProfile | undefined>(undefined);
export const permissionsAtom = atom<IPermission[]>([]);
