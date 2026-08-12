"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { MouseEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCounter } from "@/components/ui/stat-counter";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { useIsCoarsePointer } from "@/hooks/use-is-coarse-pointer";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const BADGE_TONE_STYLES = {
  primary: "border-accent-primary/40 text-accent-primary",
  secondary: "border-accent-secondary/40 text-accent-secondary",
  warm: "border-accent-warm/40 text-accent-warm",
} as const;

const STATS = [
  { value: 3.8, suffix: "x", decimals: 1, label: "Avg. Ad ROAS" },
  { value: 100, prefix: "", suffix: "/100", label: "Lighthouse Delivery Standard" },
  { value: 94, suffix: "%", label: "AI Search Citation Rate" },
  { value: 1, prefix: "$", suffix: "M+", label: "Client Revenue Generated" },
];

const FLOATING_BADGES = [
  { label: "Next.js 16", tone: "secondary" as const, top: "8%", left: "72%", depth: 1 },
  { label: "NestJS", tone: "primary" as const, top: "58%", left: "80%", depth: 1.6 },
  { label: "Tailwind v4", tone: "warm" as const, top: "82%", left: "58%", depth: 0.8 },
];

const CODE_SNIPPET = `@Injectable()
export class LeadAgentService {
  constructor(private readonly llm: LlmGateway) {}

  async qualify(lead: InboundLead) {
    const score = await this.llm.run('qualify-lead', lead)
    return score.intent === 'high' ? this.notifySales(lead) : this.nurture(lead)
  }
}`;

export function Hero() {
  const isCoarsePointer = useIsCoarsePointer();
  const reducedMotion = useReducedMotion();
  const parallaxEnabled = !isCoarsePointer && !reducedMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (!parallaxEnabled) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 16);
    y.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 16);
  }

  return (
    <section className="gradient-mesh relative overflow-hidden px-6 pt-20 pb-24 md:px-16 md:pt-28 md:pb-32">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="flex flex-col gap-8">
          <Badge tone="secondary">New York City · Full-Stack Engineering + AI + Growth</Badge>

          <h1 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.98] font-medium tracking-tight text-primary">
            We Engineer Software, Automate Operations, and Compound Growth.
          </h1>

          <p className="max-w-xl text-lg text-secondary">
            Vertex &amp; Co. is the NYC agency high-growth companies hire when they need
            production-grade Next.js/NestJS engineering, custom AI agents, and paid + organic
            growth systems — under one roof, one team, one accountable partner.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button href="/contact" variant="primary">
              Book Your Strategy Call
            </Button>
            <Button href="/work" variant="ghost">
              See Our Work
            </Button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            {STATS.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>

        <div className="relative" onMouseMove={handleMouseMove}>
          <motion.div style={{ x: springX, y: springY }}>
            <TerminalWindow title="lead-agent.service.ts">{CODE_SNIPPET}</TerminalWindow>
          </motion.div>

          {FLOATING_BADGES.map((badge) => (
            <FloatingBadge
              key={badge.label}
              badge={badge}
              parallaxX={springX}
              parallaxY={springY}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatingBadge({
  badge,
  parallaxX,
  parallaxY,
}: {
  badge: (typeof FLOATING_BADGES)[number];
  parallaxX: ReturnType<typeof useSpring>;
  parallaxY: ReturnType<typeof useSpring>;
}) {
  const depthX = useTransform(parallaxX, (value) => value * badge.depth);
  const depthY = useTransform(parallaxY, (value) => value * badge.depth);

  return (
    <motion.div
      className={cn(
        "absolute hidden rounded-full border bg-surface-2/90 px-3 py-1.5 font-mono text-xs shadow-lg shadow-black/30 backdrop-blur-sm sm:block",
        BADGE_TONE_STYLES[badge.tone],
      )}
      style={{ top: badge.top, left: badge.left, x: depthX, y: depthY }}
    >
      {badge.label}
    </motion.div>
  );
}
