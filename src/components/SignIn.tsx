import { ChangeEvent, useState } from "react";
import {
  Stack,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useAuthActions } from "../components/user/hooks/useAuthActions";
import { useNavigate } from "react-router-dom";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [dirty, setDirty] = useState({ email: false, password: false });
  const { email, password } = formFields;

  const { signin } = useAuthActions();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async () => {
    if (!email || !password) return;

    try {
      await signin(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack spacing={8} py={12} px={6}>
      <Stack textAlign="center">
        <Heading>다시 만나 반가워요!</Heading>
      </Stack>
      <Box height="350" rounded="lg" bg="white" boxShadow="lg" p={8}>
        <Stack spacing={4}>
          <FormControl id="email" isRequired isInvalid={!email && dirty.email}>
            <FormLabel>이메일</FormLabel>
            <Input
              type="email"
              value={email}
              name="email"
              onChange={handleOnChange}
              onBlur={() =>
                setDirty((prevDirty) => ({ ...prevDirty, email: true }))
              }
            />
            <FormErrorMessage>필수입력사항입니다.</FormErrorMessage>
          </FormControl>
          <FormControl
            id="password"
            isRequired
            isInvalid={!password && dirty.password}
          >
            <FormLabel>비밀번호</FormLabel>
            <Input
              type="password"
              value={password}
              name="password"
              onChange={handleOnChange}
              onBlur={() =>
                setDirty((prevDirty) => ({ ...prevDirty, password: true }))
              }
            />
            <FormErrorMessage>필수입력사항입니다.</FormErrorMessage>
          </FormControl>
          <HStack width="100%">
            <Button
              bgColor="olive.200"
              type="submit"
              isDisabled={!email || !password}
              onClick={handleSubmit}
            >
              로그인
            </Button>
          </HStack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default SignIn;
