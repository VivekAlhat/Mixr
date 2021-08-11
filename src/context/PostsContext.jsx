import { createContext, useState, useEffect } from "react";
import { db } from "../firebase/firebase";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setPosts(posts);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  return (
    <PostsContext.Provider value={{ posts, loading }}>
      {children}
    </PostsContext.Provider>
  );
};
