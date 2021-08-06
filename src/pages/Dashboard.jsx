import { VStack, useMediaQuery } from "@chakra-ui/react";
import CreatePost from "../components/CreatePost";
import Posts from "../components/Posts";

const Dashboard = () => {
  const [notSmallerScreen] = useMediaQuery("(min-width:600px)");

  return (
    <VStack align="flex-start" px={!notSmallerScreen && "5"}>
      <CreatePost />
      <Posts />
    </VStack>
  );
};

export default Dashboard;
