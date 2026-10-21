"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, MapPin, Menu, Monitor, Phone, Plus, ShieldCheck, X } from "lucide-react";
import VastuCompass from "@/components/ui/VastuCompass";
import { business, nav } from "@/lib/content";

const ease = [0.2, 0.7, 0.2, 1] as const;

const info = [
  { icon: MapPin, title: "Canada, US & worldwide", sub: "Based in Ontario, serving clients everywhere" },
  { icon: ShieldCheck, title: "7+ years of practice", sub: "Certified Vastu & Vedic Astrology consultant" },
  { icon: Monitor, title: "Online consultations", sub: "Vastu and astrology, over video" },
  { icon: Calendar, title: "Free discovery call", sub: "15 minutes, included with every enquiry" },
];

function HeroNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute inset-x-3 top-3 z-[6] md:inset-x-7 md:top-7">
      <nav
        aria-label="Hero navigation"
        className="flex items-center justify-between gap-3 rounded-full border border-white/60 bg-[#FFFCF6]/55 py-[0.6rem] pl-4 pr-[0.6rem] shadow-[0_8px_30px_rgba(74,31,92,0.08)] backdrop-blur-[16px] backdrop-saturate-[1.4] md:pl-5"
      >
        <a href="#top" className="flex shrink-0 items-center gap-3" aria-label="A Healing Vaastu home">
          <Image
            src="/logo.png"
            alt="A Healing Vaastu"
            width={36}
            height={36}
            className="h-9 w-9 rounded-xl shadow-[0_2px_10px_rgba(74,31,92,0.18)]"
            priority
          />
          <span className="hidden whitespace-nowrap font-display text-[0.98rem] font-semibold leading-[1.12] tracking-[0.01em] text-ink lg:block">
            A Healing
            <br />
            Vaastu
          </span>
        </a>

        {/* desktop links */}
        <ul className="hidden min-w-0 items-center md:flex lg:gap-1">
          {nav.map((l) => (
            <li key={l.href} className="shrink-0">
              <a
                href={l.href}
                className="whitespace-nowrap rounded-full px-[0.7rem] py-2 text-[0.9rem] font-medium text-ink/80 transition hover:bg-plum/[0.07] hover:text-ink lg:px-[0.95rem]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={business.phoneHref}
            className="hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white/70 px-4 py-[0.55rem] text-[0.88rem] font-medium text-ink transition hover:bg-white xl:inline-flex"
          >
            <Phone size={14} strokeWidth={2} />
            {business.phone}
          </a>
          <a
            href="#contact"
            className="hidden shrink-0 whitespace-nowrap rounded-full bg-ink px-5 py-[0.6rem] text-[0.88rem] font-medium text-page shadow-[0_6px_18px_rgba(42,14,61,0.28)] transition hover:-translate-y-px hover:bg-plum sm:inline-flex"
          >
            Book Consultation
          </a>
          <button
            type="button"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-ink transition hover:bg-plum/[0.07] md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={open}
            aria-controls="hero-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      {open && (
        <div
          id="hero-menu"
          className="mt-2 flex flex-col gap-1 rounded-[24px] border border-white/60 bg-[#FFFCF6]/90 p-2 shadow-[0_18px_50px_rgba(74,31,92,0.16)] backdrop-blur-xl md:hidden"
        >
          {nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-[1.1rem] py-[0.85rem] font-medium text-ink/80 hover:bg-plum/[0.07]"
            >
              {l.label}
            </a>
          ))}
          <a
            href={business.phoneHref}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-xl px-[1.1rem] py-[0.85rem] font-medium text-ink/80 hover:bg-plum/[0.07]"
          >
            <Phone size={15} strokeWidth={2} />
            {business.phone}
          </a>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="m-1 inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 font-medium text-page"
          >
            Book Consultation
          </a>
        </div>
      )}
    </div>
  );
}

function GlassTag({ title, sub, className }: { title: string; sub: string; className: string }) {
  return (
    <a
      href="#services"
      className={`glass group absolute z-[4] flex items-center gap-3 rounded-[18px] py-[0.55rem] pl-4 pr-[0.55rem] shadow-[0_12px_30px_rgba(31,10,58,0.22)] transition duration-300 hover:-translate-y-0.5 ${className}`}
    >
      <span className="flex flex-col whitespace-nowrap text-left leading-tight">
        <span className="text-[0.92rem] font-medium text-[#FFFCF6]">{title}</span>
        <span className="mt-0.5 text-[0.78rem] text-[#FFFCF6]/75">{sub}</span>
      </span>
      <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-ink text-[#FFFCF6]">
        <Plus size={16} strokeWidth={2} className="transition-transform duration-300 group-hover:rotate-90" />
      </span>
    </a>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease } };

  return (
    <section id="top" aria-label="Hero" className="bg-page p-3 md:p-5">
      <div className="rounded-[38px] border border-white/90 bg-white/60 p-[0.6rem] shadow-[0_18px_50px_rgba(74,31,92,0.08)] md:p-[0.85rem]">
        <div className="mesh-hero grain relative overflow-hidden rounded-[30px]">
          <HeroNav />

          <div className="relative z-[2] mx-auto grid min-h-[620px] max-w-shell grid-cols-1 items-center gap-10 px-6 pb-14 pt-32 md:grid-cols-2 md:px-14 md:pt-36">
            {/* LEFT: copy */}
            <div className="text-center md:text-left">
              <motion.h1
                {...rise(0.08)}
                className="font-display text-[clamp(2.6rem,5vw,4.4rem)] font-normal leading-[1.08] tracking-[-0.025em] text-ink"
              >
                Ancient Wisdom,
                <br />
                Modern <span className="text-accent">Harmony.</span>
              </motion.h1>

              <motion.p
                {...rise(0.16)}
                className="mx-auto mt-6 max-w-[420px] text-[1rem] leading-[1.65] text-ink/70 md:mx-0"
              >
                Transform your home or business through the sacred science of Vastu Shastra, aligning your space with nature&apos;s five elements for prosperity, health, and lasting peace.
              </motion.p>

              <motion.div
                {...rise(0.24)}
                className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 md:justify-start"
              >
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-full bg-ink px-7 py-[0.95rem] text-[0.96rem] font-medium text-page shadow-[0_10px_28px_rgba(31,10,58,0.28)] transition hover:-translate-y-0.5 hover:bg-[#3D1556]"
                >
                  Book Free Consultation
                </a>
                <a
                  href="#services"
                  className="text-[0.96rem] font-medium text-ink underline decoration-ink/30 underline-offset-4 transition hover:decoration-ink"
                >
                  Explore Services
                </a>
              </motion.div>
            </div>

            {/* RIGHT: compass with service tags */}
            <motion.div
              initial={reduce ? undefined : { opacity: 0, scale: 0.92 }}
              animate={reduce ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
              className="relative mx-auto aspect-square w-full max-w-[500px]"
            >
              {/* centre: 3D Vastu compass with hovering house */}
              <div className="absolute left-1/2 top-1/2 z-[2] h-full w-full -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
                <div className="pointer-events-none absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(255,248,228,0.18)_0%,rgba(232,213,163,0.06)_44%,transparent_70%)]" />
                <VastuCompass className="relative" />
              </div>

              <GlassTag
                title="Residential Vastu"
                sub="Book home consultation"
                className="bottom-[16%] left-0 md:-left-[6%]"
              />
              <GlassTag
                title="Business Vastu"
                sub="Book business audit"
                className="-bottom-[6%] right-0 md:-right-[4%] xl:bottom-auto xl:top-[-2%]"
              />
            </motion.div>
          </div>
        </div>

        {/* info row */}
        <ul className="grid grid-cols-1 gap-x-8 gap-y-6 px-4 pb-4 pt-6 sm:grid-cols-2 md:px-10 md:pb-5 md:pt-7 lg:grid-cols-4">
          {info.map(({ icon: Icon, title, sub }) => (
            <li key={title} className="flex items-start gap-3">
              <Icon size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-body-muted" aria-hidden="true" />
              <div>
                <p className="text-[0.9rem] font-medium text-ink">{title}</p>
                <p className="mt-0.5 text-[0.78rem] text-body-faint">{sub}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
