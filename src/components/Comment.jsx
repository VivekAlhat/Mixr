import {
  Avatar,
  Box,
  Text,
  HStack,
  Spacer,
  Icon,
  Link,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import firebase, { db } from "../firebase/firebase";
import { useSession } from "../hooks/useSession";
import { useState, useEffect } from "react";
import { Link as RouteLink } from "react-router-dom";

const Comment = ({ comment, postId }) => {
  const [author, setAuthor] = useState({
    uid: "",
    displayName: "",
    photoURL: "",
  });
  const { user } = useSession();
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  useEffect(() => {
    db.collection("users")
      .doc(comment.createdBy.uid)
      .get()
      .then((doc) => setAuthor(doc.data()))
      .catch((err) => console.log(err));

    return () => setAuthor(null);
  }, [comment.createdBy.uid]);

  const deleteComment = async () => {
    const docRef = db.doc(`posts/${postId}`);
    await docRef.update({
      comments: firebase.firestore.FieldValue.arrayRemove(comment),
    });
  };

  return (
    <Box
      w="full"
      border="1px solid"
      borderColor={isDark ? "whiteAlpha.100" : "lightgray"}
      p="3"
    >
      <HStack spacing="3">
        <Avatar
          name={!!author && author.displayName}
          size="md"
          src={!!author && author.photoURL}
        />
        <VStack align="flex-start">
          <Text fontWeight="semibold">
            <Link as={RouteLink} to={`/users/${author.uid}`}>
              {!!author && author.displayName}
            </Link>
          </Text>
          <Text mt="3">{comment.comment}</Text>
        </VStack>
        <Spacer />
        {comment.createdBy.uid === user.uid && (
          <Icon
            as={MdDelete}
            cursor="pointer"
            onClick={deleteComment}
            w="6"
            h="6"
          />
        )}
      </HStack>
    </Box>
  );
};

export default Comment;
