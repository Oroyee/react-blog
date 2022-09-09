import "./post.css"

export default function Post() {
  return (
    <div className="post">
        <img className="postImg" src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        <div className="postInfo">
            <div className="postCats">
                <span className="postCat">Music</span>
                <span className="postCat">Life</span>
            </div>
            <span className="postTitle">Lorem ipsum dolor sit</span>
            <hr />
            <span className="postDate">1 hour ago</span>
        </div>
        <p className="postDesc">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, fugit non. Fugiat sint quae repellendus voluptatibus temporibus et at? Maxime labore ipsum dicta dignissimos voluptatibus, omnis commodi et maiores debitis.
        </p>
    </div>
  )
}
