"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StatsCards() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const leftCards = gsap.utils.toArray<HTMLElement>(".card-left");
      const rightCards = gsap.utils.toArray<HTMLElement>(".card-right");

      leftCards.forEach((card) => {
        gsap.from(card, {
          x: -300,
          rotate: -30,
          opacity: 0,
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "60% center",
            scrub: true,
          },
        });
      });

      rightCards.forEach((card) => {
        gsap.from(card, {
          x: 300,
          rotate: 30,
          opacity: 0,
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "60% center",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-6 lg:px-12 pb-40 overflow-x-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

        {/* LEFT COLUMN */}
        <div className="w-full lg:w-1/2 space-y-6">
          <Card
            side="left"
            number="50+"
            title="award &"
            subtitle="recognition"
            hover="hover:bg-[#c93202] dark:hover:bg-[#c93202] dark:hover:text-black dark:hover:text-white"
          />
          <Card
            side="left"
            number="20+"
            title="creative"
            subtitle="minds"
            hover="hover:bg-[#a1c9b8] dark:hover:bg-[#a1c9b8] hover:text-black dark:hover:text-white"
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full lg:w-1/2 space-y-6 lg:pt-40">
          <Card
            side="right"
            number="900+"
            title="projects"
            subtitle="completed"
            hover="hover:bg-[#c8d1d1] dark:hover:bg-[#c8d1d1] hover:text-black dark:hover:text-white"
          />
          <Card
            side="right"
            number="20+"
            title="years of"
            subtitle="experience"
            hover="hover:bg-[#decf3e] dark:hover:bg-[#decf3e] hover:text-black dark:hover:text-white"
          />
        </div>
      </div>
    </section>
  );
}

type CardProps = {
  side: "left" | "right";
  number: string;
  title: string;
  subtitle: string;
  hover: string;
};

function Card({ side, number, title, subtitle, hover }: CardProps) {
  return (
    <div
      className={`${
        side === "left" ? "card-left" : "card-right"
      } bg-gray-100 dark:bg-zinc-800 text-black dark:text-white rounded-3xl p-10 h-[350px] 
      transition-all duration-300 ${hover}`}
    >
      <div className="text-6xl font-bold mb-6">{number}</div>

      <div className="text-right text-2xl font-syne flex flex-col leading-tight">
        <span className="opacity-70">{title}</span>
        <span>{subtitle}</span>
      </div>
    </div>
  );
}
