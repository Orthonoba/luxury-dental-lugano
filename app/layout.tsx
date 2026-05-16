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
  title: "Luxury Dental & Facial Estética | Digital Smile Design",
  description:
    "Premium dental and facial aesthetics clinic. Digital Smile Design, Clear Aligners, Veneers, and advanced facial treatments delivered with Swiss precision and artistic excellence.",
  keywords:
    "luxury dental, digital smile design, facial aesthetics, veneers, clear aligners, teeth whitening, porcelain veneers, anti-aging, skin rejuvenation",
  authors: [{ name: "Luxury Dental & Facial Estética" }],
  openGraph: {
    title: "Luxury Dental & Facial Estética",
    description:
      "Transform your smile with precision and artistry. Digital Smile Design & Facial Aesthetics.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Dental & Facial Estética",
    description: "Digital Smile Design & Facial Aesthetics — Swiss precision, natural beauty.",
  },
  robots: {
    index: true,
    follow: true,
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
