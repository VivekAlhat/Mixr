import { VStack, Text, useMediaQuery, Center, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notSmallerScreen] = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setPosts(posts);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  return loading ? (
    <Center height="60vh" alignSelf="center">
      <Spinner />
    </Center>
  ) : posts.length > 0 ? (
    <VStack spacing="5" p={notSmallerScreen ? "5" : "2"} w="full">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </VStack>
  ) : (
    <Center height="60vh" alignSelf="center">
      <Text>Posts collection is empty. Create a new post.</Text>
    </Center>
  );
};

export default Posts;
