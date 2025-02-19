import { createStandaloneToast } from "@chakra-ui/react";

import { theme } from "../../UI/theme";

const { toast, ToastContainer } = createStandaloneToast({ theme });

// eslint-disable-next-line react-refresh/only-export-components
export { toast, ToastContainer };
