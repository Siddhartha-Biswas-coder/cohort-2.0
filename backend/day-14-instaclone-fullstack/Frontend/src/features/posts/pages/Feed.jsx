import Post from "../components/Post";
import "../styles/feed.scss";
import { usePost } from "../hooks/usePost";
import { useEffect } from "react";
import Nav from "../../shared/components/Nav";

const Feed = () => {
  const { loading, feed, handleGetFeed, handleLikePost, handleUnLikePost } =
    usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return (
      <main>
        <h1>Feed is Loading</h1>
      </main>
    );
  }

  console.log(feed);

  return (
    <main className="feed-page">
      <Nav />
      <div className="feed">
        <div className="posts">
          {feed.map((post, idx) => {
            return (
              <Post
                key={idx}
                user={post.user}
                post={post}
                loading={loading}
                handleLikePost={handleLikePost}
                handleUnLikePost={handleUnLikePost}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
