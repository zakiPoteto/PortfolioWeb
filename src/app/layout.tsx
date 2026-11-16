import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import HiddenCommands from "@/components/HiddenCommands";

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
    <html lang="ja">
      <body className="bg-slate-950 text-slate-100 antialiased overflow-x-hidden relative">
        {/* Background decorative elements */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
        <div className="fixed top-[20%] right-[10%] w-[20%] h-[20%] bg-violet-600/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
        
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
