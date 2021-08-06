import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { db } from "../firebase/firebase";
import { useSession } from "../hooks/useSession";
import moment from "moment";

const Post = ({ post }) => {
  const { user } = useSession();

  const deletePost = async () => {
    await db.doc(`posts/${post.id}`).delete();
  };

  return (
    <Box
      alignItems="flex-start"
      p="5"
      border="1px"
      borderRadius="md"
      borderColor="gray.200"
      w="full"
    >
      <Text>{post.postContent}</Text>
      <HStack spacing="10" mt="5">
        <HStack align="center" spacing="2">
          <Icon
            as={AiOutlineLike}
            _hover={{ color: "green" }}
            cursor="pointer"
          />
          <Text>{post.likes}</Text>
        </HStack>
        <HStack align="center" spacing="2">
          <Icon
            as={AiOutlineDislike}
            _hover={{ color: "red" }}
            cursor="pointer"
          />
          <Text>{post.dislikes}</Text>
        </HStack>
      </HStack>
      <Box>
        <Text mt="5">Posted By: {post.createdBy.name}</Text>
        <Text mt="5">
          Created on {moment(post.createdAt.toDate()).format("ll")}
        </Text>
      </Box>
      {post.createdBy.uid === user.uid && (
        <Icon
          as={MdDelete}
          w="5"
          h="5"
          alignSelf="center"
          cursor="pointer"
          onClick={deletePost}
          _hover={{ color: "red" }}
        />
      )}
    </Box>
  );
};

export default Post;
