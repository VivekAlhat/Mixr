import { Box, Button, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import { signOut } from "../firebase/auth";

const Dashboard = () => {
  const history = useHistory();
  const { user } = useSession();

  const handleClick = async () => {
    await signOut();
    history.push("/signin");
  };
  return (
    <Box p="10">
      <Text>User Info</Text>
      <Text>{JSON.stringify(user)}</Text>
      <Button onClick={handleClick}>Sign Out</Button>
    </Box>
  );
};

export default Dashboard;
