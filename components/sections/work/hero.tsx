import { Badge } from "@/components/ui/badge";

export function WorkHero() {
  return (
    <section className="gradient-mesh px-6 pt-20 pb-16 md:px-16 md:pt-28">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <Badge tone="primary">Work</Badge>
        <h1 className="max-w-3xl text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.02] font-medium tracking-tight text-primary">
          Results, not just deliverables.
        </h1>
        <p className="max-w-2xl text-lg text-secondary">
          A sample of the web apps, storefronts, automations, and campaigns we&apos;ve shipped —
          filtered by what you&apos;re building.
        </p>
      </div>
    </section>
  );
}
