import { AppointmentDateMap } from "../../types";

export const getAvailableAppointments = (
  appointments: AppointmentDateMap,
  userId: number
): AppointmentDateMap => {
  // forEach 는 appointments를 펼쳐주지 않으면 key, vlaue 로 돌지 못한다.
  const filteredAppointments = { ...appointments };
  Object.keys(filteredAppointments).forEach((date) => {
    const dateNum = Number(date);
    // forEach 는 새로운 array를 생성하지 않으니까 꼭 이렇게 "filteredAppointments[dateNum]="" 써서 사용
    filteredAppointments[dateNum] = filteredAppointments[dateNum].filter(
      (appointment) => !appointment.userId || appointment.userId === userId
    );
  });
  return filteredAppointments;
};
