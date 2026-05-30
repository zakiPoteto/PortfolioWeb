"use client";

import { motion } from "framer-motion";
import { GitHubIcon } from "./Icons";
import { GitPullRequest, Flame, GitBranch, History, ExternalLink } from "lucide-react";

// 手動更新用のデータ
const GITHUB_STATS = {
  totalContributions: 842,
  currentStreak: 12,
  totalPRs: 48,
  publicRepos: 15,
  lastUpdated: "2024.05.29",
};

export default function StatsCard() {
  // 装飾用のグリッドデータ（ダミー）
  const contributionGrid = Array.from({ length: 28 }, (_, i) => ({
    level: Math.floor(Math.random() * 4),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
      className="md:col-span-12 bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 lg:p-8 flex flex-col gap-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400">
          <GitHubIcon size={18} />
          <span className="text-xs font-black uppercase tracking-[0.2em]">
            GitHub Ecosystem
          </span>
        </div>
        <div className="hidden sm:block text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          {GITHUB_STATS.lastUpdated}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Stats Grid */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Contributions", value: GITHUB_STATS.totalContributions, icon: History, color: "text-blue-400", border: "hover:border-blue-500/30", sub: "Total" },
            { label: "Streak", value: GITHUB_STATS.currentStreak, icon: Flame, color: "text-orange-400", border: "hover:border-orange-500/30", sub: "Days" },
            { label: "Pull Requests", value: GITHUB_STATS.totalPRs, icon: GitPullRequest, color: "text-purple-400", border: "hover:border-purple-500/30", sub: "Merged" },
            { label: "Repositories", value: GITHUB_STATS.publicRepos, icon: GitBranch, color: "text-emerald-400", border: "hover:border-emerald-500/30", sub: "Public" },
          ].map((stat) => (
            <div 
              key={stat.label}
              className={`group bg-slate-800/20 border border-slate-700/40 rounded-2xl p-4 transition-all hover:bg-slate-800/40 ${stat.border}`}
            >
              <div className={`flex items-center gap-2 mb-2 ${stat.color}`}>
                <stat.icon size={14} />
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">{stat.label}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-white group-hover:scale-105 transition-transform origin-left inline-block">
                  {stat.value}
                </span>
                <span className="text-[9px] font-bold text-slate-500 uppercase">{stat.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Contribution Wall */}
        <div className="lg:col-span-4 bg-slate-800/20 border border-slate-700/40 rounded-2xl p-4 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">Activity Graph</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-[1px] bg-blue-500/${i * 20}`} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1.5 mb-1">
            {contributionGrid.map((day, i) => (
              <div
                key={i}
                className={`aspect-square rounded-[2px] transition-all hover:scale-125 ${
                  day.level === 0 ? "bg-slate-800" :
                  day.level === 1 ? "bg-blue-900/40" :
                  day.level === 2 ? "bg-blue-700/60" :
                  "bg-blue-500"
                }`}
              />
            ))}
          </div>
          <a
            href="https://github.com/zakiPoteto"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors group"
          >
            Full Profile
            <ExternalLink size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
