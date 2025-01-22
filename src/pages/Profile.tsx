import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useUser } from "../components/user/hooks/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginData } from "../components/user/context/AuthContext";
import { MyAppointments } from "../components/user/MyAppointments";
import {
  MUTATION_KEY,
  usePatchUser,
} from "../components/user/hooks/usePatchUser";
import { useMutationState } from "@tanstack/react-query";
import { User } from "../types";

interface FormValues {
  name: string;
  address: string;
  phone: string;
}

export const Profile = () => {
  const navigate = useNavigate();
  const { userId } = useLoginData();
  const { user } = useUser();
  const patchUser = usePatchUser();

  const formElements = ["name", "address", "phone"];

  useEffect(() => {
    if (!userId) {
      navigate("/auth");
    }
  }, [userId, navigate]);

  // server 로 mutation 이 진행중인 데이터가 있다면 미리 화면을 업데이트시킨다.
  const pendingData = useMutationState({
    filters: { mutationKey: [MUTATION_KEY], status: "pending" },
    select: (mutation) => {
      return mutation.state.variables as User;
    },
  });

  const pendingUser = pendingData ? pendingData[0] : null;

  return (
    <Flex minH="84vh" textAlign="center" justify="center">
      <Stack spacing={8} mx="auto" w="xl" py={12} px={6}>
        <MyAppointments />
        <Stack textAlign="center">
          <Heading>
            Information for {pendingUser ? pendingUser.name : user?.name}
          </Heading>
        </Stack>
        <Box rounded="lg" bg="white" boxShadow="lg" p={8}>
          <Formik
            enableReinitialize
            initialValues={{
              name: user?.name ?? "",
              address: user?.address ?? "",
              phone: user?.phone ?? "",
            }}
            onSubmit={(values: FormValues) => {
              if (user?.id !== undefined) patchUser({ ...user, ...values });
            }}
          >
            <Form>
              {formElements.map((element) => (
                <FormControl key={element} id={element}>
                  <FormLabel>{element}</FormLabel>
                  <Field name={element} as={Input} />
                </FormControl>
              ))}
              <Button mt={6} type="submit">
                Update
              </Button>
            </Form>
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
};
