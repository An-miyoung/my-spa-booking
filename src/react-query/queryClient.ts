import { QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "../components/common/toast";

const errorHandler = (errorMsg: string) => {
  const id = "react-query-toast";
  if (!toast.isActive(id)) {
    const title = `could not fetch data: ${
      errorMsg ?? "error connecting to server"
    }`;

    toast({ id, title, status: "error", variant: "subtle", isClosable: true });
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600000,
      gcTime: 900000,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      errorHandler(error.message);
    },
  }),
});
