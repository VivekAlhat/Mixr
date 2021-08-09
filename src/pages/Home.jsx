import Wave from "react-wavify";
import {
  Text,
  Spacer,
  Flex,
  Box,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const [notSmallerScreen] = useMediaQuery("(min-width:600px)");
  const MotionText = motion(Text);

  return (
    <Flex direction="column">
      <Box
        p={notSmallerScreen ? "5rem" : "5"}
        boxSizing="sm"
        w={notSmallerScreen ? "4xl" : "fit-content"}
      >
        <MotionText
          fontSize="7xl"
          fontWeight="extrabold"
          initial={{ x: "-200vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", duration: 1, bounce: "0.2" }}
        >
          Mixr
        </MotionText>
        <Text fontSize="xl" fontWeight="semibold">
          Meet | Connect | Socialize
        </Text>
        <Text fontSize="md" mt="2">
          Mixr is an abbreviation of/for <Text as="em">Mixer</Text>. Mixr is a
          React and Firebase powered simple social media application. Users can
          sign up in just few steps and start using the application. You can
          create a new post, manage your Mixr profile, search new people and
          connect with them. Everything at one place.
        </Text>
        <Link to="/signin">
          <Button mt="5" colorScheme="blue">
            Get Started
          </Button>
        </Link>
      </Box>
      <Spacer />
      <Box position="fixed" bottom="-5" left="0" w="full">
        <Wave
          fill="#5089C6"
          paused={false}
          options={{
            height: 5,
            amplitude: 20,
            speed: 0.25,
            points: 3,
          }}
        />
      </Box>
    </Flex>
  );
};

export default Home;
