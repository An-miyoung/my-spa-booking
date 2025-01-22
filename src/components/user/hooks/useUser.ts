import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { axiosInstance, getJWTHeader } from "../../../axiosInstance";
import { queryKeys } from "../../../react-query/constants";
import { useLoginData } from "../context/AuthContext";
import { User } from "../../../types";

const getUser = async (userId: number | null, userToken: string | null) => {
  if (!userId || !userToken) return null;

  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${userId}`,
    {
      headers: getJWTHeader(userToken),
    }
  );
  return data.user;
};

export const useUser = () => {
  const queryClient = useQueryClient();
  const { userId, userToken } = useLoginData();

  const { data: user } = useQuery({
    enabled: !!userId,
    queryKey: [queryKeys.user, userId],
    queryFn: () => getUser(userId, userToken),
    // 사용자가 업댓할 경우만 변하기때문에 gcTime 까지 절대로 reFetch 하지 못하게
    staleTime: Infinity,
  });

  const updateUser = (newUser: User | null): void => {
    if (newUser === null) return;

    queryClient.setQueryData([queryKeys.user, newUser.id], newUser);
  };

  const clearUser = (): void => {
    queryClient.removeQueries({
      queryKey: [queryKeys.user, queryKeys.appointments, userId],
    });
  };

  return { user, updateUser, clearUser };
};
