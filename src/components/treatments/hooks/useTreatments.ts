import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../axiosInstance";
import { TreatmentType } from "../../../types";
import { queryKeys } from "../../../react-query/constants";

const getTreatments = async (): Promise<TreatmentType[]> => {
  const { data } = await axiosInstance.get("/treatments");
  return data;
};

export const useTreatment = (): TreatmentType[] => {
  const fallback: TreatmentType[] = [];

  const { data: treatments = fallback } = useQuery({
    queryKey: [queryKeys.treatments],
    queryFn: getTreatments,
  });

  return treatments;
};

// queryCache 에 data를 보관하고 render하지 않을거니까 return 할 필요가 없다.
export const usePreFetchTreatments = (): void => {
  const queryClient = useQueryClient();

  queryClient.prefetchQuery({
    queryKey: [queryKeys.treatments],
    queryFn: getTreatments,
  });
};
