import { FaSun, FaMoon } from "react-icons/fa";
import { Link as RouteLink } from "react-router-dom";
import {
  Text,
  Flex,
  IconButton,
  Spacer,
  useColorMode,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { useSession } from "../hooks/useSession";
import { ImPacman } from "react-icons/im";
import MenuOptions from "./MenuOptions";
import CreatePost from "./CreatePost";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const { user } = useSession();

  return (
    <Flex w="100%" boxShadow="sm" mb="5" p="3">
      <HStack ml="3">
        <Icon as={ImPacman} color="blue.300" alignSelf="center" w="5" h="5" />
        <Text as={RouteLink} to="/" fontSize="2xl" fontWeight="bold">
          Mixr
        </Text>
      </HStack>
      <Spacer />
      {!!user && <CreatePost />}
      {!!user && <MenuOptions displayName={user.displayName} />}
      <IconButton
        alignSelf="center"
        mr="3"
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
