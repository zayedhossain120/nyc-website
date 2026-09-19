"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useIsCoarsePointer } from "@/hooks/use-is-coarse-pointer";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const HOVER_TARGET_SELECTOR = 'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';

export function CustomCursor() {
  const isCoarsePointer = useIsCoarsePointer();
  const reducedMotion = useReducedMotion();
  const enabled = !isCoarsePointer && !reducedMotion;

  return enabled ? <CustomCursorImpl /> : null;
}

function CustomCursorImpl() {
  const [isHovering, setIsHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const ringY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });

  useEffect(() => {
    document.body.classList.add("cursor-none");

    function handlePointerMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
    }

    function handlePointerOver(event: PointerEvent) {
      const target = event.target as Element | null;
      setIsHovering(Boolean(target?.closest(HOVER_TARGET_SELECTOR)));
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerover", handlePointerOver);
    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] size-1.5 rounded-full bg-accent-primary"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-accent-primary/60"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          opacity: isHovering ? 1 : 0.5,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  );
}
