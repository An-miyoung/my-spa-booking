import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "../components/common/toast";

const errorHandler = (title: string) => {
  const id = "react-query-toast";
  if (!toast.isActive(id)) {
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
      const title = `could not fetch data: ${
        error.message ?? "error connecting to server"
      }`;
      errorHandler(title);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      const title = `could not update data:${
        error.message ?? "error connecting to server"
      }`;
      errorHandler(title);
    },
  }),
});
