import "./home.css"
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import { useEffect, useState } from "react";
import axios from "axios"
import { useLocation } from "react-router-dom";


export default function Home() {
  const [posts,setPosts] = useState([]);
  const [limit, setLimit] = useState(8);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const {search} = useLocation();
  // const baseURL = process.env.REACT_APP_BACKEND_URL + "/api/posts" + search + `?skip={skip}`
  const baseURL = process.env.REACT_APP_BACKEND_URL + "/api/posts"+ search

  const handleScroll = () => {
    if(window.innerHeight + document.documentElement.scrollTop +1 >= document.documentElement.scrollHeight){
    //   const {offestHeight, scrollTop,scrollHeight} = e.target;
    // if(offestHeight + scrollTop === scrollHeight){
      setLoading(true);
      setSkip(prevSkip => prevSkip + limit);
    }
  };

useEffect(() => {
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll",handleScroll);
}, []);

 useEffect(()=>{
  const fetchPosts = async ()=>{
    // const res = await axios.get(baseURL);
    const res = await axios.get(baseURL, {
      params: {limit, skip}
    });
    // setPosts(res.data);
    setPosts((prev) => {
      return [...prev, ...res.data];
    });
    // setPosts(prevPosts => [...prevPosts, res.data])
    setLoading(false);
  }
  fetchPosts();
},[limit, skip])

useEffect(()=>{
  const fetchPosts = async ()=>{
    // const res = await axios.get(baseURL);
    const res = await axios.get(baseURL, {
      params: {limit, skip}
    });
    setPosts(res.data);
    setLoading(false);
    setSkip(0);
  }
  fetchPosts();
},[search])
  return (
    <>
      <Header/>
      <div className="home">
        <Posts posts={posts}/>
        <Sidebar/>
      </div>  
    </>
  )
}
