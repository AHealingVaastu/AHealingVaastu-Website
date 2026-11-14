import { HoverGroup, GroupIcon } from "@/components/icons/hover-group";
import { CircleCheckIcon } from "@/components/icons/circle-check";
import Reveal from "@/components/ui/Reveal";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import { credentials, business } from "@/lib/content";

export default function About() {
  return (
    <section id="about" aria-label="About" className="bg-page px-3 pb-3 md:px-5 md:pb-5">
      <div>
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,560px)_1fr] xl:gap-8 lg:gap-4">
          {/* portrait card */}
          <Reveal direction="right">
            <div className="mesh-frame grain relative flex aspect-[4/5] w-full md:aspect-[16/10] lg:aspect-[4/5] items-center justify-center overflow-hidden rounded-[30px]">
              <Image
                src="/anjli-gupta.jpg"
                alt={`${business.consultant}, Vastu and astrology consultant`}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover object-[50%_30%]"
              />
              {/* soft dark fade so the name tag stays legible over the photo */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-2/5 bg-gradient-to-t from-[#1F0A3A]/60 to-transparent" aria-hidden="true" />

              <div className="glass absolute right-4 top-4 z-[2] rounded-[14px] !bg-[#2A0E3D]/35 px-4 py-3 text-center shadow-[0_12px_30px_rgba(31,10,58,0.22)]">
                <span className="block font-display text-card font-normal leading-none tracking-[-0.02em] text-[#FFFFFF]">7+</span>
                <span className="mt-1 block text-caption text-[#FFFFFF]/75">Years of practice</span>
              </div>

              <div className="glass absolute inset-x-4 bottom-4 z-[2] rounded-[14px] !bg-[#2A0E3D]/30 px-5 py-4 shadow-[0_12px_30px_rgba(31,10,58,0.22)]">
                <span className="block text-copy font-medium text-[#FFFFFF]">{business.consultant}</span>
                <span className="mt-0.5 block text-caption text-[#FFFFFF]/75">Vedic Vastu &amp; Astrology Expert</span>
              </div>
            </div>
          </Reveal>

          {/* copy */}
          <Reveal delay={0.1} className="px-4 pb-6 md:px-10 md:pb-10 lg:py-10">
            <SectionLabel index="03" label="Meet your consultant" />
            <h2 className="mt-6 font-display text-card sm:text-article lg:text-section font-normal leading-[1.15] tracking-[-0.025em] text-ink">
              Rooted in Tradition,
              <br />
              Grounded in <span className="text-accent-plum">Results.</span>
            </h2>

            <div className="mt-6 max-w-[540px] space-y-4 text-copy text-body-muted">
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
                <HoverGroup as="li" key={c} className="flex items-start gap-3 bg-[#FFFFFF] px-5 py-4 text-small text-ink">
                  <GroupIcon icon={CircleCheckIcon} size={18} strokeWidth={1.5} className="mt-px shrink-0 text-plum" />
                  {c}
                </HoverGroup>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href="#contact"
                className="inline-flex items-center rounded-[14px] bg-cta px-7 py-[0.95rem] text-copy font-medium leading-[1.3] text-white shadow-[0_10px_26px_rgba(91,30,90,0.28)]"
              >
                Book a Consultation
              </a>
              <a
                href="#testimonials"
                className="tap text-copy font-medium leading-[1.3] text-ink underline decoration-ink/30 underline-offset-4 transition hover:decoration-ink"
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
