import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Noto_Sans_JP, Geist_Mono } from "next/font/google";
import "./globals.css";
import HiddenCommands from "@/components/HiddenCommands";

const sans = Noto_Sans_JP({
  variable: "--font-noto",
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.zaki-potato.dev";
const title = "zakiPoteto | Portfolio";
const description =
  "ハッカソン・インターン・イベント参加経験をまとめたポートフォリオサイト";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "zakiPoteto Portfolio",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "zakiPoteto",
  url: siteUrl,
  sameAs: ["https://github.com/zakiPoteto"],
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ja" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans bg-slate-950 text-slate-100 antialiased overflow-x-hidden relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <HiddenCommands />
      </body>
    </html>
  );
}
