import { useQuery } from "@tanstack/react-query";
import { axiosInstance, getJWTHeader } from "../../../axiosInstance";
import { AppointmentType } from "../../../types";
import { queryKeys } from "../../../react-query/constants";
import { useLoginData } from "../context/AuthContext";

const getMyAppointments = async (
  userId: number | null,
  userToken: string | null
): Promise<AppointmentType[] | null> => {
  if (!userId || !userToken) return null;

  const { data } = await axiosInstance.get(`/user/${userId}/appointments`, {
    headers: getJWTHeader(userToken),
  });

  return data.appointments;
};

export const useMyAppointment = () => {
  const { userId, userToken } = useLoginData();

  const fallback: AppointmentType[] = [];
  const { data: myAppointments = fallback } = useQuery({
    enabled: !!userId,
    queryKey: [queryKeys.appointments, userId],
    queryFn: () => getMyAppointments(userId, userToken),
  });

  return myAppointments;
};
