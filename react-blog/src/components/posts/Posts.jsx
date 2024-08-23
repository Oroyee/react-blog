import Post from "../post/Post"
import "./posts.css"
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

export default function Posts({ posts} ) {
  const [currentPosts, setCurrentPosts] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [postsOffset, setPostsOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(posts.length);
  const [firstLoad, setFirstLoad] = useState(true)
  const handlePageClick = (event) => {
    if (posts.length - ((event.selected+1) * 8) < 0 )
    {
      const newOffset = 0;
      setEndOffset(8 + (posts.length - ((event.selected+1) * 8)));
      setPostsOffset(newOffset);
      setFirstLoad(false);
    }else{
      const newOffset = posts.length - ((event.selected+1) * 8) ;
      setEndOffset(newOffset+8);
      setPostsOffset(newOffset);
      setFirstLoad(false);
    }
  };

  useEffect(() => {
    if (firstLoad == true){
      const newOffset = posts.length - (1 * 8) ;
      setEndOffset(newOffset+8);
      setPostsOffset(newOffset);
    }
    setPageCount(Math.ceil(posts.length / 8));

    if(pageCount == 1){
      const newOffset = 0;
      setEndOffset(8 + (posts.length - (pageCount * 8)));
      setPostsOffset(newOffset);
      setFirstLoad(false);
    }
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
              nextLabel="Next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              marginPagesDisplayed={3}
              pageCount={pageCount}
              previousLabel="< Prev"
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
