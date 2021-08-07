import {
  Box,
  Textarea,
  Button,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  Text,
  useToast,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState } from "react";
import { db } from "../firebase/firebase";
import { useSession } from "../hooks/useSession";

const CreatePost = () => {
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [notSmallerScreen] = useMediaQuery("(min-width:600px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSession();
  const toast = useToast();

  const handleChange = (e) => {
    setPostContent(e.target.value);
  };

  const createPost = async () => {
    try {
      setLoading(true);
      if (postContent.length < 5) {
        throw new Error("Post should contain atleast 5 characters");
      }
      const post = {
        postContent,
        likes: 0,
        dislikes: 0,
        comments: 0,
        createdAt: new Date(),
        createdBy: {
          uid: user.uid,
          name: user.displayName,
        },
      };
      await db.collection("posts").add(post);
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setLoading(false);
      setPostContent("");
      onClose();
    }
  };

  return (
    <VStack alignSelf="center">
      <Button onClick={onOpen} size={notSmallerScreen ? "md" : "sm"}>
        Write Post
      </Button>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size="lg"
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent p="4" m="3">
          <Text fontSize="lg" fontWeight="semibold" align="center">
            Post Something
          </Text>
          <Box mt="3">
            <Textarea
              resize="none"
              placeholder="What's on your mind?"
              rows="5"
              autoComplete="off"
              value={postContent}
              onChange={handleChange}
            />
            <Button
              float="right"
              mt="3"
              colorScheme="blue"
              onClick={createPost}
              isLoading={loading ? true : false}
              loadingText="Creating Post"
            >
              Create Post
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default CreatePost;
