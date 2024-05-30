/* eslint-disable react-hooks/exhaustive-deps */
import "./index.css";
import PostCard from "../../components/post-card";
import PostForm from "../../components/post-form";
import { useEffect, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import { usePostsStore } from "../../stores/posts";

export default function Feed() {
  const [toggle, setToggle] = useState(false);
  
  const {posts, loading, getPosts} = usePostsStore(state => state)
  useEffect(() => {
    setToggle(false);

    getPosts()

  }, []);
  return (
    <div className="feed">
      <ul
        className="feed_container--posts"
      >
        {!loading &&
        
          posts.map((post) => <li key={post.post_id}><PostCard post={post} /></li>)}
        {!loading && posts.length === 0 && <strong>Not have posts now!</strong>}
        {loading && <strong>Loading...</strong>}
      </ul>

      <div
        className="feed_black"
        style={{
          opacity: toggle ? 0.8 : 0,
        }}
      ></div>
      <button
        className="feed_button--create"
        onClick={() => setToggle((s) => !s)}
      >
        <IconPlus
          style={{
            transform: `rotate(${toggle ? 45 : 0}deg)`,
          }}
        />
      </button>

      <div
        className="feed_create--post"
        style={{
          maxHeight: toggle ? "100%" : 0,
        }}
      >
        <PostForm
          setToggle={setToggle}
        />
      </div>
    </div>
  );
}
