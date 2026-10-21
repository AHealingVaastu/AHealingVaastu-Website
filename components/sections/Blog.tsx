import { HoverGroup, GroupIcon } from "@/components/icons/hover-group";
import { ArrowUpRightIcon } from "@/components/icons/arrow-up-right";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { posts } from "@/lib/content";

export default function Blog() {
  return (
    <section id="blog" aria-label="Blog" className="bg-page px-3 pb-3 md:px-5 md:pb-5">
      <div className="rounded-[38px] border border-white/90 bg-white/60 p-[0.6rem] shadow-[0_18px_50px_rgba(74,31,92,0.08)] md:p-[0.85rem]">
        {/* heading */}
        <Reveal className="px-4 pb-8 pt-8 md:px-10 md:pb-10 md:pt-12">
          <SectionLabel index="06" label="Vastu wisdom" />
          <div className="mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-normal leading-[1.08] tracking-[-0.025em] text-ink">
              Knowledge for
              <br />
              <span className="text-accent-plum">Every Home</span>
            </h2>
            <a
              href="#"
              className="text-[0.96rem] font-medium text-ink underline decoration-ink/30 underline-offset-4 transition hover:decoration-ink md:mb-2"
            >
              View all articles
            </a>
          </div>
        </Reveal>

        {/* article index */}
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-[30px] bg-[#FFFCF6]">
            <ol className="group/list">
              {posts.map((p, i) => (
                <li key={p.title} className={i > 0 ? "border-t border-line" : ""}>
                  <HoverGroup
                    as="a"
                    href="#"
                    className="group/row grid grid-cols-[2.25rem_1fr] gap-x-4 px-6 py-8 transition-opacity duration-300 md:grid-cols-[3.25rem_1fr_auto] md:items-center md:gap-x-8 md:px-10 md:py-10 lg:group-hover/list:opacity-40 lg:hover:!opacity-100"
                  >
                    <span className="pt-2 font-display text-[0.95rem] tabular-nums text-plum md:self-start md:pt-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-[clamp(1.55rem,3.4vw,2.9rem)] font-normal leading-[1.1] tracking-[-0.025em] text-ink transition-transform duration-500 ease-out lg:group-hover/row:translate-x-2">
                        {p.title}
                      </h3>
                      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.78rem] text-body-faint">
                        <span className="font-medium uppercase tracking-[0.14em] text-plum">{p.tag}</span>
                        <span className="h-3 w-px bg-line" aria-hidden="true" />
                        <span>{p.read}</span>
                        <span className="hidden h-3 w-px bg-line sm:block" aria-hidden="true" />
                        <span className="basis-full sm:basis-auto">{p.date}</span>
                      </div>
                      <p className="mt-3 max-w-[560px] text-[0.9rem] leading-[1.65] text-body-muted">{p.excerpt}</p>
                    </div>
                    <span
                      className="hidden h-12 w-12 shrink-0 place-items-center rounded-full border border-line bg-white text-ink transition-colors duration-300 group-hover/row:border-ink group-hover/row:bg-ink group-hover/row:text-[#FFFCF6] md:grid"
                      aria-hidden="true"
                    >
                      <GroupIcon icon={ArrowUpRightIcon} size={18} strokeWidth={2} />
                    </span>
                  </HoverGroup>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
