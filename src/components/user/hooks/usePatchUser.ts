import { useMutation, useQueryClient } from "@tanstack/react-query";
import jsonpatch from "fast-json-patch";
import { User } from "../../../types";
import { axiosInstance, getJWTHeader } from "../../../axiosInstance";
import { useUser } from "./useUser";
import { useCustomToast } from "../../../UI/useCustomToast";
import { queryKeys } from "../../../react-query/constants";

export const MUTATION_KEY = "patch-user";

const patchUserOnServer = async (
  newData: User | null,
  originData: User | null | undefined
): Promise<User | null> => {
  if (!newData || !originData) {
    return null;
  }

  const patch = jsonpatch.compare(originData, newData);
  const { data } = await axiosInstance.patch(
    `/user/${originData.id}`,
    { patch },
    {
      headers: getJWTHeader(originData.token),
    }
  );

  return data.user;
};

export const usePatchUser = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const toast = useCustomToast();

  const { mutate: patchUser } = useMutation({
    mutationKey: [MUTATION_KEY],
    mutationFn: (newData: User) => patchUserOnServer(newData, user),
    // queryClient,invalidateQueries 를 하지 않고 만들어둔 hook 을 쓴다
    //  onSuccess: (userData: User | null) => {
    // updateUser(userData)}
    // 이 경우, 인터넷속도가 느리면 UI 가 빨리 반영되지 못하는 단점. 이를 해결하는 optimistic Ui update
    onSuccess: () => {
      toast({ title: "사용자정보를 수정했습니다.", status: "success" });
    },
    onSettled: () => {
      // server 에서 mutation 이 진행되는 동안 UI 를 먼저 변경시켜준다.
      return queryClient.invalidateQueries({ queryKey: [queryKeys.user] });
      //  만약, mutation 이 실패하면 예전 데이터로 자동 rollback. 꼭 return 할 것
    },
  });

  return patchUser;
};
