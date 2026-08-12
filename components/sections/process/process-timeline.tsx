"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PROCESS_STEPS } from "@/lib/data/process";
import { cn } from "@/lib/utils";

export function ProcessTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-24 md:px-16 lg:grid-cols-[220px_1fr]">
      <div className="hidden lg:block">
        <div className="sticky top-32 flex flex-col gap-6">
          {PROCESS_STEPS.map((step, index) => (
            <div key={step.title} className="flex items-center gap-3">
              <span
                className={cn(
                  "font-mono text-2xl transition-colors duration-300",
                  index === activeIndex ? "text-accent-primary" : "text-muted",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "text-sm transition-colors duration-300",
                  index === activeIndex ? "text-primary" : "text-muted",
                )}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-24">
        {PROCESS_STEPS.map((step, index) => (
          <StepBlock key={step.title} index={index} onActive={setActiveIndex} />
        ))}
      </div>
    </div>
  );
}

function StepBlock({
  index,
  onActive,
}: {
  index: number;
  onActive: (index: number) => void;
}) {
  const step = PROCESS_STEPS[index];
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (isInView) onActive(index);
  }, [isInView, index, onActive]);

  return (
    <div ref={ref} className="flex flex-col gap-6">
      <div className="flex items-center gap-3 lg:hidden">
        <span className="font-mono text-2xl text-accent-primary">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-mono text-xs text-muted">{step.range}</span>
      </div>
      <span className="hidden font-mono text-xs text-muted lg:block">{step.range}</span>
      <h2 className="text-2xl font-medium text-primary sm:text-3xl">{step.title}</h2>
      <p className="max-w-2xl text-secondary">{step.description}</p>
      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.08 }}
        className="flex flex-col gap-3"
      >
        {step.deliverables.map((item) => (
          <motion.li
            key={item}
            variants={{
              hidden: { opacity: 0, x: -12 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 text-secondary"
          >
            <span className="text-accent-primary">✓</span>
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
