import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { axiosInstance } from "../../../axiosInstance";
import { AppointmentDateMap } from "../../../types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/constants";
import {
  getMonthYearDetails,
  getNewtMonthYear,
} from "../../../UI/utils/monthYear";

const getAppointments = async (year: string, month: string) => {
  const { data } = await axiosInstance.get(`/appointments/${year}/${month}`);
  return data;
};

export const useAppointments = () => {
  const queryClient = useQueryClient();
  const currentMonthYear = getMonthYearDetails(dayjs());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [showAll, setShowAll] = useState(false);

  const updateMonthYear = (monthIncrement: number) => {
    setMonthYear((prev) => getNewtMonthYear(prev, monthIncrement));
  };

  useEffect(() => {
    const nextMonthYear = getNewtMonthYear(monthYear, 1);
    queryClient.prefetchQuery({
      queryKey: [
        queryKeys.appointments,
        nextMonthYear.year,
        nextMonthYear.month,
      ],
      queryFn: () => getAppointments(nextMonthYear.year, nextMonthYear.month),
    });
  }, [monthYear, queryClient]);

  const fallback: AppointmentDateMap = {};
  const { data: appointments = fallback } = useQuery({
    queryKey: [queryKeys.appointments, monthYear.year, monthYear.month],
    queryFn: () => getAppointments(monthYear.year, monthYear.month),
  });

  return { appointments, monthYear, updateMonthYear, showAll, setShowAll };
};
