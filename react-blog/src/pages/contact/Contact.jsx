import React, {useRef, useReducer} from 'react'
import './contact.css'
import videoBG from '../../assets/videoBg.mp4'
import emailjs from 'emailjs-com';
import ReCAPTCHA from 'react-google-recaptcha'
import { useState } from 'react';

const initialState = {
  name: '',
  email: '',
  message: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.value };
    case 'email':
      return { ...state, email: action.value };
    case 'message':
      return { ...state, message: action.value };
    default:
      throw new Error();
  }
}

function timeout(delay) {
  return new Promise( res => setTimeout(res, delay) );
}

export default function Contact() {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const [showFormErr, setShouwFormErr] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState({title: '', paragraph: ''});
  const [showCaptcha, setShowCaptcha] = useState(false);
  const {name, email, message} = formState;
  const refCaptcha = useRef(); // <- add the useRef hook

  let captcha;
  
  const submitFormAndShowCaptcha = (e) => {
    e.preventDefault();
    setShowCaptcha(true);
  };

  const resetCaptcha = () => {
    // maybe set it till after is submitted
    captcha.reset();
  }

  const sendEmail=(e) => {
    e.preventDefault();
    const token = refCaptcha.current.getValue();
    if (name ==='' || email ===''|| message==='') {
      setShouwFormErr(true);
      return;
    }

      const params ={
        ...formState,
        'g-recaptcha-response': token,
      };
  
      setFormSubmitted({title: 'Sending message...', paragraph: ''});
      emailjs.send(
        process.env.REACT_APP_EMAIL_JS_SERVICE,
        process.env.REACT_APP_EMAIL_JS_TEMPLATE,
        params,
        process.env.REACT_APP_EMAIL_JS_USER,
      )
      .then(async ({ status }) => {
        if (status === 200) {
          setFormSubmitted({ title: 'Message has been sent', paragraph: 'Jeff(Oro) will be in contact with you soon.' });
          await timeout(3000);
          window.location.reload();
        } else {
          setFormSubmitted({ title: 'Unexpected status code returned from EmailJS, try again later', paragraph: 'Please contact Jeff(Oro) either by phone or email.' });
        }
        }, (err) => {
          console.log(err);
          setFormSubmitted({ title: 'Error sending message, try again later', paragraph: 'Please contact Jeff(Oro) either by phone or email.' });
      });
  };
    


  return(
    <div className='main'>
    <div className="overlay"></div>
    <video className="video" src={videoBG} autoPlay playsInline loop muted></video>
    { formSubmitted.title === '' ? (
      
      <div className='content'>
     
        <form className='contact-form' onSubmit={sendEmail}>
          <div className='contact-form-item'>
            <span className="contact-form-title">Name</span>
            <input
                className="contact-form-item-name"
                name='from_name'
                type="text"
                value={name}
                onChange={(e) => dispatch({ type: 'name', value: e.target.value })}
                required
              />
          </div>
          <div className='contact-form-item'>
            <span className="contact-form-title">Email</span>
            <input
                className="contact-form-item-email"
                name="from_email"
                type="email"
                value={email}
                onChange={(e) => dispatch({ type: 'email', value: e.target.value })}
                required
              />
          </div>
          <div className='contact-form-item'>
            <span className="contact-form-title">Message</span>
            <textarea
                rows="10"
                cols="50"
                className="contact-form-item-message"
                name="message"
                type="text"
                value={message}
                onChange={(e) => dispatch({ type: 'message', value: e.target.value })}
                required
              />
          </div>
          <div className='contact-form-item'>
            <button className="contact-send" type="submit">Send</button>
          </div>
        </form>
        <div className='contact-form-item'>
          <ReCAPTCHA
          ref={refCaptcha}
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
          onChange={resetCaptcha}
          />
        </div>
    </div>
      ) : (
      <div className="content">
        <h3 className="contact-form-title">{formSubmitted.title}</h3>
        <p className="contact-form-title">{formSubmitted.paragraph}</p>
      </div>
  )
      }
    </div>
  );
}