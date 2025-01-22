import axios, { AxiosResponse } from "axios";
import { axiosInstance } from "../../../axiosInstance";
import { useLoginData } from "../context/AuthContext";
import { User } from "../../../types";
import { useCustomToast } from "../../../UI/useCustomToast";
import { useUser } from "./useUser";

type UserResponse = { user: User };
type ErrorResponse = { message: string };
type AuthResponseType = UserResponse | ErrorResponse;

const SERVER_ERROR = "There was an error contacting the server.";

export const useAuthActions = () => {
  const toast = useCustomToast();
  const { setLoginData, clearLoginData } = useLoginData();
  const { updateUser, clearUser } = useUser();

  const authServerCall = async (
    endPoint: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const { data, status }: AxiosResponse<AuthResponseType> =
        await axiosInstance({
          url: endPoint,
          method: "POST",
          data: { email, password },
          headers: { "Content-Type": "application/json" },
        });

      if (status === 400) {
        const title = "message" in data ? data.message : "Unauthorized";
        toast({
          title,
          status: "warning",
        });
      }

      if ("user" in data && "token" in data.user) {
        toast({
          title: `${data.user.email} 님이 로그인했습니다.`,
          status: "info",
        });

        updateUser(data.user);
        setLoginData({
          userId: data.user.id,
          userToken: data.user.token,
        });
      }
    } catch (errorResponse) {
      const title =
        axios.isAxiosError(errorResponse) &&
        errorResponse?.response?.data?.message
          ? errorResponse?.response?.data?.message
          : SERVER_ERROR;
      toast({
        title,
        status: "error",
      });
    }
  };

  const signin = async (email: string, password: string): Promise<void> => {
    await authServerCall("/signin", email, password);
  };

  const signout = (): void => {
    clearUser();
    clearLoginData();
    toast({
      title: "로그아웃됐습니다.",
      status: "info",
    });
  };

  return { signin, signout };
};
