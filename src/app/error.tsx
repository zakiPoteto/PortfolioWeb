"use client";

import { useEffect } from "react";
import ErrorView from "@/components/ErrorView";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorView onRetry={() => unstable_retry()} />;
}
