import { ReactNode } from "react";
import { Outlet, Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Button, Flex, HStack, Icon, Link } from "@chakra-ui/react";
import { GiFlowerPot } from "react-icons/gi";
import { useLoginData } from "../components/user/context/AuthContext";
import { useUser } from "../components/user/hooks/useUser";
import { useAuthActions } from "../components/user/hooks/useAuthActions";

const Links = ["Treatments", "Staff", "Calendar"];

const NavLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link
    as={RouterLink}
    px={2}
    py={1}
    rounded="md"
    color="olive.200"
    _hover={{
      textDecoration: "none",
      color: "olive.500",
    }}
    to={to}
  >
    {children}
  </Link>
);

const NavBar = () => {
  const navigate = useNavigate();
  const { userId } = useLoginData();
  const { user } = useUser();
  const { signout } = useAuthActions();

  return (
    <div>
      <Box bg="gray.900" px={4}>
        <Flex h={16} alignItems="center" justify="space-between">
          <HStack spacing={8} alignItems="center">
            <NavLink to="/">
              <Icon w={8} h={8} as={GiFlowerPot} />
            </NavLink>
            <HStack as="nav" spacing={4}>
              {Links.map((link) => (
                <NavLink key={link} to={`/${link}`}>
                  {link}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <HStack>
            {userId !== null && user ? (
              <>
                {<NavLink to={`/user/${userId}`}>{user.email}</NavLink>}
                <Button onClick={signout}>로그아웃</Button>
              </>
            ) : (
              <Button onClick={() => navigate("/auth")}>로그인</Button>
            )}
          </HStack>
        </Flex>
      </Box>
      <Outlet />
    </div>
  );
};

export default NavBar;
