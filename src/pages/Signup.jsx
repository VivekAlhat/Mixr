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
import { useState } from "react";
import { motion } from "framer-motion";

const Signup = () => {
  const [notSmallerScreen] = useMediaQuery("(min-width:600px)");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      fname: "",
      lname: "",
      email: "",
      password: "",
      cpassword: "",
    });
  };

  return (
    <motion.form
      style={{ width: "100%" }}
      onSubmit={handleSubmit}
      initial={{ y: "-200vw" }}
      animate={{ y: 0 }}
      exit={{ y: "-200vw" }}
      transition={{ type: "spring", duration: 1, bounce: "0.2" }}
    >
      <Center mt="1" mb="5">
        <VStack w="lg" spacing="5" p={notSmallerScreen ? "10" : "5"}>
          <Text
            textTransform="capitalize"
            fontSize={notSmallerScreen ? "3xl" : "xl"}
            fontWeight="semibold"
          >
            Create your free account
          </Text>
          <Divider />
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
            <Input
              name="password"
              type="password"
              autoComplete="off"
              value={formData.password}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="cpassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              name="cpassword"
              type="password"
              autoComplete="off"
              value={formData.cpassword}
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
