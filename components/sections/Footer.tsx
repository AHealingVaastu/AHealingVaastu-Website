import Image from "next/image";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Lotus from "@/components/ui/Lotus";
import { business, services } from "@/lib/content";

const cols = [
  {
    title: "Services",
    links: services.map((s) => ({ label: s.title, href: "#services" })),
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Our Process", href: "#process" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Vastu Blog", href: "#blog" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

const socialLinks = [
  { icon: Instagram, href: business.socials.instagram, label: "Instagram" },
  { icon: Facebook, href: business.socials.facebook, label: "Facebook" },
  { icon: Youtube, href: business.socials.youtube, label: "YouTube" },
].filter((s) => s.href);

const colTitle = "text-[0.72rem] font-medium uppercase tracking-[0.18em] text-body-muted";
const colLink = "text-[0.9rem] text-ink/80 transition hover:text-plum";

export default function Footer() {
  return (
    <footer className="bg-page px-3 pb-3 md:px-5 md:pb-5">
      <div className="rounded-[38px] border border-white/90 bg-white/60 p-[0.6rem] shadow-[0_18px_50px_rgba(74,31,92,0.08)] md:p-[0.85rem]">
        {/* closing statement on the outro mesh, mirroring the hero card */}
        <div className="mesh-outro grain relative overflow-hidden rounded-[30px]">
          {/* soft wash over the warm corner keeps the gold accents legible */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(123,63,140,0.6)_100%)]" aria-hidden="true" />
          <Reveal className="relative z-[2] mx-auto max-w-shell px-6 py-16 text-center md:px-14 md:py-24">
            <div className="flex justify-center">
              <Lotus width={64} stroke="#F4E3B0" />
            </div>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-normal leading-[1.08] tracking-[-0.025em] text-[#FFFCF6]">
              Let your space <span className="text-accent-plum">breathe</span>,
              <br className="hidden sm:block" /> and watch your life <span className="text-accent-plum">bloom.</span>
            </h2>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
              <a
                href="#contact"
                className="inline-flex items-center rounded-full bg-[#FFFCF6] px-7 py-[0.95rem] text-[0.96rem] font-medium text-ink shadow-[0_12px_34px_rgba(20,6,36,0.3)] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Begin Your Journey
              </a>
              <a
                href={business.phoneHref}
                className="text-[0.96rem] font-medium text-[#FFFCF6] underline decoration-[#FFFCF6]/40 underline-offset-4 transition hover:decoration-[#FFFCF6]"
              >
                Or call {business.phone}
              </a>
            </div>
          </Reveal>
        </div>

        {/* link columns */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 px-4 pb-6 pt-10 sm:grid-cols-2 md:px-10 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
          <div>
            <a href="#top" className="flex items-center gap-3" aria-label="A Healing Vaastu home">
              <Image src="/logo.png" alt="A Healing Vaastu" width={44} height={44} className="rounded-xl shadow-[0_2px_10px_rgba(74,31,92,0.18)]" />
              <span className="font-display text-[1.05rem] font-semibold leading-[1.12] tracking-[0.01em] text-ink">
                A Healing
                <br />
                Vaastu
              </span>
            </a>
            <p className="mt-5 max-w-xs text-[0.88rem] leading-[1.65] text-body-muted">
              Ancient Vastu Shastra wisdom applied to modern homes and businesses. Serving clients across Canada, the US, and worldwide since {business.since}.
            </p>
            <div className="mt-6 flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink transition hover:border-ink hover:bg-ink hover:text-[#FFFCF6]"
                >
                  <s.icon size={16} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className={colTitle}>{c.title}</h4>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={colLink}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className={colTitle}>Contact</h4>
            <ul className="mt-5 space-y-3 text-[0.9rem] text-ink/80">
              <li>
                <a href={business.phoneHref} className={colLink}>
                  {business.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className={`${colLink} break-words`}>
                  {business.email}
                </a>
              </li>
              <li>Brampton, ON, Canada</li>
              <li className="text-body-muted">{business.hours}</li>
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mx-4 flex flex-wrap items-center justify-between gap-4 border-t border-line pb-3 pr-[4.5rem] pt-5 md:mx-10 md:pb-4">
          <span className="text-[0.8rem] text-body-faint">© {new Date().getFullYear()} A Healing Vaastu. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="text-[0.8rem] text-body-faint transition hover:text-ink">
              Privacy Policy
            </a>
            <a href="#" className="text-[0.8rem] text-body-faint transition hover:text-ink">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
