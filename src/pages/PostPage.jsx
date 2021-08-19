import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import { useSession } from "../hooks/useSession";
import firebase, { db } from "../firebase/firebase";
import { getActivePost } from "../helpers";
import Post from "../components/Post";
import Comments from "../components/Comments";
import {
  VStack,
  Input,
  useMediaQuery,
  Divider,
  Button,
  Center,
} from "@chakra-ui/react";

const PostPage = () => {
  const { user } = useSession();
  const params = useParams();
  const data = usePosts();
  const post = getActivePost(data, params.id);
  const [notSmallerScreen] = useMediaQuery("(min-width:600px)");

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const docRef = db.doc(`/posts/${params.id}`);
      const commentData = {
        comment,
        createdBy: { uid: user.uid },
      };
      await docRef.update({
        comments: firebase.firestore.FieldValue.arrayUnion(commentData),
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setComment("");
      setLoading(false);
    }
  };

  return (
    <Center>
      <VStack spacing="5" px={notSmallerScreen ? "16" : "5"} w="max-content">
        {!!post && <Post post={post} />}
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Input
            placeholder="Write a comment"
            value={comment}
            onChange={handleChange}
          />
          <Button
            colorScheme="facebook"
            variant="outline"
            size="sm"
            mt="5"
            float="right"
            type="submit"
            isLoading={loading ? true : false}
          >
            Comment
          </Button>
        </form>
        <Divider pt="1" />
        <Comments postId={params.id} />
      </VStack>
    </Center>
  );
};

export default PostPage;
