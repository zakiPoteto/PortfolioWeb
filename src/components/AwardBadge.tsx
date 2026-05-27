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
      className={`relative inline-flex items-center gap-2 rounded-lg border border-amber-500/40 bg-slate-950/40 backdrop-blur-sm overflow-hidden shadow-[0_0_20px_rgba(245,158,11,0.05)] ${
        isLg ? "px-5 py-2.5 text-sm" : "px-3 py-1.5 text-[0.7rem]"
      }`}
    >
      <div className="relative flex items-center gap-2 z-10">
        <div className="relative flex items-center justify-center">
            <Trophy 
                size={isLg ? 18 : 13} 
                className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" 
            />
            {/* Static subtle glow for large size */}
            {isLg && (
                <div className="absolute inset-0 bg-amber-400/20 blur-md rounded-full -z-10" />
            )}
        </div>
        
        <span className="font-bold tracking-wider text-amber-50/90 uppercase">
          {award}
        </span>
      </div>
    </div>
  );
}
