import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/lib/site-config";

const POINTS = [
  { label: "Response Time", value: "Within 1 business day, guaranteed" },
  { label: "Direct Line", value: "hello@nycdigital.agency · (518) 606-3521" },
  { label: "NYC HQ", value: "45 Broad Street, Floor 12, New York, NY 10004" },
  { label: "Confidentiality", value: "Mutual NDA available before any detailed discovery call" },
];

export function TrustPanel() {
  return (
    <Reveal className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <Badge tone="primary">Contact</Badge>
        <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.05] font-medium tracking-tight text-primary">
          Let&apos;s talk about what you&apos;re building.
        </h1>
        <p className="text-lg text-secondary">
          Fill out the form and you&apos;ll hear back from a senior engineer or strategist —
          not a salesperson — within one business day.
        </p>
      </div>

      <div className="flex flex-col gap-6 border-t border-subtle pt-8">
        {POINTS.map((point) => (
          <div key={point.label} className="flex flex-col gap-1">
            <span className="font-mono text-xs tracking-[0.15em] text-muted uppercase">
              {point.label}
            </span>
            <span className="text-primary">{point.value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start gap-4 rounded-2xl border border-subtle bg-surface p-6">
        <p className="text-sm text-secondary">
          Prefer to talk live? Pick a time that suits you and book a strategy call directly on our
          calendar.
        </p>
        <Button href={BOOKING_URL} target="_blank" rel="noopener noreferrer" variant="outline">
          Book a Strategy Call
        </Button>
      </div>
    </Reveal>
  );
}
