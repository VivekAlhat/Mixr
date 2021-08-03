import { Center, Spinner } from "@chakra-ui/react";
import { useState, useEffect, createContext } from "react";
import { auth } from "../firebase/firebase";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [session, setSession] = useState({ user: null, loading: true });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) =>
      setSession({ loading: false, user })
    );

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={session}>
      {session.loading ? (
        <Center height="100vh">
          <Spinner />
        </Center>
      ) : (
        props.children
      )}
    </UserContext.Provider>
  );
};
