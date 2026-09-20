"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TECH_CATEGORIES, TECH_STACK } from "@/data/tech-stack";
import { cn } from "@/lib/utils";

const ALL = "All";
const FILTERS = [ALL, ...TECH_CATEGORIES];

export function TechStack() {
  const [active, setActive] = useState<string>(ALL);
  const items = active === ALL ? TECH_STACK : TECH_STACK.filter((item) => item.category === active);

  return (
    <section className="border-t border-subtle">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Technology"
            title="The technology stack behind what we build."
          />
          <p className="max-w-md rounded-xl border border-subtle bg-surface/60 p-4 font-mono text-xs leading-relaxed text-secondary">
            We build with{" "}
            <span className="text-accent-primary">
              Next.js, React, TypeScript, Node.js, NestJS, Prisma, PostgreSQL, MongoDB, React
              Native and Tailwind CSS
            </span>
            , deployed on reliable cloud infrastructure.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter technologies">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={active === filter}
              onClick={() => setActive(filter)}
              className={cn(
                "rounded-full border px-4 py-2 font-mono text-xs transition-colors duration-200",
                active === filter
                  ? "border-accent-primary bg-accent-primary/10 text-accent-primary"
                  : "border-subtle bg-surface/60 text-muted hover:border-strong hover:text-primary",
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <Reveal className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {items.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center gap-2 rounded-xl border border-subtle bg-surface/60 p-4 text-center transition-colors duration-300 hover:border-accent-primary/50 hover:bg-surface"
            >
              <div
                aria-hidden
                className={cn(
                  "flex size-10 items-center justify-center rounded-lg border border-subtle bg-void font-mono text-sm font-semibold",
                  item.color,
                )}
              >
                {item.name.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase()}
              </div>
              <span className="text-xs font-medium text-primary">{item.name}</span>
              <span className="font-mono text-[10px] leading-snug text-muted">{item.description}</span>
            </div>
          ))}
        </Reveal>

        <p className="text-center font-mono text-xs text-muted">
          Senior-only team · Fixed-price delivery · Full code ownership
        </p>
      </div>
    </section>
  );
}
