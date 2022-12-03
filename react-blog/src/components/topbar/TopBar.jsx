import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css"

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "https://oro-blog-production.up.railway.app/images/";

  const handleLogout = () =>{
    dispatch({type:"LOGOUT"})
  };
  return (
    <div className='top'>
      {/* from font awesome */}
        <div className="topLeft">
          <a target="_blank" href="https://www.youtube.com/channel/UCfvTULySWBBbZ3sH-5SvOMg">
            <i className="topIcon fa-brands fa-square-youtube"></i>
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/jeff-zhan-5202b0215/">
            <i class="topIcon fa-brands fa-linkedin"></i>
          </a>
          <a target="_blank" href="https://www.facebook.com/profile.php?id=100001015279689">
            <i className="topIcon fa-brands fa-square-facebook"></i>
          </a>
          <a target="_blank" href="https://www.instagram.com/oroyeee/">
            <i className="topIcon fa-brands fa-square-instagram"></i>
          </a>
        </div>
        <div className="topCenter">
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/">HOME</Link>
            </li>
            <li className="topListItem"><Link className="link" to="/about">ABOUT</Link></li>
            <li className="topListItem"><Link className="link" to="/contact">CONTACT</Link></li>
            <li className="topListItem"><Link className="link" to="/write">{user && "WRITE"}</Link></li>
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
                  {/* {user && <Link className="link" to="/register">REGISTER</Link>} */}
                  {user && <Link className="link" to="/login">LOGIN</Link>}
                </li>
              </ul>
            )
          }
          
          <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
        </div>
    </div>
  )
}
