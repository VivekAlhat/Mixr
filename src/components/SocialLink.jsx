import { Link, Icon } from "@chakra-ui/react";

const SocialLink = ({ url, icon }) => {
  return (
    <Link href={url} isExternal>
      <Icon as={icon} w={5} h={5} _hover={{ color: "blue.400" }} />
    </Link>
  );
};

export default SocialLink;
