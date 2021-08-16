import { Center, Spinner } from "@chakra-ui/react";
import { useState, useEffect, createContext } from "react";
import { auth } from "../firebase/firebase";
import { createUserDocument } from "../firebase/user";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [session, setSession] = useState({ user: null, loading: true });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserDocument(userAuth);
        userRef.onSnapshot((snapshot) =>
          setSession({
            loading: false,
            user: { uid: snapshot.id, ...snapshot.data() },
          })
        );
      }
      setSession({ loading: false, user: userAuth });
    });

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
