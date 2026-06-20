"use client";

import { useEffect } from "react";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import { User, Code2, Briefcase, Mail, ExternalLink, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { paletteCommands } from "@/data/paletteCommands";

const ICON_MAP: Record<string, LucideIcon> = {
  User,
  Code2,
  Briefcase,
  Mail,
  ExternalLink,
};

export default function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const runCommand = (action: () => void) => {
    onClose();
    // Small delay so the palette closes before scrolling
    setTimeout(action, 50);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/60"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden">
              <Command loop>
                {/* Search input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800">
                  <Search size={15} className="text-zinc-500 shrink-0" />
                  <Command.Input
                    placeholder="コマンドを検索..."
                    className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-zinc-500"
                    autoFocus
                  />
                  <kbd className="shrink-0 text-[10px] text-zinc-600 border border-zinc-700 rounded px-1.5 py-0.5">
                    ESC
                  </kbd>
                </div>

                {/* Results */}
                <Command.List className="max-h-80 overflow-y-auto p-2">
                  <Command.Empty className="py-8 text-center text-sm text-zinc-500">
                    コマンドが見つかりません
                  </Command.Empty>

                  {paletteCommands.map((cmd) => {
                    const Icon = cmd.icon ? ICON_MAP[cmd.icon] : undefined;
                    return (
                      <Command.Item
                        key={cmd.id}
                        value={`${cmd.label} ${cmd.description ?? ""} ${(cmd.keywords ?? []).join(" ")}`}
                        onSelect={() => runCommand(cmd.action)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm text-zinc-300
                          data-[selected=true]:bg-zinc-800 data-[selected=true]:text-white
                          hover:bg-zinc-800 hover:text-white transition-colors"
                      >
                        {Icon ? (
                          <Icon size={15} className="text-zinc-500 shrink-0" />
                        ) : (
                          <div className="w-[15px] shrink-0" />
                        )}
                        <div className="min-w-0">
                          <div className="font-medium truncate">{cmd.label}</div>
                          {cmd.description && (
                            <div className="text-xs text-zinc-500 truncate">{cmd.description}</div>
                          )}
                        </div>
                      </Command.Item>
                    );
                  })}
                </Command.List>
              </Command>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
