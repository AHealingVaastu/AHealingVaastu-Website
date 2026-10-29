"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { HoverGroup, GroupIcon, StateIcon } from "@/components/icons/hover-group";
import { MenuIcon } from "@/components/icons/menu";
import { PhoneIcon } from "@/components/icons/phone";
import { business, nav } from "@/lib/content";

/**
 * Frosted pill navigation shared by the hero and the floating top bar.
 * Nothing in the pill wraps: the wordmark shows from lg, the phone from xl.
 */
export default function PillNav({
  menuId,
  label,
  floating = false,
  hidden = false,
  priority = false,
}: {
  menuId: string;
  label: string;
  /** more opaque frosting for use over page content */
  floating?: boolean;
  /** off-screen: links leave the tab order and the menu closes */
  hidden?: boolean;
  priority?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const tab = hidden ? -1 : undefined;

  useEffect(() => {
    if (hidden) setOpen(false);
  }, [hidden]);

  return (
    <>
      <nav
        aria-label={label}
        className={`flex items-center justify-between gap-3 rounded-full border border-white/60 py-[0.6rem] pl-[0.6rem] pr-[0.6rem] backdrop-blur-[16px] [@media(max-height:500px)]:py-[0.3rem] backdrop-saturate-[1.4] ${
          floating ? "bg-[#FFFCF6]/80 shadow-[0_10px_34px_rgba(74,31,92,0.12)]" : "bg-[#FFFCF6]/55 shadow-[0_8px_30px_rgba(74,31,92,0.08)]"
        }`}
      >
        {/* logo and wordmark share one pill in the logo's own plum, so the logo's square edge disappears */}
        <a
          href="#top"
          tabIndex={tab}
          className="flex h-[3.25rem] shrink-0 items-center rounded-full bg-[#391C3B] shadow-[0_6px_18px_rgba(42,14,61,0.22)] lg:pl-1.5 lg:pr-5"
          aria-label="A Healing Vaastu home"
        >
          {/* lotus-only mark (logo-mark.png): the full logo's tiny printed name repeats the wordmark beside it */}
          <span className="grid h-[3.25rem] w-[3.25rem] shrink-0 place-items-center">
            <Image src="/logo-mark.png" alt="A Healing Vaastu" width={42} height={42} className="h-[2.65rem] w-[2.65rem] rounded-full" priority={priority} />
          </span>
          <span className="hidden whitespace-nowrap pl-0.5 font-display text-[0.98rem] font-semibold leading-[1.12] tracking-[0.01em] text-[#FFFCF6] lg:block">
            A Healing
            <br />
            Vaastu
          </span>
        </a>

        {/* desktop links */}
        <ul className="hidden min-w-0 items-center md:flex lg:gap-1">
          {nav.map((l) => (
            <li key={l.href} className="shrink-0">
              <a
                href={l.href}
                tabIndex={tab}
                className="whitespace-nowrap rounded-full px-[0.7rem] py-2 text-[0.9rem] font-medium text-ink/80 transition hover:bg-plum/[0.07] hover:text-ink lg:px-[0.95rem]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <HoverGroup
            as="a"
            href={business.phoneHref}
            tabIndex={tab}
            className="hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white/70 px-4 py-[0.65rem] text-[0.88rem] font-medium text-ink transition hover:bg-white xl:inline-flex"
          >
            <GroupIcon icon={PhoneIcon} size={14} strokeWidth={2} />
            {business.phone}
          </HoverGroup>
          <a
            href="#contact"
            tabIndex={tab}
            className="hidden shrink-0 whitespace-nowrap rounded-full bg-ink px-5 py-[0.6rem] text-[0.88rem] font-medium text-page shadow-[0_6px_18px_rgba(42,14,61,0.28)] transition hover:-translate-y-px hover:bg-plum sm:inline-flex"
          >
            Book Consultation
          </a>
          <button
            type="button"
            tabIndex={tab}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-ink transition hover:bg-plum/[0.07] md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            <StateIcon icon={MenuIcon} active={open} size={22} strokeWidth={2} />
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      {open && (
        <div
          id={menuId}
          className="mt-2 flex flex-col gap-1 rounded-[24px] border border-white/60 bg-[#FFFCF6]/90 p-2 shadow-[0_18px_50px_rgba(74,31,92,0.16)] backdrop-blur-xl md:hidden"
        >
          {nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-[1.1rem] py-[0.85rem] font-medium text-ink/80 hover:bg-plum/[0.07]"
            >
              {l.label}
            </a>
          ))}
          <a
            href={business.phoneHref}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-xl px-[1.1rem] py-[0.85rem] font-medium text-ink/80 hover:bg-plum/[0.07]"
          >
            <GroupIcon icon={PhoneIcon} size={15} strokeWidth={2} />
            {business.phone}
          </a>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="m-1 inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 font-medium text-page"
          >
            Book Consultation
          </a>
        </div>
      )}
    </>
  );
}
