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
      <video className="video" src={videoBG} autoPlay loop muted></video>
      <div className='content'>
        <div className="desc">
          <Slider/>
        </div>
      </div>
    </div>
  )
}
