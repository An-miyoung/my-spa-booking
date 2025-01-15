import {
  Box,
  Checkbox,
  Grid,
  Heading,
  HStack,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";
import { DateBox } from "../components/common/DateBox";
import { useAppointments } from "../components/appointment/hooks/useAppointments";

const Calendar = () => {
  const currentDate = dayjs();
  const koreanDays = ["일", "월", "화", "수", "목", "금", "토"];

  const { appointments, monthYear, updateMonthYear } = useAppointments();

  return (
    <Box>
      <HStack mt={10} spacing={8} justify="center">
        <IconButton
          aria-label="previous-month"
          onClick={() => {
            updateMonthYear(-1);
          }}
          icon={<TiArrowLeftThick />}
          disabled={currentDate > monthYear.startDate}
        />
        <Heading minW="40%" textAlign="center">
          {`${monthYear.year}년 ${monthYear.month}월`}
        </Heading>
        <IconButton
          aria-label="next-month"
          onClick={() => {
            updateMonthYear(1);
          }}
          icon={<TiArrowRightThick />}
        />
        <Checkbox
          variant="flushed"
          width="48"
          position="absolute"
          right="10px"
          checked={true}
          defaultChecked
          onChange={() => {}}
        >
          Only show available
        </Checkbox>
      </HStack>
      <Stack>
        <Grid
          templateColumns="repeat(7,1fr)"
          gap={4}
          mt={5}
          mb={0}
          mx={10}
          textAlign="center"
        >
          {koreanDays.map((day) => (
            <Box key={day} bg="olive.100" boxShadow="md" rounded="md">
              <Heading size="sm" color="olive.500">
                {day}
              </Heading>
            </Box>
          ))}
        </Grid>
      </Stack>
      <Grid
        templateColumns="repeat(7,1fr)"
        gap={4}
        mt={1}
        mb={10}
        mx={10}
        border={2}
      >
        <DateBox
          date={1}
          gridColumn={monthYear.firstDayOfWeek + 1}
          appointments={appointments[1]}
        />
        {[...Array(monthYear.lastDate - 1)].map((_, i) => (
          <DateBox key={i} date={i + 2} appointments={appointments[i + 2]} />
        ))}
      </Grid>
    </Box>
  );
};

export default Calendar;
