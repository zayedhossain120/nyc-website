"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/lib/site-config";

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
          SaaS Development, Cloud Software & Growth for New York Companies.
        </h1>

        <p className="max-w-2xl text-base text-secondary sm:text-lg">
          NYC Digital Agency is a New York SaaS development company and digital agency. We
          design and build custom SaaS products, cloud applications and websites, add AI
          automation, and grow them with local SEO and paid ads — one team, one accountable
          partner.
        </p>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          <Button href={BOOKING_URL} target="_blank" rel="noopener noreferrer" variant="primary">
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
    </section>
  );
}
