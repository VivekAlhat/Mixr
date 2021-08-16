import {
  VStack,
  Avatar,
  Center,
  Text,
  Spinner,
  Flex,
  HStack,
  useMediaQuery,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { useSession } from "../hooks/useSession";
import { MdLocationCity } from "react-icons/md";
import { db } from "../firebase/firebase";
import moment from "moment";
import SocialLink from "../components/SocialLink";
import UserPosts from "../components/UserPosts";

const Profile = () => {
  const { user } = useSession();
  const [notSmallerScreen] = useMediaQuery("(min-width:600px)");
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const docRef = db.collection("users").doc(user.uid);
    docRef
      .get()
      .then((document) => document.exists && setUserProfile(document.data()));

    return () => {
      setUserProfile(null);
    };
  }, [user.uid]);

  return !!userProfile ? (
    <VStack>
      <Flex direction="column" align="center" justify="center">
        <Avatar
          name={userProfile.displayName}
          src={!!userProfile.photoURL && userProfile.photoURL}
          size={notSmallerScreen ? "2xl" : "xl"}
          mb="3"
        />
        <VStack spacing="5" maxW={notSmallerScreen ? "xl" : "full"} px="5">
          <Text fontSize="4xl" fontWeight="bold">
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
