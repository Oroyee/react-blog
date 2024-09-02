import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./about.css";


export default function About() {

  const main = useRef();
  const scrollTween = useRef();
  // const [ctx] = useState(gsap.context(() => {}, main));
  const ctx = gsap.matchMedia();

  const goToSection = (i) => {
    // Remove the GSAP instance with the specific ID
    // to prevent memory leak
    ctx.data.forEach((e) => {
      if (e.vars && e.vars.id === "scrollTween") {
        e.kill();
      }
    });
    ctx.add("(min-width: 200px)",() => {
      scrollTween.current = gsap.to(window, {
        scrollTo: { y: i * window.innerHeight, autoKill: false },
        duration: 1,
        id: "scrollTween",
        onComplete: () => (scrollTween.current = null),
        overwrite: true
      });
    },main);
  };
  

  useLayoutEffect(() => {
    ctx.add("(min-width: 820px)",() => {
    const sections = gsap.utils.toArray('section');
      let scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
            trigger: '.wrapper',
            pin: true,
            scrub: 0.5,
            snap: 1 / (sections.length - 1),
            start: 'top top',
            end: 4000,
        }
    })
    gsap.to('.logo', {
        fontSize: '2.5rem',
        top: '4rem',
        scrollTrigger: {
            trigger: '.logo',
            start: 'top top',
            end: 1500,
            scrub: 0.5,
        }
    })

    gsap.to('.line', {
        height: '10rem',
        scrollTrigger: {
            trigger: '.line',
            scrub: 0.5,
            start: 'center center',
            end: 2000,
        }
    })
    document.querySelectorAll('.character').forEach(el => {

      gsap.to(el.querySelector('.caption'), {
          x: 0,
          y: 0,
          scrollTrigger: {
              containerAnimation: scrollTween,
              trigger: '.caption',
              start: 'top bottom',
              end: '+=1000',
              scrub: 0.5,
          }
      })
  
      gsap.to(el.querySelector('.quote'), {
          y: 0,
          ease: 'none',
          scrollTrigger: {
              containerAnimation: scrollTween,
              trigger: el.querySelector('.quote'),
              start: 'top bottom',
              end: '+=20%',
              scrub: 0.5,
          }
      })
  
      gsap.to(el.querySelector('.timeline'), {
          y: 0,
          ease: 'none',
          scrollTrigger: {
              containerAnimation: scrollTween,
              trigger: el.querySelector('.timeline'),
              start: 'top bottom',
              end: '+=10%',
              scrub: 0.5,
          }
      })
  
      gsap.to(el.querySelector('.block'), {
          x: 0,
          ease: 'none',
          scrollTrigger: {
              containerAnimation: scrollTween,
              trigger: el.querySelector('.block'),
              start: 'top bottom',
              end: '+=' + window.innerWidth,
              scrub: 0.5,
          }
      })
  
      gsap.to(el.querySelector('img'), {
          y: 0,
          ease: 'none',
          scrollTrigger: {
              containerAnimation: scrollTween,
              trigger: el.querySelector('img'),
              start: 'top bottom',
              end: '+=50%',
              scrub: 0.5,
          }
      })
  
      gsap.to(el.querySelector('.huge-text'), {
          y: 0,
          ease: 'none',
          scrollTrigger: {
              containerAnimation: scrollTween,
              trigger: el.querySelector('.huge-text'),
              start: 'top bottom',
              end: '+=100%',
              scrub: 0.5,
          }
      })
  })
});
return () => ctx.revert();
  }, []);
  


  //////////////////////////////////
  useLayoutEffect(() => {
    ctx.add("(max-width: 400px)",() => {
      const sections = gsap.utils.toArray('section');
        let scrollTween = gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: 'none',
          scrollTrigger: {
              trigger: '.wrapper',
              pin: true,
              scrub: 0.5,
              snap: 1 / (sections.length - 1),
              start: 'top top',
              end: 4000,
          }
      })
      gsap.to('.logo', {
          fontSize: '1rem',
          top: '4rem',
          left: '4rem',
          scrollTrigger: {
              trigger: '.logo',
              start: 'top top',
              end: 1500,
              scrub: 0.5,
          }
      })
  
      gsap.to('.line', {
          height: '4rem',
          scrollTrigger: {
              trigger: '.line',
              scrub: 0.5,
              start: 'center center',
              end: 2000,
          }
      })
      document.querySelectorAll('.character').forEach(el => {
  
        gsap.to(el.querySelector('.caption'), {
            scrollTrigger: {
              left: '20%',
              y:0,
                containerAnimation: scrollTween,
                trigger: '.caption',
                start: 'top bottom',
                end: '+=1000',
                scrub: 0.5,
            }
        })
    
        gsap.to(el.querySelector('.timeline'), {
            y: 0,
            ease: 'none',
            scrollTrigger: {
                containerAnimation: scrollTween,
                trigger: el.querySelector('.timeline'),
                start: 'top bottom',
                end: '+=10%',
                scrub: 0.5,
            }
        })
    
        gsap.to(el.querySelector('.block'), {
            x: 0,
            ease: 'none',
            scrollTrigger: {
                containerAnimation: scrollTween,
                trigger: el.querySelector('.block'),
                start: 'top bottom',
                end: '+=' + window.innerWidth,
                scrub: 0.5,
            }
        })
    
        gsap.to(el.querySelector('img'), {
            y: 0,
            ease: 'none',
            scrollTrigger: {
                containerAnimation: scrollTween,
                trigger: el.querySelector('img'),
                start: 'top bottom',
                end: '+=50%',
                scrub: 0.5,
            }
        })
    
        gsap.to(el.querySelector('.huge-text'), {
            y: 0,
            ease: 'none',
            scrollTrigger: {
                containerAnimation: scrollTween,
                trigger: el.querySelector('.huge-text'),
                start: 'top bottom',
                end: '+=100%',
                scrub: 0.5,
            }
        })
    })
  });
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    ctx.add("(min-width: 400px) and (max-width: 819px)",() => {
      const sections = gsap.utils.toArray('section');
        let scrollTween = gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: 'none',
          scrollTrigger: {
              trigger: '.wrapper',
              pin: true,
              scrub: 0.5,
              snap: 1 / (sections.length - 1),
              start: 'top top',
              end: 4000,
          }
      })
      gsap.to('.logo', {
          fontSize: '2rem',
          top: '4rem',
          left: '3rem',
          scrollTrigger: {
              trigger: '.logo',
              start: 'top top',
              end: 1500,
              scrub: 0.5,
          }
      })
  
      gsap.to('.line', {
          height: '4rem',
          scrollTrigger: {
              trigger: '.line',
              scrub: 0.5,
              start: 'center center',
              end: 2000,
          }
      })
      document.querySelectorAll('.character').forEach(el => {
  
        gsap.to(el.querySelector('.caption'), {
            scrollTrigger: {
              left: '20%',
              y:0,
                containerAnimation: scrollTween,
                trigger: '.caption',
                start: 'top bottom',
                end: '+=1000',
                scrub: 0.5,
            }
        })
    
        gsap.to(el.querySelector('.timeline'), {
            y: 0,
            ease: 'none',
            scrollTrigger: {
                containerAnimation: scrollTween,
                trigger: el.querySelector('.timeline'),
                start: 'top bottom',
                end: '+=10%',
                scrub: 0.5,
            }
        })
    
        gsap.to(el.querySelector('.block'), {
            x: 0,
            ease: 'none',
            scrollTrigger: {
                containerAnimation: scrollTween,
                trigger: el.querySelector('.block'),
                start: 'top bottom',
                end: '+=' + window.innerWidth,
                scrub: 0.5,
            }
        })
    
        gsap.to(el.querySelector('img'), {
            y: 0,
            ease: 'none',
            scrollTrigger: {
                containerAnimation: scrollTween,
                trigger: el.querySelector('img'),
                start: 'top bottom',
                end: '+=50%',
                scrub: 0.5,
            }
        })
    
        gsap.to(el.querySelector('.huge-text'), {
            y: 0,
            ease: 'none',
            scrollTrigger: {
                containerAnimation: scrollTween,
                trigger: el.querySelector('.huge-text'),
                start: 'top bottom',
                end: '+=100%',
                scrub: 0.5,
            }
        })
    })
  });
    return () => ctx.revert();
  }, []);

  return (  
    <main ref={main} className="aboutpage">
       <div class="logo">
       <h1>台灣<br/>囡仔<br/>Taiwan</h1>
    </div>

    <div class="wrapper">
        <section class="intro">
            <div class="line"></div>
        </section>

        <section class="now character">
            <div class="block"></div>
            <img src="https://res.cloudinary.com/do44hvboo/image/upload/v1724443303/Oro-2024.jpg" alt=""/><span class="huge-text">臺中</span>
            <div class="caption">
                本名詹傑富，現實英文名Jeff，在網路上則有另一個名稱Oro並經營Youtube頻道: OroYee 咿!偶肉。現居於歐洲地中海上的小島馬爾他，已邁入第四年。因緣際會之下加入總部位於馬爾他的區塊鏈公司-Chiliz，擔任QA Test Engineer並主要負責自動化測試，每天過著忙碌新奇且充實的日子。
            </div>
            <div class="timeline"><span>Timeline</span>2022-Now</div>
            <div class="quote">
                不是千錘的擊打所能奏效，而是流水般的殷勤使頑石臻於完美。
            </div>
        </section>

        <section class="past character">
            <div class="block"></div>
            <img src="https://res.cloudinary.com/do44hvboo/image/upload/v1676998500/upload/26-years-old-in-malta-2_jvrjxl.jpg" alt=""/><span class="huge-text">緣起</span>
            <div class="caption">
                俗話說畢業及失業，起初對遊戲行業感興趣，在經歷求職地獄並待業半年以後，有幸至中科院航空所服務，在一年後主動辭職。隨後幾經波折，在台灣疫情爆發初期毅然選擇出國，至馬爾他展開新生活。
            </div>
            <div class="timeline"><span>Timeline</span>2020-2022</div>
            <div class="quote">
                出國並非自己有多優秀，反倒是自己在台灣沒有競爭力才出國
            </div>
        </section>

        <section class="future character">
            <div class="block"></div>
            <img src="https://res.cloudinary.com/do44hvboo/image/upload/v1677001137/upload/malta-story-01_r75l0y.jpg" alt=""/><span class="huge-text">未完</span>
            <div class="caption">
                目前足跡以遍布歐洲超過20座城市，往永居的旅途上不停挑戰自我，嘗試未曾體驗過的事情。經歷重重難關之後有所體悟，自信與自戀僅一字之差，前者知道自己不能做到什麼，後者則不知道自己不能做到什麼，如今的我，已有自信面對未來的挑戰。
            </div>
            <div class="timeline"><span>Timeline</span>Continue</div>
            <div class="quote">
                自信的培養需要時間沉澱，過往的經歷成就今日的自己。
            </div>
        </section>
    </div>
    </main>
  );
}
