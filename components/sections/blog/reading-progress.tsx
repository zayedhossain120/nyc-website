"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { type RefObject } from "react";

export function ReadingProgress({ target }: { target: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 right-0 left-0 z-40 h-0.5 origin-left bg-accent-primary"
      style={{ scaleX: progress }}
    />
  );
}
