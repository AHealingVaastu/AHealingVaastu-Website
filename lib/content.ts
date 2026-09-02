export const nav = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Blog", href: "#blog" },
];

export const business = {
  name: "A Healing Vaastu",
  consultant: "Anjli Gupta",
  phone: "+1 (905) 399-9280",
  phoneHref: "tel:+19053999280",
  whatsapp: "https://wa.me/19053999280",
  email: "contact@ahealingvaastu.com",
  location: "Brampton, Ontario, Canada",
  area: "Serving Canada, the US & worldwide",
  hours: "Mon–Fri by appointment · Sat–Sun closed",
  hoursLines: ["Monday – Friday: By appointment only", "Saturday – Sunday: Closed"],
  bookingNote: "Available Mon–Fri by appointment",
  since: 2018,
  socials: {
    instagram: "https://www.instagram.com/ahealingvaastu?igsh=bDc3c3d5bXY2bzV5",
    facebook: "",
    youtube: "",
  },
};

export const stats = [
  { target: 150, suffix: "+", label: "Homes Harmonized" },
  { target: 60, suffix: "+", label: "Businesses Transformed" },
  { target: 7, suffix: "+", label: "Years of Mastery" },
  { target: 98, suffix: "%", label: "Customer Satisfaction" },
];

export type ServiceTone = "gold" | "rose" | "purple" | "terra";

export const services: {
  tone: ServiceTone;
  icon: "home" | "briefcase" | "compass" | "monitor" | "key" | "sparkles";
  title: string;
  body: string;
  cta: string;
}[] = [
  {
    tone: "gold",
    icon: "home",
    title: "Personalized Residential Vastu",
    body: "Harmonize your home with the five elements, from front door orientation to bedroom placement. A room-by-room analysis identifies energy imbalances and prescribes practical remedies that work beautifully within your existing space.",
    cta: "Book Home Consultation",
  },
  {
    tone: "rose",
    icon: "briefcase",
    title: "Personalized Business Vastu",
    body: "Attract wealth, retain talent, and amplify growth in your workplace. We analyse office layouts, shop placements, and entrance directions, applying time-tested Vastu principles to create environments where businesses genuinely flourish.",
    cta: "Book Business Audit",
  },
  {
    tone: "purple",
    icon: "key",
    title: "Pre-Purchase Vastu Consultation",
    body: "Thinking of buying a home or commercial space? A pre-purchase assessment reviews the property's direction, layout, and energy before you commit, so you can invest with confidence and avoid costly Vastu defects later.",
    cta: "Book Pre-Purchase Review",
  },
  {
    tone: "terra",
    icon: "compass",
    title: "Astrological Guidance",
    body: "Combine the precision of Vedic Jyotish with Vastu science to pinpoint the most auspicious directions, colours, and timing for your home or business decisions. Every reading is personalised to your birth chart for maximum impact.",
    cta: "Get Your Reading",
  },
  {
    tone: "gold",
    icon: "sparkles",
    title: "Astrology Horoscope Online Report",
    body: "Receive a detailed, personalised horoscope report based on your birth details, delivered straight to your inbox. Understand the planetary influences shaping your career, relationships, and wellbeing, with practical guidance for the year ahead.",
    cta: "Order Your Report",
  },
  {
    tone: "rose",
    icon: "monitor",
    title: "Online Vastu & Astro Consultations",
    body: "Receive the full depth of a Vastu or astrology consultation from anywhere in the world. Share your floor plans and birth details digitally and connect over video, for the same thorough analysis from the comfort of your home.",
    cta: "Schedule Online Session",
  },
];

export const elements = [
  { name: "Earth", sanskrit: "Prithvi · पृथ्वी", color: "#C1440E" },
  { name: "Water", sanskrit: "Jal · जल", color: "#3B72C6" },
  { name: "Fire", sanskrit: "Agni · अग्नि", color: "#DC2626" },
  { name: "Air", sanskrit: "Vayu · वायु", color: "#16A34A" },
  { name: "Space", sanskrit: "Akash · आकाश", color: "#7B3F8C" },
] as const;

export const credentials = [
  "Certified by the Indian Council of Astrological Sciences",
  "Advanced Vastu Shastra (Maharishi Mahesh Yogi tradition)",
  "Vedic Jyotish (Astrology) practitioner since 2018",
  "Member, Vastu Practitioners Association of Canada",
];

export const process = [
  { n: "01", tone: "gold", title: "Property & Owner Details", body: "We gather your property details along with the owner's birth details, so every recommendation is grounded in both the space and the person." },
  { n: "02", tone: "rose", title: "Floor-Plan Assessment", body: "Your floor plan is studied in detail to map how each zone is used and how energy currently moves through the space." },
  { n: "03", tone: "purple", title: "Priority Concerns", body: "Together we identify the concerns that matter most to you, keeping the guidance focused on what will make the biggest difference." },
  { n: "04", tone: "terra", title: "Direction & Element Analysis", body: "We analyse the directions, the site, and the balance of the five elements to reveal where the space supports you and where it resists you." },
  { n: "05", tone: "gold", title: "Practical Recommendations", body: "You receive clear, practical recommendations that fit your lifestyle and budget, with no demolition required in most cases." },
  { n: "06", tone: "rose", title: "Follow-Up", body: "A follow-up session confirms the changes are working as intended and answers any questions as you put them into practice." },
] as const;

export const testimonials = [
  {
    name: "Priya Sharma",
    location: "Brampton, Canada · Residential Vastu",
    avatar: "P",
    tone: "av1",
    quote:
      "After years of financial stress and constant arguments at home, a friend recommended A Healing Vaastu. Within three months of following the guidance, we noticed a real shift. The energy at home felt calmer, my husband earned an unexpected promotion, and our children finally slept through the night. I was skeptical at first, but the results speak for themselves.",
  },
  {
    name: "Rajesh Patel",
    location: "Mississauga, Canada · Commercial Vastu",
    avatar: "R",
    tone: "av2",
    quote:
      "I was losing customers despite a great location and a great product. The commercial audit revealed that our cash counter sat in the wrong zone and a pillar was blocking the main entrance. We made a few simple changes, and our sales have grown by more than 40% in six months. My whole family now relies on Anjli.",
  },
  {
    name: "Declan Marsh",
    location: "Austin, Texas, USA · Residential Vastu",
    avatar: "D",
    tone: "av3",
    quote:
      "My wife and I were building a custom home and wanted the layout to feel right, not just look right. Anjli walked us through the orientation of every room over video, and the finished house has a calm you can genuinely feel. Guests notice it the moment they step inside.",
  },
  {
    name: "Ananya Iyer",
    location: "Bengaluru, India · Astrological Guidance",
    avatar: "A",
    tone: "av4",
    quote:
      "Anjli combined my birth chart with our apartment layout in a way no one had done for me before. Her advice on directions and timing helped me choose the right moment to launch my business. Six months in, it is thriving, and I recommend her to everyone in my circle.",
  },
  {
    name: "Marguerite Ellison",
    location: "Vancouver, Canada · Online Consultation",
    avatar: "M",
    tone: "av1",
    quote:
      "I came to Vastu as a complete outsider and half expected to feel out of place. Instead, Anjli explained everything with such warmth and clarity that it simply made sense. We rearranged our bedroom and home office, and both my sleep and my focus have improved noticeably.",
  },
  {
    name: "Vikram Reddy",
    location: "Dallas, Texas, USA · Commercial Vastu",
    avatar: "V",
    tone: "av2",
    quote:
      "Our restaurant had strong reviews but inconsistent footfall. The audit pinpointed problems with the kitchen placement and the seating flow that we never would have spotted ourselves. After the changes, weekend bookings are up and the whole team feels the difference.",
  },
  {
    name: "Neha Kapoor",
    location: "Toronto, Canada · Residential Vastu",
    avatar: "N",
    tone: "av3",
    quote:
      "We wanted Vastu guidance before finalising our first home purchase. The online session was every bit as thorough as an in-person visit, with a detailed floor plan review and a written report I still refer back to. Worth every penny before such a big decision.",
  },
  {
    name: "Sarah-Jane Holloway",
    location: "London, United Kingdom · Online Consultation",
    avatar: "S",
    tone: "av4",
    quote:
      "I was looking for a consultant who could work remotely, and I could not be happier that I found Anjli. She assessed our period terrace with all its quirks and gave practical fixes that respected the character of the house. Our living room finally feels like the heart of the home.",
  },
];

export const posts = [
  { tag: "Home & Living", tone: "gold", title: "Kitchen Vastu: Why Direction Determines Your Family's Health", excerpt: "The kitchen is the heart of every Vastu home, yet it is the most commonly misaligned room. Discover why the southeast zone matters and how to correct it without a renovation.", read: "8 min read", date: "June 2025" },
  { tag: "Business", tone: "purple", title: "How Vastu Transformed 3 Businesses in 6 Months", excerpt: "Three business owners share their experiences, along with the specific changes that triggered measurable growth in revenue, team morale, and client retention.", read: "11 min read", date: "May 2025" },
  { tag: "Foundation", tone: "rose", title: "The 5 Elements of Vastu Shastra: A Modern Explanation", excerpt: "Prithvi, Jal, Agni, Vayu, and Akash. These ancient Sanskrit concepts translate directly into modern architectural and interior design principles that any homeowner can apply.", read: "6 min read", date: "April 2025" },
];

export const serviceOptions = [
  { value: "residential", label: "Residential Vastu" },
  { value: "commercial", label: "Commercial Vastu" },
  { value: "astrology", label: "Astrological Guidance" },
  { value: "online", label: "Online Consultation" },
  { value: "combined", label: "Combined (Vastu + Astrology)" },
];

export const propertyOptions = [
  { value: "house", label: "House / Detached" },
  { value: "condo", label: "Condo / Apartment" },
  { value: "townhouse", label: "Townhouse" },
  { value: "office", label: "Office / Workplace" },
  { value: "retail", label: "Retail / Shop" },
  { value: "other", label: "Other" },
];
