"use client";

import { motion } from "framer-motion";
import { TechIcon } from "./Icons";

const languages = ["Dart", "Go", "TypeScript"];
const frameworks = ["Flutter", "React Native"];
const services = ["Firebase"];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
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
        className="space-y-6 text-center relative z-10"
      >
        <motion.p
          variants={item}
          className="text-blue-400 font-semibold text-sm tracking-[0.2em] uppercase"
        >
          Engineering Portfolio
        </motion.p>

        <motion.h1
          variants={item}
          className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400"
        >
        </motion.h1>

        <motion.p
          variants={item}
          className="text-slate-400 text-xl font-medium"
        >
          公立はこだて未来大学 システム情報科学部 3年
        </motion.p>

        <motion.p
          variants={item}
          className="text-slate-300 max-w-2xl leading-relaxed mx-auto text-lg"
        >
          モバイルアプリ開発（Flutter）を中心に、ハッカソン・インターン・チーム開発を通じて成長してきたエンジニアです。
          実用アプリの継続開発から企業インターン、複数のハッカソン受賞まで幅広く経験しています。
        </motion.p>

        <motion.div variants={item} className="flex flex-col gap-4 pt-4 items-center">
          <div className="flex flex-wrap gap-2.5 justify-center">
            {languages.map((lang) => (
              <span
                key={lang}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-white/5 border border-white/10 backdrop-blur-md text-slate-300 text-sm rounded-full font-mono hover:bg-white/10 transition-colors"
              >
                <TechIcon name={lang} />
                {lang}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {frameworks.map((fw) => (
              <span
                key={fw}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 backdrop-blur-md text-blue-300 text-sm rounded-full font-medium hover:bg-blue-500/20 transition-colors"
              >
                <TechIcon name={fw} />
                {fw}
              </span>
            ))}
            {services.map((svc) => (
              <span
                key={svc}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-violet-500/10 border border-violet-500/20 backdrop-blur-md text-violet-300 text-sm rounded-full font-medium hover:bg-violet-500/20 transition-colors"
              >
                <TechIcon name={svc} />
                {svc}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
