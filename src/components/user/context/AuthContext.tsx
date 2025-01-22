import { createContext, PropsWithChildren, useContext, useState } from "react";
import {
  clearStoredLoginData,
  getStoredLoginData,
  setStoredLoginData,
} from "../local-storage";
import { AuthContextValue, LoginData } from "../../../types";

const Initial_State = {
  userId: null,
  userToken: null,
  setLoginData: () => null,
  clearLoginData: () => null,
};

const AuthContext = createContext<AuthContextValue>(Initial_State);

// eslint-disable-next-line react-refresh/only-export-components
export const useLoginData = () => {
  // export const AuthContext 를 할 경우, re-render 에 대한 경고가 떠서 hook을 만든듯
  const authValue = useContext(AuthContext);
  if (!authValue) {
    throw new Error(
      "Error! AuthContext called from outside the AuthContextProvider"
    );
  }

  return authValue;
};

export const AuthContextProvider = ({
  children,
}: PropsWithChildren<object>) => {
  const [loginData, setLoginDataRaw] = useState<LoginData | null>(() =>
    getStoredLoginData()
  );

  const userId = loginData ? loginData.userId : null;
  const userToken = loginData ? loginData.userToken : null;

  const setLoginData = ({ userId, userToken }: LoginData) => {
    setLoginDataRaw({ userId, userToken });
    setStoredLoginData({ userId, userToken });
  };

  const clearLoginData = () => {
    setLoginDataRaw(null);
    clearStoredLoginData();
  };

  const value = { userId, userToken, setLoginData, clearLoginData };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
