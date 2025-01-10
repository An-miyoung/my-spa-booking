import { createContext, PropsWithChildren, useState } from "react";
import { getStoredLoginData, setStoredLoginData } from "../local-storage";
import { AuthContextValue, LoginData } from "../../../types";

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthContextProvider = ({
  children,
}: PropsWithChildren<object>) => {
  const [loginData, setLoginDataRaw] = useState<LoginData>(() =>
    getStoredLoginData()
  );

  const userId = loginData.userId;
  const userToken = loginData.userToken;

  const setLoginData = ({ userId, userToken }: LoginData) => {
    setLoginDataRaw({ userId, userToken });
    setStoredLoginData({ userId, userToken });
  };

  const clearLoginData = () => {
    setLoginDataRaw({ userId: -100, userToken: "unLogged" });
    clearLoginData();
  };

  const value = { userId, userToken, setLoginData, clearLoginData };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
