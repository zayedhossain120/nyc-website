"use client";

import Lenis from "@studio-freight/lenis";
import { MotionValue, useMotionValue } from "motion/react";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface SmoothScrollContextValue {
  lenis: Lenis | null;
  /** Raw vertical scroll offset in px, updated on every Lenis scroll tick. */
  scrollY: MotionValue<number>;
  /** 0-1 progress through the full document height, for global parallax pipelines. */
  scrollYProgress: MotionValue<number>;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const scrollY = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);
  const reducedMotion = useReducedMotion();
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (reducedMotion) return;

    const instance = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    instance.on("scroll", ({ scroll, limit }: { scroll: number; limit: number }) => {
      scrollY.set(scroll);
      scrollYProgress.set(limit > 0 ? scroll / limit : 0);
    });

    function raf(time: number) {
      instance.raf(time);
      frameRef.current = requestAnimationFrame(raf);
    }
    frameRef.current = requestAnimationFrame(raf);

    setLenis(instance);

    return () => {
      cancelAnimationFrame(frameRef.current);
      instance.destroy();
      setLenis(null);
    };
  }, [reducedMotion, scrollY, scrollYProgress]);

  return (
    <SmoothScrollContext.Provider value={{ lenis, scrollY, scrollYProgress }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error("useSmoothScroll must be used within a SmoothScrollProvider");
  }
  return context;
}
