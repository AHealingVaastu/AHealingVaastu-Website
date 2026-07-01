import { Check, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Lotus from "@/components/ui/Lotus";
import { credentials, business } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="bg-gradient-to-b from-page to-cream-200">
      <div className="mx-auto max-w-shell px-6 py-16">
        <div className="grid grid-cols-1 items-center gap-[4.5rem] md:grid-cols-[0.9fr_1.1fr]">
          {/* portrait frame */}
          <Reveal direction="right" className="relative">
            <div className="mesh-frame relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-[26px] border border-gold/30 shadow-[0_24px_60px_rgba(74,31,92,0.2)]">
              {/* Swap this whole block for <Image src="/your-photo.jpg" fill className="object-cover" /> */}
              <Lotus width={190} stroke="#F4E3B0" className="opacity-90" />
              <span className="absolute inset-x-0 bottom-6 text-center text-[0.78rem] tracking-[0.08em] text-[#FFF8E4]/70">
                {business.consultant}
              </span>
            </div>
            <div className="absolute -bottom-5 -right-5 rounded-[18px] border border-line bg-white px-[1.4rem] py-[1.1rem] text-center shadow-[0_16px_40px_rgba(74,31,92,0.14)]">
              <span className="block font-display text-[2rem] font-semibold leading-none text-gold-dark">7+</span>
              <span className="text-[0.72rem] font-bold tracking-[0.04em] text-body-muted">Years Mastery</span>
            </div>
          </Reveal>

          {/* copy */}
          <Reveal delay={0.1}>
            <div className="mb-4 inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-gold-dark">
              <span className="h-[7px] w-[7px] rounded-full bg-gold ring-4 ring-gold/20" />
              Meet Your Consultant
            </div>
            <h2 className="mb-3 font-display text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-ink">
              Rooted in Tradition,
              <br />
              Grounded in <span className="text-accent">Results.</span>
            </h2>
            <p className="mb-6 flex items-center gap-3 text-[0.95rem] font-medium text-ink">
              <span className="font-display text-[1.15rem] font-semibold text-gold-dark">{business.consultant}</span>
              <span className="h-4 w-px bg-line" />
              <span className="text-body-muted">Vastu &amp; Vedic Astrology Consultant</span>
            </p>
            <p className="mb-4 text-[0.98rem] leading-relaxed text-body-muted">
              With over 7 years of dedicated practice in Vastu Shastra and Vedic Astrology, I have guided hundreds of families and entrepreneurs across Canada, the United States, and around the world toward spaces that truly support their lives.
            </p>
            <p className="mb-6 text-[0.98rem] leading-relaxed text-body-muted">
              My approach honours the ancient wisdom of the Vastu Vidya scriptures while remaining deeply practical. Every recommendation is tailored to your unique space, lifestyle, and goals.
            </p>
            <ul className="my-6 list-none">
              {credentials.map((c) => (
                <li key={c} className="flex items-start gap-3 border-b border-line py-[0.65rem] text-[0.94rem] text-body-muted">
                  <Check size={16} strokeWidth={2.5} className="mt-0.5 shrink-0 text-gold-dark" />
                  {c}
                </li>
              ))}
            </ul>
            <a href="#contact" className="group inline-flex items-center gap-[0.85rem] rounded-full bg-ink py-[0.55rem] pl-6 pr-[0.6rem] text-[0.96rem] font-semibold text-page shadow-[0_10px_28px_rgba(31,10,58,0.28)] transition hover:-translate-y-0.5 hover:bg-[#3D1556]">
              Book a Consultation
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-gold to-[#E2BC5E] text-ink transition group-hover:-rotate-45">
                <ArrowRight size={15} strokeWidth={2.5} />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
