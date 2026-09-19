"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface MarqueeRowProps {
  children: ReactNode;
  className?: string;
  durationSeconds?: number;
}

export function MarqueeRow({ children, className, durationSeconds = 30 }: MarqueeRowProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={cn("flex flex-wrap items-center gap-8", className)}>{children}</div>;
  }

  return (
    <div
      className={cn(
        "group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <div
        className="animate-marquee flex w-max shrink-0 items-center group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        <div className="flex shrink-0 items-center gap-8 pr-8">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center gap-8 pr-8">
          {children}
        </div>
      </div>
    </div>
  );
}
