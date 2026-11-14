"use client";

import { useEffect, useRef, useState } from "react";
import { HoverGroup, GroupIcon, StateIcon } from "@/components/icons/hover-group";
import { MapPinIcon } from "@/components/icons/map-pin";
import { PhoneIcon } from "@/components/icons/phone";
import { MailCheckIcon } from "@/components/icons/mail-check";
import { CalendarDaysIcon } from "@/components/icons/calendar-days";
import { CheckIcon } from "@/components/icons/check";
import { LoaderCircleIcon } from "@/components/icons/loader-circle";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { business, serviceOptions, propertyOptions } from "@/lib/content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // same check as the API route

const info = [
  { icon: MapPinIcon, title: "Location", lines: [business.location, business.area] },
  { icon: PhoneIcon, title: "Phone & WhatsApp", lines: [business.phone, business.bookingNote], href: business.phoneHref },
  { icon: MailCheckIcon, title: "Email", lines: [business.email, "We respond within 24 hours"], href: `mailto:${business.email}` },
  { icon: CalendarDaysIcon, title: "Consultation Hours", lines: business.hoursLines },
];

type Status = "idle" | "loading" | "success" | "error";
type Field = "firstName" | "lastName" | "email" | "service";
type Errors = Partial<Record<Field, string>>;

// required fields in the order they appear, so the first invalid one gets focus
const REQUIRED: Field[] = ["firstName", "lastName", "email", "service"];

function validate(data: Record<string, FormDataEntryValue>): Errors {
  const v = (k: string) => String(data[k] ?? "").trim();
  const errors: Errors = {};
  if (!v("firstName")) errors.firstName = "Please enter your first name.";
  if (!v("lastName")) errors.lastName = "Please enter your last name.";
  if (!v("email")) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v("email"))) errors.email = "Please enter a valid email address.";
  if (!v("service")) errors.service = "Please select a service.";
  return errors;
}

/** Error line under a field, tied to it with aria-describedby. */
function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={`${id}-error`} className="mt-1.5 text-small font-medium text-[#9E3A55]">
      {msg}
    </p>
  );
}

// aria props for a field that may be in error
const invalid = (id: string, msg?: string) =>
  msg ? { "aria-invalid": true as const, "aria-describedby": `${id}-error` } : {};

const field =
  "w-full rounded-[14px] border border-line bg-white px-4 py-3 text-copy text-ink outline-none transition placeholder:text-body-faint/70 focus:border-plum/50 focus:ring-4 focus:ring-plum/10";
const label = "mb-2 block text-small font-medium text-ink/80";
// rose border marks the field; the message uses a deeper rose that passes 4.5:1 on cream
const fieldError = "!border-rose/60 focus:!ring-rose/10";

/** Native select styled like the text fields, with a custom chevron. */
function Select({
  id,
  label: text,
  options,
  placeholder,
  required = false,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  placeholder: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}) {
  // placeholder shows muted until something is chosen
  const [chosenOwn, setChosen] = useState(false);
  const chosen = value !== undefined ? value !== "" : chosenOwn;
  return (
    <div>
      <label htmlFor={id} className={label}>
        {text}
        {required && " *"}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          required={required}
          {...(value !== undefined ? { value } : { defaultValue: "" })}
          onChange={(e) => {
            setChosen(e.target.value !== "");
            onChange?.(e.target.value);
          }}
          {...invalid(id, error)}
          className={`${field} cursor-pointer appearance-none truncate pr-11 ${chosen ? "" : "!text-body-faint"} ${error ? fieldError : ""}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value} className="text-ink">
              {o.label}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/60"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
      <FieldError id={id} msg={error} />
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  // true when the message itself could not be delivered (not a validation error)
  const [sendFailed, setSendFailed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [service, setService] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // any link marked data-book (service cards, hero tags) preselects its service and brings the form into view
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-book]");
      if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      setService(link.dataset.book ?? "");
      setErrors((prev) => ({ ...prev, service: undefined }));
      setStatus((s) => (s === "success" ? "idle" : s));
      requestAnimationFrame(() => {
        const form = formRef.current ?? document.getElementById("contact");
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        form?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        history.replaceState(null, "", "#contact");
      });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // clear a field's error as soon as it is edited
  const clear = (k: Field) => () => errors[k] && setErrors((prev) => ({ ...prev, [k]: undefined }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSendFailed(false);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // check fields here first, so each error sits by its field and focus goes to the first one
    const found = validate(data);
    setErrors(found);
    const first = REQUIRED.find((k) => found[k]);
    if (first) {
      setStatus("error");
      setError(`Please check the highlighted field${Object.keys(found).length > 1 ? "s" : ""}.`);
      form.querySelector<HTMLElement>(`#${first}`)?.focus();
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSendFailed(res.status >= 500);
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
      setService("");
    } catch (err) {
      setStatus("error");
      // a network failure never reached the server, so offer the direct contacts too
      if (!(err instanceof Error) || err.name === "TypeError") setSendFailed(true);
      setError(err instanceof Error && err.name !== "TypeError" ? err.message : "We couldn't send your message right now.");
    }
  }

  return (
    <section id="contact" aria-label="Contact" className="bg-page px-3 pb-3 md:px-5 md:pb-5">
      <div>
        <div className="grid grid-cols-1 items-start gap-2 lg:grid-cols-[0.9fr_1.1fr] lg:gap-4">
          {/* info */}
          <Reveal className="px-4 pb-6 pt-8 md:px-10 md:pt-12 lg:pb-12">
            <SectionLabel index="07" label="Book a consultation" />
            <h2 className="mt-6 font-display text-card sm:text-article lg:text-section font-normal leading-[1.15] tracking-[-0.025em] text-ink">
              Let&apos;s Begin Your
              <br />
              <span className="text-accent-plum">Transformation</span>
            </h2>
            <p className="mt-5 max-w-[440px] text-copy text-body-muted">
              Fill in the form and we&apos;ll respond within 24 hours to confirm your consultation. All enquiries are completely confidential.
            </p>

            {/* contact details: the 1px gap shows as divider lines */}
            <ul className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-[24px] bg-line sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {info.map((it) => (
                <HoverGroup as="li" key={it.title} className="flex gap-3 bg-[#FFFFFF] px-5 py-5">
                  <GroupIcon icon={it.icon} size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-plum" />
                  <div className="min-w-0">
                    <span className="block text-copy font-medium text-ink">{it.title}</span>
                    {it.lines.map((l, i) =>
                      i === 0 && it.href ? (
                        <a key={l} href={it.href} className="tap mt-1 block break-words text-small text-ink underline decoration-ink/25 underline-offset-4 transition hover:decoration-ink">
                          {l}
                        </a>
                      ) : (
                        <span key={l} className="mt-1 block text-small text-body-muted">
                          {l}
                        </span>
                      )
                    )}
                  </div>
                </HoverGroup>
              ))}
            </ul>
          </Reveal>

          {/* form */}
          <Reveal delay={0.1} className="rounded-[30px] bg-[#FFFFFF] px-6 py-8 md:px-10 md:py-10">
            {status === "success" ? (
              <div className="flex flex-col items-center py-14 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-[#FFFFFF]">
                  <StateIcon icon={CheckIcon} size={26} strokeWidth={2} />
                </span>
                <h3 className="mt-5 font-display text-subhead lg:text-card font-normal leading-[1.25] tracking-[-0.015em] text-ink">Message received</h3>
                <p className="mt-2 max-w-sm text-copy text-body-muted">
                  Thank you for reaching out. We&apos;ll contact you within 24 hours to schedule your free discovery call.
                </p>
              </div>
            ) : (
              <form ref={formRef} id="contact-form" onSubmit={onSubmit} noValidate className="scroll-mt-24 space-y-5">
                <div>
                  <h3 className="font-display text-subhead lg:text-card font-normal leading-[1.25] tracking-[-0.015em] text-ink">Request a Consultation</h3>
                  <p className="mt-1 text-small text-body-muted">Free 15-minute discovery call included with every enquiry.</p>
                </div>

                {/* honeypot: hidden from people and screen readers, filled in by bots */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className={label}>First name *</label>
                    <input id="firstName" name="firstName" required autoComplete="given-name" placeholder="Priya" onChange={clear("firstName")} {...invalid("firstName", errors.firstName)} className={`${field} ${errors.firstName ? fieldError : ""}`} />
                    <FieldError id="firstName" msg={errors.firstName} />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={label}>Last name *</label>
                    <input id="lastName" name="lastName" required autoComplete="family-name" placeholder="Sharma" onChange={clear("lastName")} {...invalid("lastName", errors.lastName)} className={`${field} ${errors.lastName ? fieldError : ""}`} />
                    <FieldError id="lastName" msg={errors.lastName} />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className={label}>Email address *</label>
                    <input id="email" name="email" type="email" required autoComplete="email" placeholder="priya@example.com" onChange={clear("email")} {...invalid("email", errors.email)} className={`${field} ${errors.email ? fieldError : ""}`} />
                    <FieldError id="email" msg={errors.email} />
                  </div>
                  <div>
                    <label htmlFor="phone" className={label}>Phone / WhatsApp</label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+1 (416) 555-0100" className={field} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Select
                    id="service"
                    label="Service needed"
                    options={serviceOptions}
                    placeholder="Select a service"
                    required
                    value={service}
                    onChange={(v) => {
                      setService(v);
                      clear("service")();
                    }}
                    error={errors.service}
                  />
                  <Select id="propertyType" label="Property type" options={propertyOptions} placeholder="Select a type" />
                </div>

                <div>
                  <label htmlFor="message" className={label}>Your message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us briefly about your space and the challenges you're experiencing…"
                    className={`${field} min-h-[110px] resize-y`}
                  />
                </div>

                {status === "error" && (
                  <p className="text-small font-medium text-[#9E3A55]" role="alert">
                    {error}
                    {sendFailed && (
                      <>
                        {" "}Please email us at{" "}
                        <a href={`mailto:${business.email}`} className="tap underline underline-offset-2">
                          {business.email}
                        </a>{" "}
                        or call{" "}
                        <a href={business.phoneHref} className="tap whitespace-nowrap underline underline-offset-2">
                          {business.phone}
                        </a>
                        .
                      </>
                    )}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-cta px-7 py-[0.95rem] text-copy font-medium leading-[1.3] text-white shadow-[0_10px_26px_rgba(91,30,90,0.28)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <>
                      <StateIcon icon={LoaderCircleIcon} size={18} strokeWidth={2} /> Sending…
                    </>
                  ) : (
                    "Request Free Consultation"
                  )}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
