import { AppointmentDateMap } from "../../types";

export const getAvailableAppointments = (
  appointments: AppointmentDateMap,
  userId: number
): AppointmentDateMap => {
  // appointments를 펼쳐주지 않으면 key, vlaue 로 돌지 못한다.
  const filteredAppointments = { ...appointments };
  Object.keys(filteredAppointments).forEach((date) => {
    const dateNum = Number(date);
    filteredAppointments[dateNum] = filteredAppointments[dateNum].filter(
      (appointment) => !appointment.userId || appointment.userId === userId
    );
  });
  return filteredAppointments;
};
