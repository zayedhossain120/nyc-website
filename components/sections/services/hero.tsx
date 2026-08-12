import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ServicesHero() {
  return (
    <section className="gradient-mesh px-6 pt-20 pb-20 md:px-16 md:pt-28">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <Badge tone="secondary">Services</Badge>
        <h1 className="max-w-3xl text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.02] font-medium tracking-tight text-primary">
          Software, AI automation, and growth — under one accountable team.
        </h1>
        <p className="max-w-2xl text-lg text-secondary">
          Most agencies specialize in one lane. We run all three because your product, your
          operations, and your pipeline are the same problem: engineering. Below is everything
          we ship, organized by pillar.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button href="/contact" variant="primary">
            Get a Fixed-Price Quote
          </Button>
          <Button href="/pricing" variant="ghost">
            See Pricing
          </Button>
        </div>
      </div>
    </section>
  );
}
