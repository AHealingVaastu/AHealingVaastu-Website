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
    <div className="group rounded-[20px] border border-line bg-white p-8 text-center shadow-[0_1px_2px_rgba(74,31,92,0.03)] transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_18px_40px_rgba(74,31,92,0.08)]">
      <span className="block font-display text-[2.9rem] font-semibold leading-none text-gold-dark">
        {val}
        {suffix}
      </span>
      <span className="mt-2 block text-[0.87rem] font-semibold tracking-[0.02em] text-body-muted">{label}</span>
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
    <section aria-label="Our impact" className="bg-page px-6 py-12">
      <div ref={ref} className="mx-auto grid max-w-shell grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} run={run} />
        ))}
      </div>
    </section>
  );
}
