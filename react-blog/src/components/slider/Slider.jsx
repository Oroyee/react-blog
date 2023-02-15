import React from "react";
import HeroSlider, {Slide, Overlay} from 'hero-slider';
import './slider.css';
import image_1 from '../../assets/about_1.jpg';
import image_2 from '../../assets/about_2.jpg';
import image_3 from '../../assets/about_3.jpg';
import image_4 from '../../assets/about_4.jpg';
import image_5 from '../../assets/about_5.jpg';




export default function Slider() {
    const img_1 = image_1;
    const img_2 = image_2;
    const img_3 = image_3;
    const img_4 = image_4;
    const img_5 = image_5;

  return (
    <HeroSlider
        slideingAnimation="left_to_right"
        orientation="horizontal"
        initialSlide={1}
        onBeforeChange={(previousSlide, nextSlide) => console.log("onBeforeChange", previousSlide, nextSlide)}
        onChange={nextSlide => console.log("onChange", nextSlide)}
        onAfterChange={nextSlide => console.log("onAfterChange", nextSlide)}
        style={{
            backgroundColor: "rgba(0,0,0,0.50)"
        }}
        autoplay
        height={'80vh'}
        
        controller={{
            slidingDuration: 250,
            slidingDelay: 100,
            shouldAutoplay: true,
            shouldDisplayButtons: true,
            autoplayDuration: 1000,
            // height: "50vh"

        }}
    >
        <Overlay>
            <div className="Wrapper">
                <span className="aboutTitle">來自台中的男孩</span>
                <span className="aboutDesc">曾想讀台中一中，但是沒有考上</span>
                <span className="aboutDesc">最後跑去讀五專並順利從二技畢業</span>
                <span className="aboutDesc">2021年跑來馬爾他，展開新生活</span>
                <span className="aboutDesc">是個沒家世背景的普通男孩</span>
                <span className="aboutDesc">目前去過的地區: 北海道、馬爾他、西西里、羅馬、夏慕尼、威尼斯、英國(里茲、倫敦)、比薩、佛羅倫斯、巴黎</span>
                <span></span>
            </div>
        </Overlay>


        <Slide
            background={{
                backgroundImageSrc: img_1,
                backgroundAttachment: "fixed"
            }}
        />
        

            <Slide
                background={{
                    backgroundImageSrc: img_2,
                    backgroundAttachment: "fixed"
                }}
            />

            <Slide
                background={{
                    backgroundImageSrc: img_3,
                    backgroundAttachment: "fixed"
                }}
            />

            <Slide
                background={{
                    backgroundImageSrc: img_4,
                    backgroundAttachment: "fixed"
                }}
            />

            <Slide
                background={{
                    backgroundImageSrc: img_5,
                    backgroundAttachment: "fixed"
                }}
            />
    </HeroSlider>
  )
}