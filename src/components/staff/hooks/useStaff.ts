import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../axiosInstance";
import { StaffType } from "../../../types";
import { queryKeys } from "../../../react-query/constants";

const getStaff = async (): Promise<StaffType[]> => {
  const { data } = await axiosInstance.get("/staff");
  return data;
};

export const useStaff = () => {
  const fallback: StaffType[] = [];
  const [filter, setFilter] = useState("all");

  const selectFilterFn = useCallback(
    (staff: StaffType[]) => {
      if (filter == "all") return staff;
      return staff.filter((s) =>
        s.treatmentNames
          .map((n) => n.toLowerCase())
          .includes(filter.toLowerCase())
      );
    },
    [filter]
  );

  const { data: staff = fallback } = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
    select: (data) => selectFilterFn(data),
  });

  return { staff, filter, setFilter };
};
