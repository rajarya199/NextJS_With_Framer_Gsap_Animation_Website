"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gradient reveal title
      gsap.to(".waw-title-line", {
        backgroundPositionX: "0%",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "60% center",
          scrub: true,
        },
      });

      // Paragraph split lines
      const split = new SplitType(".waw-line", { types: "lines" ,tagName:"span"});

      gsap.from(split.lines, {
        y: 70,
        stagger: 0.06,
        duration: 0.7,
        scrollTrigger: {
          trigger: ".waw-p1",
          start: "top 20%",
          end: "center center",
          toggleActions: "play none reverse",
        },
      });

      // Popup text + button
      gsap.from(".waw-popup", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 0.7,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".waw-p2",
          start: "top 85%",
          toggleActions: "play none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 lg:px-12 bg-white dark:bg-black transition-colors duration-500 h-full"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12 pb-4">

        {/* TITLE */}
        <h2 className="text-[clamp(6rem,12vw,10rem)] leading-[0.9] font-myfont font-bold">
          <span
            className="waw-title-line block bg-size-[200%_100%] bg-right bg-clip-text"
            style={{ backgroundImage: "linear-gradient(90deg,#111 50%,#aaa 0)" }}
          >
            WHO
          </span>
          <span
            className="waw-title-line  inline-block bg-size-[200%_100%] bg-right  bg-clip-text"
            style={{ backgroundImage: "linear-gradient(90deg,#111 50%,#aaa 0)" }}
          >
            WE ARE
          </span>
        </h2>

        {/* PARAGRAPH 1 */}
        <div className="waw-p1  text-5xl font-syne text-zinc-800 dark:text-zinc-200 leading-relaxed">
          {[
            "As an award-winning agency",
            "within the digital jungle,",
            "TRIONN® transcends",
            "aesthetics, crafting your",
            "vision into a legacy that",
            "endures.",
          ].map((line) => (
            <div key={line} className="overflow-hidden">
              <span className="waw-line block">{line}</span>
            </div>
          ))}
        </div>

        {/* PARAGRAPH 2 */}
        <div className="waw-p2 ml-auto max-w-xl text-zinc-700 dark:text-zinc-300 text-xl font-syne leading-relaxed">
          <p className="waw-popup mb-12">
            We roar with creativity, staying updated with the latest tech to make
            your brand a formidable force in the digital wilderness and deliver
            exceptional website and app experiences.
          </p>

          <div className="waw-popup">
            <MagneticButton>About us</MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
