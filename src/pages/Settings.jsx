import {
  VStack,
  InputGroup,
  Input,
  InputLeftAddon,
  InputLeftElement,
  useMediaQuery,
  Textarea,
  Center,
  Text,
  Button,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { MdLocationOn, MdEmail } from "react-icons/md";
import { useSession } from "../hooks/useSession";
import { updateUserDocument } from "../firebase/user";

const Settings = () => {
  const { user } = useSession();
  const toast = useToast();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    email: "",
    location: "",
    instagram: "",
    facebook: "",
    twitter: "",
  });
  const [notSmallerScreen] = useMediaQuery("(min-width:600px)");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const updatable = {};
      for (const [key, value] of Object.entries(formData)) {
        if (value) {
          updatable[key] = value;
        }
      }

      if (updatable) {
        await updateUserDocument(user.uid, updatable)
          .then(
            toast({
              title: "Profile Updated!",
              status: "success",
              isClosable: true,
              position: "top-right",
            })
          )
          .catch((err) =>
            toast({
              title: err.message,
              status: "error",
              isClosable: true,
              position: "top-right",
            })
          );
      }
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setFormData({
        displayName: "",
        bio: "",
        email: "",
        location: "",
        instagram: "",
        facebook: "",
        twitter: "",
      });
      setLoading(false);
      history.push("/profile");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Center>
        <VStack
          spacing="4"
          p={!notSmallerScreen && "3"}
          mb="5"
          w={notSmallerScreen ? "lg" : "full"}
        >
          <Text fontSize="2xl" fontWeight="semibold">
            Profile Settings
          </Text>
          <Divider />
          <Input
            placeholder="Display Name"
            size="md"
            name="displayName"
            autoComplete="off"
            value={formData.displayName}
            onChange={handleChange}
          />
          <Textarea
            placeholder="Your Bio"
            size="md"
            resize="none"
            name="bio"
            autoComplete="off"
            value={formData.bio}
            onChange={handleChange}
          />
          <InputGroup size="md">
            <InputLeftElement
              pointerEvents="none"
              children={<MdEmail color="gray.300" />}
            />
            <Input
              type="email"
              placeholder="Your Email"
              name="email"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup size="md">
            <InputLeftElement
              pointerEvents="none"
              children={<MdLocationOn color="gray.300" />}
            />
            <Input
              type="text"
              placeholder="Your Location"
              name="location"
              autoComplete="off"
              value={formData.location}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup size="md">
            <InputLeftAddon children="https://www.instagram.com/" />
            <Input
              type="text"
              name="instagram"
              autoComplete="off"
              value={formData.instagram}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup size="md">
            <InputLeftAddon children="https://www.facebook.com/" />
            <Input
              type="text"
              name="facebook"
              autoComplete="off"
              value={formData.facebook}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup size="md">
            <InputLeftAddon children="https://www.twitter.com/" />
            <Input
              type="text"
              name="twitter"
              autoComplete="off"
              value={formData.twitter}
              onChange={handleChange}
            />
          </InputGroup>
          <Button
            colorScheme="blue"
            w="full"
            type="submit"
            isLoading={loading ? true : false}
            loadingText="Updating Profile"
          >
            Update
          </Button>
        </VStack>
      </Center>
    </form>
  );
};

export default Settings;
