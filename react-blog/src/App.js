import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home"
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// If you are using react-router-dom v6, it looks like Switch has been replaced with Routes.
function App() {
  const {user} = useContext(Context);
  // const baseURL = process.env.REACT_APP_BACKEND_URL
  // fetch(baseURL).then(res => res.json()).then(data => console.log(data));
  return (
    <Router>
        <TopBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={user ? <Home/> : <Register/>} />
          <Route path="/login" element={user? <Home/> : <Login/>} />
          <Route path="/write" element={user? <Write/> : <Login/>} />
          <Route path="/settings" element={user? <Settings/> : <Login/>} />
          <Route path="/post/:postId" element={<Single/>} />
        </Routes>
    </Router>
  );
}

export default App;
