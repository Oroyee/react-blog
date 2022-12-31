import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom"
import { Context } from "../../context/Context";
import "./singlePost.css"
import DOMPurify from "dompurify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "../editorToolbar/EditorToolbar";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const {user} = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const baseURL = process.env.REACT_APP_BACKEND_URL + '/api/posts/';

  useEffect(()=>{
    const getPost = async () => {
      const res = await axios.get(baseURL + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  },[path]);


  const handleDelete = async() => {
    try {
      await axios.delete(baseURL + post._id, {
        data:{username:user.username},
    });
      window.location.replace("/");
    } catch (error) {}
  };

  const handleUpdate = async() => {
    try {
      await axios.put(baseURL + post._id, {
      username:user.username,
      title,
      desc,
    });
      window.location.reload();
      setUpdateMode(false);
    } catch (error) {}
  };

  return (
    <div className="singlePost">
        <div className="singlePostWrapper">
          {post.photo&&(
            <img 
              className="singlePostImg" 
              src={post.photo}
              alt="" 
            />
          )}
          {
            updateMode ? <input type="text" value={title} className="singlePostTitleInput" autoFocus onChange={(e)=>setTitle(e.target.value)}/> : (
            <h1 className="singlePostTitle">
              {title}
              {post.username === user?.username && (
                <div className="singlePostEdit">
                <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
                <i className="singlePostIcon fa-regular fa-trash-can" onClick={handleDelete}></i>
              </div>
            )}
            </h1>
            )
          }
          <div className="singlePostInfo">
            <span className="singlePostAuthor">
              Author:  
              <Link to={`/?user=${post.username}`} className="link">
                <b>{post.username}</b>
              </Link>
            </span>
            <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
          </div>
          {updateMode ? (

            <div className="text-editor">
                <EditorToolbar />
                <ReactQuill
                className="editor"
                theme="snow"
                value={desc}
                onChange={setDesc}
                placeholder={"Write something awesome..."}
                modules={ modules }
                formats={formats}
              />
            </div>
            
            
          ):(
            // <p className="singlePostDesc">{desc}</p>
            <p className="singlePostDesc"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p> 
          )}
        </div>
        <div>
          {updateMode && 
              <button className="singlePostButton" onClick={handleUpdate}>Update</button>
            }
        </div>
    </div>
  )
}
