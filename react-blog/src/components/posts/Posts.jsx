import Post from "../post/Post"
import "./posts.css"
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

export default function Posts({ posts} ) {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [postsOffset, setPostsOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(posts.length);
  const [firstLoad, setFirstLoad] = useState(true)
  const handlePageClick = (event) => {
  
    if (posts.length > 8)
    {
      const newOffset = posts.length - ((event.selected+1) * 8) ;
      setEndOffset(newOffset+8);
      setPostsOffset(newOffset);
      setFirstLoad(false);
      setCurrentPage((event.selected+1));
    }
  };

  useEffect(() => {
    setPageCount(Math.ceil(posts.length / 8));

    if (firstLoad == true && pageCount!= 1){
      const newOffset = posts.length - (1 * 8) ;
      setEndOffset(newOffset+8);
      setPostsOffset(newOffset);
    }
    else if(pageCount == 1){
      const newOffset = 0;
      setEndOffset(posts.length);
      setPostsOffset(newOffset);
      setFirstLoad(true)
    }
    else if(firstLoad == false){
      if (posts.length - (8*currentPage) < 0){
        const newOffset = 0;
        setEndOffset(8+ posts.length - (8*currentPage))
        setPostsOffset(newOffset);
      }
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
