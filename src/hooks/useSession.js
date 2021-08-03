import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useSession = () => {
  const session = useContext(UserContext);
  return session;
};
