import { FaSun, FaMoon } from "react-icons/fa";
import {
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
    <Flex
      w="100%"
      pr={notSmallerScreen ? "10" : "5"}
      pt="5"
      position="absolute"
    >
      <Spacer />
      <IconButton
        alignSelf="center"
        ml="5"
        icon={isDark ? <FaSun /> : <FaMoon />}
        onClick={toggleColorMode}
        size="sm"
        isRound
      />
    </Flex>
  );
};

export default Navbar;
