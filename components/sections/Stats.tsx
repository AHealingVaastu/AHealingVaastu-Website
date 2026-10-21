"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/content";

function useCountUp(target: number, run: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);
  return val;
}

function StatCard({ target, suffix, label, run }: { target: number; suffix: string; label: string; run: boolean }) {
  const val = useCountUp(target, run);
  return (
    <div className="bg-[#FFFCF6] px-8 py-9">
      <span className="block font-display text-[clamp(2.6rem,4vw,3.4rem)] font-normal leading-none tracking-[-0.025em] text-ink">
        {val}
        <span className="text-accent font-accent italic">{suffix}</span>
      </span>
      <span className="mt-3 block text-[0.86rem] text-body-faint">{label}</span>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section aria-label="Our impact" className="bg-page px-3 pb-3 md:px-5 md:pb-5">
      <div className="mx-auto max-w-frame rounded-[38px] border border-white/90 bg-white/60 p-[0.6rem] shadow-[0_18px_50px_rgba(74,31,92,0.08)] md:p-[0.85rem]">
        <div ref={ref} className="grid grid-cols-1 gap-px overflow-hidden rounded-[30px] bg-line sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} run={run} />
          ))}
        </div>
      </div>
    </section>
  );
}
