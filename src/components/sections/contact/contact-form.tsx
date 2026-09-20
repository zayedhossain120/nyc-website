"use client";

import { motion } from "motion/react";
import { useState, useTransition, type FormEvent, type ReactNode } from "react";
import { submitContactForm, type ContactActionState } from "@/app/(site)/contact/actions";
import { Button } from "@/components/ui/button";
import { CustomDropdown } from "@/components/ui/custom-dropdown";
import {
  BUDGET_OPTIONS,
  SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
  contactFormSchema,
} from "@/lib/schemas/contact";
import { cn } from "@/lib/utils";

const STEPS = ["Basics", "Project", "Details"];

/** Which form fields belong to each step, so errors can be shown on the right one. */
const STEP_FIELDS: readonly (readonly FieldName[])[] = [
  ["name", "email", "company"],
  ["service", "budget", "timeline"],
  ["details"],
];

type FieldName = "name" | "email" | "company" | "service" | "budget" | "timeline" | "details";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const EMPTY_VALUES: Values = {
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  timeline: "",
  details: "",
};

const INPUT_CLASS =
  "w-full rounded-xl border bg-surface px-4 py-3 text-primary placeholder:text-muted focus:outline-none";

function inputClass(hasError: boolean) {
  return cn(INPUT_CLASS, hasError ? "border-accent-warm" : "border-strong focus:border-accent-primary");
}

function stepOfField(field: string) {
  return Math.max(0, STEP_FIELDS.findIndex((fields) => (fields as readonly string[]).includes(field)));
}

/** Validate the given fields against the shared schema; returns one message per field. */
function validate(values: Values, fields: readonly FieldName[]): Errors {
  const result = contactFormSchema.safeParse({ ...values, company_website: "" });
  if (result.success) return {};
  const errors: Errors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as FieldName | undefined;
    if (key && fields.includes(key) && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Errors>({});
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<ContactActionState | null>(null);
  const [pending, startTransition] = useTransition();

  const lastStep = STEPS.length - 1;

  function setValue(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    // Editing after a failed send clears the old error banner.
    if (result && !result.success) setResult(null);
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function goNext() {
    const stepErrors = validate(values, STEP_FIELDS[step]);
    if (Object.keys(stepErrors).length > 0) {
      setErrors((current) => ({ ...current, ...stepErrors }));
      return;
    }
    setStep((current) => Math.min(lastStep, current + 1));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Enter key on an earlier step behaves like "Continue".
    if (step < lastStep) {
      goNext();
      return;
    }

    const allFields = STEP_FIELDS.flat();
    const allErrors = validate(values, allFields);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setStep(stepOfField(Object.keys(allErrors)[0]));
      return;
    }

    const formData = new FormData(event.currentTarget);
    for (const field of allFields) formData.set(field, values[field]);

    startTransition(async () => {
      const response = await submitContactForm({ success: false, message: "" }, formData);
      setResult(response);
      if (response.success) {
        // Clear everything so nothing lingers once the message is sent.
        setValues(EMPTY_VALUES);
        setErrors({});
        setStep(0);
        return;
      }
      if (response.fieldErrors) {
        const serverErrors = response.fieldErrors as Errors;
        setErrors(serverErrors);
        setStep(stepOfField(Object.keys(serverErrors)[0] ?? "details"));
      }
    });
  }

  if (result?.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-4 rounded-2xl border border-subtle bg-surface p-10 text-center"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 15 }}
          className="flex size-14 items-center justify-center rounded-full bg-accent-primary/10 text-2xl text-accent-primary"
        >
          ✓
        </motion.span>
        <h3 className="text-xl font-medium text-primary">Message sent.</h3>
        <p className="text-secondary">{result.message}</p>
        <Button type="button" variant="outline" onClick={() => setResult(null)} className="mt-2">
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      <div className="flex gap-2">
        {STEPS.map((label, index) => (
          <button
            key={label}
            type="button"
            // Allow jumping back to a finished step, never ahead of validation.
            onClick={() => index < step && setStep(index)}
            aria-current={index === step ? "step" : undefined}
            className="flex-1 text-left"
          >
            <div
              className={cn(
                "h-1 rounded-full transition-colors duration-300",
                index <= step ? "bg-accent-primary" : "bg-strong",
              )}
            />
            <span className="mt-2 block text-xs text-muted">{label}</span>
          </button>
        ))}
      </div>

      {/* Honeypot: hidden from real users, left for bots to fill */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px]"
        aria-hidden="true"
      />

      <div className={cn("flex flex-col gap-5", step !== 0 && "hidden")}>
        <Field label="Full Name" htmlFor="contact-name" error={errors.name}>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => setValue("name", event.target.value)}
            className={inputClass(!!errors.name)}
            placeholder="Jane Doe"
          />
        </Field>
        <Field label="Work Email" htmlFor="contact-email" error={errors.email}>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => setValue("email", event.target.value)}
            className={inputClass(!!errors.email)}
            placeholder="jane@company.com"
          />
        </Field>
        <Field label="Company" htmlFor="contact-company" error={errors.company}>
          <input
            id="contact-company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(event) => setValue("company", event.target.value)}
            className={inputClass(!!errors.company)}
            placeholder="Acme Inc."
          />
        </Field>
      </div>

      <div className={cn("flex flex-col gap-5", step !== 1 && "hidden")}>
        <Field label="Service Interest" labelId="contact-service-label" error={errors.service}>
          <CustomDropdown
            id="contact-service"
            aria-labelledby="contact-service-label"
            options={SERVICE_OPTIONS}
            value={values.service}
            onChange={(value) => setValue("service", value)}
            placeholder="Select a service"
            invalid={!!errors.service}
          />
        </Field>
        <Field label="Budget Range" labelId="contact-budget-label" error={errors.budget}>
          <CustomDropdown
            id="contact-budget"
            aria-labelledby="contact-budget-label"
            options={BUDGET_OPTIONS}
            value={values.budget}
            onChange={(value) => setValue("budget", value)}
            placeholder="Select a budget range"
            invalid={!!errors.budget}
          />
        </Field>
        <Field label="Timeline" labelId="contact-timeline-label" error={errors.timeline}>
          <CustomDropdown
            id="contact-timeline"
            aria-labelledby="contact-timeline-label"
            options={TIMELINE_OPTIONS}
            value={values.timeline}
            onChange={(value) => setValue("timeline", value)}
            placeholder="When do you need this?"
            invalid={!!errors.timeline}
          />
        </Field>
      </div>

      <div className={cn("flex flex-col gap-5", step !== 2 && "hidden")}>
        <Field label="Project Details" htmlFor="contact-details" error={errors.details}>
          <textarea
            id="contact-details"
            rows={5}
            value={values.details}
            onChange={(event) => setValue("details", event.target.value)}
            className={cn(inputClass(!!errors.details), "resize-none")}
            placeholder="What are you building, and what does success look like?"
          />
        </Field>
        {result && !result.success && (
          <p role="alert" className="text-sm text-accent-warm">
            {result.message}
          </p>
        )}
      </div>

      <div className="flex justify-between gap-4">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setStep((current) => Math.max(0, current - 1))}
          className={cn(step === 0 && "invisible")}
        >
          Back
        </Button>
        {step < lastStep ? (
          <Button type="button" variant="primary" onClick={goNext}>
            Continue
          </Button>
        ) : (
          <Button type="submit" variant="primary" disabled={pending}>
            {pending ? "Sending…" : "Send Message"}
          </Button>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  labelId,
  error,
  children,
}: {
  label: string;
  /** For native inputs: the id the label points at. */
  htmlFor?: string;
  /** For the custom dropdown: an id the trigger references via aria-labelledby. */
  labelId?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      {htmlFor ? (
        <label htmlFor={htmlFor} className="text-sm text-secondary">
          {label}
        </label>
      ) : (
        <span id={labelId} className="text-sm text-secondary">
          {label}
        </span>
      )}
      {children}
      {error && (
        <span role="alert" className="text-xs text-accent-warm">
          {error}
        </span>
      )}
    </div>
  );
}
