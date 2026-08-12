"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  metric: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  className?: string;
}

const AUTOPLAY_MS = 6000;

export function TestimonialCarousel({ testimonials, className }: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || isPaused) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [reducedMotion, isPaused, testimonials.length]);

  const active = testimonials[index];

  return (
    <div
      className={cn("flex flex-col gap-8", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative min-h-55">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={active.name}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <p className="text-xl leading-relaxed text-primary sm:text-2xl">
              &ldquo;{active.quote}&rdquo;
            </p>
            <footer className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex size-11 items-center justify-center rounded-full bg-surface-2 font-mono text-sm text-secondary"
                >
                  {active.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-primary">{active.name}</span>
                  <span className="text-sm text-muted">
                    {active.title}, {active.company}
                  </span>
                </div>
              </div>
              <span className="rounded-full border border-accent-primary/40 bg-accent-primary/10 px-3 py-1 font-mono text-xs text-accent-primary">
                {active.metric}
              </span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="flex gap-2">
        {testimonials.map((testimonial, testimonialIndex) => (
          <button
            key={testimonial.name}
            type="button"
            aria-label={`Show testimonial from ${testimonial.name}`}
            onClick={() => setIndex(testimonialIndex)}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-300",
              testimonialIndex === index ? "bg-accent-primary" : "bg-strong",
            )}
          />
        ))}
      </div>
    </div>
  );
}
