import Image from "next/image";
import { HoverGroup, GroupIcon } from "@/components/icons/hover-group";
import { FacebookIcon } from "@/components/icons/facebook";
import { InstagramIcon } from "@/components/icons/instagram";
import { YoutubeIcon } from "@/components/icons/youtube";
import Reveal from "@/components/ui/Reveal";
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
  { icon: InstagramIcon, href: business.socials.instagram, label: "Instagram" },
  { icon: FacebookIcon, href: business.socials.facebook, label: "Facebook" },
  { icon: YoutubeIcon, href: business.socials.youtube, label: "YouTube" },
].filter((s) => s.href);

const colTitle = "text-eyebrow font-medium uppercase tracking-[0.12em] text-body-muted";
const colLink = "inline-block py-[0.6rem] text-small text-ink/80 transition hover:text-plum";

export default function Footer() {
  return (
    <footer className="bg-page px-3 pb-3 md:px-5 md:pb-5">
      <div>
        {/* closing statement on the hero's cloud sky, so the page opens and closes in the clouds */}
        <div className="outro-clouds relative overflow-hidden rounded-[30px]">
          <Reveal className="relative z-[2] mx-auto max-w-shell px-6 py-16 text-center md:px-14 md:py-24">
            <h2 className="mx-auto max-w-3xl font-display text-article sm:text-section lg:text-display font-normal !leading-[1.1] tracking-[-0.025em] text-ink">
              Let your space <span className="text-accent-plum">breathe,</span>
              <br className="hidden sm:block" /> and watch your life <span className="text-accent-plum">bloom.</span>
            </h2>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
              <a
                href="#contact"
                className="inline-flex items-center rounded-[14px] bg-cta px-7 py-[0.95rem] text-copy font-medium leading-[1.3] text-white shadow-[0_10px_26px_rgba(91,30,90,0.28)]"
              >
                Begin Your Journey
              </a>
              <a
                href={business.phoneHref}
                className="tap text-copy font-medium leading-[1.3] text-ink underline decoration-ink/30 underline-offset-4 transition hover:decoration-ink"
              >
                Or call {business.phone}
              </a>
            </div>
          </Reveal>
        </div>

        {/* link columns */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 px-4 pb-6 pt-10 sm:grid-cols-2 md:px-10 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
          <div>
            {/* same mark and wordmark as the nav pill, but the plum stays on the mark */}
            <a href="#top" className="flex items-center gap-3" aria-label="A Healing Vaastu home">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#391C3B]">
                <Image src="/logo-mark.png" alt="" width={42} height={42} className="h-[2.1rem] w-[2.1rem] rounded-full" />
              </span>
              <span className="whitespace-nowrap font-wordmark text-copy font-normal leading-none tracking-[0.01em] text-ink">
                A Healing Vaastu
              </span>
            </a>
            <p className="mt-5 max-w-xs text-small text-body-muted">
              Ancient Vastu Shastra wisdom applied to modern homes and businesses. Serving clients across Canada, the US, and worldwide since {business.since}.
            </p>
            <div className="mt-6 flex gap-2">
              {socialLinks.map((s) => (
                <HoverGroup
                  as="a"
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-ink transition hover:border-ink hover:bg-ink hover:text-[#FFFFFF]"
                >
                  <GroupIcon icon={s.icon} size={16} strokeWidth={1.75} />
                </HoverGroup>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className={colTitle}>{c.title}</h4>
              <ul className="mt-2">
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
            <ul className="mt-2 text-small text-ink/80">
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
              <li className="py-[0.6rem] text-body-muted">
                {business.hours.split(" · ").map((part) => (
                  <span key={part} className="block whitespace-nowrap">
                    {part}
                  </span>
                ))}
              </li>
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mx-4 flex flex-wrap items-center justify-between gap-4 border-t border-line pb-3 pr-[4.5rem] pt-5 md:mx-10 md:pb-4">
          <span className="text-caption text-body-faint">© {new Date().getFullYear()} A Healing Vaastu. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="tap text-caption text-body-faint transition hover:text-ink">
              Privacy Policy
            </a>
            <a href="#" className="tap text-caption text-body-faint transition hover:text-ink">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
