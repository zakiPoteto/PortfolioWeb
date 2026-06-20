"use client";

import { useState, useCallback } from "react";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { useTerminalShortcut } from "@/hooks/useTerminalShortcut";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import Terminal from "./Terminal";
import CommandPalette from "./CommandPalette";

export default function HiddenCommands() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  const openTerminal = useCallback(() => setIsTerminalOpen(true), []);
  const closeTerminal = useCallback(() => setIsTerminalOpen(false), []);
  const closePalette = useCallback(() => setIsPaletteOpen(false), []);
  const togglePalette = useCallback(() => setIsPaletteOpen((prev) => !prev), []);

  // Konami Code or Ctrl+Shift+@ (Win) / ⌘+Shift+@ (Mac) opens the terminal
  useKonamiCode(openTerminal, isPaletteOpen);
  useTerminalShortcut(openTerminal, isPaletteOpen);

  useCommandPalette(togglePalette, isTerminalOpen);

  return (
    <>
      <Terminal isOpen={isTerminalOpen} onClose={closeTerminal} />
      <CommandPalette isOpen={isPaletteOpen} onClose={closePalette} />
    </>
  );
}
