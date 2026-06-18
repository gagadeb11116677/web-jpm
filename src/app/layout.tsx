import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XOBE — Jual Script JPM WhatsApp Murah & Terpercaya | SC JPM v2.7.5",
  description:
    "Jual script JPM WhatsApp v2.7.5 mulai 10K. SC JPM XOBE clean code, menu advance, 20+ command, ringan & stabil. Jasa rename SC dan fix bug SC juga tersedia. Hubungi @xobedevelopment2.",
  keywords: [
    "script JPM",
    "SC JPM",
    "JPM WhatsApp",
    "jual script JPM murah",
    "SC JPM terpercaya",
    "script broadcast WhatsApp",
    "XOBE",
    "jasa rename SC",
    "fix bug SC",
    "SC JPM v2.7.5",
    "script WhatsApp gratis",
    "auto JPM",
    "push kontak WhatsApp",
    "join all grup WhatsApp",
  ],
  authors: [{ name: "XOBE Development", url: "https://t.me/xobedevelopment2" }],
  creator: "XOBE Development",
  openGraph: {
    title: "XOBE — Script JPM WhatsApp v2.7.5",
    description:
      "Jual SC JPM WhatsApp mulai 10K. Clean code, menu advance, 20+ command, ringan & stabil.",
    url: "https://xobe.dev",
    siteName: "XOBE",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "https://files.catbox.moe/083k92.jpg",
        width: 800,
        height: 600,
        alt: "XOBE SC JPM v2.7.5",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "XOBE — Script JPM WhatsApp v2.7.5",
    description:
      "Jual SC JPM WhatsApp mulai 10K. Clean code, menu advance, 20+ command.",
    images: ["https://files.catbox.moe/083k92.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#08080A" />
        <link rel="canonical" href="https://xobe.dev" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "SC JPM XOBE v2.7.5",
              description:
                "Script JPM WhatsApp dengan 20+ command, clean code, menu advance, ringan dan stabil.",
              brand: { "@type": "Brand", name: "XOBE" },
              offers: [
                {
                  "@type": "Offer",
                  price: "10000",
                  priceCurrency: "IDR",
                  name: "SC JPM No Update",
                  availability: "https://schema.org/InStock",
                },
                {
                  "@type": "Offer",
                  price: "15000",
                  priceCurrency: "IDR",
                  name: "SC JPM Free Update",
                  availability: "https://schema.org/InStock",
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}