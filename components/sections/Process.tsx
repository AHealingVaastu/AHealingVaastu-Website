import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { process } from "@/lib/content";

const toneGrad: Record<string, string> = {
  gold: "from-gold to-[#D4B85C]",
  rose: "from-rose to-[#D4809A]",
  purple: "from-plum to-[#9B5FAC]",
  terra: "from-terra to-[#D46040]",
};

export default function Process() {
  return (
    <section id="process" className="bg-page">
      <div className="mx-auto max-w-shell px-6 py-16">
        <div className="mb-10">
          <SectionHeading
            eyebrow="How It Works"
            title={<>Your Journey to <span className="text-accent">Harmony</span></>}
            sub="A clear, compassionate process designed to bring measurable change to your space, and to your life."
          />
        </div>

        <div className="relative grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-6">
          {/* connecting timeline (single-row layout only) */}
          <span className="absolute left-[8.33%] right-[8.33%] top-[34px] hidden h-0.5 bg-gradient-to-r from-gold via-rose to-plum opacity-25 lg:block" />
          {process.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.06} className="text-center">
              <div className={`relative z-[1] mx-auto mb-5 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-gradient-to-br ${toneGrad[step.tone]} shadow-[0_8px_20px_rgba(74,31,92,0.14)]`}>
                <span className="font-display text-[1.4rem] font-semibold text-white">{step.n}</span>
              </div>
              <h3 className="mb-[0.45rem] font-display text-[1.05rem] font-semibold leading-snug text-ink">{step.title}</h3>
              <p className="text-[0.85rem] leading-relaxed text-body-muted">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
