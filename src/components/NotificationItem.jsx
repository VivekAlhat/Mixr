import { Text, Link } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";

const NotificationItem = ({ user, post }) => {
  return (
    <Text fontSize="lg">
      <Link as={RouteLink} to={`/users/${user.uid}`}>
        {user.displayName}
      </Link>
      &nbsp;liked your&nbsp;
      <Link as={RouteLink} to={`/posts/${post}`}>
        post.
      </Link>
    </Text>
  );
};

export default NotificationItem;
