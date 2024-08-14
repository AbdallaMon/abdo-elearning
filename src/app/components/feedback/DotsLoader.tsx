"use client"
import styles from "./DotsLoader.module.css"
import {useEffect, useState} from "react";
import {gsap} from "gsap";


export default function DotsLoader() {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (typeof window !== "undefined") {
            setLoading(false)
        } else {
            setLoading(true)
        }
    }, [])
    useEffect(() => {
        if (!loading) {
            const tl = gsap.timeline();


            tl.to(".dot_container", {
                y: "-100%",
                duration: 1.5,
                ease: "power4.inOut",
            })
                  .to(".dot_container", {
                      display: "none",
                      duration: 0
                  });
        }
    }, [loading]);
    return (
          <div
                className={"fixed w-screen h-screen left-0 top-0 bg-white  z-[50000] flex items-center dot_container  "}>

              <div className="w-full h-[20px] text-center">
                  <div className={styles.dot + " before:bg-primary"}></div>
                  <div className={styles.dot + " before:bg-primary"}></div>
                  <div className={styles.dot + " before:bg-primary"}></div>
                  <div className={styles.dot + " before:bg-primary"}></div>
              </div>
          </div>
    )
}