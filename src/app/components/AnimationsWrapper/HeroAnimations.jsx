"use client"
import {motion} from "framer-motion";
import {useEffect} from "react";
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HeroTextAnimation({children}) {
    return (
          <motion.div
                layout
                className={" max-lg:text-center my-auto"}
                initial={{opacity: 0, y: 100}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.3}}
          >
              {children}
          </motion.div>
    )
}

export function HeroImageAnimation({children}) {
    return (
          <motion.div
                layout
                className={"w-full"}
                initial={{opacity: 0, x: 100}}
                animate={{opacity: 1, x: 0}}
                transition={{delay: 0.3}}
          >
              {children}
          </motion.div>
    )
}

export function LevelsAnimationWrapper({stages, children}) {
    useEffect(() => {
        const handleRotate = (index) => {
            if (index === 0)
                return -15
            if (index === 1)
                return 0
            return 15
        }
        stages.forEach((stage, index) => {
            gsap.fromTo(
                  `.card-${stage.id}`,
                  {
                      opacity: 0,
                      y: 50,
                      scale: 0.9,
                      rotation: handleRotate(index),
                  },
                  {
                      ease: "power4.out",
                      scrollTrigger: {
                          trigger: `.card-${stage.id}`,
                          start: "top 90%",
                          end: "top 40%",
                          scrub: true,
                          onEnter: () => gsap.to(`.card-${stage.id}`, {
                              opacity: 1,
                              y: 0,
                              scale: 1,
                              rotation: 0,
                              duration: 1
                          }),
                          onLeaveBack: () => gsap.to(`.card-${stage.id}`, {
                              opacity: 0,
                              y: 50,
                              scale: 0.9,
                              rotation: handleRotate(index),
                              duration: 1
                          }),

                          markers: false,
                      }
                  }
            );
        });
    }, []);
    return (
          <>
              {children}
          </>
    )
}