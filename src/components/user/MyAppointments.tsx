import { Link } from "react-router-dom";
import {
  Box,
  Center,
  Heading,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { ImCancelCircle } from "react-icons/im";
import dayjs from "dayjs";
import { useMyAppointment } from "./hooks/useMyAppointment";
import { AppointmentType } from "../../types";
import { useCancelAppointment } from "../appointment/hooks/useCancelAppointment";

interface MyAppointmentProps {
  myAppointments: AppointmentType[];
}

const AppointmentsTable = ({ myAppointments }: MyAppointmentProps) => {
  const cancelAppointment = useCancelAppointment();

  return (
    <Table variant="simple" m={10} maxWidth="500px">
      <Tbody>
        {myAppointments.map((appointment) => (
          <Tr key={appointment.id}>
            <Td>
              <Text>{dayjs(appointment.dateTime).format("MMM D")}</Text>
            </Td>
            <Td>
              <Text>{dayjs(appointment.dateTime).format("h a")}</Text>
            </Td>
            <Td>
              <Text>{appointment.treatmentName}</Text>
            </Td>
            <Td>
              <IconButton
                aria-label="cancel appointment"
                onClick={() => {
                  cancelAppointment(appointment);
                }}
                icon={<ImCancelCircle />}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export const MyAppointments = () => {
  const myAppointments = useMyAppointment();
  return (
    <Box>
      <Heading mt={10} textAlign="center">
        Your Appointments
      </Heading>
      <Center>
        {myAppointments && myAppointments.length > 0 ? (
          <AppointmentsTable myAppointments={myAppointments} />
        ) : (
          <Link to="/Calendar">Book an appointment</Link>
        )}
      </Center>
    </Box>
  );
};
