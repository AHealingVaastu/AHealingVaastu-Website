import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

// italic accent for the Stats symbols only; below the fold, so not preloaded
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-accent",
  style: ["italic"],
  preload: false,
});

const siteUrl = "https://ahealingvaastu.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "A Healing Vaastu | Ancient Wisdom, Modern Harmony | Vastu Consultant",
  description:
    "Expert Vastu Shastra consultations for homes and businesses across Canada, the US, India, and worldwide. Residential, commercial, astrology, and online consultations.",
  keywords: [
    "Vastu consultant",
    "Vastu Shastra",
    "Vastu consultant Canada",
    "online Vastu consultation",
    "Vedic astrology",
    "residential Vastu",
    "commercial Vastu",
  ],
  openGraph: {
    title: "A Healing Vaastu | Ancient Wisdom, Modern Harmony",
    description:
      "Transform your home or business through the sacred science of Vastu Shastra. Serving Canada, the US, India, and worldwide.",
    url: siteUrl,
    siteName: "A Healing Vaastu",
    locale: "en_CA",
    type: "website",
  },
  icons: { icon: "/logo.png", apple: "/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
