/** Editorial section label: plum index, hairline rule, small-caps label. */
export default function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-display text-copy font-medium tabular-nums text-plum">{index}</span>
      <span className="h-px w-10 bg-ink/20" aria-hidden="true" />
      <span className="text-eyebrow font-medium uppercase tracking-[0.12em] text-body-muted">{label}</span>
    </div>
  );
}
