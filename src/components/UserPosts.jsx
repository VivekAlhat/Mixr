import { Box, Text, VStack } from "@chakra-ui/react";
import { usePosts } from "../hooks/usePosts";
import { useSession } from "../hooks/useSession";
import Post from "./Post";

const UserPosts = () => {
  const { posts } = usePosts();
  const { user } = useSession();

  return (
    <VStack spacing="5" my="5" px="5">
      {!!posts ? (
        posts.map(
          (post) => post.createdBy.uid === user.uid && <Post post={post} />
        )
      ) : (
        <Box>
          <Text>{`${user.displayName} hasn't posted anything.`}</Text>
        </Box>
      )}
    </VStack>
  );
};

export default UserPosts;
