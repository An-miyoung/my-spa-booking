import { LoginData } from "../../../types";

const USER_LOCALSTORAGE_KEY = "my-booking";

export const getStoredLoginData = (): LoginData | null => {
  const storedLoginData = localStorage.getItem(USER_LOCALSTORAGE_KEY);
  if (!storedLoginData) return null;
  return JSON.parse(storedLoginData);
};

export const setStoredLoginData = (logindata: LoginData): void => {
  localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(logindata));
};

export const clearStoredLoginData = (): void => {
  localStorage.removeItem(USER_LOCALSTORAGE_KEY);
};
