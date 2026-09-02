import Reveal from "@/components/ui/Reveal";
import { elements } from "@/lib/content";

const paths: Record<string, JSX.Element> = {
  Earth: <><circle cx="12" cy="12" r="10" /><path d="M12 6v12M8 10l4-4 4 4" /></>,
  Water: <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />,
  Fire: <path d="M12 2c0 6-6 8-6 13a6 6 0 0012 0c0-5-6-7-6-13z" />,
  Air: <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1114 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />,
  Space: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" /><line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" /></>,
};

export default function Elements() {
  return (
    <div className="border-y border-line bg-white px-6 py-10">
      <div className="mx-auto flex max-w-shell flex-wrap items-center justify-center gap-x-8 gap-y-6">
        {elements.map((el, i) => (
          <Reveal key={el.name} delay={i * 0.08} as="div">
            <div className="flex cursor-default flex-col items-center gap-1 px-6 py-2">
              <div className="mb-1 flex h-[52px] w-[52px] items-center justify-center rounded-full" style={{ background: `${el.color}1a` }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={el.color} strokeWidth={1.75} className="h-[26px] w-[26px]">
                  {paths[el.name]}
                </svg>
              </div>
              <span className="text-[0.8rem] font-bold uppercase tracking-[0.08em]" style={{ color: el.color }}>
                {el.name}
              </span>
              <span className="text-[0.75rem] italic text-body-faint">{el.sanskrit}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
