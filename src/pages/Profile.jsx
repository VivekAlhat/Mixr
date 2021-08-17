import {
  VStack,
  Avatar,
  Center,
  Text,
  Spinner,
  Flex,
  HStack,
  Icon,
  Input,
  VisuallyHidden,
  useMediaQuery,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { useSession } from "../hooks/useSession";
import { MdLocationCity } from "react-icons/md";
import { db, storage } from "../firebase/firebase";
import moment from "moment";
import SocialLink from "../components/SocialLink";
import UserPosts from "../components/UserPosts";

const Profile = () => {
  const toast = useToast();
  const { user } = useSession();
  const [notSmallerScreen] = useMediaQuery("(min-width:600px)");
  const [userProfile, setUserProfile] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [isSelected, setSelected] = useState(false);

  const imgRef = useRef(null);

  useEffect(() => {
    const docRef = db.collection("users").doc(user.uid);
    docRef
      .get()
      .then((document) => document.exists && setUserProfile(document.data()));

    return () => {
      setUserProfile(null);
    };
  }, [user.uid, user]);

  const handleClick = (e) => {
    try {
      e.preventDefault();
      if (profileImg) {
        storage
          .ref()
          .child("users")
          .child(user.uid)
          .put(profileImg)
          .then((res) => res.ref.getDownloadURL())
          .then((photoURL) =>
            db.collection("users").doc(user.uid).update({ photoURL })
          )
          .then(
            toast({
              title: "Profile Image Updated",
              status: "success",
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
      setProfileImg(null);
      setSelected(false);
    }
  };

  const handleProfileImgChange = (e) => {
    setProfileImg(e.target.files[0]);
    setSelected(true);
  };

  return !!userProfile ? (
    <VStack>
      <Flex direction="column" align="center" justify="center">
        <Avatar
          name={userProfile.displayName}
          src={!!userProfile.photoURL && userProfile.photoURL}
          size={notSmallerScreen ? "2xl" : "xl"}
          mb="3"
          style={{ opacity: isSelected && "0.3" }}
          onClick={() => imgRef.current.click()}
        />
        <VisuallyHidden>
          <Input
            type="file"
            ref={imgRef}
            accept="image/*"
            multiple={false}
            onChange={handleProfileImgChange}
          />
        </VisuallyHidden>
        {isSelected && (
          <Button onClick={handleClick} colorScheme="teal" size="sm" mb="5">
            Update Photo
          </Button>
        )}
        <VStack spacing="5" maxW={notSmallerScreen ? "xl" : "full"} px="5">
          <Text fontSize="4xl" fontWeight="bold" mb="-2">
            {userProfile.displayName}
          </Text>
          {userProfile.bio && <Text align="center">{userProfile.bio}</Text>}
          {userProfile.location && (
            <HStack>
              <Icon as={MdLocationCity} />
              <Text>{userProfile.location}</Text>
            </HStack>
          )}
          <Text>
            Member Since:{" "}
            {moment(userProfile.createdAt.toDate(), "YYYYMMDD").fromNow()}
          </Text>
          <HStack spacing="10">
            {userProfile.instagram && (
              <SocialLink
                url={`https://www.instagram.com/${userProfile.instagram}`}
                icon={FaInstagram}
              />
            )}
            {userProfile.facebook && (
              <SocialLink
                url={`https://www.facebook.com/${userProfile.facebook}`}
                icon={FaFacebook}
              />
            )}
            {userProfile.twitter && (
              <SocialLink
                url={`https://www.twitter.com/${userProfile.twitter}`}
                icon={FaTwitter}
              />
            )}
          </HStack>
        </VStack>
        <UserPosts />
      </Flex>
    </VStack>
  ) : (
    <Center height="80vh">
      <Spinner />
    </Center>
  );
};

export default Profile;
