import { BadgeCheck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import { credentials, business } from "@/lib/content";

export default function About() {
  return (
    <section id="about" aria-label="About" className="bg-page px-3 pb-3 md:px-5 md:pb-5">
      <div className="rounded-[38px] border border-white/90 bg-white/60 p-[0.6rem] shadow-[0_18px_50px_rgba(74,31,92,0.08)] md:p-[0.85rem]">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-4">
          {/* portrait card */}
          <Reveal direction="right">
            <div className="mesh-frame grain relative flex aspect-[4/5] w-full md:aspect-[16/10] lg:aspect-[4/5] items-center justify-center overflow-hidden rounded-[30px]">
              {/* Swap this whole block for <Image src="/your-photo.jpg" fill className="object-cover" /> */}
              <Image src="/lotus.png" alt="" width={180} height={125} className="relative z-[1] opacity-90" aria-hidden="true" />

              <div className="glass absolute right-4 top-4 z-[2] rounded-[18px] px-4 py-3 text-center shadow-[0_12px_30px_rgba(31,10,58,0.22)]">
                <span className="block font-display text-[1.6rem] font-normal leading-none tracking-[-0.02em] text-[#FFFCF6]">7+</span>
                <span className="mt-1 block text-[0.72rem] text-[#FFFCF6]/75">Years of practice</span>
              </div>

              <div className="glass absolute inset-x-4 bottom-4 z-[2] rounded-[18px] px-5 py-4 shadow-[0_12px_30px_rgba(31,10,58,0.22)]">
                <span className="block text-[1rem] font-medium text-[#FFFCF6]">{business.consultant}</span>
                <span className="mt-0.5 block text-[0.8rem] text-[#FFFCF6]/75">Vastu &amp; Vedic Astrology Consultant</span>
              </div>
            </div>
          </Reveal>

          {/* copy */}
          <Reveal delay={0.1} className="px-4 pb-6 md:px-10 md:pb-10 lg:py-10">
            <SectionLabel index="03" label="Meet your consultant" />
            <h2 className="mt-6 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-normal leading-[1.08] tracking-[-0.025em] text-ink">
              Rooted in Tradition,
              <br />
              Grounded in <span className="text-accent-plum">Results.</span>
            </h2>

            <div className="mt-6 max-w-[540px] space-y-4 text-[1rem] leading-[1.65] text-body-muted">
              <p>
                With over 7 years of dedicated practice in Vastu Shastra and Vedic Astrology, I have guided hundreds of families and entrepreneurs across Canada, the United States, and around the world toward spaces that truly support their lives.
              </p>
              <p>
                My approach honours the ancient wisdom of the Vastu Vidya scriptures while remaining deeply practical. Every recommendation is tailored to your unique space, lifestyle, and goals.
              </p>
            </div>

            {/* credentials: the 1px gap shows as divider lines */}
            <ul className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-[24px] bg-line sm:grid-cols-2">
              {credentials.map((c) => (
                <li key={c} className="flex items-start gap-3 bg-[#FFFCF6] px-5 py-4 text-[0.88rem] leading-[1.5] text-ink">
                  <BadgeCheck size={18} strokeWidth={1.5} className="mt-px shrink-0 text-plum" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href="#contact"
                className="inline-flex items-center rounded-full bg-ink px-7 py-[0.95rem] text-[0.96rem] font-medium text-page shadow-[0_10px_28px_rgba(31,10,58,0.28)] transition hover:-translate-y-0.5 hover:bg-[#3D1556]"
              >
                Book a Consultation
              </a>
              <a
                href="#testimonials"
                className="text-[0.96rem] font-medium text-ink underline decoration-ink/30 underline-offset-4 transition hover:decoration-ink"
              >
                Read client stories
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
