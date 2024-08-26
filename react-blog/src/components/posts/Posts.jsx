import Post from "../post/Post"
import "./posts.css"
import { useEffect, useState } from "react";

export default function Posts({ posts} ) {
  // const [postsOffset, setPostsOffset] = useState([]);
  const [postsOffset, setPostsOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(posts.length);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // setPostsOffset(postsOffset +1 );
    // setPostsOffset((prev) => [...prev, ...endOffset])
    // setEndOffset(posts.length)
    // setPostsOffset(Math.ceil(posts.length/8))
  }, [posts, postsOffset]);


  return (
    <>
      <div className="posts">
        {posts.slice(0, posts.length).reverse().map((p) => (
          <Post post={p} />
        ))}
      </div>  
    </>
  )
}
