// import { useContext } from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
// import { AuthContext } from "../user/context/AuthContext";
import { AppointmentType } from "../../types";

interface AppointmentDataProps {
  appointmentData: AppointmentType;
}

const Appointment = ({ appointmentData }: AppointmentDataProps) => {
  // const { userId } = useContext(AuthContext);
  const appointmentHour = dayjs(appointmentData.dateTime).format("h a");
  return (
    <Box>
      <HStack>
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
