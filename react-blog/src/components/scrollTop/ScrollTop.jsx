import { useEffect, useState } from "react";
import "./scrollTop.css"

export default function ScrollTop() {
    const [showGoTop, setShowGoTop]  = useState(false);

    const handleVisibleButton = () => {
        setShowGoTop ( window.pageYOffset > 400)
    }

    const handleScrollUp = () => {
        window.scrollTo({ left:0, top: 0, behavior: 'smooth'})
        setShowGoTop(false)
    }

    useEffect( () => {
        window.addEventListener('scroll', handleVisibleButton)
    },[])

    return (
        <>
          <div className={showGoTop ? 'goTop' : 'goTopHidden'} onClick={ handleScrollUp}>
            <button className='goTopButton'>
                <span>^</span>
            </button>
          </div>  
        </>
      )
}