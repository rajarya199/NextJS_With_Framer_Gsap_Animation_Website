"use client";

import { motion, easeOut } from "framer-motion";
const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};
export default function Hero() {
  return (
    <section className="relative pt-24 min-h-[calc(100vh-6rem)] px-6 lg:px-12 ">
      <div className="max-w-7xl mx-auto px-6 w-full justify-center items-center flex">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="flex flex-col items-center justify-center text-center"
        >
       
          {/* Main Heading */}
          <motion.h1
            variants={item}
            className="
  text-[clamp(3.5rem,7vw,7.2rem)]
    leading-[clamp(3.2rem,7vw,6.5rem)]
            font-bold
              tracking-tight
            text-center
              text-black dark:text-white
              max-w-5xl
            "
              style={{
    fontFamily: "'Syne', sans-serif",
    fontWeight: 500,
    lineHeight: '0.75'
  }}
          >
            ROAR IN THE
            <br />
         <span>
               DIGITAL WILDERNESS
            </span>
          
          </motion.h1>

        <motion.p
  variants={item}
  className="
    mt-8 max-w-xl
    text-lg
    text-black/70 dark:text-white/90
    font-['Syne'] 
    font-normal 
    text-[14px] 
    leading-4
  "
  style={{
    fontFamily: 'Syne, sans-serif',
    fontWeight: 400,
    fontStyle: 'normal'
  }}
>
  <p className="text-center">
   <span>
    We roar with success, delivering the TRIONN<sup>®</sup>
  </span> <br />
  <span>through versatile design, branding and the latest</span> <br/>
  <span>tech development to companies.</span>    <br/>
  </p>
</motion.p>

        
        </motion.div>
      </div>
 {/* CTA */}
          <motion.div variants={item} className="mt-12 ">
            <button
              className="
                px-8 py-4 rounded-full
                border border-black/20 dark:border-white/20
                text-black dark:text-white
                hover:bg-black hover:text-white
                dark:hover:bg-white dark:hover:text-black
                transition-all duration-300
              "
            >
              View Our Work
            </button>
          </motion.div>
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2
                   text-xs tracking-widest
                   text-black/50 dark:text-white/50"
      >
        SCROLL
      </motion.div>
    </section>
  );
}




