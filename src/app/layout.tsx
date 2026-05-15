import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "zakiPoteto | Portfolio",
  description:
    "ハッカソン・インターン・イベント参加経験をまとめたポートフォリオサイト",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  );
}
