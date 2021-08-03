import {
  VStack,
  Divider,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Center,
  Text,
  useMediaQuery,
  Button,
  Link,
} from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { motion } from "framer-motion";

const Signin = () => {
  const [notSmallerScreen] = useMediaQuery("(min-width:600px)");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <motion.form
      style={{ width: "100%" }}
      onSubmit={handleSubmit}
      initial={{ y: "200vw" }}
      animate={{ y: 0 }}
      exit={{ y: "200vw" }}
      transition={{ type: "spring", duration: 1, bounce: "0.2" }}
    >
      <Center mt="1" mb="5">
        <VStack w="lg" spacing="5" p={notSmallerScreen ? "10" : "5"}>
          <Text
            textTransform="capitalize"
            fontSize={notSmallerScreen ? "3xl" : "xl"}
            fontWeight="semibold"
          >
            Sign in to your account
          </Text>
          <Divider />
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              autoComplete="off"
              placeholder="joe@schmoe.com"
            />
            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <Button
            bgColor="blue.500"
            color="whiteAlpha.900"
            w="100%"
            alignSelf="flex-start"
            type="submit"
            _hover={{ bg: "blue.600", color: "whiteAlpha" }}
          >
            Sign In
          </Button>
          <Text fontSize="md">
            Don't have an account?&nbsp;
            <Link to="/signup" as={RouteLink}>
              Sign Up
            </Link>
          </Text>
        </VStack>
      </Center>
    </motion.form>
  );
};

export default Signin;
