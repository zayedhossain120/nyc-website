"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface StatCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label?: string;
  className?: string;
}

export function StatCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  label,
  className,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (reducedMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [isInView, reducedMotion, value]);

  return (
    <div ref={ref} className={cn("flex flex-col gap-1", className)}>
      <span className="font-mono text-4xl font-medium tracking-tight text-primary sm:text-5xl">
        {prefix}
        {display.toFixed(decimals)}
        {suffix}
      </span>
      {label && <span className="text-sm text-secondary">{label}</span>}
    </div>
  );
}
