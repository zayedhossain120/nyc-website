"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { useIsCoarsePointer } from "@/hooks/use-is-coarse-pointer";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "ghost" | "outline";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent-primary text-void hover:bg-accent-primary/90",
  ghost: "px-2 text-primary hover:text-accent-primary",
  outline:
    "border border-strong text-primary hover:border-accent-primary hover:text-accent-primary",
};

interface ButtonProps {
  variant?: ButtonVariant;
  /** Cursor-following magnetic pull. Defaults on for the primary CTA style. */
  magnetic?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  target?: string;
  rel?: string;
  className?: string;
  children: ReactNode;
}

function useMagnet(enabled: boolean) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  function onMouseMove(event: MouseEvent<HTMLElement>) {
    if (!enabled) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.3);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.3);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return { springX, springY, onMouseMove, onMouseLeave };
}

export function Button({
  variant = "primary",
  magnetic = variant === "primary",
  href,
  className,
  children,
  ...rest
}: ButtonProps) {
  const isCoarsePointer = useIsCoarsePointer();
  const reducedMotion = useReducedMotion();
  const { springX, springY, onMouseMove, onMouseLeave } = useMagnet(
    magnetic && !isCoarsePointer && !reducedMotion,
  );

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-colors duration-200",
    variantStyles[variant],
    className,
  );

  return (
    <motion.div
      className="inline-block"
      style={{ x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {href ? (
        <Link
          href={href}
          target={rest.target}
          rel={rest.rel}
          className={classes}
        >
          {children}
        </Link>
      ) : (
        <button
          type={rest.type ?? "button"}
          onClick={rest.onClick}
          disabled={rest.disabled}
          className={classes}
        >
          {children}
        </button>
      )}
    </motion.div>
  );
}
