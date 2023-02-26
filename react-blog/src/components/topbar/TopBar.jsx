import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css"
import { useEffect, useState } from "react";
import axios from "axios";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const handleLogout = () =>{
    dispatch({type:"LOGOUT"})
  };

  function closeTopList(){
    document.getElementById("checkbox_toggle").checked = false;
  };

  function closeTopProfile(){
    document.getElementById("topProfile_toggle").checked = false;
  };

  const [cats,setCats] = useState([]);
    const baseURL = process.env.REACT_APP_BACKEND_URL + "/api/categories";
    useEffect(()=>{
        const getCats = async ()=>
            {
                const res = await axios.get(baseURL);
                setCats(res.data);
            };
        getCats();
    },[]);
  return (
    <div className='top'>
      {/* from font awesome */}
        <div className="topLeft">
          <a target="_blank" href="https://www.youtube.com/channel/UCfvTULySWBBbZ3sH-5SvOMg">
            <i className="topIcon fa-brands fa-square-youtube"></i>
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/jie-fu-jeff-zhan-5202b0215/">
            <i class="topIcon fa-brands fa-linkedin"></i>
          </a>
          <a target="_blank" href="https://www.facebook.com/profile.php?id=100001015279689">
            <i className="topIcon fa-brands fa-square-facebook"></i>
          </a>
          <a target="_blank" href="https://www.instagram.com/oroyeee/">
            <i className="topIcon fa-brands fa-square-instagram"></i>
          </a>
        </div>
        <input type="checkbox" id="checkbox_toggle" />
        <label for="checkbox_toggle" className="hamburger">&#9776;</label>
        <input type="checkbox" id="topProfile_toggle" />
        <label for="topProfile_toggle" className="infoIcon">&#9432;</label>
        <div className="topCenter">
          <ul className="topList">
            <li className="topListItem" onClick={closeTopList}>
              <Link className="link" to="/">HOME</Link>
            </li>
            <li className="topListItem" onClick={closeTopList}><Link className="link" to="/about">ABOUT</Link></li>
            <li className="topListItem" onClick={closeTopList}><Link className="link" to="/contact">CONTACT</Link></li>
            <li className="topListItem" onClick={closeTopList}><Link className="link" to="/write">{user && "WRITE"}</Link></li>
            <li className="topListItem-close" onClick={closeTopList}>CLOSE</li>
              <li className="topListItem" onClick={handleLogout}>
                {user && "LOGOUT"}
              </li>
          </ul>
        </div>
        <div className="topRight">
          {
            user ? (
              <Link to="/settings">
                <img 
                className="topImg"
                src={user.profilePic}
                alt="" 
                />
              </Link>
              ) : (
              <ul className="topList">
                  <li className="topListItem">
                    <Link className="link" to="/login">LOGIN</Link>
                  </li>
                <li className="topListItem">
                  {user && <Link className="link" to="/register">REGISTER</Link>}
                </li>
              </ul>
            )
          }
          <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="topProfile">
          <div className="topProfileItem">
              <span className="topProfileTitle">ABOUT ME</span>
              <img src=" https://res.cloudinary.com/do44hvboo/image/upload/v1676721771/upload/oro.jpg" alt="Oro and the sunshine in Tigne beach" />
              
              <p>Oro, a boy from Taiwan who has been working and liveing in Malta for 2 years. Currently working at Chiliz as a QA Test Engineer. <br></br><br></br>
              偶肉，一名來自台灣的男孩，已經在馬爾他生活及工作兩年，目前在Chiliz-一間區塊鍊相關公司，擔任QA Test Engineer
              </p>
              
              
          </div>
          <div className="topProfileItem">
              <span className="topProfileTitle">CATEGORIES</span>
              <ul className="topProfileList">
                  {cats.map((c) => (
                    <button className="catButton" onClick={closeTopProfile} type="button">
                      <Link to={`/?cat=${c.name}`} className="link">
                          <li className="topProfileListItem">{c.name}</li>
                      </Link>
                    </button>
                  ))}
              </ul>
          </div>
          <button className="menuButton" onClick={closeTopProfile} type="button">CLOSE</button>
        </div>
    </div>
  )
}
