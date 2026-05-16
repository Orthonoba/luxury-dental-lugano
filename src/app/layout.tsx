import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.luxurydental.ch"),
  title: {
    default: "Luxury Dental Paradiso | Lugano, Switzerland",
    template: "%s | Luxury Dental Paradiso — Lugano",
  },
  description:
    "Premium dental and facial aesthetics clinic in Lugano, Switzerland. Digital Smile Design, Porcelain Veneers, Clear Aligners, and advanced facial treatments with Swiss precision and artistic excellence.",
  keywords:
    "luxury dental Lugano, digital smile design Switzerland, dental aesthetics Ticino, veneers Lugano, clear aligners Switzerland, teeth whitening Lugano, porcelain veneers, anti-aging, skin rejuvenation, Paradiso Lugano, dentista Lugano",
  authors: [{ name: "Luxury Dental & Facial Estética" }],
  openGraph: {
    title: "Luxury Dental Paradiso — Lugano, Switzerland",
    description:
      "Where Swiss precision meets natural beauty. Premium dental and facial aesthetics in Lugano.",
    type: "website",
    locale: "en_US",
    url: "https://www.luxurydental.ch",
    siteName: "Luxury Dental Paradiso",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Dental Paradiso — Lugano, Switzerland",
    description: "Digital Smile Design & Facial Aesthetics — Swiss precision, natural beauty.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://www.luxurydental.ch",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
