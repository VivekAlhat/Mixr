import { useState } from "react";
import { motion } from "framer-motion";
import { useHistory, Link as RouteLink } from "react-router-dom";
import {
  Center,
  VStack,
  Text,
  Input,
  Button,
  Divider,
  Link,
  FormControl,
  FormLabel,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { passwordReset } from "../firebase/auth";

const PasswordReset = () => {
  const toast = useToast();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [notSmallerScreen] = useMediaQuery("(min-width:600px)");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      await passwordReset(email);
      toast({
        title: "Check your email for password reset link",
        status: "success",
        isClosable: true,
        position: "top-right",
      });
      history.push("/signin");
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setLoading(false);
      setEmail("");
    }
  };

  return (
    <motion.form
      style={{ width: "100%" }}
      initial={{ y: "200vw" }}
      animate={{ y: 0 }}
      exit={{ y: "200vw" }}
      transition={{ type: "spring", duration: 1, bounce: "0.2" }}
      onSubmit={handleClick}
    >
      <Center mt="1" mb="5">
        <VStack w="lg" spacing="5" p={notSmallerScreen ? "10" : "5"}>
          <Text
            textTransform="capitalize"
            fontSize={notSmallerScreen ? "3xl" : "xl"}
            fontWeight="semibold"
          >
            Reset password
          </Text>
          <Divider />
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              name="email"
              type="email"
              autoComplete="off"
              placeholder="joe@schmoe.com"
              value={email}
              onChange={handleChange}
            />
          </FormControl>
          <Button
            bgColor="blue.500"
            color="whiteAlpha.900"
            w="100%"
            alignSelf="flex-start"
            type="submit"
            _hover={{ bg: "blue.600", color: "whiteAlpha" }}
            isLoading={loading ? true : false}
            loadingText="Sending Password Reset Link"
          >
            Reset Password
          </Button>
          <Link to="/signin" as={RouteLink}>
            Sign in?
          </Link>
        </VStack>
      </Center>
    </motion.form>
  );
};

export default PasswordReset;
