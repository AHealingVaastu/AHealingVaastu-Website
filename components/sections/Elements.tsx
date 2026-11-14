import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { elements } from "@/lib/content";

export default function Elements() {
  return (
    <section aria-label="The five elements" className="bg-page px-3 pb-3 md:px-5 md:pb-5">
      <div>
        {/* heading */}
        <Reveal className="px-4 pb-8 pt-8 md:px-10 md:pb-10 md:pt-12">
          <SectionLabel index="02" label="The five elements" />
          <div className="mt-6 grid grid-cols-1 items-center gap-5 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
            <h2 className="font-display text-card sm:text-article lg:text-section font-normal leading-[1.15] tracking-[-0.025em] text-ink">
              Every Direction,
              <br />
              <span className="text-accent-plum">In Balance</span>
            </h2>
            <p className="max-w-[440px] text-copy text-body-muted">
              Vastu Shastra maps Earth, Water, Fire, Air and Space to the directions of your home. When each element sits in its zone, the space supports the people living in it.
            </p>
          </div>
        </Reveal>

        {/* elements panel: the 1px gap shows as divider lines; Space spans the row below lg */}
        <Reveal delay={0.1}>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[30px] bg-line lg:grid-cols-5">
            {elements.map((el, i) => (
              <li
                key={el.name}
                className={`group flex flex-col bg-[#FFFFFF] px-6 py-8 transition-colors duration-300 hover:bg-white md:px-8 md:py-9 ${
                  i === elements.length - 1 ? "col-span-2 lg:col-span-1" : ""
                }`}
              >
                <Image
                  src={`/elements/${el.name.toLowerCase()}.png`}
                  alt=""
                  width={64}
                  height={64}
                  aria-hidden="true"
                  className="h-16 w-16 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-105"
                />

                <h3 className="mt-6 font-display text-subhead lg:text-card font-normal leading-[1.25] tracking-[-0.015em] text-ink">{el.name}</h3>
                <p className="mt-2 text-caption text-body-faint">{el.sanskrit}</p>

                <p className="mt-7 border-t border-line pt-4 text-caption text-body-muted">
                  {el.direction}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
