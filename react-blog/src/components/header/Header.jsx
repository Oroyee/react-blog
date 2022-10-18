import "./header.css"
import videoBG from '../../assets/blogBg.mp4'

export default function Header() {
  return (
    <div className='header'>
      <div className="headerOverlay"/>
        <video src={videoBG} autoPlay loop muted/>
        <div className="headerTitles">
          <span className="headerTitleSm">to my BLOG</span>
          <span className="headerTitleLg">Welcome</span>
        </div>
        {/* <img className="headerImg" src="https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /> */}
        
    </div>
  )
}
