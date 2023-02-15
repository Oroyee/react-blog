import Post from "../post/Post"
import "./posts.css"
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

export default function Posts({ posts} ) {
  const [currentPosts, setCurrentPosts] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [postsOffset, setPostsOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(8);
  const handlePageClick = (event) => {
    // const newOffset = (event.selected * 8) % posts.length;
    if (posts.length - ((event.selected+1) * 8) < 0 )
    {
      const newOffset = 0;
      setEndOffset(8 + (posts.length - ((event.selected+1) * 8)));
      setPostsOffset(newOffset);
    }else{
      const newOffset = posts.length - ((event.selected+1) * 8) ;
      setEndOffset(newOffset+8);
      setPostsOffset(newOffset);
    }
  };

  useEffect(() => {
    // setCurrentPosts(posts.slice(postsOffset, endOffset));
    // setPostsOffset((posts.length) - 4);
    setPageCount(Math.ceil(posts.length / 8));
  }, [posts, postsOffset]);

  return (
    <>
      <div className="posts">
        {posts.slice(postsOffset, endOffset).reverse().map((p) => (
          <Post post={p} />
        ))}
      <div className="pagination">
        <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              activeClassName={"active"} /> 
        </div>
      </div>  
    </>
  )
}
