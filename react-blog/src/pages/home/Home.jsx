import "./home.css"
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import { useEffect, useState } from "react";
import axios from "axios"
import { useLocation } from "react-router-dom";
import ScrollTop from "../../components/scrollTop/ScrollTop"
import Loader from "../../components/loader/Loader";


export default function Home() {
  const [posts,setPosts] = useState([]);
  const [limit, setLimit] = useState(4);
  const [skip, setSkip] = useState(0);
  const [skipHandler, setSkipHandler] = useState(0);
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const {search} = useLocation();
  const baseURL = process.env.REACT_APP_BACKEND_URL + "/api/posts"+ search

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const handleScroll = () => {
  if(window.innerHeight + document.documentElement.scrollTop +1 >= document.documentElement.scrollHeight){
  //   const {offestHeight, scrollTop,scrollHeight} = e.target;
  // if(offestHeight + scrollTop === scrollHeight){
    setLoading(true); 
    setFirstLoading(false)
  }
};
window.addEventListener("scroll", debounce(handleScroll, 500));

useEffect(()=>{
  const fetchPosts = async ()=>{
    // const res = await axios.get(baseURL);
    const res = await axios.get(baseURL, {
      params: {limit}
    });
    setPosts(res.data);
    
  }
  setLoading(false);
  setSkip(0);
  fetchPosts();
  setFirstLoading(true)
},[search])

 useEffect(()=>{
  const fetchPosts = async ()=>{
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
  if(firstLoading == false){
    fetchPosts();
  }
},[skip]);

useEffect(() => {
  if (loading == true && posts.length >= skip && firstLoading == false) {
    setSkip(prevSkip => prevSkip + limit);
  }
}, [loading]);


  return (
    <>
      <Header/>
      <div className="home">
        <Posts posts={posts}/>
        <Sidebar/>
        <ScrollTop/>
        {loading&&<Loader/>}
      </div>  
    </>
  )
}
