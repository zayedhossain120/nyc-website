"use server";

import { contactFormSchema } from "@/lib/schemas/contact";

export interface ContactActionState {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
}

export async function submitContactForm(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    service: formData.get("service"),
    budget: formData.get("budget"),
    details: formData.get("details"),
    company_website: formData.get("company_website") ?? "",
  };

  const parsed = contactFormSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      success: false,
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  // Honeypot: bots that fill every field get a silent "success" with no side effects.
  if (parsed.data.company_website) {
    return { success: true, message: "Thanks — we'll be in touch within one business day." };
  }

  // TODO: wire this up to a real destination (Resend, a CRM webhook, etc.) before launch.
  console.log("New contact form submission:", {
    name: parsed.data.name,
    email: parsed.data.email,
    company: parsed.data.company,
    service: parsed.data.service,
    budget: parsed.data.budget,
    details: parsed.data.details,
  });

  return { success: true, message: "Thanks — we'll be in touch within one business day." };
}
