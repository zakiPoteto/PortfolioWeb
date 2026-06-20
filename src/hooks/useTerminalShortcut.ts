import { useEffect } from "react";

// Ctrl+Shift+@ (Win) / ⌘+Shift+@ (Mac)

//   JIS の Ctrl+@ 単体 (e.shiftKey===false) は意図的に除外
//   e.key!=="{" で US の Ctrl+Shift+[ (→"{") との誤検知を防ぐ
function isTerminalKey(e: KeyboardEvent): boolean {
  const isMac = /mac/i.test(navigator.userAgent);
  const mod = isMac ? e.metaKey : e.ctrlKey;
  return (
    mod &&
    e.shiftKey &&
    (e.key === "@" || (e.code === "BracketLeft" && e.key !== "{"))
  );
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
