import {
  Avatar,
  Box,
  HStack,
  Icon,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { MdMoreHoriz, MdComment } from "react-icons/md";
import firebase, { db } from "../firebase/firebase";
import { useSession } from "../hooks/useSession";
import DeleteAlert from "./DeleteAlert";
import moment from "moment";

const Post = ({ post }) => {
  const { user } = useSession();
  const [notSmallerScreen] = useMediaQuery("(min-width:600px)");

  const deletePost = async () => {
    await db.doc(`posts/${post.id}`).delete();
  };

  const likePost = async () => {
    const docRef = await db.doc(`posts/${post.id}`).get();
    const exists = docRef.data();
    if (exists.dislikes.includes(user.uid)) {
      await db.doc(`posts/${post.id}`).update({
        dislikes: firebase.firestore.FieldValue.arrayRemove(user.uid),
      });
    }
    await db
      .doc(`posts/${post.id}`)
      .update({ likes: firebase.firestore.FieldValue.arrayUnion(user.uid) });
  };

  const dislikePost = async () => {
    const docRef = await db.doc(`posts/${post.id}`).get();
    const exists = docRef.data();
    if (exists.likes.includes(user.uid)) {
      await db.doc(`posts/${post.id}`).update({
        likes: firebase.firestore.FieldValue.arrayRemove(user.uid),
      });
    }
    await db
      .doc(`posts/${post.id}`)
      .update({ dislikes: firebase.firestore.FieldValue.arrayUnion(user.uid) });
  };

  return (
    <Box
      alignItems="flex-start"
      p="5"
      boxShadow="md"
      w={notSmallerScreen ? "5xl" : "full"}
    >
      <HStack spacing="5">
        <Avatar
          name={post.createdBy.name}
          src={!!post.createdBy.photoURL && post.createdBy.photoURL}
          size="md"
        />
        <Box>
          <Text fontSize="lg" fontWeight="semibold">
            {post.createdBy.name}
          </Text>
          <Text as="em" fontSize="sm">
            {moment(post.createdAt.toDate()).format("LLL")}
          </Text>
        </Box>
      </HStack>
      <Text mt="5">{post.postContent}</Text>
      <HStack spacing="7" mt="5" align="center">
        <HStack align="center" spacing="2">
          <Icon
            as={AiFillLike}
            w="5"
            h="5"
            color={post.likes.includes(user.uid) && "green.400"}
            _hover={{ color: "green.400" }}
            cursor="pointer"
            onClick={likePost}
          />
          <Text>{post.likes.length}</Text>
        </HStack>
        <HStack align="center" spacing="2">
          <Icon
            as={AiFillDislike}
            w="5"
            h="5"
            color={post.dislikes.includes(user.uid) && "red.400"}
            _hover={{ color: "red.400" }}
            cursor="pointer"
            onClick={dislikePost}
          />
          <Text>{post.dislikes.length}</Text>
        </HStack>
        <HStack align="center" spacing="2">
          <Icon as={MdComment} w="5" h="5" cursor="pointer" />
          <Text>{post.comments.length}</Text>
        </HStack>
        {post.createdBy.uid === user.uid && (
          <DeleteAlert icon={<MdMoreHoriz />} deletePost={deletePost} />
        )}
      </HStack>
    </Box>
  );
};

export default Post;
