import Image from "next/image";
import { Facebook, Instagram, Youtube, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Lotus from "@/components/ui/Lotus";
import { business } from "@/lib/content";

const cols = [
  { title: "Services", links: ["Residential Vastu", "Commercial Vastu", "Astrological Guidance", "Online Consultations"] },
  { title: "Company", links: ["About Us", "Our Process", "Testimonials", "Vastu Blog", "Contact"] },
];

const socialLinks = [
  { icon: Instagram, href: business.socials.instagram, label: "Instagram" },
  { icon: Facebook, href: business.socials.facebook, label: "Facebook" },
  { icon: Youtube, href: business.socials.youtube, label: "YouTube" },
].filter((s) => s.href);

export default function Footer() {
  return (
    <footer className="mesh-outro grain relative overflow-hidden">
      {/* bottom-weighted scrim: keeps the vibrant outro up top, guarantees text contrast over the warm bloom below */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_28%,rgba(20,6,36,0.55)_100%)]" />
      <div className="relative z-[1] mx-auto max-w-shell px-6 pb-9 pt-16">
        {/* closing statement — the "outro" */}
        <Reveal className="mb-10 text-center">
          <div className="mb-5 flex justify-center">
            <Lotus width={70} stroke="#F4E3B0" />
          </div>
          <h2 className="mx-auto max-w-3xl font-display text-[clamp(1.9rem,4vw,3.2rem)] font-semibold leading-[1.12] tracking-[-0.015em] text-[#FFF8E4]">
            Let your space <span className="text-accent-light">breathe</span>,
            <br className="hidden sm:block" /> and watch your life <span className="text-accent-light">bloom.</span>
          </h2>
          <a
            href="#contact"
            className="group mt-8 inline-flex items-center gap-[0.85rem] rounded-full bg-[#FFF8E4] py-[0.55rem] pl-6 pr-[0.6rem] text-[0.96rem] font-semibold text-ink shadow-[0_12px_34px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5"
          >
            Begin Your Journey
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-plum to-[#4A1F5C] text-[#FFF8E4] transition group-hover:-rotate-45">
              <ArrowRight size={15} strokeWidth={2.5} />
            </span>
          </a>
        </Reveal>

        <div className="my-12 h-px bg-white/10" />

        {/* columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image src="/logo.png" alt="A Healing Vaastu" width={52} height={52} className="rounded-xl" />
              <span className="font-display text-base font-semibold uppercase leading-[1.15] tracking-[0.02em] text-gold-light">
                A Healing
                <br />
                Vaastu
              </span>
            </div>
            <p className="mb-6 max-w-xs text-[0.88rem] leading-relaxed text-cream/70">
              Ancient Vastu Shastra wisdom applied to modern homes and businesses. Serving clients across Canada, the US, and worldwide since {business.since}.
            </p>
            <div className="flex gap-[0.65rem]">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-gold/25 bg-gold/[0.09] text-gold-light transition hover:-translate-y-0.5 hover:bg-gold/20"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="mb-[1.1rem] text-[0.8rem] font-bold uppercase tracking-[0.1em] text-gold-light">{c.title}</h4>
              <ul className="space-y-[0.55rem]">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[0.88rem] text-cream/70 transition hover:text-gold-light">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-[1.1rem] text-[0.8rem] font-bold uppercase tracking-[0.1em] text-gold-light">Contact</h4>
            <ul className="space-y-[0.55rem] text-[0.88rem] text-cream/70">
              <li><a href={business.phoneHref} className="transition hover:text-gold-light">{business.phone}</a></li>
              <li><a href={`mailto:${business.email}`} className="transition hover:text-gold-light">{business.email}</a></li>
              <li>Brampton, ON, Canada</li>
              <li>{business.hours}</li>
            </ul>
          </div>
        </div>

        {/* bottom bar — subtle dark base keeps text legible over the warm bloom */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-ink/25 px-5 py-4 backdrop-blur-sm">
          <span className="text-[0.82rem] text-cream/65">© {new Date().getFullYear()} A Healing Vaastu. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="text-[0.82rem] text-cream/65 transition hover:text-gold-light">Privacy Policy</a>
            <a href="#" className="text-[0.82rem] text-cream/65 transition hover:text-gold-light">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
