"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Calendar, Check, Loader2 } from "lucide-react";
import { business, serviceOptions, propertyOptions } from "@/lib/content";

const info = [
  { icon: MapPin, title: "Location", lines: [business.location, business.area] },
  { icon: Phone, title: "Phone & WhatsApp", lines: [business.phone, business.bookingNote] },
  { icon: Mail, title: "Email", lines: [business.email, "We respond within 24 hours"] },
  { icon: Calendar, title: "Consultation Hours", lines: business.hoursLines },
];

type Status = "idle" | "loading" | "success" | "error";

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

  const field =
    "w-full rounded-[10px] border-[1.5px] border-gold/20 bg-cream px-[0.95rem] py-3 text-[0.93rem] text-body outline-none transition focus:border-gold focus:ring-[3px] focus:ring-gold/10";
  const label = "mb-[0.38rem] block text-[0.83rem] font-bold tracking-[0.02em] text-ink";

  return (
    <section id="contact" className="bg-gradient-to-b from-cream-200 to-page">
      <div className="mx-auto max-w-shell px-6 py-16">
        <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-[1fr_1.4fr]">
          {/* info */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-gold-dark">
              <span className="h-[7px] w-[7px] rounded-full bg-gold ring-4 ring-gold/20" />
              Book a Consultation
            </div>
            <h2 className="mb-4 font-display text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-ink">
              Let&apos;s Begin Your <span className="text-accent">Transformation</span>
            </h2>
            <p className="mb-8 text-[0.97rem] leading-relaxed text-body-muted">
              Fill in the form and we&apos;ll respond within 24 hours to confirm your consultation. All enquiries are completely confidential.
            </p>
            {info.map((it) => (
              <div key={it.title} className="mb-6 flex gap-4">
                <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl bg-gold/[0.11] text-gold-dark">
                  <it.icon size={20} />
                </div>
                <div>
                  <strong className="mb-[0.2rem] block text-[0.92rem] font-bold text-ink">{it.title}</strong>
                  {it.lines.map((l) => (
                    <span key={l} className="block text-[0.88rem] text-body-muted">{l}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* form */}
          <div className="rounded-[24px] border border-line bg-white p-8 shadow-[0_18px_50px_rgba(74,31,92,0.08)]">
            {status === "success" ? (
              <div className="flex flex-col items-center py-10 text-center">
                <Check size={52} className="mb-3 rounded-full bg-green-50 p-2 text-green-500" />
                <h3 className="mb-2 font-display text-[1.4rem] font-semibold text-ink">Message Received!</h3>
                <p className="max-w-sm text-[0.92rem] text-body-muted">
                  Thank you for reaching out. We&apos;ll contact you within 24 hours to schedule your free discovery call.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <h3 className="mb-[0.35rem] font-display text-[1.3rem] font-semibold text-ink">Request a Consultation</h3>
                <p className="mb-6 text-[0.87rem] text-body-muted">Free 15-minute discovery call included with every enquiry.</p>

                <div className="mb-[1.1rem] grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className={label}>First Name *</label>
                    <input id="firstName" name="firstName" required autoComplete="given-name" placeholder="Priya" className={field} />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={label}>Last Name *</label>
                    <input id="lastName" name="lastName" required autoComplete="family-name" placeholder="Sharma" className={field} />
                  </div>
                </div>
                <div className="mb-[1.1rem]">
                  <label htmlFor="email" className={label}>Email Address *</label>
                  <input id="email" name="email" type="email" required autoComplete="email" placeholder="priya@example.com" className={field} />
                </div>
                <div className="mb-[1.1rem]">
                  <label htmlFor="phone" className={label}>Phone / WhatsApp</label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+1 (416) 555-0100" className={field} />
                </div>
                <div className="mb-[1.1rem] grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="service" className={label}>Service Needed *</label>
                    <select id="service" name="service" required defaultValue="" className={field}>
                      <option value="" disabled>Select a service</option>
                      {serviceOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="propertyType" className={label}>Property Type</label>
                    <select id="propertyType" name="propertyType" defaultValue="" className={field}>
                      <option value="" disabled>Select type</option>
                      {propertyOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className={label}>Your Message</label>
                  <textarea id="message" name="message" rows={4} placeholder="Tell us briefly about your space and the challenges you're experiencing…" className={`${field} min-h-[95px] resize-y`} />
                </div>

                {status === "error" && <p className="mb-3 text-[0.85rem] font-medium text-rose">{error}</p>}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold to-[#D4B85C] py-[0.95rem] text-[0.97rem] font-bold text-ink shadow-[0_4px_14px_rgba(201,168,76,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,168,76,0.42)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <><Loader2 size={18} className="animate-spin" /> Sending…</>
                  ) : (
                    "Request Free Consultation"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
