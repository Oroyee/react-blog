import React, {useState} from 'react';
import videoBG from '../../assets/videoBg.mp4';
import {useSpring, animated} from 'react-spring';
import './about.css'
import Slider from '../../components/slider/Slider'


export default function About() {
  const [flip, setFlip] = useState(false);
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },

  });

  return (
    <div className='main'>
      
      <div className="overlay"></div>
      <video src={videoBG} autoPlay loop muted></video>
      <div className='content'>
        {/* <div className="photo">
          123
        </div> */}
        
        <div className="desc">
        {/* <h1 className='title'>To be continued</h1> */}
        {/* <animated.div style={props}>
          <img src="https://images.pexels.com/photos/13022057/pexels-photo-13022057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /> 
          <div className='titl'>
            <p>123</p>
            <p>To be continuedAAA</p> 
          </div>
        </animated.div> */}
          <Slider/>
        {/* <p>To my site</p> */}
        </div>
      </div>
    </div>
  )
}
