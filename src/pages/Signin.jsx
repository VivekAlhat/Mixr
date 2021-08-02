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
  const MotionCenter = motion(Center);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit}>
      <MotionCenter
        mt="5"
        mb="10"
        initial={{ y: "-200vw" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1, bounce: "0.2" }}
      >
        <VStack w="lg" spacing="5" p={!notSmallerScreen && "5"}>
          <Text
            textTransform="capitalize"
            fontSize={notSmallerScreen ? "3xl" : "2xl"}
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
      </MotionCenter>
    </form>
  );
};

export default Signin;
