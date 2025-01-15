import {
  Box,
  Checkbox,
  Grid,
  Heading,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";
import { DateBox } from "../components/common/DateBox";
import { getMonthYearDetails, getNewtMonthYear } from "../UI/utils/monthYear";
import { appointments } from "../components/temp-data";

const Calendar = () => {
  const currentDate = dayjs();

  const currentMonthYear = getMonthYearDetails(currentDate);

  return (
    <Box>
      <HStack mt={10} spacing={8} justify="center">
        <IconButton
          aria-label="previous-month"
          onClick={() => {
            console.log(getNewtMonthYear(currentMonthYear, -1));
          }}
          icon={<TiArrowLeftThick />}
          disabled={false}
        />
        <Heading minW="40%" textAlign="center">
          {`${currentMonthYear.year}년 ${currentMonthYear.month}월`}
        </Heading>
        <IconButton
          aria-label="next-month"
          onClick={() => {
            console.log(getNewtMonthYear(currentMonthYear, 1));
          }}
          icon={<TiArrowRightThick />}
          disabled={false}
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
      <Grid templateColumns="repeat(7,1fr)" gap={4} my={5} mx={10} border={2}>
        <DateBox
          date={1}
          gridColumn={currentMonthYear.firstDayOfWeek + 1}
          appointments={appointments[1]}
        />
        {[...Array(currentMonthYear.lastDate - 1)].map((_, i) => (
          <DateBox key={i} date={i + 2} appointments={appointments[i + 1]} />
        ))}
      </Grid>
    </Box>
  );
};

export default Calendar;
