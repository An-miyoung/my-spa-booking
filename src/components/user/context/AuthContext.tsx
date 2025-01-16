import { createContext, PropsWithChildren, useState } from "react";
import { getStoredLoginData, setStoredLoginData } from "../local-storage";
import { AuthContextValue, LoginData } from "../../../types";

const Initial_State = {
  userId: null,
  userToken: null,
  setLoginData: () => null,
  clearLoginData: () => null,
};

const AuthContext = createContext<AuthContextValue>(Initial_State);

export const AuthContextProvider = ({
  children,
}: PropsWithChildren<object>) => {
  let value: AuthContextValue = Initial_State;
  const [loginData, setLoginDataRaw] = useState<LoginData | null>(() =>
    getStoredLoginData()
  );

  if (loginData === null) value = Initial_State;
  else {
    const userId = loginData!.userId;
    const userToken = loginData!.userToken;

    const setLoginData = ({ userId, userToken }: LoginData) => {
      setLoginDataRaw({ userId, userToken });
      setStoredLoginData({ userId, userToken });
    };

    const clearLoginData = () => {
      setLoginDataRaw({ userId: -100, userToken: "unLogged" });
      clearLoginData();
    };

    value = { userId, userToken, setLoginData, clearLoginData };
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
