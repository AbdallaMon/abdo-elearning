"use client"
import {motion} from "framer-motion";

export function MotionWrapper({children}) {
    return (
          <motion.div layout>
              {children}
          </motion.div>
    )
}