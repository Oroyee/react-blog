import "./singlePost.css"

export default function SinglePost() {
  return (
    <div className="singlePost">
        <div className="singlePostWrapper">
          <img className="singlePostImg" src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
          <h1 className="singlePostTitle">
            Lorem ipsum dolor sit, amet consectetur. 
            <div className="singlePostEdit">
              <i className="singlePostIcon fa-regular fa-pen-to-square"></i>
              <i className="singlePostIcon fa-regular fa-trash-can"></i>
            </div>
          </h1>
          <div className="singlePostInfo">
            <span className="singlePostAuthor">Author: <b>Safak</b></span>
            <span className="singlePostDate">1 hour ago</span>
          </div>
          <p className="singlePostDesc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi velit atque aliquam,
            illo earum expedita provident ipsam natus fugit iusto,
            quam ipsa laudantium nemo numquam illum perspiciatis pariatur aspernatur qui!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi velit atque aliquam,
            illo earum expedita provident ipsam natus fugit iusto,
            quam ipsa laudantium nemo numquam illum perspiciatis pariatur aspernatur qui!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi velit atque aliquam,
            illo earum expedita provident ipsam natus fugit iusto,
            quam ipsa laudantium nemo numquam illum perspiciatis pariatur aspernatur qui!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi velit atque aliquam,
            illo earum expedita provident ipsam natus fugit iusto,
            quam ipsa laudantium nemo numquam illum perspiciatis pariatur aspernatur qui!</p>
        </div>
    </div>
  )
}
