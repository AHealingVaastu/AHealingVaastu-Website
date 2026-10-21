"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { HoverGroup, GroupIcon } from "@/components/icons/hover-group";
import { ArrowLeftIcon } from "@/components/icons/arrow-left";
import { ArrowRightIcon } from "@/components/icons/arrow-right";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { testimonials } from "@/lib/content";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Testimonials() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const total = testimonials.length;
  const go = (i: number) => setActive((i + total) % total);
  const t = testimonials[active];

  return (
    <section id="testimonials" aria-label="Testimonials" className="bg-page px-3 pb-3 md:px-5 md:pb-5">
      <div className="rounded-[38px] border border-white/90 bg-white/60 p-[0.6rem] shadow-[0_18px_50px_rgba(74,31,92,0.08)] md:p-[0.85rem]">
        {/* heading */}
        <Reveal className="px-4 pb-8 pt-8 md:px-10 md:pb-10 md:pt-12">
          <SectionLabel index="05" label="Client stories" />
          <div className="mt-6 grid grid-cols-1 items-center gap-5 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-normal leading-[1.08] tracking-[-0.025em] text-ink">
              Transformed Spaces,
              <br />
              <span className="text-accent-plum">Transformed Lives</span>
            </h2>
            <p className="max-w-[440px] text-[1rem] leading-[1.65] text-body-muted">
              Real results from families and businesses across Canada, the US, India, and beyond.
            </p>
          </div>
        </Reveal>

        {/* stories panel: featured quote above a client strip; the 1px gap shows as divider lines */}
        <Reveal delay={0.1}>
          <div className="stories grid gap-px overflow-hidden rounded-[30px] bg-line">
            {/* featured quote */}
            <div className="bg-[#FFFCF6] px-6 py-10 md:px-14 md:py-14">
              <div className="flex gap-1 text-plum" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                ))}
              </div>

              {/* every quote shares one grid cell so the panel keeps the height of the longest */}
              <div className="mt-6 grid max-w-[920px]" aria-live="polite">
                {testimonials.map((q, i) => {
                  const cls =
                    "[grid-area:1/1] font-display text-[clamp(1.3rem,2.3vw,1.9rem)] font-normal leading-[1.42] tracking-[-0.015em] text-ink";
                  return i === active ? (
                    <motion.blockquote
                      key={q.name}
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
                      className={cls}
                    >
                      &ldquo;{q.quote}&rdquo;
                    </motion.blockquote>
                  ) : (
                    <blockquote key={q.name} className={`invisible ${cls}`} aria-hidden="true">
                      &ldquo;{q.quote}&rdquo;
                    </blockquote>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6">
                <div>
                  <span className="block text-[1rem] font-medium text-ink">{t.name}</span>
                  <span className="mt-0.5 block text-[0.82rem] text-body-faint">{t.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="mr-2 font-display text-[0.95rem] tabular-nums text-body-faint">
                    <span className="text-ink">{pad(active + 1)}</span> / {pad(total)}
                  </span>
                  <HoverGroup
                    as="button"
                    type="button"
                    aria-label="Previous story"
                    onClick={() => go(active - 1)}
                    className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink transition [@media(hover:hover)]:hover:bg-ink [@media(hover:hover)]:hover:text-[#FFFCF6]"
                  >
                    <GroupIcon icon={ArrowLeftIcon} size={16} strokeWidth={2} />
                  </HoverGroup>
                  <HoverGroup
                    as="button"
                    type="button"
                    aria-label="Next story"
                    onClick={() => go(active + 1)}
                    className="grid h-11 w-11 place-items-center rounded-full bg-ink text-[#FFFCF6] transition hover:bg-plum"
                  >
                    <GroupIcon icon={ArrowRightIcon} size={16} strokeWidth={2} />
                  </HoverGroup>
                </div>
              </div>
            </div>

            {/* client strip (sm and up); the active cell's bar fills, then moves on */}
            <ul className="hidden grid-cols-2 gap-px sm:grid lg:grid-cols-4">
              {testimonials.map((c, i) => {
                const on = i === active;
                return (
                  <li key={c.name}>
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-current={on}
                      className={`relative flex h-full w-full items-center gap-3 px-5 py-5 text-left transition-colors duration-300 ${
                        on ? "bg-white" : "bg-[#FFFCF6] hover:bg-white"
                      }`}
                    >
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-display text-[0.95rem] transition-colors duration-300 ${
                          on ? "bg-ink text-[#FFFCF6]" : "border border-line bg-white text-body-muted"
                        }`}
                      >
                        {c.avatar}
                      </span>
                      <span className="min-w-0">
                        <span className={`block truncate text-[0.88rem] font-medium ${on ? "text-ink" : "text-ink/70"}`}>{c.name}</span>
                        <span className="block truncate text-[0.74rem] text-body-faint">{c.location}</span>
                      </span>
                      {on && !reduce && (
                        <span
                          key={active}
                          onAnimationEnd={() => go(active + 1)}
                          className="story-progress absolute inset-x-0 bottom-0 h-[2px] bg-plum"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
