import { Box, Text, Image, Center } from "@chakra-ui/react";

const Error = () => {
  return (
    <Center minHeight="100vh">
      <Box p="5">
        <Image
          src="/assets/page_not_found.svg"
          alt="Page Not Found"
          w="md"
          h="xs"
        />
        <Text fontSize="md" textAlign="center" fontWeight="semibold">
          Uh! This path does not exist.
        </Text>
        <Text fontSize="lg" textAlign="center" fontWeight="semibold" mt="2">
          Maybe try taking a different route?
        </Text>
      </Box>
    </Center>
  );
};

export default Error;
