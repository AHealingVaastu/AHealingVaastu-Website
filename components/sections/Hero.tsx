"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import VastuCompass from "@/components/ui/VastuCompass";

const ease = [0.2, 0.7, 0.2, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease } };

  return (
    <section id="top" aria-label="Hero" className="flex min-h-screen p-[0.85rem]">
      <div className="mesh-hero grain relative flex flex-1 items-center overflow-hidden rounded-[30px] shadow-[0_24px_70px_rgba(74,31,92,0.18)] ring-1 ring-inset ring-white/10">
        <div className="relative z-[2] mx-auto grid w-full max-w-shell grid-cols-1 items-center gap-10 px-6 pb-16 pt-28 md:grid-cols-[1.05fr_0.95fr] md:px-12">
          {/* LEFT — copy */}
          <div className="text-center md:text-left">
            <motion.div
              {...rise(0)}
              className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/[0.06] px-[0.95rem] py-[0.4rem] text-[0.73rem] font-semibold tracking-[0.06em] text-ink backdrop-blur-sm"
            >
              <span className="h-[6px] w-[6px] animate-bdot rounded-full bg-terra shadow-[0_0_0_3px_rgba(193,68,14,0.18)]" />
              Canada, US, India &amp; Worldwide
            </motion.div>

            <motion.h1
              {...rise(0.08)}
              className="my-6 font-display text-[clamp(2.7rem,5.4vw,4.6rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-ink"
            >
              Ancient <span className="text-accent">Wisdom,</span>
              <br />
              <span className="text-[#FFFCF6] [text-shadow:0_2px_30px_rgba(31,10,58,0.35)]">
                Modern <span className="text-accent">Harmony.</span>
              </span>
            </motion.h1>

            <motion.p {...rise(0.16)} className="mx-auto mb-8 max-w-[480px] text-[1.08rem] leading-relaxed text-ink/70 md:mx-0">
              Transform your home or business through the sacred science of Vastu Shastra, aligning your space with nature&apos;s five elements for prosperity, health, and lasting peace.
            </motion.p>

            <motion.div {...rise(0.24)} className="flex flex-wrap items-center justify-center gap-[0.9rem] md:justify-start">
              <a href="#contact" className="group inline-flex items-center gap-[0.85rem] rounded-full bg-ink py-[0.55rem] pl-6 pr-[0.6rem] text-[0.96rem] font-semibold text-page shadow-[0_10px_28px_rgba(31,10,58,0.28)] transition hover:-translate-y-0.5 hover:bg-[#3D1556]">
                Book Free Consultation
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-gold to-[#E2BC5E] text-ink transition group-hover:-rotate-45">
                  <ArrowRight size={15} strokeWidth={2.5} />
                </span>
              </a>
              <a href="#services" className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/45 px-6 py-[0.78rem] text-[0.96rem] font-semibold text-ink backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/80">
                Explore Services <ArrowRight size={15} strokeWidth={2} />
              </a>
            </motion.div>

            <motion.div {...rise(0.32)} className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.84rem] font-medium text-ink/60 md:justify-start">
              <span className="flex items-center gap-2"><MapPin size={15} className="text-terra" /> Ontario, Canada</span>
              <span className="h-4 w-px bg-ink/15" />
              <span className="flex items-center gap-2"><ShieldCheck size={15} className="text-terra" /> 7+ Years Experience</span>
            </motion.div>
          </div>

          {/* RIGHT — orbital cluster */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, scale: 0.92 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="relative mx-auto aspect-square w-full max-w-[480px]"
            aria-hidden="true"
          >
            {/* stat badge */}
            <div className="glass absolute left-[2%] top-[2%] z-[4] rounded-2xl px-[0.95rem] py-[0.7rem] text-center shadow-[0_10px_26px_rgba(31,10,58,0.28)]">
              <div className="font-display text-[1.4rem] font-semibold leading-none text-[#FFFCF6]">150+</div>
              <div className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-white/80">Spaces Harmonized</div>
            </div>

            {/* centre — 3D Vastu compass with hovering house */}
            <div className="absolute left-1/2 top-1/2 z-[2] h-full w-full -translate-x-1/2 -translate-y-1/2">
              <div className="pointer-events-none absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(255,248,228,0.18)_0%,rgba(232,213,163,0.06)_44%,transparent_70%)]" />
              <VastuCompass className="relative" />
            </div>
          </motion.div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-6 left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-[0.45rem] text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/60">
          <span className="flex h-[34px] w-[22px] justify-center rounded-full border-[1.5px] border-white/50 pt-[5px]">
            <span className="h-[7px] w-[3px] animate-sdot rounded bg-white" />
          </span>
          Scroll
        </div>
      </div>
    </section>
  );
}
