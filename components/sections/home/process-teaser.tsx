import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

const STEPS = [
  { range: "Days 1–3", title: "Discovery & System Architecture" },
  { range: "Days 4–8", title: "High-Fidelity UI/UX Design" },
  { range: "Days 9–18", title: "Full-Stack Engineering & Automation Build" },
  { range: "Days 19–21", title: "QA, Speed Tuning, Global Launch" },
];

export function ProcessTeaser() {
  return (
    <section className="border-t border-subtle">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
        <SectionHeading eyebrow="How We Work" title="A 21-day engagement, start to launch." />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div key={step.title} className="flex flex-col gap-3 border-l border-subtle pl-5">
              <span className="font-mono text-xs text-muted">{step.range}</span>
              <span className="font-mono text-2xl text-accent-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-medium text-primary">{step.title}</h3>
            </div>
          ))}
        </div>
        <Button href="/process" variant="ghost" className="w-fit">
          See the Full Process →
        </Button>
      </div>
    </section>
  );
}
