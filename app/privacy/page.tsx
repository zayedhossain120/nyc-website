import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Vertex & Co. collects, uses, and protects your data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      path="/privacy"
      updated="August 12, 2026"
      intro="This policy explains what information Vertex & Co. collects when you use this site or engage us for services, and how we use it."
      sections={[
        {
          heading: "1. Information We Collect",
          body: [
            "We collect information you provide directly — through contact forms, project inquiries, or email — such as your name, work email, company, and project details.",
            "We also collect standard technical data automatically: IP address, browser type, device information, and pages visited, via analytics tooling (GA4, Vercel Analytics).",
          ],
        },
        {
          heading: "2. How We Use Your Information",
          body: [
            "We use the information you provide to respond to inquiries, scope proposals, deliver contracted services, and send occasional engineering and growth notes if you opt in.",
            "We do not sell your personal information to third parties.",
          ],
        },
        {
          heading: "3. Cookies & Analytics",
          body: [
            "This site uses cookies for essential functionality and analytics (GA4, Vercel Analytics, Vercel Speed Insights). You can disable non-essential cookies through your browser settings.",
          ],
        },
        {
          heading: "4. Data Sharing & Third Parties",
          body: [
            "We share data only with service providers necessary to operate our business — hosting (Vercel), analytics, and email delivery — under their respective data processing terms. Client project data is never shared with other clients or third parties without written consent.",
          ],
        },
        {
          heading: "5. Data Retention",
          body: [
            "Inquiry and contact form data is retained for up to 24 months for follow-up purposes, unless you request earlier deletion. Client project data retention is governed by the applicable service agreement.",
          ],
        },
        {
          heading: "6. Your Rights",
          body: [
            "You may request access to, correction of, or deletion of your personal data at any time by contacting privacy@vertexand.co. We respond to verified requests within 30 days.",
          ],
        },
        {
          heading: "7. Contact Us",
          body: [
            "Questions about this policy can be directed to privacy@vertexand.co or our NYC office at 45 Broad Street, Floor 12, New York, NY 10004.",
          ],
        },
      ]}
    />
  );
}
