import { VStack } from "@chakra-ui/react";
import { getActivePost } from "../helpers";
import { usePosts } from "../hooks/usePosts";
import Comment from "./Comment";

const Comments = ({ postId }) => {
  const data = usePosts();
  const post = getActivePost(data, postId);
  const comments = !!post && post.comments;

  return (
    !!comments && (
      <VStack align="flex-start" spacing="5" w="full" pb="10">
        {comments.map((comment, index) => (
          <Comment comment={comment} key={index} postId={postId} />
        ))}
      </VStack>
    )
  );
};

export default Comments;
