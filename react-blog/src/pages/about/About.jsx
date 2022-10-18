import React from 'react'
import videoBG from '../../assets/videoBg.mp4'
import './about.css'

export default function About() {
  return (
    <div className='main'>
      <div className="overlay"></div>
      <video src={videoBG} autoPlay loop muted/>
      <div className='content'>
        <h1>Welcome</h1>
        <p>To my site</p>
      </div>
    </div>
  )
}
