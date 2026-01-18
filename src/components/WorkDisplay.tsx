"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import MagneticButton from "./MagneticButton";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "loftloom",
    skills: "UI Design, UX, Wireframe",
    image: "/images/loftloom-main-landscape.webp",
    side: "right",
  },
  {
    title: "imusic",
    skills: "Research, UX, UI Design",
    image: "/images/imusic-main-landscape.webp",
    side: "left",
  },
  {
    title: "technis",
    skills: "UX, UI Design, Development",
    image: "/images/technis-main-landscape.webp",
    side: "right",
  },
];

export default function WorkDisplay() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Right images
      gsap.utils.toArray<HTMLElement>(".work-image-right").forEach((el) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            scrub: true,
            start: "0% bottom",
            end: "40% center",
          },
        })
          .fromTo(
            el,
            { rotation: -45, xPercent: -50, yPercent: -30, opacity: 0 },
            { rotation: 0, xPercent: 0, yPercent: 0, opacity: 1, ease: "power2.out" }
          );
      });

      // Left images
      gsap.utils.toArray<HTMLElement>(".work-image-left").forEach((el) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            scrub: true,
            start: "0% bottom",
            end: "40% center",
          },
        })
          .fromTo(
            el,
            { rotation: 45, xPercent: 50, yPercent: -30, opacity: 0 },
            { rotation: 0, xPercent: 0, yPercent: 0, opacity: 1, ease: "power2.out" }
          );
      });

      const mm = gsap.matchMedia();

      mm.add("(min-width:1081px)", () => {
        gsap.from(".work-text", {
          y: 150,
          opacity: 0,
          stagger: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });
      });

      mm.add("(max-width:1080px)", () => {
        gsap.utils.toArray<HTMLElement>(".work-text").forEach((el) => {
          gsap.from(el, {
            y: 60,
            opacity: 0,
            scrollTrigger: {
              trigger: el,
              scrub: true,
              start: "0% bottom",
              end: "10% center",
            },
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 lg:px-12 py-32 flex flex-col gap-[15vh] bg-white dark:bg-black transition-colors duration-500"
    >
      {projects.map((p, i) => (
        <article
          key={p.title}
          className={`flex flex-col lg:flex-row ${
            p.side === "right" ? "lg:flex-row-reverse" : ""
          } items-center gap-12 group`}
        >
          {/* Image Wrapper */}
          <div
            className={`w-full lg:w-3/5 work-image-${p.side} will-change-transform origin-bottom-left transition-transform duration-500 group-hover:scale-[1.02]`}
          >
            <Image
              src={p.image}
              alt={`${p.title} project showcase`}
              width={1200}
              height={700}
              priority={i < 2}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
              className="w-full h-auto rounded-3xl object-cover shadow-2xl hover:shadow-3xl transition-shadow duration-500"
            />
          </div>

          {/* Text */}
          <div
            className={`work-text w-full lg:w-2/5 flex flex-col justify-center ${
              p.side === "left" ? "lg:text-right lg:items-end" : ""
            } text-center lg:text-left`}
          >
            <h3 className="text-6xl lg:text-7xl font-[var(--font-myfont)] mb-4 leading-none">
              {p.title}
            </h3>
            <p className="mb-12 text-xl text-zinc-600 dark:text-zinc-400 font-[var(--font-syne)] leading-relaxed max-w-md">
              {p.skills}
            </p>
            <div className="hidden lg:block">
              <MagneticButton>View Project</MagneticButton>
            </div>
          </div>
        </article>
      ))}

      {/* Mobile CTA */}
      <div className="flex justify-center lg:hidden pt-12">
        <MagneticButton>View all work</MagneticButton>
      </div>
    </section>
  );
}
