"use client";

import { motion } from "framer-motion";

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

      </motion.div>
    </section>
  );
}
