export const getActivePost = (data, id) => {
  const filteredPosts = data.posts.filter((item) => item.id === id);
  const post = filteredPosts[0];
  return post;
};
