"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface VideoRevealProps {
  src: string;
  className?: string;
}

export default function VideoAnimation({ src, className = "" }: VideoRevealProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const timeout = setTimeout(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: videoRef.current,
            scrub: true,
            start: "-100% center",
            end: "550% center",
          },
        });

        tl.from(videoRef.current, {
          y: -180,
          width: "14%",
          borderRadius: "999px",
          ease: "none",
        });
      }, 2500);

      return () => clearTimeout(timeout);
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className={`px-6 w-full flex justify-center ${className}`}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full max-w-5xl rounded-3xl object-cover"
      />
    </div>
  );
}
