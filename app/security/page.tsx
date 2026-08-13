import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal/legal-page";

export const metadata: Metadata = {
  title: "Security",
  description: "Vertex & Co.'s data handling, hosting security, and compliance posture.",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <LegalPage
      eyebrow="Trust & Security"
      title="Our security posture."
      breadcrumbLabel="Security"
      path="/security"
      updated="August 12, 2026"
      intro="Enterprise buyers ask about this before anything else. Here is exactly how we handle your data and code — no vague assurances."
      sections={[
        {
          heading: "1. Hosting & Infrastructure",
          body: [
            "Client applications we build are typically deployed on Vercel or your own cloud (AWS/GCP), with databases on managed providers (Neon, Supabase, or your existing infrastructure). We do not run our own unmanaged servers for client production workloads.",
          ],
        },
        {
          heading: "2. Data Handling",
          body: [
            "We access production data only when required for debugging or migration, with explicit client authorization. Credentials are stored in a password manager with per-project vaults, never in plaintext or shared documents.",
          ],
        },
        {
          heading: "3. Confidentiality & NDAs",
          body: [
            "We sign a mutual NDA before any discovery call that involves proprietary business data. Project-specific confidentiality terms are included in every Master Services Agreement.",
          ],
        },
        {
          heading: "4. Access Controls",
          body: [
            "Team access to client systems is scoped per project and revoked at engagement end. We use SSO and hardware-key 2FA internally across engineering tooling (GitHub, cloud consoles, password manager).",
          ],
        },
        {
          heading: "5. Compliance Roadmap",
          body: [
            "We are not currently SOC 2 certified. For clients that require it, we scope SOC 2 Type II readiness — policy documentation, access logging, and audit prep — as a defined workstream ahead of your compliance deadline, rather than claiming a certification we don't hold.",
          ],
        },
        {
          heading: "6. Incident Response",
          body: [
            "In the event of a security incident affecting a client system we manage, we notify the client within 24 hours of confirmation, alongside a written root-cause summary once the issue is resolved.",
          ],
        },
        {
          heading: "7. Report a Vulnerability",
          body: [
            "If you've found a security issue on this site or a Vertex-built system, email security@vertexand.co. We aim to acknowledge reports within 48 hours.",
          ],
        },
      ]}
    />
  );
}
