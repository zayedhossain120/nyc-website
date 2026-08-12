"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { CASE_STUDIES, CATEGORY_LABELS, type CaseStudyCategory } from "@/lib/data/case-studies";
import { cn } from "@/lib/utils";

type Filter = "all" | CaseStudyCategory;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...(Object.entries(CATEGORY_LABELS).map(([id, label]) => ({ id: id as Filter, label })) as {
    id: Filter;
    label: string;
  }[]),
];

export function WorkGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const reducedMotion = useReducedMotion();

  const filtered = useMemo(
    () =>
      filter === "all" ? CASE_STUDIES : CASE_STUDIES.filter((study) => study.category === filter),
    [filter],
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-24 md:px-16">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors duration-200",
              filter === item.id
                ? "border-accent-primary bg-accent-primary/10 text-accent-primary"
                : "border-subtle text-secondary hover:border-strong hover:text-primary",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <motion.div layout={!reducedMotion} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((study) => (
            <motion.div
              key={study.slug}
              layout={!reducedMotion}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/work/${study.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-subtle transition-colors duration-300 hover:border-accent-secondary/60"
              >
                <div className={cn("flex h-48 items-end bg-linear-to-br p-5", study.gradient)}>
                  <span className="rounded-full border border-accent-primary/40 bg-void/60 px-3 py-1 font-mono text-xs text-accent-primary backdrop-blur-sm">
                    {study.metric}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 bg-surface p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-primary">{study.client}</h3>
                    <Badge tone="neutral">{study.industry}</Badge>
                  </div>
                  <p className="text-sm text-secondary">{study.summary}</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    View Case Study →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
