import { MarqueeRow } from "@/components/ui/marquee-row";

const INDUSTRIES = [
  "FinTech",
  "Healthcare",
  "E-Commerce",
  "Proptech",
  "Hospitality",
  "Legal",
  "SaaS",
  "Logistics",
];

export function TrustMarquee() {
  return (
    <section className="border-y border-subtle py-10">
      <p className="mb-6 px-6 text-center font-mono text-xs tracking-[0.2em] text-muted uppercase md:px-16">
        Industries We&apos;ve Shipped For
      </p>
      <MarqueeRow>
        {INDUSTRIES.map((industry) => (
          <span key={industry} className="font-mono text-sm tracking-wide text-secondary uppercase">
            {industry}
          </span>
        ))}
      </MarqueeRow>
    </section>
  );
}
