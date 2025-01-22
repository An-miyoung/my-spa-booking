import { Flex } from "@chakra-ui/react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const Auth = () => {
  return (
    <Flex minH="84vh" textAlign="center" justify="center" gap="40">
      <SignIn />
      <SignUp />
    </Flex>
  );
};

export default Auth;
