import { useState } from "react"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./write.css"
import axios from "axios"
import { useContext } from "react"
import { Context } from "../../context/Context"
import EditorToolbar, { modules, formats } from "../../components/editorToolbar/EditorToolbar";


export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const [categories, setCategories] = useState("");
    const {user}= useContext(Context);
    const upload = process.env.REACT_APP_BACKEND_URL + "/api/upload"
    const baseURL = process.env.REACT_APP_BACKEND_URL + "/api/posts"
    const imageURL = process.env.REACT_APP_IMAGE_URL
    const uploadPreset =  process.env.REACT_APP_UPLOAD_PRESET
    

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const newPost = {
            username:user.username,
            title,
            desc,
            categories,
        };
        let imageUrl = "";

        if(file){
            const data =  new FormData();
            const filename = Date.now() + file.name;
            data.append("file", file);
            data.append("upload_preset", uploadPreset);
            newPost.photo = filename;
            const config = {
                headers: { "X-Requested-With": "XMLHttpRequest" },
              };
            const dataRes = await axios.post(
              imageURL,
              data,
              config  
            );
            imageUrl = dataRes.data.url;
            newPost.photo = imageUrl;
            // try{
            //     // await axios.post("https://oroblog.herokuapp.com/api/upload",data);
            //     // await axios.post("/upload",data);
            //     await axios.post("/upload",submitPost);
            // }catch(err){}
            // const data =  new FormData();
            // var reader = new FileReader();
            // reader.readAsDataURL(file);
            // reader.onload = function(e){
            //     var imgcode = e.target.result;
            //     console.log(imgcode);
            //     newPost.photo = imgcode;
            //     data.append("file",imgcode);
            // }
            // const submitPost = {
            //     image: imageUrl,
            // };
            // try{
            //     // await axios.post("/upload", data);
            //     // await axios.post(upload,data);
            //     await axios.post(upload,submitPost);
            // }catch(err){}
        }
        try {
            const res = await axios.post(baseURL,newPost);
            // const res = await axios.post("/posts",newPost);
            // await new Promise(resolve => setTimeout(resolve, 10000));
            window.location.replace("/post/"+res.data._id);
        } catch (error) {}
    };
  return (
    <div className="write">
        {file &&
        // <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        }
        <form className="writeForm" onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                    <i className="writeIcon fa-solid fa-plus"></i>
                </label>
                <input type="file" id="fileInput" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])} />
                <input type="text" placeholder="Title" className="writeInput" autoFocus={true} onChange={e=>setTitle(e.target.value)}/>
            </div>
            <div className="writeFormGroup">
                <input type="text" placeholder="Categories" className="writeInput writeCategories" onChange={e=>setCategories(e.target.value)}/>
            </div>
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
            {/* <div className="writeFormGroup">
                <textarea placeholder="Tell your story..." type="text" className="writeInput writeText" onChange={e=>setDesc(e.target.value)}
                ></textarea>
            </div> */}
            <button className="writeSubmit" type="Submit">Publish</button>
        </form>
    </div>
  )
}
