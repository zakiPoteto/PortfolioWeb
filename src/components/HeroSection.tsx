"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TechIcon } from "./Icons";

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

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function HeroSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24 relative overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 md:p-10 shadow-xl shadow-black/20"
      >
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Left: avatar + identity */}
          <motion.div
            variants={item}
            className="flex flex-col items-center md:items-start gap-4 md:w-56 shrink-0"
          >
            <div className="relative w-28 h-28 rounded-full overflow-hidden ring-2 ring-blue-500/40 shadow-lg shadow-blue-500/10">
              <Image
                src="/icon.jpg"
                alt="アイコン"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <p className="text-blue-400 font-semibold text-xs tracking-[0.2em] uppercase mb-1">
                Engineering Portfolio
              </p>
              <p className="text-white font-bold text-xl">zakiPoteto</p>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                公立はこだて未来大学
                <br />
                システム情報科学部 3年
              </p>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-slate-700/50 self-stretch" />

          {/* Right: about me + tech badges */}
          <motion.div
            variants={item}
            className="flex flex-col gap-6 flex-1 justify-center"
          >
            <div>
              <p className="text-blue-400 font-semibold text-xs tracking-[0.2em] uppercase mb-3">
                About Me
              </p>
              <p className="text-slate-200 text-base leading-relaxed">
                {ABOUT_ME}
              </p>
            </div>

            <div>
              <p className="text-slate-500 font-semibold text-xs tracking-[0.15em] uppercase mb-3">
                Main Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {MAIN_TECHS.map((tech) => (
                  <span
                    key={tech}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 text-slate-400 text-xs rounded-md border border-white/5 font-mono"
                  >
                    <TechIcon name={tech} size={12} />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
