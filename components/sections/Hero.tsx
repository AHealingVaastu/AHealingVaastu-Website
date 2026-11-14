"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import PillNav from "@/components/ui/PillNav";
import { Compass } from "@/components/ui/VastuCompass";

const ease = [0.2, 0.7, 0.2, 1] as const;

// the cloud picture (hero-clouds.*) is 1641 x 959, and at its centre column the
// ridge of the cloud bank sits 596px down; the compass centre rides just above it
const IMG_W = 1641;
const IMG_H = 959;
const RIDGE_Y = 596;
const RIDGE_BELOW_CENTRE = 15;

/**
 * Lays the hero out from its copy: the compass sits just below the buttons (never
 * higher than its resting spot, 77.5% down), the sky and cloud bank move with it so
 * the cloud line always meets the compass in the same place, and on very short screens
 * the hero grows so the compass still rises from the clouds instead of being cut off.
 */
function useHeroLayout() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const compass = useRef<HTMLDivElement>(null);
  const sky = useRef<HTMLDivElement>(null);
  const clouds = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = { section: section.current, stage: stage.current, copy: copy.current, compass: compass.current, sky: sky.current, clouds: clouds.current };
    if (!el.section || !el.stage || !el.copy || !el.compass || !el.sky || !el.clouds) return;

    const layout = () => {
      const w = el.stage!.clientWidth;
      const baseH = window.innerHeight;
      const size = el.compass!.offsetWidth;
      // offsetTop/offsetHeight ignore the copy's entrance animation transform
      const copyBottom = el.copy!.offsetTop + el.copy!.offsetHeight;
      const gap = w < 768 ? 24 : 32;

      const top = Math.max(copyBottom + gap, 0.775 * baseH - size / 2);
      const centre = top + size / 2;
      const heroH = Math.max(baseH, centre + RIDGE_BELOW_CENTRE + (w < 768 ? 110 : 140));
      el.section!.style.minHeight = heroH > baseH ? `${Math.ceil(heroH)}px` : "";

      // background-size: cover, centred: where the ridge lands before any shift
      const scale = Math.max(w / IMG_W, heroH / IMG_H);
      const ridge = (heroH - IMG_H * scale) / 2 + RIDGE_Y * scale;
      const shift = centre + RIDGE_BELOW_CENTRE - ridge;

      el.compass!.style.top = `${top}px`;
      el.compass!.style.transform = "translateX(-50%)";
      el.sky!.style.transform = el.clouds!.style.transform = `translateY(${shift}px)`;
    };

    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(el.copy);
    ro.observe(el.stage);
    window.addEventListener("resize", layout);
    document.fonts?.ready.then(layout);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", layout);
    };
  }, []);

  return { section, stage, copy, compass, sky, clouds };
}

/*
 * Hero, being rebuilt piece by piece. Layers, back to front: the sky, the turning
 * Vastu compass, the cloud bank it rises from behind, a fade into the page, the copy
 * in the open sky above the compass, then the nav.
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useHeroLayout();
  const rise = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease } };

  return (
    <section ref={ref.section} id="top" aria-label="Hero" className="flex min-h-[100svh] flex-col bg-page">
      <div ref={ref.stage} className="relative flex flex-1 flex-col overflow-hidden">
        <div className="hero-backdrop" aria-hidden="true" />
        <div ref={ref.sky} className="hero-sky" aria-hidden="true" />
        <div ref={ref.compass} className="hero-compass" aria-hidden="true">
          <Compass />
        </div>
        <div ref={ref.clouds} className="hero-cloudbank" aria-hidden="true" />
        <div className="hero-fade" aria-hidden="true" />

        <div className="absolute inset-x-3 top-3 z-[6] md:inset-x-5 md:top-5">
          <PillNav menuId="hero-menu" label="Hero navigation" priority />
        </div>

        {/* copy: centred in the sky above the compass */}
        <div ref={ref.copy} className="hero-copy relative z-[3] mx-auto flex w-full max-w-[60rem] flex-col items-center px-6 text-center">
          <motion.h1
            {...rise(0.08)}
            className="font-wordmark text-article sm:text-section lg:text-display font-normal !leading-[1.1] tracking-[-0.02em] text-ink"
          >
            <span className="block [text-wrap:balance] md:whitespace-nowrap">Transform Your Space.</span>
            <span className="block [text-wrap:balance] md:whitespace-nowrap">
              Discover Your <span className="text-accent-plum">True Alignment.</span>
            </span>
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mx-auto mt-6 w-full max-w-[540px] text-copy text-body [text-wrap:balance] lg:mt-7"
          >
            Discover the timeless wisdom of Vastu Shastra and Vedic Astrology through personalized guidance that brings harmony to your spaces, clarity to your decisions, and balance to your everyday life.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 md:mt-8">
            <a
              href="#contact"
              className="inline-flex items-center rounded-[14px] bg-cta px-7 py-[0.85rem] text-copy font-medium leading-[1.3] text-white shadow-[0_10px_26px_rgba(91,30,90,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-plum"
            >
              Book Free Consultation
            </a>
            <a
              href="#services"
              className="inline-flex items-center rounded-[14px] border border-ink px-7 py-[calc(0.85rem-1px)] text-copy font-medium leading-[1.3] text-ink transition-colors hover:bg-ink/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-plum"
            >
              Explore Services
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
