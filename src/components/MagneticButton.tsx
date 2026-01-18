"use client";
import { motion, useMotionValue } from "framer-motion";
import { useRef } from "react";

export default function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <motion.button
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x, y }}
             className="
                px-8 py-4 rounded-full
                border border-black/20 dark:border-white/20
                text-black dark:text-white
                hover:bg-black hover:text-white
                dark:hover:bg-white dark:hover:text-black
                transition-all duration-300

              "
      data-cursor="hover"
      data-cursor-type="glow"
    >
      {children}
    </motion.button>
  );
}
