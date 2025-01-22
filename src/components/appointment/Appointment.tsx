// import { useContext } from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
// import { AuthContext } from "../user/context/AuthContext";
import { AppointmentType } from "../../types";
import { useReserveAppointment } from "./hooks/useReserveAppointment";
import { appointmentInPast, getAppointmentColor } from "./utils";
import { useLoginData } from "../user/context/AuthContext";

interface AppointmentDataProps {
  appointmentData: AppointmentType;
}

const isClikable = (
  appointMentData: AppointmentType,
  userId: number | null
): boolean => {
  return !!(
    userId &&
    (!appointMentData.userId || appointMentData.userId === userId) &&
    !appointmentInPast(appointMentData)
  );
};

const Appointment = ({ appointmentData }: AppointmentDataProps) => {
  const { userId } = useLoginData();
  const reserveAppointment = useReserveAppointment();
  const [bgColor, textColor] = getAppointmentColor(appointmentData, userId);
  const appointmentHour = dayjs(appointmentData.dateTime).format("h a");

  const clickable = isClikable(appointmentData, userId);
  let onAppointmentClick: undefined | (() => void);
  let hoverCss = {};

  if (clickable) {
    onAppointmentClick = userId
      ? () => reserveAppointment(appointmentData)
      : undefined;
    hoverCss = {
      transform: "translateY(-1px)",
      boxShadow: "md",
      cursor: "pointer",
    };
  }

  return (
    <Box
      borderRadius="lg"
      px={2}
      bgColor={bgColor}
      textColor={textColor}
      as={clickable ? "button" : "div"}
      onClick={onAppointmentClick}
      _hover={hoverCss}
    >
      <HStack justify="space-between">
        <Text as="span" fontSize="xs">
          {appointmentHour}
        </Text>
        <Text as="span" fontSize="xs">
          {appointmentData.treatmentName}
        </Text>
      </HStack>
    </Box>
  );
};

export default Appointment;
