import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./webauto.css";


export default function Webauto() {

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
            trigger: '.wrapper-web',
            pin: true,
            scrub: 0.5,
            snap: 1 / (sections.length -1),
            start: 'top top',
            end: 7000,
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
        },
        color: 'white'
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
    document.querySelectorAll('.page').forEach(el => {

      gsap.to(el.querySelector('.caption-web'), {
          x: 0,
          y: 0,
          scrollTrigger: {
              containerAnimation: scrollTween,
              trigger: '.caption-web',
              start: 'top bottom',
              end: '+=1000',
              scrub: 0.5,
          }
      })
  
      gsap.to(el.querySelector('.quote-web'), {
          y: 0,
          ease: 'none',
          scrollTrigger: {
              containerAnimation: scrollTween,
              trigger: el.querySelector('.quote-web'),
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
      const sections = gsap.utils.toArray('section-web');
        let scrollTween = gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: 'none',
          scrollTrigger: {
              trigger: '.wrapper-web',
              pin: true,
              scrub: 0.5,
              snap: 1 / (sections.length - 1),
              start: 'top top',
              end: '6000',
          }
      })
      gsap.to('.logo', {
          fontSize: '1rem',
          top: '4rem',
          left: '4rem',
          scrollTrigger: {
              trigger: '.logo',
              start: 'top top',
              end: 3000,
              scrub: 0.5,
          }
      })
  
      gsap.to('.line', {
          height: '4rem',
          scrollTrigger: {
              trigger: '.line',
              scrub: 0.5,
              start: 'center center',
              end: 2500,
          }
      })
      document.querySelectorAll('.page').forEach(el => {
  
        gsap.to(el.querySelector('.caption-web'), {
            scrollTrigger: {
              left: '20%',
              y:0,
                containerAnimation: scrollTween,
                trigger: '.caption-web',
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
  
////////////////////////////
  useLayoutEffect(() => {
    ctx.add("(min-width: 400px) and (max-width: 819px)",() => {
      const sections = gsap.utils.toArray('section-web');
        let scrollTween = gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: 'none',
          scrollTrigger: {
              trigger: '.wrapper-web',
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
              end: 2500,
          }
      })
      document.querySelectorAll('.page').forEach(el => {
  
        gsap.to(el.querySelector('.caption-web'), {
            scrollTrigger: {
              left: '20%',
              y:0,
                containerAnimation: scrollTween,
                trigger: '.caption-web',
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
    <main ref={main} className="webautomation">
       <div class="logo">
       <h1>WEB<br/>Auto<br/>mation</h1>
    </div>

    <div class="wrapper-web">
        <section class="intro">
            <div class="line"></div>
        </section>

        <section class="first page" car = "tesla">
            <div class="block"></div>
            <img src="" alt=""/><span class="huge-text-web">Katalon</span>
            <div class="caption-web">
            Katalon Platform is an automation testing software tool. It is built on top of the open-source automation frameworks Selenium, Appium with a specialized IDE interface for web, API, mobile and desktop application testing.
            </div>
            <div class="timeline"><span>Platform</span></div>
            <div class="quote-web">
                An ultimate platform for automation
            </div>
        </section>

        <section class="second page" data-testid="darkmode">
            <div class="block"></div>
            <img src="" alt=""/><span class="huge-text-web">Theme Mode</span>
            <div class="caption-web">
            Dark mode can create a calming environment, reducing the cognitive load on users. It is often perceived as more modern and sophisticated, which can positively influence user perception and engagement with digital interfaces. Light mode is typically associated with clarity and simplicity. It is often preferred in well-lit environments and can enhance the perception of cleanliness and organization, which is crucial in productivity and professional settings.

            </div>
            <div class="timeline"><span>Mode</span></div>
            <div class="quote-web">
                <p>Dark mode can enhance focus and save power for the device.</p>
                <p>Light mode is typically associated with clarity and simplicity.</p>
            </div>
        </section>

        <section class="third page" >
            <div class="block"></div>
            <img src="" alt=""/><span class="cucumber huge-text-web">Cucumbuer</span>
            <div class="caption-web">
                Cucumber is a software tool that supports behavior-driven development. Central to the Cucumber BDD approach is its ordinary language parser called Gherkin. It allows expected software behaviors to be specified in a logical language that customers can understand.
            </div>
            <div class="timeline"><span>Framework</span></div>
            <div class="quote-web">
                <p>Easy to understand</p>
                <p>Promotes reusability</p>
            </div>
        </section>
        <section class="forth page" >
            <div class="block"></div>
            <img src="" alt=""/><span class="huge-text-web">Objects</span>
            <div class="caption-web">
                There are many kinds of objects from a front-end perspective with which users can interact. And each of them has a different kind of behaviour.
            </div>
            <div class="timeline"><span>Objects</span></div>
            <div class="quote-web">
                To design UI automation we must think about the users perspective
            </div>
        </section>
        <section class="fifth page" >
            <div class="block"></div>
            <img src="" alt=""/><span class="huge-text-web">Locators</span>
            <div class="caption-web">
                Locators in Selenium WebDriver are used to identify and interact with WebElements within a web page's Document Object Model (DOM).
            </div>
            <div class="timeline"><span>Objects</span></div>
            <div class="quote-web">
                Locator strategies like xpath, id, name, text, css selector can cover most of the study
            </div>
        </section>
        <section class="sixth page" >
            <div class="block"></div>
            <img src="" alt=""/><span class="huge-text-web">Xpath</span>
            <div class="caption-web">
                XPath is an expression language designed to support the query or transformation of XML documents. Most of the automation objects locating strategies are based on it.
            </div>
            <div class="timeline"><span>Locators</span></div>
            <div class="quote-web">
                <p>Xpath is like address of objects</p>
                <p>Absolute XPath vs Relative XPath is always a study</p>
            </div>
        </section>
    </div>
    </main>
  );
}
