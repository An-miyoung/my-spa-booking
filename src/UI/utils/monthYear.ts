import dayjs from "dayjs";
import { MonthYear } from "../../types";

export const getMonthYearDetails = (initialDate: dayjs.Dayjs): MonthYear => {
  const year = initialDate.format("YYYY");
  const month = initialDate.format("MM");
  const startDate = dayjs(`${year}${month}01`);
  const firstDayOfWeek = Number(startDate.format("d"));
  const lastDate = Number(startDate.daysInMonth());

  return { year, month, startDate, firstDayOfWeek, lastDate };
};

export const getNewtMonthYear = (
  monthYear: MonthYear,
  monthIncrement: number
): MonthYear => {
  const newMonthYear: dayjs.Dayjs = monthYear.startDate
    .clone()
    .add(monthIncrement, "month");

  return getMonthYearDetails(newMonthYear);
};
