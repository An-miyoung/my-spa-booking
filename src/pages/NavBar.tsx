import { ReactNode, useContext } from "react";
import { Outlet, Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Button, Flex, HStack, Icon, Link } from "@chakra-ui/react";
import { GiFlowerPot } from "react-icons/gi";
import { AuthContext } from "../components/user/context/AuthContext";

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
  const authContext = useContext(AuthContext);
  const userId = authContext?.userId;

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
            {/* {userId && userId !== -100 ? (
            <>
              {user && <NavLink to={`/user/${user.id}`}>{user.email}</NavLink>}
              <Button onClick={() => signout()}>Sign out</Button>
            </>
          ) : (
            <Button onClick={() => navigate("/signin")}>Sign in</Button>
          )} */}
            {userId && userId !== -100 ? (
              <>
                {<NavLink to={`/user/${userId}`}>email</NavLink>}
                <Button>로그아웃</Button>
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
