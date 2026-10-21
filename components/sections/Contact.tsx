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

/** Radio group styled as selectable pills. */
function Pills({ name, legend, options, required = false }: { name: string; legend: string; options: { value: string; label: string }[]; required?: boolean }) {
  return (
    <fieldset>
      <legend className={label}>
        {legend}
        {required && " *"}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="cursor-pointer">
            <input type="radio" name={name} value={o.value} required={required} className="peer sr-only" />
            <span className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-[0.84rem] text-ink/80 transition hover:border-ink/40 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-[#FFFCF6] peer-focus-visible:ring-4 peer-focus-visible:ring-plum/20">
              {o.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
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

                <Pills name="service" legend="Service needed" options={serviceOptions} required />
                <Pills name="propertyType" legend="Property type" options={propertyOptions} />

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

                {status === "error" && <p className="text-[0.86rem] font-medium text-rose">{error}</p>}

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
