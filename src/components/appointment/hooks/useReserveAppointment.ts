import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../axiosInstance";
import { AppointmentType } from "../../../types";
import { useLoginData } from "../../user/context/AuthContext";
import { useCustomToast } from "../../../UI/useCustomToast";
import { queryKeys } from "../../../react-query/constants";

const setAppointmentUser = async (
  appointment: AppointmentType,
  userId: number | null | undefined
): Promise<void> => {
  if (!userId) return;

  const patchOp = appointment.userId ? "replace" : "add";
  const patchData = [{ op: patchOp, path: "/userId", value: userId }];
  await axiosInstance.patch(`/appointment/${appointment.id}`, {
    data: patchData,
  });
};

export const useReserveAppointment = () => {
  const queryClient = useQueryClient();
  const { userId } = useLoginData();
  const toast = useCustomToast();

  const { mutate } = useMutation({
    mutationFn: (appointment: AppointmentType) =>
      setAppointmentUser(appointment, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.appointments] });
      toast({ title: "예약이 완료됐습니다.", status: "success" });
    },
  });

  return mutate;
};
