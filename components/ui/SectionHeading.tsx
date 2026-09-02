import type { ReactNode } from "react";
import Reveal from "./Reveal";
import Lotus from "./Lotus";

/** Standard centered section heading: lotus divider + eyebrow + display title. */
export default function SectionHeading({
  eyebrow,
  title,
  sub,
  lotus = true,
  align = "center",
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  lotus?: boolean;
  align?: "center" | "left";
  light?: boolean;
}) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "text-center" : "text-left"}>
      {lotus && (
        <div
          className="flex items-center gap-4 mb-4"
          style={{ justifyContent: centered ? "center" : "flex-start" }}
        >
          <span className="h-px w-14 sm:w-24 bg-gradient-to-r from-transparent to-gold/50" />
          <Lotus width={62} stroke={light ? "#E8D5A3" : "#C9A84C"} />
          <span className="h-px w-14 sm:w-24 bg-gradient-to-l from-transparent to-gold/50" />
        </div>
      )}
      <div
        className={`inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] mb-4 ${
          light ? "text-gold-light" : "text-gold-dark"
        }`}
      >
        <span className="w-[7px] h-[7px] rounded-full bg-gold ring-4 ring-gold/20" />
        {eyebrow}
      </div>
      <h2
        className={`font-display font-semibold leading-[1.1] tracking-[-0.015em] text-[clamp(2rem,3.6vw,3rem)] mb-4 ${
          light ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={`text-[1.05rem] leading-relaxed max-w-[600px] ${
            centered ? "mx-auto" : ""
          } ${light ? "text-cream/60" : "text-body-muted"}`}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}
