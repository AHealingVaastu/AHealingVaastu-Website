import { Home, Briefcase, Compass, Monitor, Key, Sparkles, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/lib/content";

const icons = { home: Home, briefcase: Briefcase, compass: Compass, monitor: Monitor, key: Key, sparkles: Sparkles };
const toneClasses: Record<string, string> = {
  gold: "bg-gold/[0.12] text-gold-dark",
  rose: "bg-rose/[0.11] text-rose",
  purple: "bg-plum/[0.11] text-plum",
  terra: "bg-terra/10 text-terra",
};

export default function Services() {
  return (
    <section id="services" className="bg-page">
      <div className="mx-auto max-w-shell px-6 py-16">
        <div className="mb-10">
          <SectionHeading
            eyebrow="What We Offer"
            title={<>Sacred Wisdom for <span className="text-accent">Every Space</span></>}
            sub="Whether you seek harmony at home, prosperity in business, or deeper cosmic alignment, our consultations bring ancient Vastu principles to modern life."
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <Reveal key={s.title} delay={i * 0.08} className="h-full">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-8 shadow-[0_1px_2px_rgba(74,31,92,0.03)] transition duration-300 hover:-translate-y-1.5 hover:border-gold/30 hover:shadow-[0_22px_50px_rgba(74,31,92,0.1)]">
                  <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold via-rose to-plum transition-transform duration-500 group-hover:scale-x-100" />
                  <div className={`mb-5 flex h-[56px] w-[56px] items-center justify-center rounded-2xl transition duration-300 group-hover:-rotate-3 group-hover:scale-105 ${toneClasses[s.tone]}`}>
                    <Icon size={26} strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-[0.55rem] font-display text-[1.35rem] font-semibold text-ink">{s.title}</h3>
                  <p className="mb-5 text-[0.93rem] leading-[1.7] text-body-muted">{s.body}</p>
                  <a href="#contact" className="mt-auto inline-flex items-center gap-[0.45rem] text-[0.88rem] font-bold text-gold-dark transition-all hover:gap-[0.7rem]">
                    {s.cta} <ArrowRight size={14} strokeWidth={2.5} />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
