"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { experiences, type Experience } from "@/data/experiences";
import ExperienceCard from "./ExperienceCard";
import Modal from "./Modal";
import ExperienceDetailModal from "./ExperienceDetailModal";

export default function ExperiencesSection() {
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

  return (
    <section className="max-w-3xl mx-auto px-6 pb-32">
      <div className="pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            経験・実績
          </h2>
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
                <div className="absolute left-4 top-8 w-3.5 h-3.5 rounded-full bg-blue-500 border-4 border-slate-950 shadow-[0_0_10px_rgba(59,130,246,0.5)] -translate-x-1/2 z-10" />
                
                <ExperienceCard exp={exp} onClick={() => setSelectedExp(exp)} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={selectedExp !== null} onClose={() => setSelectedExp(null)}>
        {selectedExp && <ExperienceDetailModal exp={selectedExp} />}
      </Modal>
    </section>
  );
}
