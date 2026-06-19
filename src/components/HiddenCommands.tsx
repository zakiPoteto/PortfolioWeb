"use client";

import { useState, useEffect, useCallback } from "react";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import Terminal from "./Terminal";
import CommandPalette from "./CommandPalette";

export default function HiddenCommands() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  const openTerminal = useCallback(() => setIsTerminalOpen(true), []);
  const closeTerminal = useCallback(() => setIsTerminalOpen(false), []);
  const closePalette = useCallback(() => setIsPaletteOpen(false), []);

  // Konami Code opens the terminal (disabled while palette is open)
  useKonamiCode(openTerminal, isPaletteOpen);

  // ⌘K / Ctrl+K toggles the command palette (disabled while terminal is open)
  useEffect(() => {
    if (isTerminalOpen) return;
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isTerminalOpen]);

  return (
    <>
      <Terminal isOpen={isTerminalOpen} onClose={closeTerminal} />
      <CommandPalette isOpen={isPaletteOpen} onClose={closePalette} />
    </>
  );
}
