import { useContext } from "react";
import { PostsContext } from "../context/PostsContext";

export const usePosts = () => {
  const posts = useContext(PostsContext);
  return posts;
};
