import { CASE_STUDIES } from "@/data/case-studies";
import { SERVICE_DETAILS } from "@/data/service-details";
import { SERVICE_PILLARS } from "@/data/services";
import { BUSINESS } from "@/lib/seo/business";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

// Built from the same data as the site, so it stays in sync. Format: https://llmstxt.org
export const dynamic = "force-static";

function link(title: string, path: string, description?: string) {
  return `- [${title}](${SITE_URL}${path})${description ? `: ${description}` : ""}`;
}

/** Single-line plain text, so descriptions never break the list format. */
function oneLine(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function GET() {
  const lines: string[] = [];

  lines.push(`# ${SITE_NAME}`, "");
  lines.push(`> ${oneLine(BUSINESS.description)}`, "");
  lines.push(
    `${SITE_NAME} is based at ${BUSINESS.streetAddress}, ${BUSINESS.addressLocality}, ${BUSINESS.addressRegion} ${BUSINESS.postalCode}, and serves clients in ${BUSINESS.areaServed.slice(0, 5).join(", ")} and across the United States. Services are sold on fixed-price scopes.`,
    "",
  );

  lines.push("## Contact", "");
  lines.push(`- Website: ${SITE_URL}`);
  lines.push(`- Email: ${BUSINESS.email}`);
  lines.push(`- Phone: ${BUSINESS.telephoneDisplay}`);
  lines.push(
    `- Address: ${BUSINESS.streetAddress}, ${BUSINESS.addressLocality}, ${BUSINESS.addressRegion} ${BUSINESS.postalCode}`,
  );
  lines.push("");

  for (const pillar of SERVICE_PILLARS) {
    lines.push(`## ${pillar.title}`, "");
    lines.push(link(`${pillar.title} overview`, pillar.href, oneLine(pillar.description)));
    for (const service of SERVICE_DETAILS.filter((entry) => entry.pillarId === pillar.id)) {
      lines.push(
        link(
          service.title,
          `/services/${service.pillarId}/${service.slug}`,
          `${oneLine(service.seo.description)} Starting at ${service.pricing.amount} (${service.pricing.unit}).`,
        ),
      );
    }
    lines.push("");
  }

  lines.push("## Company", "");
  lines.push(link("About", "/about", "The founders and how the agency works"));
  lines.push(link("Pricing", "/pricing", "Fixed-price engagement tiers and add-ons"));
  lines.push(link("Process", "/process", "The four-phase delivery process"));
  lines.push(link("FAQ", "/faq", "Answers on pricing, IP ownership, timelines and services"));
  lines.push(link("Contact", "/contact", "Request a fixed-price quote"));
  lines.push("");

  lines.push("## Work and articles", "");
  lines.push(link("Case studies", "/work", "Projects and results"));
  for (const study of CASE_STUDIES) {
    lines.push(link(study.client, `/work/${study.slug}`, oneLine(study.summary)));
  }
  lines.push(link("Blog", "/blog", "Articles on software development, SaaS, AI automation and local SEO"));
  lines.push("");

  lines.push("## Optional", "");
  lines.push(link("Security", "/security", "Data handling and security practices"));
  lines.push(link("Privacy policy", "/privacy"));
  lines.push(link("Terms of service", "/terms"));
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
