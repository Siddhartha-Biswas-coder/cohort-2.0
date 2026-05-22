import { useContext, useEffect } from "react";
import { PostContext } from "../post.content";
import {
  getFeed,
  createPost,
  likePost,
  unLikePost,
} from "../services/post.api";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, setLoading, post, setPost, feed, setFeed } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    const data = await getFeed();
    setFeed(data.posts);
    setLoading(false);
  };

  const handleCreatePost = async (imageFile, caption) => {
    setLoading(true);
    const data = await createPost(imageFile, caption);
    setFeed([data.post, ...feed]);
    setLoading(false);
  };

  const handleLikePost = async (postId) => {
    const data = await likePost(postId);
    await handleGetFeed();
  };

  const handleUnLikePost = async (postId) => {
    const data = await unLikePost(postId);
    await handleGetFeed();
  };

  useEffect(() => {
    handleGetFeed;
  }, []);

  return {
    loading,
    feed,
    post,
    handleGetFeed,
    handleCreatePost,
    handleLikePost,
    handleUnLikePost,
  };
};
