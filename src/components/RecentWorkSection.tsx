"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function RecentWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const recentRef = useRef<HTMLSpanElement>(null);
  const workRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gradient animations (existing)
      gsap.to(".rw-title-recent, .rw-title-work", {
        backgroundPositionX: "0%",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "70% center",
          scrub: true,
        },
      });

      // NEW: Directional slide animations
    // Replace the directional slide animations in useEffect with:

 gsap.fromTo(recentRef.current!, 
        { xPercent: 100 }, 
        { 
          xPercent: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom center",
            scrub: true,
          }
        }
      );
   gsap.fromTo(workRef.current!, 
        { xPercent:-100}, 
        { 
          xPercent: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom center",
            scrub: true,
          }
        }
      );


      // Punchline animation (updated trigger)
      const split = new SplitType(".rw-line", { types: "lines" });
      gsap.from(split.lines!, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".rw-left",
          start: "-240% center",
          end: "0% center",
          toggleActions: "play none reverse reverse",
        },
      });

      // Button animation (simplified)
      gsap.from(".rw-button", {
        y: 80,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "70% center",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 lg:px-12 py-32 bg-white dark:bg-black transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto flex items-center gap-10">
        {/* LEFT GROUP */}
        <div className="rw-left space-y-2 flex-1">
          {/* Title */}
          <h2 className="text-[clamp(4rem,10vw,8rem)] leading-[0.9] font-[var(--font-myfont)] shrink-0">
            <span
              ref={recentRef}
              className="rw-title-recent block bg-[size:200%_100%] bg-right  bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg,#111 50%,#aaa 0)" }}
            >
              Recent
            </span>
            <span
              ref={workRef}
              className="rw-title-work block bg-[size:200%_100%] bg-right  bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg,#111 50%,#aaa 0)" }}
            >
              Work
            </span>
          </h2>

          {/* Punchline */}
          <div className="rw-punchline flex flex-col gap-2 text-xl font-[var(--font-syne)] text-zinc-800 dark:text-zinc-200">
            <div className="rw-line overflow-hidden">In the creative wilderness,</div>
            <div className="rw-line overflow-hidden">clients find our work truly</div>
            <div className="rw-line overflow-hidden">beloved.</div>
          </div>
        </div>

        {/* RIGHT BUTTON */}
        <div className="rw-button hidden md:block ">
          <MagneticButton>Explore Work</MagneticButton>
        </div>
      </div>
    </section>
  );
}
