import { Trophy } from "lucide-react";

export default function AwardBadge({
  award,
  size = "sm",
}: {
  award: string;
  size?: "sm" | "lg";
}) {
  const isLg = size === "lg";
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 font-bold text-amber-400 ${
        isLg ? "px-4 py-2 text-sm" : "px-3 py-1 text-xs"
      }`}
    >
      <Trophy size={isLg ? 16 : 14} className="shrink-0" />
      <span>{award}</span>
    </div>
  );
}
