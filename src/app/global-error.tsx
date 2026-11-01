"use client";

import { useEffect } from "react";
import ErrorView from "@/components/ErrorView";
import "./globals.css";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ja">
      <body className="bg-slate-950 text-slate-100 antialiased">
        <ErrorView digest={error.digest} onRetry={() => unstable_retry()} />
      </body>
    </html>
  );
}
