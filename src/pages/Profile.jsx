import {
  VStack,
  Avatar,
  Divider,
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
import SocialLink from "../components/SocialLink";

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
      <Center>
        <Flex
          direction={notSmallerScreen ? "row" : "column"}
          p="5"
          align="center"
        >
          <Avatar
            alignSelf={!notSmallerScreen && "center"}
            name={userProfile.name}
            size={notSmallerScreen ? "2xl" : "xl"}
            mb="3"
            mr={notSmallerScreen && "10"}
          />
          <VStack
            align={notSmallerScreen ? "flex-start" : "center"}
            spacing="5"
            px="5"
          >
            <Text fontSize="4xl" fontWeight="bold">
              {userProfile.name}
            </Text>
            {userProfile.bio && <Text align="center">{userProfile.bio}</Text>}
            {userProfile.location && (
              <HStack>
                <Icon as={MdLocationCity} />
                <Text>{userProfile.location}</Text>
              </HStack>
            )}
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
        </Flex>
      </Center>
      <Divider />
    </VStack>
  ) : (
    <Center height="80vh">
      <Spinner />
    </Center>
  );
};

export default Profile;
