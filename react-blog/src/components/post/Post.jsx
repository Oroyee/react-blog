import "./post.css"
import {Link, useLocation} from "react-router-dom"

export default function Post({post}) {
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="post">
      {post.photo && (
        <img className="postImg" src={post.photo} alt="" />)}
        <div className="postInfo">
            <div className="postCats">{
              post.categories.map(c=>(
                <span className="postCat">{c.name}</span>
              ))
            }  
            </div>
            <Link to={`/post/${post._id}`} className="link">
              <span className="postTitle">{post.title}</span>
            </Link>
            <hr />
            <span className="postDate">{new Date (post.createdAt).toDateString()}</span>
        </div>
        <p className="postDesc">
            {getText(post.desc)}
        </p>
    </div>
  )
}
