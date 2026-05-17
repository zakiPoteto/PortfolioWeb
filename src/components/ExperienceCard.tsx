import { type Experience } from "@/data/experiences";
import { Calendar, Users, Trophy, UserCircle, Globe } from "lucide-react";
import { GitHubIcon, TechIcon } from "./Icons";

const categoryStyle: Record<string, string> = {
  ハッカソン: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  イベント: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  インターン: "bg-green-500/10 text-green-400 border-green-500/20",
  課外活動: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <article className="group relative bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 md:p-8 flex flex-col gap-5 hover:border-blue-500/50 hover:bg-slate-900/60 transition-all duration-300 shadow-xl shadow-black/20">
      {/* Decorative glow on hover */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm -z-10" />

      <div className="flex items-start justify-between flex-wrap gap-3">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full border ${categoryStyle[exp.category]}`}
        >
          {exp.category}
        </span>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Calendar size={14} />
          <span>{exp.date}</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-xl md:text-2xl leading-tight text-slate-100 group-hover:text-blue-400 transition-colors">
          {exp.title}
        </h3>
        {exp.award && (
          <div className="flex items-center gap-2 text-amber-500 text-sm font-bold">
            <Trophy size={16} />
            <span>{exp.award}</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
        <div className="flex items-center gap-1.5">
          <UserCircle size={16} className="text-slate-500" />
          <span>{exp.role}</span>
        </div>
        {exp.teamSize && (
          <div className="flex items-center gap-1.5">
            <Users size={16} className="text-slate-500" />
            <span>{exp.teamSize}人チーム</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {exp.techs.map((tech) => (
          <span
            key={tech}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 text-slate-400 text-xs rounded-md border border-white/5 font-mono"
          >
            <TechIcon name={tech} size={12} />
            {tech}
          </span>
        ))}
      </div>

      <p className="text-slate-400 leading-relaxed text-sm md:text-base line-clamp-4 flex-1">
        {exp.summary}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        {exp.officialUrl && exp.officialUrl !== "#" && (
          <a
            href={exp.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-6 py-2.5 bg-white/5 border border-slate-700 text-slate-300 text-sm font-bold rounded-xl hover:bg-white/10 hover:border-slate-500 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Globe size={16} />
            公式サイト
          </a>
        )}
        {exp.githubUrl && (
          <a
            href={exp.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-6 py-2.5 bg-white/5 border border-slate-700 text-slate-300 text-sm font-bold rounded-xl hover:bg-white/10 hover:border-slate-500 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <GitHubIcon size={16} />
            GitHub
          </a>
        )}
      </div>
    </article>
  );
}
