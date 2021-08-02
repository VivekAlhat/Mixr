import Wave from "react-wavify";
import {
  Text,
  Spacer,
  Flex,
  Box,
  ButtonGroup,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";

const Home = () => {
  const [notSmallerScreen] = useMediaQuery("(min-width:600px)");

  return (
    <Flex direction="column" minHeight="100vh">
      <Box
        p={notSmallerScreen ? "5rem" : "5"}
        boxSizing="sm"
        mt="10"
        w={notSmallerScreen ? "4xl" : "fit-content"}
      >
        <Text fontSize="7xl" fontWeight="extrabold">
          Mixr
        </Text>
        <Text fontSize="xl" fontWeight="semibold">
          Meet | Connect | Socialize
        </Text>
        <Text fontSize="md" mt="2">
          Mixr is an abbreviation of <Text as="em">Mixer</Text>. Mixr is a React
          and Firebase based simple social media application. Users can sign up
          in just few steps and start using the application. You can create a
          new post, manage your Mixr profile, search new people and connect with
          them. Everything at one place.
        </Text>
        <ButtonGroup mt="10" w="fit-content" spacing="5">
          <Button colorScheme="blue">Sign In</Button>
          <Button>Sign Up</Button>
        </ButtonGroup>
      </Box>
      <Spacer />
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
    </Flex>
  );
};

export default Home;
