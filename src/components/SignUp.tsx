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

const defaultFormFields = {
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [dirty, setDirty] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const { email, password, confirmPassword } = formFields;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <Stack spacing={8} py={12} px={6}>
      <Stack textAlign="center">
        <Heading>회원이 아니신가요?</Heading>
      </Stack>
      <Box height="350" rounded="lg" bg="white" boxShadow="lg" p={8}>
        <Stack spacing={4}>
          <FormControl
            id="signup-email"
            isRequired
            isInvalid={!email && dirty.email}
          >
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
            id="signup-password"
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
          <FormControl
            id="confirmPassword"
            isRequired
            isInvalid={!password && dirty.password}
          >
            <FormLabel>비밀번호확인</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              name="confirmPassword"
              onChange={handleOnChange}
              onBlur={() =>
                setDirty((prevDirty) => ({
                  ...prevDirty,
                  confirmPassword: true,
                }))
              }
            />
            <FormErrorMessage>필수입력사항입니다.</FormErrorMessage>
          </FormControl>
          <HStack spacing={2} width="100%">
            <Button
              bgColor="olive.200"
              type="submit"
              isDisabled={!email || !password}
              // onClick={() => auth.signup(email, password)}
              onClick={() => console.log(formFields)}
            >
              회원가입
            </Button>
          </HStack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default SignUp;
