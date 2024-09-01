import React, {useState} from 'react';
import videoBG from '../../assets/videoBg.mp4';
import {useSpring, animated} from 'react-spring';
import './about.css'
import Slider from '../../components/slider/Slider'

import { useRef } from 'react';

import gsap from 'gsap'; // <-- import GSAP
import { useGSAP } from '@gsap/react'; // <-- import the hook from our React package

gsap.registerPlugin(useGSAP);

export default function About() {
  const container = useRef();
  useGSAP(
    () => {
        // gsap code here...
        gsap.to('.box', { rotation: 180 }); // <-- automatically reverted
    },
    { scope: container }
); // <-- scope for selector text (optional)

  return (
    <div className='main'>
       <div ref={container} className="app">
            <div className="box">Hello</div>
        </div>
    </div>
  )
}
