import type { Metadata } from "next";
import { Inter_Tight, Playfair_Display } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-accent",
  style: ["normal", "italic"],
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
    <html lang="en" className={`${interTight.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
