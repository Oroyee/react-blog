import axios from "axios";
import { useState } from "react";
import { useContext } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import { Context } from "../../context/Context"
import "./settings.css"

export default function Settings() {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const {user, dispatch} = useContext(Context);
    const baseURL = process.env.REACT_APP_BACKEND_URL + "/api/users/"

    const handleSubmit = async(e) =>{
        e.preventDefault();
        dispatch({type:"UPDATE_START"});
        const updatedUser = {
            userId:user._id,
            username,
            email,
            password,
        };

        if(file){
            // 頭像以 base64 data URL 直接存進使用者資料
            const imgcode = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
            updatedUser.profilePic = imgcode;
        }
        try {
            const res = await axios.put(baseURL +user._id, updatedUser,{
                headers: { Authorization: "Bearer " + user.token },
            });
            setSuccess(true);
            dispatch({type:"UPDATE_SUCCESS", payload:res.data});
        } catch (error) {
            dispatch({type:"UPDATE_FAILURE"});
        }
    };

    const handleDelete = async() => {
        try {
          await axios.delete(baseURL + user._id, {
            headers: { Authorization: "Bearer " + user.token },
            data:{username:user.username},
        });
          window.location.replace("/");
        } catch (error) {}
      };

  return (
    <div className="settings">
        <div className="settingsWrapper">
            <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update Your Account</span>
                <span className="settingsDeleteTitle" onClick={handleDelete}>Delete Account</span>
            </div>
            <form className="settingsForm" onSubmit={handleSubmit}>
                <label>Profile Picture</label>
                <div className="settingsPP">
                    <img src={file ? URL.createObjectURL(file) : user.profilePic} alt="" />
                    <label htmlFor="fileInput">
                        <i className="settingsPPIcon far fa-circle-user"></i>
                    </label>
                    <input type="file" id="fileInput" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])}/>
                </div>
                <label>Username</label>
                <input type="text" placeholder= {user.username} onChange={e=>setUsername(e.target.value)} />
                <label>Email</label>
                <input type="email" placeholder={user.email} onChange={e=>setEmail(e.target.value)} />
                <label>Passwrod</label>
                <input type="password" onChange={e=>setPassword(e.target.value)}/>
                <button className="settingsSubmit" type="Submit">Update</button>
                {success && <span style={{color:"green", textAlign:"center", marginTop:"20px"}}>Profile has been updated...</span>}
            </form>
        </div>
        <Sidebar/>
    </div>
  )
}
