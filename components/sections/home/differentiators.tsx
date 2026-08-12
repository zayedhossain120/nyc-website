import { SectionHeading } from "@/components/ui/section-heading";

const DIFFERENTIATORS = [
  {
    title: "Fixed-Price Guarantee",
    description: "You know the number before day one. No hourly surprises, no scope-creep billing.",
  },
  {
    title: "Full IP Ownership",
    description: "Every line of code and every asset transfers to you at delivery. No licensing traps.",
  },
  {
    title: "100/100 Core Web Vitals Standard",
    description: "Every build ships against a Lighthouse 100 target, not a “good enough” one.",
  },
  {
    title: "Senior-Only Team",
    description: "No outsourcing, no junior hand-offs — you work directly with the engineers building your product.",
  },
];

export function Differentiators() {
  return (
    <section className="border-t border-subtle bg-surface/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
        <SectionHeading eyebrow="Why Vertex" title="Built differently, from day one." />
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {DIFFERENTIATORS.map((item, index) => (
            <div key={item.title} className="flex flex-col gap-3">
              <span className="font-mono text-sm text-accent-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-medium text-primary">{item.title}</h3>
              <p className="text-sm text-secondary">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
