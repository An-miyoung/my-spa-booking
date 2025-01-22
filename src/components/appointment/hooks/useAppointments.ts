import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { axiosInstance } from "../../../axiosInstance";
import { AppointmentDateMap, MonthYear } from "../../../types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/constants";
import {
  getMonthYearDetails,
  getNewtMonthYear,
} from "../../../utils/monthYear";
import { getAvailableAppointments } from "../utils";

const getAppointments = async (year: string, month: string) => {
  const { data } = await axiosInstance.get(`/appointments/${year}/${month}`);
  return data;
};

export const useAppointments = () => {
  const queryClient = useQueryClient();
  const currentMonthYear = getMonthYearDetails(dayjs());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [showAll, setShowAll] = useState(false);
  const userId = 1;

  const updateMonthYear = (monthIncrement: number) => {
    setMonthYear((prev: MonthYear) => getNewtMonthYear(prev, monthIncrement));
  };

  const selectFn = useCallback(
    (appointments: AppointmentDateMap) => {
      if (showAll) return appointments;
      return getAvailableAppointments(appointments, userId);
    },
    [showAll, userId]
  );

  useEffect(() => {
    const nextMonthYear = getNewtMonthYear(monthYear, 1);
    queryClient.prefetchQuery({
      queryKey: [
        queryKeys.appointments,
        nextMonthYear.year,
        nextMonthYear.month,
      ],
      queryFn: () => getAppointments(nextMonthYear.year, nextMonthYear.month),
      staleTime: 0,
      gcTime: 30000,
    });
  }, [monthYear, queryClient]);

  const fallback: AppointmentDateMap = {};
  const { data: appointments = fallback } = useQuery({
    queryKey: [queryKeys.appointments, monthYear.year, monthYear.month],
    queryFn: () => getAppointments(monthYear.year, monthYear.month),
    select: (data) => selectFn(data),
    staleTime: 0,
    gcTime: 30000,
    refetchOnWindowFocus: true,
  });

  return { appointments, monthYear, updateMonthYear, showAll, setShowAll };
};
