import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { posts } from "@/lib/content";

export default function Blog() {
  return (
    <section id="blog" aria-label="Blog" className="bg-page px-3 pb-3 md:px-5 md:pb-5">
      <div>
        {/* heading */}
        <Reveal className="px-4 pb-8 pt-8 md:px-10 md:pb-10 md:pt-12">
          <SectionLabel index="06" label="Vastu wisdom" />
          <div className="mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <h2 className="font-display text-card sm:text-article lg:text-section font-normal leading-[1.15] tracking-[-0.025em] text-ink">
              Knowledge for
              <br />
              <span className="text-accent-plum">Every Home</span>
            </h2>
          </div>
        </Reveal>

        {/* article index: previews only until the article pages are published */}
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-[30px] bg-[#FFFFFF]">
            <ol>
              {posts.map((p, i) => (
                <li key={p.title} className={i > 0 ? "border-t border-line" : ""}>
                  <div className="grid grid-cols-[2.25rem_1fr] gap-x-4 px-6 py-8 md:grid-cols-[3.25rem_1fr] md:gap-x-8 md:px-10 md:py-10">
                    <span className="pt-1 font-display text-copy tabular-nums text-plum md:self-start md:pt-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-card lg:text-article font-normal leading-[1.15] tracking-[-0.025em] text-ink">
                        {p.title}
                      </h3>
                      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-small text-body-faint">
                        <span className="font-medium uppercase tracking-[0.14em] text-plum">{p.tag}</span>
                        <span className="h-3 w-px bg-line" aria-hidden="true" />
                        <span>{p.read}</span>
                        <span className="hidden h-3 w-px bg-line sm:block" aria-hidden="true" />
                        <span className="basis-full sm:basis-auto">{p.date}</span>
                      </div>
                      <p className="mt-3 max-w-[560px] text-small text-body-muted">{p.excerpt}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
