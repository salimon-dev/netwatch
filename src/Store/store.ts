import { atom, createStore } from "jotai";

export const store = createStore();

export const accessTokenAtom = atom<string | undefined>(undefined);
export const refreshTokenAtom = atom<string | undefined>(undefined);
