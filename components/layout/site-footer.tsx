import Link from "next/link";

const FOOTER_COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Services",
    links: [
      { label: "Software Development", href: "/services/software-development" },
      { label: "AI Automation", href: "/services/ai-automation" },
      { label: "Marketing & Growth", href: "/services/marketing-seo" },
      { label: "All Services", href: "/services" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Process", href: "/process" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Insights", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Security", href: "/security" },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X", href: "https://x.com" },
  { label: "GitHub", href: "https://github.com" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-subtle">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-16 md:px-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-lg font-medium tracking-tight text-primary">
              Vertex<span className="text-accent-primary">&</span>Co.
            </span>
            <p className="max-w-xs text-sm text-secondary">
              New York&apos;s engineering-first digital agency — we build the software, run the
              growth, and automate the operations.
            </p>
            <address className="not-italic text-sm text-muted">
              45 Broad Street, Floor 12
              <br />
              New York, NY 10004
            </address>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading} className="flex flex-col gap-3">
              <span className="font-mono text-xs tracking-[0.15em] text-muted uppercase">
                {column.heading}
              </span>
              {column.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-secondary transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <form className="flex flex-col gap-3 border-t border-subtle pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-secondary">
            Get NYC engineering &amp; growth notes in your inbox. No spam, unsubscribe anytime.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="w-56 rounded-full border border-strong bg-surface px-4 py-2 text-sm text-primary placeholder:text-muted focus:border-accent-primary focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-accent-primary px-4 py-2 text-sm font-medium text-void"
            >
              Subscribe
            </button>
          </div>
        </form>

        <div className="flex flex-col gap-4 border-t border-subtle pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Vertex &amp; Co. All rights reserved.</span>
          <div className="flex gap-6">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
