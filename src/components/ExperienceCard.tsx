import { type Experience } from "@/data/experiences";

const categoryStyle: Record<string, string> = {
  ハッカソン: "bg-orange-100 text-orange-700",
  イベント: "bg-blue-100 text-blue-700",
  インターン: "bg-green-100 text-green-700",
};

export default function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <article className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryStyle[exp.category]}`}
        >
          {exp.category}
        </span>
        <span className="text-xs text-gray-400">{exp.date}</span>
      </div>

      <h3 className="font-bold text-lg leading-snug">{exp.title}</h3>

      {exp.award && (
        <p className="text-amber-600 text-sm font-semibold">{exp.award}</p>
      )}

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
        <span>{exp.role}</span>
        <span>{exp.teamSize}人チーム</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {exp.techs.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded font-mono"
          >
            {tech}
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-600 leading-relaxed line-clamp-4 flex-1">
        {exp.summary}
      </p>

      <div className="flex gap-3 pt-1">
        {exp.noteUrl !== "#" && (
          <a
            href={exp.noteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            詳しく読む
          </a>
        )}
        {exp.githubUrl && (
          <a
            href={exp.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-gray-200 text-gray-600 text-sm rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            GitHub
          </a>
        )}
      </div>
    </article>
  );
}
