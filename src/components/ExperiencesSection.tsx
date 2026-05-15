import { experiences } from "@/data/experiences";
import ExperienceCard from "./ExperienceCard";

export default function ExperiencesSection() {
  return (
    <section className="max-w-3xl mx-auto px-6 pb-20">
      <div className="border-t border-slate-800 pt-12">
        <h2 className="text-2xl font-bold mb-12 text-center">経験・実績</h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-800" />
          <div className="space-y-8">
            {experiences.map((exp) => (
              <div key={exp.title} className="relative pl-12">
                <div className="absolute left-4 top-6 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-slate-950 -translate-x-1/2" />
                <ExperienceCard exp={exp} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
