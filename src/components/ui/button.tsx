"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "ghost" | "outline";

/**
 * Hover states never move or resize the button. Each variant uses a different
 * in-place effect instead:
 *   primary : brighter fill + soft glow
 *   outline : accent fill sweeps in from the left
 *   ghost   : underline draws in under the label
 */
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-primary text-void hover:brightness-110 hover:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent-primary)_22%,transparent),0_8px_28px_-6px_color-mix(in_srgb,var(--accent-primary)_65%,transparent)]",
  outline:
    "border border-strong text-primary bg-no-repeat bg-[linear-gradient(var(--accent-primary),var(--accent-primary))] bg-[length:0%_100%] bg-[position:0_0] hover:bg-[length:100%_100%] hover:border-accent-primary hover:text-void",
  ghost: "px-2 text-primary hover:text-accent-primary",
};

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  target?: string;
  rel?: string;
  className?: string;
  children: ReactNode;
}

export function Button({ variant = "primary", href, className, children, ...rest }: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight",
    "transition-[color,background-color,background-size,border-color,box-shadow,filter] duration-300 ease-out",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary",
    "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none disabled:hover:brightness-100",
    variantStyles[variant],
    className,
  );

  // Ghost buttons get an underline that draws left to right under the label.
  const content =
    variant === "ghost" ? (
      <span className="relative inline-flex items-center gap-2 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-current after:transition-[width] after:duration-300 group-hover:after:w-full">
        {children}
      </span>
    ) : (
      children
    );

  if (href) {
    return (
      <Link href={href} target={rest.target} rel={rest.rel} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={rest.type ?? "button"}
      onClick={rest.onClick}
      disabled={rest.disabled}
      className={classes}
    >
      {content}
    </button>
  );
}
