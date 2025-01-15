import { Box, Stack, Text } from "@chakra-ui/react";
import { AppointmentType } from "../../types";
import Appointment from "../appointment/Appointment";

interface DateProps {
  date: number;
  gridColumn?: number;
  appointments?: AppointmentType[];
}

export const DateBox = ({ date, gridColumn, appointments = [] }: DateProps) => {
  return (
    <Box
      w="100%"
      h={20}
      bg="olive.50"
      gridColumnStart={gridColumn}
      boxShadow="md"
      rounded="md"
    >
      <Stack m={2} spacing={1}>
        <Text fontSize="xs" textAlign="right">
          {date}
        </Text>
        {appointments.map((appointment) => (
          <Appointment key={appointment.id} appointmentData={appointment} />
        ))}
      </Stack>
    </Box>
  );
};
