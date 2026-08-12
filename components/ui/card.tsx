"use client";

import { useRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const bounds = node.getBoundingClientRect();
    node.style.setProperty("--glow-x", `${event.clientX - bounds.left}px`);
    node.style.setProperty("--glow-y", `${event.clientY - bounds.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-subtle bg-surface/60 p-6 backdrop-blur-sm transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent-secondary/60",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(91,140,255,0.12), transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
