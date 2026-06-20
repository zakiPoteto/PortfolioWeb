import { useEffect } from "react";

// Ctrl+Shift+@ (Win) / ⌘+Shift+@ (Mac)
// e.code === "BracketLeft" for JIS keyboard layout independence (@  is at [ position)
function isTerminalKey(e: KeyboardEvent): boolean {
  const isMac = /mac/i.test(navigator.userAgent);
  return isMac
    ? e.metaKey && e.shiftKey && e.code === "BracketLeft"
    : e.ctrlKey && e.shiftKey && e.code === "BracketLeft";
}

export function useTerminalShortcut(onOpen: () => void, isDisabled?: boolean) {
  useEffect(() => {
    if (isDisabled) return;
    const handler = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (isTerminalKey(e)) {
        e.preventDefault();
        onOpen();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onOpen, isDisabled]);
}
