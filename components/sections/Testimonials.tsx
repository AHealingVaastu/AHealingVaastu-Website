"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/content";

const avatarGrad: Record<string, string> = {
  av1: "from-gold to-rose",
  av2: "from-plum to-rose",
  av3: "from-terra to-gold",
  av4: "from-rose to-plum",
};

function usePerView() {
  const [pv, setPv] = useState(3);
  useEffect(() => {
    const calc = () => setPv(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return pv;
}

export default function Testimonials() {
  const perView = usePerView();
  const maxSlide = Math.max(0, testimonials.length - perView);
  const [current, setCurrent] = useState(0);

  const clamped = Math.min(current, maxSlide);
  const go = useCallback((i: number) => setCurrent(Math.max(0, Math.min(i, maxSlide))), [maxSlide]);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c >= maxSlide ? 0 : c + 1)), 5500);
    return () => clearInterval(t);
  }, [maxSlide]);

  const dots = useMemo(() => Array.from({ length: maxSlide + 1 }), [maxSlide]);

  return (
    <section id="testimonials" className="bg-gradient-to-b from-[#F4EAF3] to-[#F8EFE4] px-6 py-16">
      <div className="mx-auto max-w-shell">
        <div className="mb-10">
          <SectionHeading
            eyebrow="Client Stories"
            title={<>Transformed Spaces, <span className="text-accent">Transformed Lives</span></>}
            sub="Real results from families and businesses across Canada, the US, India, and beyond."
          />
        </div>

        <div className="overflow-hidden">
          <div
            className="flex gap-7 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(calc(-${clamped} * (100% / ${perView})))` }}
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="flex shrink-0 flex-col rounded-[22px] border border-line bg-white p-8 shadow-[0_4px_20px_rgba(74,31,92,0.05)] transition hover:-translate-y-1 hover:border-gold/35 hover:shadow-[0_16px_40px_rgba(74,31,92,0.1)]"
                style={{ flex: `0 0 calc((100% - ${(perView - 1) * 1.75}rem) / ${perView})` }}
              >
                <div className="mb-4 flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="mb-6 text-[0.94rem] leading-[1.8] text-body-muted">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-auto flex items-center gap-3">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-display text-base font-semibold text-white ${avatarGrad[t.tone]}`}>
                    {t.avatar}
                  </div>
                  <div>
                    <span className="block text-[0.93rem] font-bold text-ink">{t.name}</span>
                    <span className="text-[0.78rem] text-body-faint">{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-9 flex items-center justify-center gap-4">
          <button
            aria-label="Previous testimonial"
            onClick={() => go(clamped === 0 ? maxSlide : clamped - 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-gold-dark shadow-[0_2px_8px_rgba(74,31,92,0.06)] transition hover:scale-105 hover:border-ink hover:bg-ink hover:text-page"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
          </button>
          <div className="flex gap-[0.45rem]">
            {dots.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => go(i)}
                className={`h-[7px] rounded-full transition-all ${i === clamped ? "w-5 bg-gold-dark" : "w-[7px] bg-plum/25"}`}
              />
            ))}
          </div>
          <button
            aria-label="Next testimonial"
            onClick={() => go(clamped >= maxSlide ? 0 : clamped + 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-gold-dark shadow-[0_2px_8px_rgba(74,31,92,0.06)] transition hover:scale-105 hover:border-ink hover:bg-ink hover:text-page"
          >
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
