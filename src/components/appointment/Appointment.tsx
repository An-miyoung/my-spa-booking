// import { useContext } from "react";
// import { AuthContext } from "../user/context/AuthContext";
import { Box, HStack, Text } from "@chakra-ui/react";
import { AppointmentType } from "../../types";
// import dayjs from "dayjs";

interface AppointmentDataProps {
  appointmentData: AppointmentType;
}

const Appointment = ({ appointmentData }: AppointmentDataProps) => {
  // const { userId } = useContext(AuthContext);
  // const appointmentHour = dayjs(appointmentData.dateTime).format("h a");
  return (
    <Box>
      <HStack>
        <Text as="span" fontSize="xs">
          {appointmentData.dateTime.slice(10)}
        </Text>
        <Text as="span" fontSize="xs">
          {appointmentData.treatmentName}
        </Text>
      </HStack>
    </Box>
  );
};

export default Appointment;
