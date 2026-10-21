import type { CSSProperties } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { elements } from "@/lib/content";

const paths: Record<string, JSX.Element> = {
  Earth: <><circle cx="12" cy="12" r="10" /><path d="M12 6v12M8 10l4-4 4 4" /></>,
  Water: <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />,
  Fire: <path d="M12 2c0 6-6 8-6 13a6 6 0 0012 0c0-5-6-7-6-13z" />,
  Air: <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1114 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />,
  Space: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" /><line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" /></>,
};

export default function Elements() {
  return (
    <section aria-label="The five elements" className="bg-page px-3 pb-3 md:px-5 md:pb-5">
      <div className="rounded-[38px] border border-white/90 bg-white/60 p-[0.6rem] shadow-[0_18px_50px_rgba(74,31,92,0.08)] md:p-[0.85rem]">
        {/* heading */}
        <Reveal className="px-4 pb-8 pt-8 md:px-10 md:pb-10 md:pt-12">
          <SectionLabel index="02" label="The five elements" />
          <div className="mt-6 grid grid-cols-1 items-center gap-5 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-normal leading-[1.08] tracking-[-0.025em] text-ink">
              Every Direction,
              <br />
              <span className="text-accent-plum">In Balance</span>
            </h2>
            <p className="max-w-[440px] text-[1rem] leading-[1.65] text-body-muted">
              Vastu Shastra maps Earth, Water, Fire, Air and Space to the directions of your home. When each element sits in its zone, the space supports the people living in it.
            </p>
          </div>
        </Reveal>

        {/* elements panel: the 1px gap shows as divider lines; Space spans the row below lg */}
        <Reveal delay={0.1}>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[30px] bg-line lg:grid-cols-5">
            {elements.map((el, i) => (
              <li
                key={el.name}
                style={{ "--el": el.color } as CSSProperties}
                className={`group flex flex-col bg-[#FFFCF6] px-6 py-8 transition-colors duration-300 hover:bg-white md:px-8 md:py-9 ${
                  i === elements.length - 1 ? "col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-body-muted transition-colors duration-300 group-hover:text-[var(--el)]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5" aria-hidden="true">
                      {paths[el.name]}
                    </svg>
                  </span>
                  <span className="h-[7px] w-[7px] rounded-full opacity-70" style={{ background: el.color }} aria-hidden="true" />
                </div>

                <h3 className="mt-7 font-display text-[1.6rem] font-normal leading-none tracking-[-0.02em] text-ink">{el.name}</h3>
                <p className="mt-2 text-[0.86rem] text-body-faint">{el.sanskrit}</p>

                <p className="mt-7 border-t border-line pt-4 text-[0.82rem] text-body-muted">
                  {el.direction}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
