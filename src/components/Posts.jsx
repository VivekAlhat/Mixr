import { VStack, Text, useMediaQuery, Center, Spinner } from "@chakra-ui/react";
import { usePosts } from "../hooks/usePosts";
import Post from "./Post";

const Posts = () => {
  const data = usePosts();
  const [notSmallerScreen] = useMediaQuery("(min-width:600px)");

  return data.loading ? (
    <Center height="80vh" alignSelf="center">
      <Spinner />
    </Center>
  ) : data.posts.length > 0 ? (
    <VStack
      spacing="5"
      p={!notSmallerScreen && "5"}
      w="full"
      mt={notSmallerScreen ? "5" : "-5"}
      mb="3"
    >
      {data.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </VStack>
  ) : (
    <Center height="80vh">
      <Text>Nothing to display. Create your first post.</Text>
    </Center>
  );
};

export default Posts;
