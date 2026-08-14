// src/app/layout.tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl = "https://www.humasignaturesalon.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Huma's Signature Salon | Beauty Salon in Karachi",
  description:
    "Huma's Signature Salon in Garden East, Karachi offers premium hair, makeup, skincare, and bridal services in an elegant, welcoming setting. Rated 4.7 stars from 1,398 reviews. Open daily, 11 AM – 9 PM.",
  keywords: [
    "beauty salon Karachi",
    "Huma's Signature Salon",
    "bridal makeup Karachi",
    "hair salon Garden East",
    "skincare Karachi",
    "makeup artist Karachi",
    "salon near me Karachi",
  ],
  authors: [{ name: "Huma's Signature Salon" }],
  creator: "Huma's Signature Salon",
  formatDetection: {
    telephone: true,
    email: false,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: siteUrl,
    siteName: "Huma's Signature Salon",
    title: "Huma's Signature Salon | Beauty Salon in Karachi",
    description:
      "Premium hair, makeup, skincare, and bridal services in Garden East, Karachi. Rated 4.7 stars from 1,398 reviews.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Huma's Signature Salon | Beauty Salon in Karachi",
    description:
      "Premium hair, makeup, skincare, and bridal services in Garden East, Karachi. Rated 4.7 stars from 1,398 reviews.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "geo.region": "PK-SD",
    "geo.placename": "Karachi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
