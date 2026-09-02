"use client";

import { useEffect, useRef } from "react";

/** A lotus that blooms open when scrolled into view. */
export default function Lotus({
  stroke = "#C9A84C",
  width = 64,
  className = "",
}: {
  stroke?: string;
  width?: number;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("bloomed");
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("bloomed");
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      className={`lotus ${className}`}
      viewBox="0 0 120 70"
      style={{ width, height: (width * 70) / 120, overflow: "visible", flexShrink: 0 }}
      aria-hidden="true"
    >
      <g fill="none" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round">
        <path className="lp lp-l2" d="M60 60 C44 44 40 24 48 8 C58 22 60 40 60 60 Z" />
        <path className="lp lp-r2" d="M60 60 C76 44 80 24 72 8 C62 22 60 40 60 60 Z" />
        <path className="lp lp-l1" d="M60 60 C50 40 48 22 53 4 C60 20 62 40 60 60 Z" />
        <path className="lp lp-r1" d="M60 60 C70 40 72 22 67 4 C60 20 58 40 60 60 Z" />
        <path className="lp lp-c" d="M60 60 C54 38 54 18 60 2 C66 18 66 38 60 60 Z" />
        <path className="lp-base" d="M30 58 Q60 74 90 58" />
      </g>
    </svg>
  );
}
