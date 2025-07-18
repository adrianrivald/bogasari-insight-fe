import { API_URL } from "../../../constants";
import Cookies from "js-cookie";

const STORAGE_KEY = "session";
const USER_KEY = "user_info";

export interface User {
  email: string;
  id: number;
  role: string;
}

export function getSession() {
  return Cookies.get(STORAGE_KEY);
}

export function getUser() {
  return window.localStorage.getItem(USER_KEY);
}

export function setSession(newSession: string, expires?: string, user?: User) {
  Cookies.set(STORAGE_KEY, newSession, {
    expires: new Date(expires ?? ""),
  });
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function flushStorage() {
  Cookies.remove(STORAGE_KEY);
  window.localStorage.removeItem(USER_KEY);
}

export async function flushSession() {
  // use `fetch` instead of `http` from `utils` to prevent circular dependency
  // await window.fetch(`${API_URL}/logout`, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     Authorization: `Bearer ${getSession()}`,
  //   },
  // });

  flushStorage();
}
