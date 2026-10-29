import { HoverGroup, GroupIcon } from "@/components/icons/hover-group";
import { HomeIcon } from "@/components/icons/home";
import { BriefcaseBusinessIcon } from "@/components/icons/briefcase-business";
import { CompassIcon } from "@/components/icons/compass";
import { MonitorCheckIcon } from "@/components/icons/monitor-check";
import { KeyIcon } from "@/components/icons/key";
import { SparklesIcon } from "@/components/icons/sparkles";
import { PlusIcon } from "@/components/icons/plus";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { services } from "@/lib/content";

const icons = {
  home: HomeIcon,
  briefcase: BriefcaseBusinessIcon,
  compass: CompassIcon,
  monitor: MonitorCheckIcon,
  key: KeyIcon,
  sparkles: SparklesIcon,
};

export default function Services() {
  return (
    <section id="services" aria-label="Services" className="bg-page px-3 pb-3 md:px-5 md:pb-5">
      <div className="mx-auto max-w-frame rounded-[38px] border border-white/90 bg-white/60 p-[0.6rem] shadow-[0_18px_50px_rgba(74,31,92,0.08)] md:p-[0.85rem]">
        {/* heading */}
        <Reveal className="px-4 pb-8 pt-8 md:px-10 md:pb-10 md:pt-12">
          <SectionLabel index="01" label="What we offer" />
          <div className="mt-6 grid grid-cols-1 items-center gap-5 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-normal leading-[1.08] tracking-[-0.025em] text-ink">
              Sacred Wisdom for
              <br />
              <span className="text-accent-plum">Every Space</span>
            </h2>
            <p className="max-w-[440px] text-[1rem] leading-[1.65] text-body-muted">
              Whether you seek harmony at home, prosperity in business, or deeper cosmic alignment, our consultations bring ancient Vastu principles to modern life.
            </p>
          </div>
        </Reveal>

        {/* services panel: the 1px gap shows as divider lines */}
        <Reveal delay={0.1}>
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-[30px] bg-line md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = icons[s.icon];
              return (
                <HoverGroup as="li" key={s.title} className="group relative flex flex-col bg-[#FFFCF6] px-7 py-8 transition-colors duration-300 hover:bg-white md:px-8 md:py-9">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-body-muted transition-colors duration-300 group-hover:text-plum">
                      <GroupIcon icon={Icon} size={20} strokeWidth={1.5} />
                    </span>
                    <span className="font-display text-[0.9rem] tracking-[-0.01em] text-body-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-7 font-display text-[1.3rem] font-medium leading-[1.2] tracking-[-0.015em] text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-[1.65] text-body-muted">{s.body}</p>

                  <a
                    href="#contact"
                    className="mt-auto flex items-center justify-between gap-4 pt-7 text-[0.9rem] font-medium text-ink after:absolute after:inset-0 after:content-['']"
                  >
                    {s.cta}
                    <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-ink text-[#FFFCF6]">
                      <GroupIcon icon={PlusIcon} size={16} strokeWidth={2} />
                    </span>
                  </a>
                </HoverGroup>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
