import {
  VStack,
  Avatar,
  Center,
  Text,
  Divider,
  Spinner,
  useMediaQuery,
  Flex,
  Link,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  FaInstagram,
  FaGithub,
  FaFacebook,
  FaTwitter,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { useSession } from "../hooks/useSession";
import { db } from "../firebase/firebase";

const Profile = () => {
  const { user } = useSession();
  const [notSmallerScreen] = useMediaQuery("(min-width:600px)");
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const docRef = db.collection("users").doc(user.uid);
    docRef
      .get()
      .then((document) => document.exists && setUserProfile(document.data()));
  }, [user.uid]);

  return !!userProfile ? (
    <VStack w="lg" spacing="5" p={!notSmallerScreen && "5"} width="100%">
      <VStack w={notSmallerScreen ? "3xl" : "full"}>
        <Flex direction="column" align="center" p="5">
          <Avatar
            name={userProfile.name}
            size={notSmallerScreen ? "2xl" : "xl"}
            mb="3"
          />
          <Text fontSize="4xl" fontWeight="bold" mb="3">
            {userProfile.name}
          </Text>
          {userProfile.bio && (
            <Text align="center" mb="3">
              {userProfile.bio}
            </Text>
          )}
          <HStack spacing="10" mt="5">
            {userProfile.instagram && (
              <Link
                href={`https://www.instagram.com/${userProfile.instagram}`}
                isExternal
              >
                <Icon
                  as={FaInstagram}
                  w={5}
                  h={5}
                  _hover={{ color: "blue.400" }}
                />
              </Link>
            )}
            {userProfile.facebook && (
              <Link
                href={`https://www.facebook.com/${userProfile.facebook}`}
                isExternal
              >
                <Icon
                  as={FaFacebook}
                  w={5}
                  h={5}
                  _hover={{ color: "blue.400" }}
                />
              </Link>
            )}
            {userProfile.twitter && (
              <Link
                href={`https://www.twitter.com/${userProfile.twitter}`}
                isExternal
              >
                <Icon
                  as={FaTwitter}
                  w={5}
                  h={5}
                  _hover={{ color: "blue.400" }}
                />
              </Link>
            )}
            {userProfile.github && (
              <Link
                href={`https://www.github.com/${userProfile.github}`}
                isExternal
              >
                <Icon
                  as={FaGithub}
                  w={5}
                  h={5}
                  _hover={{ color: "blue.400" }}
                />
              </Link>
            )}
            {userProfile.website && (
              <Link href={`https://${userProfile.website}`} isExternal>
                <Icon
                  as={FaExternalLinkAlt}
                  w={5}
                  h={5}
                  _hover={{ color: "blue.400" }}
                />
              </Link>
            )}
          </HStack>
        </Flex>
      </VStack>
      <Divider />
      <Flex
        width="100%"
        justify="space-around"
        direction={notSmallerScreen ? "row" : "column"}
      >
        {userProfile.work && (
          <VStack p="5">
            <Text fontSize="lg" fontWeight="semibold">
              Work
            </Text>
            <Text fontSize="md" align="center">
              {userProfile.work}
            </Text>
          </VStack>
        )}
        {userProfile.education && (
          <VStack p="5">
            <Text fontSize="lg" fontWeight="semibold">
              Education
            </Text>
            <Text fontSize="md" align="center">
              {userProfile.education}
            </Text>
          </VStack>
        )}
        {userProfile.location && (
          <VStack p="5">
            <Text fontSize="lg" fontWeight="semibold">
              Location
            </Text>
            <Text fontSize="md" align="center">
              {userProfile.location}
            </Text>
          </VStack>
        )}
      </Flex>
    </VStack>
  ) : (
    <Center height="80vh">
      <Spinner />
    </Center>
  );
};

export default Profile;
