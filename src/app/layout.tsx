import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
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

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "XOBE — Script JPM WhatsApp v2.7.5",
  description:
    "Script JPM WhatsApp bot — 16 command, multi-bot, SWGC, push kontak. Bukan recode, clean code. 10K tanpa update, 15K dengan update + grup Telegram.",
  keywords: [
    "script JPM",
    "bot WhatsApp",
    "XOBE",
    "SC JPM",
    "push kontak",
    "multi-bot",
    "SWGC",
  ],
  authors: [{ name: "xobe development" }],
  openGraph: {
    title: "XOBE — Script JPM WhatsApp v2.7.5",
    description:
      "Script JPM WhatsApp dengan 16 command. Clean code, bukan recode random.",
    siteName: "XOBE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XOBE — Script JPM WhatsApp v2.7.5",
    description:
      "Script JPM WhatsApp dengan 16 command. Clean code, bukan recode random.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
