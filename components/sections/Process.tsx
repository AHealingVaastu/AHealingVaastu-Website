"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { process } from "@/lib/content";

export default function Process() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  // the step crossing the middle of the viewport becomes active
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    rows.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const step = process[active];

  return (
    <section id="process" aria-label="Process" className="bg-page px-3 pb-3 md:px-5 md:pb-5">
      <div className="mx-auto max-w-frame rounded-[2.375rem] border border-white/90 bg-white/60 p-[0.6rem] shadow-[0_1.125rem_3.125rem_rgba(74,31,92,0.08)] md:p-[0.85rem]">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-[0.9fr_1.1fr] lg:gap-4">
          {/* mesh card: pinned on desktop, tracks the active step */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="mesh-hero grain relative flex flex-col overflow-hidden rounded-[1.875rem] px-6 pb-8 pt-8 md:px-10 md:pt-10 lg:h-[min(41.25rem,calc(100svh-7.5rem))] lg:pb-6">
              <div className="relative z-[2]">
                <SectionLabel index="04" label="How it works" />
                <h2 className="mt-6 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-normal leading-[1.08] tracking-[-0.025em] text-ink">
                  Your Journey
                  <br />
                  to <span className="text-accent-plum">Harmony</span>
                </h2>
                <p className="mt-5 max-w-[23.75rem] text-[1rem] leading-[1.65] text-ink/70">
                  A clear, compassionate process designed to bring measurable change to your space, and to your life.
                </p>
              </div>

              <div className="relative z-[2] mt-auto hidden lg:block" aria-hidden="true">
                <motion.span
                  key={step.n}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
                  className="block font-display text-[clamp(6rem,10vw,8.5rem)] font-normal leading-none tracking-[-0.04em] text-[#FFFCF6]"
                >
                  {step.n}
                </motion.span>
                <div className="glass mt-4 rounded-[1.125rem] px-5 py-4 shadow-[0_0.75rem_1.875rem_rgba(31,10,58,0.22)]">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[0.78rem] text-[#FFFCF6]/75">
                      Step {step.n} of {String(process.length).padStart(2, "0")}
                    </span>
                    <span className="flex gap-1">
                      {process.map((s, j) => (
                        <span
                          key={s.n}
                          className={`h-[0.1875rem] w-4 rounded-full transition-colors duration-300 ${j <= active ? "bg-[#FFFCF6]" : "bg-[#FFFCF6]/25"}`}
                        />
                      ))}
                    </span>
                  </div>
                  <span className="mt-1.5 block text-[1.05rem] font-medium text-[#FFFCF6]">{step.title}</span>
                </div>
              </div>
            </div>
          </div>

          {/* steps: editorial list with hairline rules */}
          <ol className="px-4 md:px-10 lg:py-6">
            {process.map((s, i) => (
              <li
                key={s.n}
                ref={(el) => {
                  rows.current[i] = el;
                }}
                data-index={i}
                className={`grid grid-cols-[3.25rem_1fr] gap-x-5 border-line py-8 transition-opacity duration-500 md:grid-cols-[4.5rem_1fr] md:gap-x-8 md:py-10 lg:min-h-[min(34svh,18.75rem)] lg:content-center ${
                  i > 0 ? "border-t" : ""
                } ${i === active ? "" : "lg:opacity-45"}`}
              >
                <span
                  className={`font-display text-[clamp(2.2rem,3.4vw,3rem)] font-normal leading-none tracking-[-0.025em] transition-colors duration-500 ${
                    i === active ? "text-plum" : "text-ink/30"
                  }`}
                >
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-[1.35rem] font-medium leading-[1.2] tracking-[-0.015em] text-ink">{s.title}</h3>
                  <p className="mt-3 max-w-[28.75rem] text-[0.95rem] leading-[1.65] text-body-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
