"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HoverGroup, GroupIcon } from "@/components/icons/hover-group";
import { CalendarDaysIcon } from "@/components/icons/calendar-days";
import { MapPinIcon } from "@/components/icons/map-pin";
import { MonitorCheckIcon } from "@/components/icons/monitor-check";
import { PlusIcon } from "@/components/icons/plus";
import { ShieldCheckIcon } from "@/components/icons/shield-check";
import PillNav from "@/components/ui/PillNav";
import VastuCompass from "@/components/ui/VastuCompass";

const ease = [0.2, 0.7, 0.2, 1] as const;

const info = [
  { icon: MapPinIcon, title: "Canada, US & worldwide", sub: "Based in Ontario, serving clients everywhere" },
  { icon: ShieldCheckIcon, title: "7+ years of practice", sub: "Certified Vastu & Vedic Astrology consultant" },
  { icon: MonitorCheckIcon, title: "Online consultations", sub: "Vastu and astrology, over video" },
  { icon: CalendarDaysIcon, title: "Free discovery call", sub: "15 minutes, included with every enquiry" },
];

function GlassTag({ title, sub, className }: { title: string; sub: string; className: string }) {
  return (
    <HoverGroup
      as="a"
      href="#services"
      className={`glass group absolute z-[4] flex items-center gap-3 rounded-[1.125rem] py-[0.55rem] pl-4 pr-[0.55rem] shadow-[0_0.75rem_1.875rem_rgba(31,10,58,0.22)] transition duration-300 hover:-translate-y-0.5 ${className}`}
    >
      <span className="flex flex-col whitespace-nowrap text-left leading-tight">
        <span className="text-[0.92rem] font-medium text-[#FFFCF6]">{title}</span>
        <span className="mt-0.5 text-[0.78rem] text-[#FFFCF6]/75">{sub}</span>
      </span>
      <span className="grid h-[2.125rem] w-[2.125rem] shrink-0 place-items-center rounded-full bg-ink text-[#FFFCF6]">
        <GroupIcon icon={PlusIcon} size={16} strokeWidth={2} />
      </span>
    </HoverGroup>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease } };

  return (
    <section id="top" aria-label="Hero" className="flex min-h-[100svh] flex-col bg-page p-3 md:p-5">
      <div className="mx-auto flex w-full max-w-frame flex-1 flex-col rounded-[2.375rem] border border-white/90 bg-white/60 p-[0.6rem] shadow-[0_1.125rem_3.125rem_rgba(74,31,92,0.08)] md:p-[0.85rem]">
        <div className="mesh-hero grain relative flex flex-1 flex-col overflow-hidden rounded-[1.875rem]">
          <div className="absolute inset-x-3 top-3 z-[6] md:inset-x-7 md:top-7">
            <PillNav menuId="hero-menu" label="Hero navigation" priority />
          </div>

          <div className="relative z-[2] mx-auto grid w-full max-w-shell flex-1 grid-cols-1 items-center gap-10 px-6 pb-14 pt-32 md:grid-cols-2 md:px-14 md:pt-[clamp(7rem,18svh,9rem)]">
            {/* LEFT: copy */}
            <div className="text-center md:text-left">
              <motion.h1
                {...rise(0.08)}
                className="font-display text-[clamp(1.5rem,8.4vw,2.6rem)] font-normal md:text-[clamp(2.1rem,4.3vw,2.6rem)] lg:text-[clamp(2.6rem,5vw,4.4rem)] leading-[1.08] tracking-[-0.025em] text-ink"
              >
                Ancient Wisdom,
                <br />
                Modern <span className="text-accent-plum">Harmony.</span>
              </motion.h1>

              <motion.p
                {...rise(0.16)}
                className="mx-auto mt-6 max-w-[26.25rem] text-[1rem] leading-[1.65] text-ink/70 md:mx-0"
              >
                Transform your home or business through the sacred science of Vastu Shastra, aligning your space with nature&apos;s five elements for prosperity, health, and lasting peace.
              </motion.p>

              <motion.div
                {...rise(0.24)}
                className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 md:justify-start"
              >
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-full bg-ink px-7 py-[0.95rem] text-[0.96rem] font-medium text-page shadow-[0_0.625rem_1.75rem_rgba(31,10,58,0.28)] transition hover:-translate-y-0.5 hover:bg-[#3D1556]"
                >
                  Book Free Consultation
                </a>
                <a
                  href="#services"
                  className="tap text-[0.96rem] font-medium text-ink underline decoration-ink/30 underline-offset-4 transition hover:decoration-ink"
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
              className="relative mx-auto mt-16 aspect-square w-full max-w-[31.25rem] md:mt-0 md:max-w-[clamp(18.75rem,calc(100svh-25.5rem),31.25rem)]"
            >
              {/* centre: 3D Vastu compass with hovering house */}
              <div className="absolute left-1/2 top-1/2 z-[2] h-full w-full -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
                <div className="pointer-events-none absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(255,248,228,0.18)_0%,rgba(232,213,163,0.06)_44%,transparent_70%)]" />
                <VastuCompass className="relative" />
              </div>

              <GlassTag
                title="Residential Vastu"
                sub="Book home consultation"
                className="bottom-[4%] left-0 max-[359px]:-left-2 max-[359px]:scale-90 md:-left-[6%] xl:bottom-[10%]"
              />
              <GlassTag
                title="Business Vastu"
                sub="Book business audit"
                className="-top-14 right-0 md:-right-[4%] lg:-right-6 lg:-top-10 xl:-right-16 [@media(min-width:768px)_and_(max-height:640px)]:hidden"
              />
            </motion.div>
          </div>
        </div>

        {/* info row */}
        <ul className="grid grid-cols-1 gap-x-8 gap-y-6 px-4 pb-4 pt-6 sm:grid-cols-2 md:px-10 md:pb-5 md:pt-7 lg:grid-cols-4">
          {info.map(({ icon: Icon, title, sub }) => (
            <HoverGroup as="li" key={title} className="flex items-start gap-3">
              <GroupIcon icon={Icon} size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-body-muted" />
              <div>
                <p className="text-[0.9rem] font-medium text-ink">{title}</p>
                <p className="mt-0.5 text-[0.78rem] text-body-faint">{sub}</p>
              </div>
            </HoverGroup>
          ))}
        </ul>
      </div>
    </section>
  );
}
