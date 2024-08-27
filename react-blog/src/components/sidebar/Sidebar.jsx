import { useEffect, useState } from "react";
import axios from "axios";
import "./sidebar.css"
import { Link } from "react-router-dom";
import ScrollTop from "../scrollTop/ScrollTop"

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
            <img src=" https://res.cloudinary.com/do44hvboo/image/upload/v1724443303/Oro-2024.jpg" alt="Oro in Malta 2024" />
            
            <p>Oro, a boy from Taiwan who has been working and liveing in Malta for 3 years. Currently working at Chiliz as a QA Test Engineer. <br></br><br></br>
            Oro，西班牙語為黃金之意，也是一隻會YeeYee叫恐龍的名字，偶肉則是前同事取的諧音。現任職總部位於馬爾他的區塊鏈公司-Chiliz 擔任自動化軟體測試工程師。倒數第二屆基測生因沒考上台中一中鬼轉五專菁英班，曾任職國家中山科學研究院。台灣疫情爆發期間，離開台中反向深入重災區歐洲尋找機會，是個總是自找麻煩卻樂此不疲的在馬爾他台灣人。興趣是收集故事，相信文字能夠改變人生。
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
