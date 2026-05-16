"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experiences";
import ExperienceCard from "./ExperienceCard";

export default function ExperiencesSection() {
  return (
    <section className="max-w-3xl mx-auto px-6 pb-32">
      <div className="pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-3"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            経験・実績
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            これまでの活動やプロジェクト、受賞歴などをまとめています。
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line on the left side */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-slate-800 to-transparent" />
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-12"
              >
                {/* Timeline dot on the left */}
                <div className="absolute left-4 top-10 w-3.5 h-3.5 rounded-full bg-blue-500 border-4 border-slate-950 shadow-[0_0_10px_rgba(59,130,246,0.5)] -translate-x-1/2 z-10" />
                
                <ExperienceCard exp={exp} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
