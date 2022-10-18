import React from 'react'
import videoBG from '../../assets/videoBg.mp4'
import './about.css'

export default function About() {
  return (
    <div className='main'>
      <div className="overlay"></div>
      <video src={videoBG} autoPlay loop muted></video>
      <div className='content'>
        {/* <div className="photo">
          123
        </div> */}
        <div className="desc">
        <h1 className='title'>To be continued</h1>
        {/* <p>To my site</p> */}
        </div>
      </div>
    </div>
  )
}
