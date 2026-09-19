import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function ServicesHero() {
  return (
    <section className="gradient-mesh px-6 pt-20 pb-20 md:px-16 md:pt-28">
      <Reveal className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <Badge tone="secondary">Services</Badge>
        <h1 className="max-w-3xl text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.02] font-medium tracking-tight text-primary">
          Software, AI automation, and growth — under one accountable team.
        </h1>
        <p className="max-w-2xl text-lg text-secondary">
          From SaaS development and SaaS web design to cloud application development, AI
          automation and local SEO, we cover your product, your operations and your pipeline
          with one team. Below is everything we ship, organized by pillar.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button href="/contact" variant="primary">
            Get a Fixed-Price Quote
          </Button>
          <Button href="/pricing" variant="ghost">
            See Pricing
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
