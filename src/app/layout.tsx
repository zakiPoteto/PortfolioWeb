import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import HiddenCommands from "@/components/HiddenCommands";

export const metadata: Metadata = {
  title: "zakiPoteto | Portfolio",
  description:
    "ハッカソン・インターン・イベント参加経験をまとめたポートフォリオサイト",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-slate-950 text-slate-100 antialiased overflow-x-hidden relative">
        {children}
        <HiddenCommands />
      </body>
    </html>
  );
}
