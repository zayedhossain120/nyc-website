"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { cn } from "@/lib/utils";

const DOT_TONE_STYLES = {
  primary: "bg-accent-primary",
  secondary: "bg-accent-secondary",
  warm: "bg-accent-warm",
} as const;

const PILLAR_TILES = [
  {
    tone: "secondary" as const,
    title: "Software Development",
    description: "Next.js & NestJS builds.",
    href: "/services/software-development",
  },
  {
    tone: "primary" as const,
    title: "AI Automation",
    description: "Agents that cut manual ops.",
    href: "/services/ai-automation",
  },
  {
    tone: "warm" as const,
    title: "Marketing & Growth",
    description: "SEO, AEO/GEO, paid ads.",
    href: "/services/marketing-seo",
  },
  {
    tone: "secondary" as const,
    title: "Fixed-Price Guarantee",
    description: "No hourly billing, ever.",
    href: "/pricing",
  },
];

const STACK_BADGES = [
  { label: "Next.js", angle: -90 },
  { label: "NestJS", angle: -18 },
  { label: "Tailwind", angle: 54 },
  { label: "Pinecone", angle: 126 },
  { label: "Stripe", angle: 198 },
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
  return (
    <section className="gradient-mesh relative overflow-hidden px-6 py-16 md:px-16 md:py-24 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center"
      >
        <Badge tone="secondary" className="w-fit">
          <span className="hidden sm:inline">
            New York City · Full-Stack Engineering + AI + Growth
          </span>
          <span className="sm:hidden">NYC · Engineering + AI + Growth</span>
        </Badge>

        <h1 className="text-4xl leading-[1.05] font-medium tracking-tight text-primary sm:text-5xl sm:leading-none md:text-6xl lg:text-[clamp(3rem,5.5vw,4.5rem)] lg:leading-[0.98]">
          We Engineer Software, Automate Operations, and Compound Growth.
        </h1>

        <p className="max-w-2xl text-base text-secondary sm:text-lg">
          Vertex &amp; Co. is the NYC agency high-growth companies hire when they need
          production-grade Next.js/NestJS engineering, custom AI agents, and paid + organic
          growth systems — under one roof, one team, one accountable partner.
        </p>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          <Button href="/contact" variant="primary">
            Book Your Strategy Call
          </Button>
          <Button href="/work" variant="ghost">
            See Our Work
          </Button>
        </div>

        <span className="font-mono text-xs text-muted">
          Fixed-price engagements · Response within 1 business day
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-16 grid max-w-7xl gap-4 lg:mt-20 lg:grid-cols-[0.85fr_1.3fr_0.85fr] lg:items-stretch"
      >
        <CodeShowcaseCard />
        <div className="flex min-w-0 flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {PILLAR_TILES.map((tile) => (
              <PillarTile key={tile.title} {...tile} />
            ))}
          </div>
          <IntegrationHubCard />
        </div>
        <ResultsCard />
      </motion.div>
    </section>
  );
}

function CodeShowcaseCard() {
  return (
    <Link
      href="/services/software-development"
      className="group flex min-w-0 flex-col gap-4 rounded-2xl border border-subtle bg-surface/60 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-accent-secondary/60"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-primary">See how we build</span>
        <span className="text-secondary transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </div>
      <TerminalWindow title="lead-agent.service.ts">{CODE_SNIPPET}</TerminalWindow>
    </Link>
  );
}

function PillarTile({
  tone,
  title,
  description,
  href,
}: (typeof PILLAR_TILES)[number]) {
  return (
    <Link
      href={href}
      className="group flex min-w-0 flex-col gap-2 rounded-2xl border border-subtle bg-surface/60 p-4 backdrop-blur-sm transition-colors duration-300 hover:border-accent-secondary/60"
    >
      <span className={cn("size-2 rounded-full", DOT_TONE_STYLES[tone])} />
      <span className="text-sm font-medium text-primary">{title}</span>
      <span className="text-xs text-muted">{description}</span>
    </Link>
  );
}

function IntegrationHubCard() {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-2xl border border-subtle bg-surface/60 p-6 text-center backdrop-blur-sm">
      <div className="relative size-36 shrink-0">
        <div className="absolute inset-0 rounded-full border border-dashed border-strong" />
        <div className="absolute inset-6 flex items-center justify-center rounded-full border border-subtle bg-surface-2 font-mono text-xs text-primary">
          V&amp;Co.
        </div>
        {STACK_BADGES.map((badge) => {
          const radius = 62;
          const radians = (badge.angle * Math.PI) / 180;
          const offsetX = Math.cos(radians) * radius;
          const offsetY = Math.sin(radians) * radius;
          return (
            <span
              key={badge.label}
              className="absolute rounded-full border border-subtle bg-surface-2 px-2 py-1 font-mono text-[10px] whitespace-nowrap text-secondary shadow-md shadow-black/30"
              style={{
                top: `calc(50% + ${offsetY}px)`,
                left: `calc(50% + ${offsetX}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {badge.label}
            </span>
          );
        })}
      </div>
      <p className="text-sm text-secondary">Plays well with the stack you already have.</p>
    </div>
  );
}

function ResultsCard() {
  return (
    <Link
      href="/work"
      className="group flex min-w-0 flex-col items-center gap-6 rounded-2xl border border-subtle bg-surface/60 p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:border-accent-secondary/60"
    >
      <div className="flex w-full items-center justify-between">
        <span className="text-sm font-medium text-primary">Real Results</span>
        <span className="text-secondary transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </div>

      <div
        className="relative flex size-32 shrink-0 items-center justify-center rounded-full"
        style={{
          background: "conic-gradient(var(--accent-primary) 0% 94%, var(--border-subtle) 94% 100%)",
        }}
      >
        <div className="absolute inset-2 flex flex-col items-center justify-center rounded-full bg-surface-2">
          <span className="font-mono text-2xl font-medium text-primary">94%</span>
          <span className="text-[10px] text-muted">AI Citation</span>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 border-t border-subtle pt-4 text-left">
        <StatRow value="3.8x" label="Avg. Ad ROAS" />
        <StatRow value="$1M+" label="Client Revenue" />
      </div>
    </Link>
  );
}

function StatRow({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-mono text-sm text-primary">{value}</span>
      <span className="text-xs text-muted">{label}</span>
    </div>
  );
}
