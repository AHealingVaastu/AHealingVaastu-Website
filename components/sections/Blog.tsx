import { Home, Briefcase, Info, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { posts } from "@/lib/content";

const tagClasses: Record<string, string> = {
  gold: "bg-gold/15 text-gold-dark",
  purple: "bg-plum/[0.12] text-plum",
  rose: "bg-rose/[0.13] text-rose",
};
const cardGrad = ["from-terra to-gold", "from-plum to-rose", "from-rose to-plum-deep"];
const cardIcon = [Home, Briefcase, Info];

export default function Blog() {
  return (
    <section id="blog" className="bg-page">
      <div className="mx-auto max-w-shell px-6 py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal>
              <div className="mb-4 inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-gold-dark">
                <span className="h-[7px] w-[7px] rounded-full bg-gold ring-4 ring-gold/20" />
                Vastu Wisdom
              </div>
              <h2 className="font-display text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-ink">
                Knowledge for <span className="text-accent">Every Home</span>
              </h2>
            </Reveal>
          </div>
          <Reveal>
            <a href="#" className="inline-flex shrink-0 items-center gap-[0.45rem] text-[0.88rem] font-bold text-gold-dark transition-all hover:gap-[0.7rem]">
              View All Articles <ArrowRight size={14} strokeWidth={2.5} />
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => {
            const Icon = cardIcon[i];
            return (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="group cursor-pointer overflow-hidden rounded-[20px] border border-line bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_46px_rgba(74,31,92,0.1)]">
                  <div className={`flex aspect-[16/9] items-center justify-center bg-gradient-to-br ${cardGrad[i]} transition-transform duration-500 group-hover:scale-[1.04]`}>
                    <Icon size={48} strokeWidth={1.25} className="text-white/50" />
                  </div>
                  <div className="p-6">
                    <span className={`mb-[0.65rem] inline-block rounded-full px-[0.7rem] py-[0.18rem] text-[0.72rem] font-bold uppercase tracking-[0.06em] ${tagClasses[p.tone]}`}>
                      {p.tag}
                    </span>
                    <h3 className="mb-2 font-display text-[1.15rem] font-semibold leading-[1.3] text-ink">{p.title}</h3>
                    <p className="mb-[0.9rem] text-[0.86rem] leading-relaxed text-body-muted">{p.excerpt}</p>
                    <div className="flex items-center justify-between text-[0.78rem] text-body-faint">
                      <span>{p.read}</span>
                      <span>{p.date}</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
