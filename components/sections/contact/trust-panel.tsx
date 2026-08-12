import { Badge } from "@/components/ui/badge";

const POINTS = [
  { label: "Response Time", value: "Within 1 business day, guaranteed" },
  { label: "Direct Line", value: "hello@vertexand.co · (212) 555-0142" },
  { label: "NYC HQ", value: "45 Broad Street, Floor 12, New York, NY 10004" },
  { label: "Confidentiality", value: "Mutual NDA available before any detailed discovery call" },
];

export function TrustPanel() {
  return (
    <div className="flex flex-col gap-10">
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

      <div className="rounded-2xl border border-subtle bg-surface p-6">
        <p className="text-sm text-secondary">
          Prefer to talk live? Mention it in the form and we&apos;ll send a scheduling link for a
          15-minute strategy call once we&apos;ve reviewed your project.
        </p>
      </div>
    </div>
  );
}
