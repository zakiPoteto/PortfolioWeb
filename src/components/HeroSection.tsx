"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { TechIcon, GitHubIcon } from "./Icons";
import { Mail, MapPin, ExternalLink, Sparkles, Code2, Cpu } from "lucide-react";

const ABOUT_ME = "モバイルアプリを中心に開発してきました。フルスタックになるためにバックエンドも勉強中。\nユーザーに楽しさや便利さを届けるものを作ることが好きです。";

const MAIN_TECHS = [
  "Flutter",
  "Dart",
  "TypeScript",
  "React Native",
  "Firebase",
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function HeroSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 pt-24 pb-16">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto"
      >
        {/* Profile Card - Spans 4 columns */}
        <motion.div
          variants={item}
          className="md:col-span-5 lg:col-span-4 bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 flex flex-col gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-1 ring-slate-700 shadow-xl shrink-0">
              <Image
                src="/icon.jpg"
                alt="zakiPoteto"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black text-white leading-none">zakiPoteto</h1>
              <p className="text-slate-400 text-xs mt-1.5 font-bold uppercase tracking-wider">Mobile & Frontend</p>
            </div>
          </div>
          
          <div className="space-y-3 text-sm font-medium text-slate-400">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-slate-600" />
              <span>公立はこだて未来大学 3年</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-slate-600" />
              <span>Contact via GitHub</span>
            </div>
          </div>

          <div className="flex gap-2 mt-auto">
            <a
              href="https://github.com/zakiPoteto"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHubプロフィールを開く"
              className="p-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-2xl text-slate-400 hover:text-white transition-all shadow-lg"
            >
              <GitHubIcon size={20} />
            </a>
            <button disabled className="flex-1 px-4 py-3 bg-white/30 text-slate-500 text-xs font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 cursor-not-allowed">
              Resume <ExternalLink size={14} />
            </button>
          </div>
        </motion.div>

        {/* About Card - Spans 8 columns */}
        <motion.div
          variants={item}
          className="md:col-span-7 lg:col-span-8 bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Code2 size={120} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4 text-blue-400">
              <Sparkles size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Introduction</span>
            </div>
            <p className="text-slate-200 text-lg md:text-xl leading-relaxed font-semibold whitespace-pre-line">
              {ABOUT_ME}
            </p>
          </div>
        </motion.div>

        {/* Main Stack - Spans full width (12 columns) */}
        <motion.div
          variants={item}
          className="md:col-span-12 bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Cpu size={18} className="text-purple-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Main Stack</span>
          </div>
          <div className="flex flex-wrap gap-4">
            {MAIN_TECHS.map((tech) => (
              <div
                key={tech}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-800/30 border border-slate-700/30 hover:border-blue-500/30 hover:bg-slate-800/50 transition-all cursor-default"
              >
                <TechIcon name={tech} size={20} />
                <span className="text-slate-300 font-bold">{tech}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
