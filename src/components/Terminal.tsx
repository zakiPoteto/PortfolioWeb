"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { executeCommand } from "@/data/commands";

type Line = {
  id: number;
  type: "welcome" | "cmd" | "output";
  text: string;
};

const WELCOME: string[] = [
  "Welcome to zakiPoteto's portfolio.",
  'Type "help" to see available commands.',
  "",
];

function createLines(texts: string[], type: Line["type"], startId: number): Line[] {
  return texts.map((text, i) => ({ id: startId + i, type, text }));
}

export default function Terminal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const counter = useRef(0);
  const nextId = () => counter.current++;

  const [lines, setLines] = useState<Line[]>(() =>
    WELCOME.map((text) => ({ id: counter.current++, type: "welcome" as const, text }))
  );
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    if (!isOpen) {
      const id = counter.current;
      setLines(WELCOME.map((text, i) => ({ id: id + i, type: "welcome" as const, text })));
      counter.current += WELCOME.length;
      setInput("");
      setCmdHistory([]);
      setHistoryIdx(-1);
    }
  }, [isOpen]);

  const handleSubmit = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const result = executeCommand(trimmed);
    setCmdHistory((prev) => [trimmed, ...prev]);
    setHistoryIdx(-1);
    setInput("");

    if (result.action === "clear") {
      setLines([]);
      return;
    }
    if (result.action === "exit") {
      onClose();
      return;
    }
    if (result.action === "open" && result.openUrl) {
      window.open(result.openUrl, "_blank", "noopener,noreferrer");
    }

    const baseId = nextId();
    const cmdLine: Line = { id: baseId, type: "cmd", text: trimmed };
    const outLines: Line[] = result.lines.map((text) => ({
      id: nextId(),
      type: "output",
      text,
    }));
    setLines((prev) => [...prev, cmdLine, ...outLines]);
  }, [input, onClose]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistoryIdx((prev) => {
        const next = Math.min(prev + 1, cmdHistory.length - 1);
        setInput(cmdHistory[next] ?? "");
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistoryIdx((prev) => {
        const next = Math.max(prev - 1, -1);
        setInput(next === -1 ? "" : (cmdHistory[next] ?? ""));
        return next;
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 250 }}
          className="fixed inset-0 z-50 flex flex-col bg-zinc-950 font-mono"
        >
          {/* Title bar */}
          <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900 border-b border-zinc-800 shrink-0">
            <div className="flex gap-1.5">
              <button
                onClick={onClose}
                aria-label="Close terminal"
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
              />
              <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
              <div className="w-3 h-3 rounded-full bg-green-500/40" />
            </div>
            <span className="text-xs text-zinc-500 mx-auto select-none">
              zakiPoteto@portfolio — zsh — 80×24
            </span>
            <kbd className="text-[10px] text-zinc-600 border border-zinc-700 rounded px-1.5 py-0.5 select-none">
              ESC
            </kbd>
          </div>

          {/* Output */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-0.5"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line) =>
              line.type === "cmd" ? (
                <div key={line.id} className="flex gap-2 items-start">
                  <span className="text-green-500 shrink-0 text-sm select-none">
                    zakiPoteto@portfolio:~$
                  </span>
                  <pre className="text-white text-sm whitespace-pre-wrap break-all">{line.text}</pre>
                </div>
              ) : (
                <pre
                  key={line.id}
                  className={`text-sm whitespace-pre-wrap break-all ${
                    line.type === "welcome" ? "text-green-400" : "text-green-300"
                  }`}
                >
                  {line.text}
                </pre>
              )
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input row */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-zinc-800 shrink-0">
            <span className="text-green-500 shrink-0 text-sm select-none">
              zakiPoteto@portfolio:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-white text-sm caret-green-400"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
