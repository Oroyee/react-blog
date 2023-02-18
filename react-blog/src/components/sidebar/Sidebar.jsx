import { useEffect, useState } from "react";
import axios from "axios";
import "./sidebar.css"
import { Link } from "react-router-dom";

export default function Sidebar() {
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
    <div className="sidebar">
        <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT ME</span>
            <img src=" https://res.cloudinary.com/do44hvboo/image/upload/v1676721771/upload/v5z4oxqwy1m0cjhynq9e.jpg" alt="Oro and the sunshine in Tigne beach" />
            
            <p>Oro, a boy from Taiwan who has been working and liveing in Malta for 2 years. <br></br>
            Oro，一名來自台灣的男孩，已經在馬爾他生活及工作兩年，目前在Chiliz-一間區塊鍊相關公司，擔任QA Test Engineer
            </p>
            
            
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            <ul className="sidebarList">
                {cats.map((c) => (
                    <Link to={`/?cat=${c.name}`} className="link">
                        <li className="sidebarListItem">{c.name}</li>
                    </Link>
                ))}
            </ul>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW ME</span>
            <div className="sidebarSocial">
                <a target="_blank" href="https://www.youtube.com/channel/UCfvTULySWBBbZ3sH-5SvOMg">
                    <i className="sidebarIcon fa-brands fa-square-youtube"></i>
                </a>
                <a target="_blank" href="https://www.linkedin.com/in/jie-fu-jeff-zhan-5202b0215/">
                    <i className="sidebarIcon fa-brands fa-linkedin"></i>
                </a>
                <a target="_blank" href="https://www.facebook.com/profile.php?id=100001015279689">
                    <i className="sidebarIcon fa-brands fa-square-facebook"></i>
                </a>
                <a target="_blank" href="https://www.instagram.com/oroyeee/">
                    <i className="sidebarIcon fa-brands fa-square-instagram"></i>
                </a>
            </div>
        </div>
    </div>
  )
}
