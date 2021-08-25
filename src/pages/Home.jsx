import {
  Text,
  Box,
  Button,
  Flex,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const [notSmallerScreen] = useMediaQuery("(min-width:600px)");
  const MotionBox = motion(Box);
  const MotionImage = motion(Image);

  return (
    <Flex direction={!notSmallerScreen && "column"}>
      <MotionBox
        p={notSmallerScreen ? "5rem" : "5"}
        boxSizing="sm"
        w={notSmallerScreen ? "3xl" : "fit-content"}
        initial={{ y: "-200vw" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1.5, bounce: "0.2" }}
      >
        <Text fontSize="7xl" fontWeight="extrabold">
          Mixr
        </Text>
        <Text fontSize="xl" fontWeight="semibold">
          Meet | Connect | Socialize
        </Text>
        <Text fontSize="md" mt="5">
          Mixr is an abbreviation of/for <Text as="em">Mixer</Text>. Mixr is a
          React and Firebase powered simple social media application. Users can
          sign up in just few steps and start using the application. You can
          create a new post, manage your Mixr profile, and connect with people.
          Everything at one place.
        </Text>
        <Link to="/signin">
          <Button mt="5" colorScheme="blue">
            Get Started
          </Button>
        </Link>
      </MotionBox>
      <MotionImage
        display={!notSmallerScreen && "none"}
        src="assets/lost_online.svg"
        boxSize="30rem"
        p="16"
        alignSelf="center"
        initial={{ y: "-200vw" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1.5, bounce: "0.2" }}
      />
    </Flex>
  );
};

export default Home;
