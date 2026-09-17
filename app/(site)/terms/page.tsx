import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing use of this site and engagements with Vertex & Co.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      path="/terms"
      updated="August 12, 2026"
      intro="These terms govern your use of this website and any services engagement with Vertex & Co. By engaging us, you agree to the terms below alongside your signed statement of work."
      sections={[
        {
          heading: "1. Acceptance of Terms",
          body: [
            "By accessing this site or signing a proposal with Vertex & Co., you agree to these terms. If you do not agree, please do not use our services.",
          ],
        },
        {
          heading: "2. Services & Engagements",
          body: [
            "Each engagement is governed by a project-specific statement of work (SOW) or Master Services Agreement (MSA) that details scope, deliverables, timeline, and price. These terms apply in addition to, not in place of, that agreement.",
          ],
        },
        {
          heading: "3. Payment Terms",
          body: [
            "Fixed-price engagements are typically billed in milestones (e.g., 50% deposit, 50% on delivery). Retainer engagements bill monthly in advance. Invoices are due within 15 days unless otherwise agreed in writing.",
          ],
        },
        {
          heading: "4. Intellectual Property",
          body: [
            "Upon final payment, all custom code, designs, and deliverables created for your project transfer to you. Vertex & Co. retains rights to its own pre-existing tools, frameworks, and internal libraries used to build your project, which are licensed to you for continued use.",
          ],
        },
        {
          heading: "5. Confidentiality",
          body: [
            "Both parties agree to keep confidential information — including project details, business data, and proprietary processes — private, and will execute a mutual NDA on request before detailed discovery.",
          ],
        },
        {
          heading: "6. Limitation of Liability",
          body: [
            "Vertex & Co.'s total liability under any engagement is limited to the fees paid for that engagement in the preceding 12 months. We are not liable for indirect, incidental, or consequential damages.",
          ],
        },
        {
          heading: "7. Termination",
          body: [
            "Either party may terminate an active engagement with 30 days' written notice. Fees for work completed up to the termination date remain payable.",
          ],
        },
        {
          heading: "8. Governing Law",
          body: [
            "These terms are governed by the laws of the State of New York, without regard to conflict-of-law principles.",
          ],
        },
      ]}
    />
  );
}
