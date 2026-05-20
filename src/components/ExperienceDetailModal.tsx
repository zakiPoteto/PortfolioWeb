"use client";

import { categoryStyle, type Experience } from "@/data/experiences";
import { Calendar, Users, Trophy, UserCircle, Globe } from "lucide-react";
import { GitHubIcon, TechIcon } from "./Icons";


export default function ExperienceDetailModal({ exp }: { exp: Experience }) {
  return (
    <div className="flex flex-col gap-5 pt-2">
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
        <h3 className="font-bold text-xl leading-tight text-slate-100">
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

      <p className="text-slate-400 leading-relaxed text-sm md:text-base">
        {exp.summary}
      </p>

      {(exp.officialUrl || exp.githubUrl) && (
        <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-700/50">
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
      )}
    </div>
  );
}
