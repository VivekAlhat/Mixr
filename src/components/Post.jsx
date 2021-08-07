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
import { db } from "../firebase/firebase";
import { useSession } from "../hooks/useSession";
import DeleteAlert from "./DeleteAlert";
import moment from "moment";

const Post = ({ post }) => {
  const { user } = useSession();
  const [notSmallerScreen] = useMediaQuery("(min-width:600px)");

  const deletePost = async () => {
    await db.doc(`posts/${post.id}`).delete();
  };

  return (
    <Box
      alignItems="flex-start"
      p="5"
      boxShadow="md"
      w={notSmallerScreen ? "5xl" : "full"}
    >
      <HStack spacing="5">
        <Avatar name={post.createdBy.name} size="md" />
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
            _hover={{ color: "green.400" }}
            cursor="pointer"
          />
          <Text>{post.likes}</Text>
        </HStack>
        <HStack align="center" spacing="2">
          <Icon
            as={AiFillDislike}
            w="5"
            h="5"
            _hover={{ color: "red.400" }}
            cursor="pointer"
          />
          <Text>{post.dislikes}</Text>
        </HStack>
        <HStack align="center" spacing="2">
          <Icon as={MdComment} w="5" h="5" cursor="pointer" />
          <Text>{post.comments}</Text>
        </HStack>
        {post.createdBy.uid === user.uid && (
          <DeleteAlert icon={<MdMoreHoriz />} deletePost={deletePost} />
        )}
      </HStack>
    </Box>
  );
};

export default Post;
