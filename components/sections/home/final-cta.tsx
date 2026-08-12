import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="gradient-mesh border-t border-subtle">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-32 text-center md:px-16">
        <h2 className="text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] font-medium tracking-tight text-primary">
          Let&apos;s Build Something Extraordinary.
        </h2>
        <p className="max-w-xl text-lg text-secondary">
          Tell us what you&apos;re building. We&apos;ll respond within one business day with a
          fixed-price scope, not a sales call.
        </p>
        <Button href="/contact" variant="primary">
          Book Your Strategy Call
        </Button>
      </div>
    </section>
  );
}
