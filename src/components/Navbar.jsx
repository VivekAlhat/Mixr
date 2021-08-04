import { FaSun, FaMoon } from "react-icons/fa";
import { Link as RouteLink } from "react-router-dom";
import {
  Text,
  Flex,
  IconButton,
  Spacer,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { useSession } from "../hooks/useSession";
import MenuOptions from "./MenuOptions";

const Navbar = () => {
  const [notSmallerScreen] = useMediaQuery("(min-width:600px)");
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const { user } = useSession();

  return (
    <Flex w="100%" boxShadow="sm" mb="5" p="3">
      <Text
        as={RouteLink}
        to="/"
        fontSize="2xl"
        fontWeight="bold"
        ml={notSmallerScreen ? "10" : "5"}
        color={isDark ? "blue.300" : "blue.500"}
      >
        Mixr
      </Text>
      <Spacer />
      {!!user && <MenuOptions displayName={user.displayName} />}
      <IconButton
        alignSelf="center"
        mr={notSmallerScreen ? "10" : "5"}
        variant="ghost"
        icon={isDark ? <FaSun /> : <FaMoon />}
        onClick={toggleColorMode}
        size="sm"
        isRound
      />
    </Flex>
  );
};

export default Navbar;
