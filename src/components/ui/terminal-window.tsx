import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function TerminalWindow({ title = "terminal", children, className }: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-subtle bg-surface shadow-2xl shadow-black/40",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-subtle bg-surface-2 px-4 py-3">
        <span className="size-2.5 rounded-full bg-accent-warm/70" />
        <span className="size-2.5 rounded-full bg-accent-primary/70" />
        <span className="size-2.5 rounded-full bg-accent-secondary/70" />
        <span className="ml-2 font-mono text-xs text-muted">{title}</span>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-sm leading-relaxed text-secondary">
        <code>{children}</code>
      </pre>
    </div>
  );
}
