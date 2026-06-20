import { useEffect } from "react";

function isToggleKey(e: KeyboardEvent): boolean {
  const isMac = /mac/i.test(navigator.userAgent);
  if (isMac) {
    return e.metaKey && (e.key === "k" || e.key === "/");
  }
  return e.ctrlKey && e.key === "/";
}

export function useCommandPalette(onToggle: () => void, isDisabled?: boolean) {
  useEffect(() => {
    if (isDisabled) return;
    const handler = (e: KeyboardEvent) => {
      if (isToggleKey(e)) {
        e.preventDefault();
        onToggle();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onToggle, isDisabled]);
}
