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
  HStack,
  useToast,
  useMediaQuery,
  Button,
  Link,
} from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { signUp } from "../firebase/auth";

const Signup = () => {
  const toast = useToast();
  const [notSmallerScreen] = useMediaQuery("(min-width:600px)");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleClick = () => setShow(!show);

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      if (formData.password !== formData.cpassword) {
        setPassErr(true);
        toast({
          title: "Both passwords should match",
          status: "error",
          isClosable: true,
          position: "top-right",
        });
      } else {
        await signUp(formData);
        toast({
          title: "Account created!",
          status: "success",
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setFormData({
        fname: "",
        lname: "",
        email: "",
        password: "",
        cpassword: "",
      });
      setLoading(false);
    }
  };

  return (
    <motion.form
      style={{ width: "100%" }}
      onSubmit={handleSubmit}
      initial={{ y: "-200vw" }}
      animate={{ y: 0 }}
      exit={{ y: "-200vw" }}
      transition={{ type: "spring", duration: 0.5, bounce: "0.2" }}
    >
      <Center mt="1" mb="5">
        <VStack w="5xl" spacing="5" p={notSmallerScreen ? "1" : "5"}>
          <Text
            textTransform="capitalize"
            fontSize={notSmallerScreen ? "3xl" : "xl"}
            fontWeight="semibold"
          >
            Create your free account
          </Text>
          <Divider />
          <HStack alignSelf="flex-start" w="full">
            <FormControl id="fname" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="fname"
                autoComplete="off"
                placeholder="Joe"
                value={formData.fname}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="lname" isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                name="lname"
                autoComplete="off"
                placeholder="Schmoe"
                value={formData.lname}
                onChange={handleChange}
              />
            </FormControl>
          </HStack>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name="email"
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
                name="password"
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={passErr ? true : false}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="cpassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size="md">
              <Input
                name="cpassword"
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Confirm password"
                value={formData.cpassword}
                onChange={handleChange}
                isInvalid={passErr ? true : false}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            bgColor="blue.500"
            color="whiteAlpha.900"
            w="100%"
            alignSelf="flex-start"
            type="submit"
            _hover={{ bg: "blue.600", color: "whiteAlpha" }}
            isLoading={loading ? true : false}
            loadingText="Submitting"
          >
            Sign Up
          </Button>
          <Text fontSize="md">
            Already have an account?&nbsp;
            <Link to="/signin" as={RouteLink}>
              Sign In
            </Link>
          </Text>
        </VStack>
      </Center>
    </motion.form>
  );
};

export default Signup;
