import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "neutral" | "primary" | "secondary" | "warm";

const toneStyles: Record<BadgeTone, string> = {
  neutral: "border-strong text-secondary",
  primary: "border-accent-primary/40 bg-accent-primary/10 text-accent-primary",
  secondary: "border-accent-secondary/40 bg-accent-secondary/10 text-accent-secondary",
  warm: "border-accent-warm/40 bg-accent-warm/10 text-accent-warm",
};

interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}

export function Badge({ tone = "neutral", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs tracking-wide uppercase",
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
