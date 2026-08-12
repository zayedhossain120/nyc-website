import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { TrustPanel } from "@/components/sections/contact/trust-panel";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Vertex & Co. — tell us what you're building and get a response within one business day.",
};

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto grid w-full max-w-7xl gap-16 px-6 py-20 md:px-16 md:py-28 lg:grid-cols-2 lg:items-start">
        <TrustPanel />
        <div className="rounded-2xl border border-subtle bg-surface/60 p-6 backdrop-blur-sm sm:p-8">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
