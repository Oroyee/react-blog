import React from 'react'
import './contact.css'
import videoBG from '../../assets/videoBg.mp4'

export default function Contact() {
  return (
    <div className='main'>
      <div className="overlay"></div>
      <video src={videoBG} autoPlay loop muted></video>
      <div className='content'>
        {/* <div className="photo">
          123
        </div> */}
        <div className="desc">
        <h1 className='title'>jeff.zhan.company@gmail.com</h1>
        {/* <p>To my site</p> */}
        </div>
      </div>
    </div>
  )
}
