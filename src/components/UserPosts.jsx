import { VStack } from "@chakra-ui/react";
import { usePosts } from "../hooks/usePosts";
import { useSession } from "../hooks/useSession";
import Post from "./Post";

const UserPosts = ({ id }) => {
  const { posts } = usePosts();
  const { user } = useSession();
  const userId = !!id ? id : user.uid;

  return (
    <VStack spacing="5" my="5" px="5">
      {!!posts &&
        posts.map(
          (post) =>
            post.createdBy.uid === userId && <Post post={post} key={post.id} />
        )}
    </VStack>
  );
};

export default UserPosts;
