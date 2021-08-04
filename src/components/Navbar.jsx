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

const Navbar = () => {
  const [notSmallerScreen] = useMediaQuery("(min-width:600px)");
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Flex w="100%" boxShadow="sm" mb="5" p="1">
      <Text
        as={RouteLink}
        to="/"
        fontSize="2xl"
        fontWeight="bold"
        pl="5"
        color={isDark ? "blue.300" : "blue.700"}
      >
        Mixr
      </Text>
      <Spacer />
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
