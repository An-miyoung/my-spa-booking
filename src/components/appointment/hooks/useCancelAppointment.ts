import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppointmentType } from "../../../types";
import { axiosInstance } from "../../../axiosInstance";
import { useCustomToast } from "../../../UI/useCustomToast";
import { queryKeys } from "../../../react-query/constants";

const removeAppointmentOnServer = async (
  appointmentData: AppointmentType
): Promise<void> => {
  const patchData = [{ op: "remove", path: "/userId" }];
  await axiosInstance.patch(`/appointment/${appointmentData.id}`, {
    data: patchData,
  });
};

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation({
    mutationFn: (appointmentData: AppointmentType) =>
      removeAppointmentOnServer(appointmentData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.appointments],
      });
      toast({ title: "예약이 취소됐습니다.", status: "success" });
    },
  });

  return mutate;
};
