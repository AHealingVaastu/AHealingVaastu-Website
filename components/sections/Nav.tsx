"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { nav } from "@/lib/content";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-400 ${
        scrolled
          ? "py-3 bg-page/80 backdrop-blur-xl backdrop-saturate-150 shadow-[0_1px_0_rgba(123,63,140,0.08),0_8px_30px_rgba(74,31,92,0.06)]"
          : "pt-9 pb-5"
      }`}
    >
      <div className="mx-auto flex max-w-shell items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3" aria-label="A Healing Vaastu home">
          <Image
            src="/logo.png"
            alt="A Healing Vaastu"
            width={44}
            height={44}
            className="rounded-xl shadow-[0_2px_10px_rgba(74,31,92,0.18)]"
            priority
          />
          <span className="font-display text-[1.05rem] font-semibold leading-[1.12] tracking-[0.01em] text-ink">
            A Healing
            <br />
            Vaastu
          </span>
        </a>

        {/* desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-[0.95rem] py-2 text-[0.9rem] font-medium text-ink/80 transition hover:bg-plum/[0.07] hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ink py-2 pl-5 pr-2 text-[0.9rem] font-semibold text-page shadow-[0_6px_18px_rgba(42,14,61,0.28)] transition hover:-translate-y-px hover:bg-plum"
            >
              Book Consultation
              <span className="grid h-[22px] w-[22px] place-items-center rounded-full bg-page/[0.16] transition group-hover:bg-page/25">
                <ArrowRight size={12} strokeWidth={3} />
              </span>
            </a>
          </li>
        </ul>

        {/* mobile toggle */}
        <button
          className="text-ink md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="absolute inset-x-4 top-[70px] flex flex-col gap-1 rounded-[20px] border border-line bg-page/95 p-2 shadow-[0_18px_50px_rgba(74,31,92,0.16)] backdrop-blur-xl md:hidden">
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
            href="#contact"
            onClick={() => setOpen(false)}
            className="m-1 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-page"
          >
            Book Consultation <ArrowRight size={14} strokeWidth={3} />
          </a>
        </div>
      )}
    </nav>
  );
}
