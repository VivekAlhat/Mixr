import {
  Box,
  Textarea,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useMediaQuery,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { db } from "../firebase/firebase";
import { useSession } from "../hooks/useSession";
import { MdCreate } from "react-icons/md";

const CreatePost = () => {
  const [notSmallerScreen] = useMediaQuery("(min-width:600px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSession();
  const toast = useToast();

  const handleChange = (e) => {
    setPostContent(e.target.value);
  };

  const createPost = async () => {
    try {
      setLoading(true);
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
      toast({
        title: "Created a new post",
        status: "success",
        position: "top-right",
      });
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
        position: "top-right",
      });
    } finally {
      setLoading(false);
      setPostContent("");
      onClose();
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="blue"
        leftIcon={<MdCreate />}
        alignSelf={notSmallerScreen ? "flex-end" : "center"}
        mx="5"
      >
        Compose
      </Button>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size="xl"
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent p="5" m="5" borderRadius="none">
          <Box>
            <Textarea
              resize="none"
              size="lg"
              placeholder="What's on your mind?"
              rows="5"
              autoComplete="off"
              value={postContent}
              onChange={handleChange}
            />
            <Button
              w="full"
              mt="5"
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
    </>
  );
};

export default CreatePost;
