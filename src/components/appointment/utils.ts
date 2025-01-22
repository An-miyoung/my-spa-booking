import dayjs from "dayjs";
import { AppointmentDateMap, AppointmentType } from "../../types";

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

export const appointmentInPast = (
  appointmentData: AppointmentType
): boolean => {
  const now = dayjs();
  return dayjs(appointmentData.dateTime) < now;
};

export const getAppointmentColor = (
  appointmentData: AppointmentType,
  userId: number | null
): [string, string] => {
  // userId 가 무엇이든 예약이 된건가
  const taken = !!appointmentData.userId;
  if (taken || appointmentInPast(appointmentData)) {
    const textColor = "black";
    const bgColor =
      appointmentData.userId === userId ? "yellow.200" : "gray.300";
    return [bgColor, textColor];
  }

  const textColor = "white";
  let bgColor = "black";
  switch (appointmentData.treatmentName.toLowerCase()) {
    case "massage": {
      bgColor = "purple.700";
      break;
    }
    case "scrub": {
      bgColor = "blue.700";
      break;
    }
    case "facial": {
      bgColor = "green.700";
      break;
    }
    default: {
      bgColor = "black";
      break;
    }
  }

  return [bgColor, textColor];
};
