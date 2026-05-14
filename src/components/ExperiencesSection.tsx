import { experiences } from "@/data/experiences";
import ExperienceCard from "./ExperienceCard";

export default function ExperiencesSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 pb-20">
      <div className="border-t border-gray-100 pt-12">
        <h2 className="text-2xl font-bold mb-8">経験・実績</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.title} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
