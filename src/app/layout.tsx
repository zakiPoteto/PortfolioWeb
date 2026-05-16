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
      <body className="bg-slate-950 text-slate-100 antialiased overflow-x-hidden relative">
        {/* Background decorative elements */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
        <div className="fixed top-[20%] right-[10%] w-[20%] h-[20%] bg-violet-600/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
        
        {children}
      </body>
    </html>
  );
}
