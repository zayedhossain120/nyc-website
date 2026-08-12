"use client";

import { animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedNumber({ value, prefix = "", suffix = "", className }: AnimatedNumberProps) {
  const [display, setDisplay] = useState(value);
  const reducedMotion = useReducedMotion();
  const fromRef = useRef(value);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(value);
      fromRef.current = value;
      return;
    }
    const controls = animate(fromRef.current, value, {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
      onComplete: () => {
        fromRef.current = value;
      },
    });
    return () => controls.stop();
  }, [value, reducedMotion]);

  return (
    <span className={className}>
      {prefix}
      {Math.round(display).toLocaleString()}
      {suffix}
    </span>
  );
}
