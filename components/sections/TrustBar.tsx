import { ShieldCheck, Clock, Home, MapPin, Mail } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Certified Vastu Consultant" },
  { icon: Clock, label: "7+ Years Experience" },
  { icon: Home, label: "150+ Homes Transformed" },
  { icon: MapPin, label: "Serving Canada, US & Worldwide" },
  { icon: Mail, label: "Online Consultations Available" },
];

export default function TrustBar() {
  return (
    <div className="border-b border-line bg-white px-6 py-6">
      <div className="mx-auto flex max-w-shell flex-wrap items-center justify-center gap-x-9 gap-y-4">
        {items.map((it, i) => (
          <div key={it.label} className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[0.85rem] font-semibold text-body-muted">
              <it.icon size={17} className="text-gold-dark" />
              {it.label}
            </div>
            {i < items.length - 1 && <span className="hidden h-5 w-px bg-line sm:block" />}
          </div>
        ))}
      </div>
    </div>
  );
}
