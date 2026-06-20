import { useEffect, useRef } from "react";

// Mobile devices cannot trigger keyboard events — Konami Code is desktop-only by design
const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonamiCode(onActivate: () => void, isDisabled?: boolean) {
  const progress = useRef(0);

  useEffect(() => {
    if (isDisabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;

      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        progress.current = 0;
        return;
      }

      const key = e.key.toLowerCase();
      const expected = SEQUENCE[progress.current].toLowerCase();
      if (key === expected) {
        progress.current++;
        if (progress.current === SEQUENCE.length) {
          progress.current = 0;
          onActivate();
        }
      } else {
        progress.current = key === SEQUENCE[0].toLowerCase() ? 1 : 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onActivate, isDisabled]);
}
