import {
  VStack,
  Divider,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Center,
  Text,
  useToast,
  useMediaQuery,
  Button,
  Link,
} from "@chakra-ui/react";
import { Link as RouteLink, useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { signIn, signInWithGoogle } from "../firebase/auth";

const Signin = () => {
  const toast = useToast();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleSign, setgoogleSign] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [notSmallerScreen] = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    return () => {
      setFormData({
        email: "",
        password: "",
      });
      setLoading(false);
    };
  }, []);

  const handleClick = () => setShow(!show);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const googleSignIn = async () => {
    try {
      setgoogleSign(true);
      await signInWithGoogle();
      toast({
        title: "Signed in successfully!",
        status: "success",
        isClosable: true,
        position: "top-right",
      });
      history.push("/profile");
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setgoogleSign(false);
    }
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      await signIn(formData);
      toast({
        title: "Signed in successfully!",
        status: "success",
        isClosable: true,
        position: "top-right",
      });
      history.push("/profile");
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setFormData({
        email: "",
        password: "",
      });
      setLoading(false);
    }
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
              name="email"
              type="email"
              autoComplete="off"
              placeholder="joe@schmoe.com"
              value={formData.email}
              onChange={handleChange}
            />
            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                name="password"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Link to="/reset" as={RouteLink} alignSelf="flex-start">
            Forgot Password?
          </Link>
          <Button
            bgColor="blue.500"
            color="whiteAlpha.900"
            w="100%"
            alignSelf="flex-start"
            type="submit"
            _hover={{ bg: "blue.600", color: "whiteAlpha" }}
            isLoading={loading ? true : false}
            loadingText="Signing In"
          >
            Sign In
          </Button>
          <Button
            rightIcon={<FaGoogle />}
            bgColor="red.500"
            color="whiteAlpha.900"
            w="100%"
            alignSelf="flex-start"
            _hover={{ bg: "red.600", color: "whiteAlpha" }}
            isLoading={googleSign ? true : false}
            loadingText="Signing In"
            onClick={googleSignIn}
          >
            Sign In With Google
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
