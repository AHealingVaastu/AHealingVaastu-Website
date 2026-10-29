"use client";

import { useState } from "react";
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

const info = [
  { icon: MapPinIcon, title: "Location", lines: [business.location, business.area] },
  { icon: PhoneIcon, title: "Phone & WhatsApp", lines: [business.phone, business.bookingNote], href: business.phoneHref },
  { icon: MailCheckIcon, title: "Email", lines: [business.email, "We respond within 24 hours"], href: `mailto:${business.email}` },
  { icon: CalendarDaysIcon, title: "Consultation Hours", lines: business.hoursLines },
];

type Status = "idle" | "loading" | "success" | "error";

const field =
  "w-full rounded-[14px] border border-line bg-white px-4 py-3 text-[0.93rem] text-ink outline-none transition placeholder:text-body-faint/70 focus:border-plum/50 focus:ring-4 focus:ring-plum/10";
const label = "mb-2 block text-[0.8rem] font-medium text-ink/80";

/** Native select styled like the text fields, with a custom chevron. */
function Select({ id, label: text, options, placeholder, required = false }: { id: string; label: string; options: { value: string; label: string }[]; placeholder: string; required?: boolean }) {
  // placeholder shows muted until something is chosen
  const [chosen, setChosen] = useState(false);
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
          defaultValue=""
          onChange={(e) => setChosen(e.target.value !== "")}
          className={`${field} cursor-pointer appearance-none truncate pr-11 ${chosen ? "" : "!text-body-faint"}`}
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
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  // true when the message itself could not be delivered (not a validation error)
  const [sendFailed, setSendFailed] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    setSendFailed(false);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
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
    } catch (err) {
      setStatus("error");
      // a network failure never reached the server, so offer the direct contacts too
      if (!(err instanceof Error) || err.name === "TypeError") setSendFailed(true);
      setError(err instanceof Error && err.name !== "TypeError" ? err.message : "We couldn't send your message right now.");
    }
  }

  return (
    <section id="contact" aria-label="Contact" className="bg-page px-3 pb-3 md:px-5 md:pb-5">
      <div className="mx-auto max-w-frame rounded-[38px] border border-white/90 bg-white/60 p-[0.6rem] shadow-[0_18px_50px_rgba(74,31,92,0.08)] md:p-[0.85rem]">
        <div className="grid grid-cols-1 items-start gap-2 lg:grid-cols-[0.9fr_1.1fr] lg:gap-4">
          {/* info */}
          <Reveal className="px-4 pb-6 pt-8 md:px-10 md:pt-12 lg:pb-12">
            <SectionLabel index="07" label="Book a consultation" />
            <h2 className="mt-6 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-normal leading-[1.08] tracking-[-0.025em] text-ink">
              Let&apos;s Begin Your
              <br />
              <span className="text-accent-plum">Transformation</span>
            </h2>
            <p className="mt-5 max-w-[440px] text-[1rem] leading-[1.65] text-body-muted">
              Fill in the form and we&apos;ll respond within 24 hours to confirm your consultation. All enquiries are completely confidential.
            </p>

            {/* contact details: the 1px gap shows as divider lines */}
            <ul className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-[24px] bg-line sm:grid-cols-2">
              {info.map((it) => (
                <HoverGroup as="li" key={it.title} className="flex gap-3 bg-[#FFFCF6] px-5 py-5">
                  <GroupIcon icon={it.icon} size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-plum" />
                  <div className="min-w-0">
                    <span className="block text-[0.9rem] font-medium text-ink">{it.title}</span>
                    {it.lines.map((l, i) =>
                      i === 0 && it.href ? (
                        <a key={l} href={it.href} className="tap mt-1 block break-words text-[0.84rem] text-ink underline decoration-ink/25 underline-offset-4 transition hover:decoration-ink">
                          {l}
                        </a>
                      ) : (
                        <span key={l} className="mt-1 block text-[0.82rem] leading-[1.5] text-body-muted">
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
          <Reveal delay={0.1} className="rounded-[30px] bg-[#FFFCF6] px-6 py-8 md:px-10 md:py-10">
            {status === "success" ? (
              <div className="flex flex-col items-center py-14 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-[#FFFCF6]">
                  <StateIcon icon={CheckIcon} size={26} strokeWidth={2} />
                </span>
                <h3 className="mt-5 font-display text-[1.6rem] font-normal tracking-[-0.02em] text-ink">Message received</h3>
                <p className="mt-2 max-w-sm text-[0.94rem] leading-[1.65] text-body-muted">
                  Thank you for reaching out. We&apos;ll contact you within 24 hours to schedule your free discovery call.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-5">
                <div>
                  <h3 className="font-display text-[1.6rem] font-normal tracking-[-0.02em] text-ink">Request a Consultation</h3>
                  <p className="mt-1 text-[0.88rem] text-body-muted">Free 15-minute discovery call included with every enquiry.</p>
                </div>

                {/* honeypot: hidden from people and screen readers, filled in by bots */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className={label}>First name *</label>
                    <input id="firstName" name="firstName" required autoComplete="given-name" placeholder="Priya" className={field} />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={label}>Last name *</label>
                    <input id="lastName" name="lastName" required autoComplete="family-name" placeholder="Sharma" className={field} />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className={label}>Email address *</label>
                    <input id="email" name="email" type="email" required autoComplete="email" placeholder="priya@example.com" className={field} />
                  </div>
                  <div>
                    <label htmlFor="phone" className={label}>Phone / WhatsApp</label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+1 (416) 555-0100" className={field} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Select id="service" label="Service needed" options={serviceOptions} placeholder="Select a service" required />
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
                  <p className="text-[0.86rem] font-medium leading-[1.6] text-rose" role="alert">
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
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-[0.95rem] text-[0.96rem] font-medium text-page shadow-[0_10px_28px_rgba(31,10,58,0.28)] transition hover:-translate-y-0.5 hover:bg-[#3D1556] disabled:cursor-not-allowed disabled:opacity-70"
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
