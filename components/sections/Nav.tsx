"use client";

import { useEffect, useState } from "react";
import PillNav from "@/components/ui/PillNav";

export default function Nav() {
  const [visible, setVisible] = useState(false);

  // stay hidden while the hero (which has its own nav) is on screen
  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("top");
      const heroBottom = hero ? hero.getBoundingClientRect().bottom + window.scrollY : 0;
      setVisible(window.scrollY > heroBottom - 80);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 top-0 z-[100] px-3 pt-3 transition-all [@media(max-height:500px)]:pt-2 duration-500 ease-out md:px-5 md:pt-4 ${
        visible ? "" : "pointer-events-none -translate-y-[130%] opacity-0"
      }`}
    >
      <div className="mx-auto max-w-shell">
        <PillNav menuId="nav-menu" label="Main navigation" floating hidden={!visible} />
      </div>
    </div>
  );
}
