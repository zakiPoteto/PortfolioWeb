const techs = [
  "Flutter",
  "Dart",
  "Go",
  "React Native",
  "TypeScript",
  "Firebase",
  "Riverpod",
  "Supabase",
];

export default function HeroSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <div className="space-y-4">
        <p className="text-indigo-600 font-medium text-sm tracking-widest uppercase">
          Portfolio
        </p>
        <h1 className="text-4xl font-bold tracking-tight">ざっきーぽてと</h1>
        <p className="text-gray-500 text-lg">
          公立はこだて未来大学 システム情報科学部 3年 ／ zakiPoteto
        </p>
        <p className="text-gray-700 max-w-2xl leading-relaxed">
          モバイルアプリ開発（Flutter）を中心に、ハッカソン・インターン・チーム開発を通じて成長してきたエンジニアです。
          実用アプリの継続開発から企業インターン、複数のハッカソン受賞まで幅広く経験しています。
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {techs.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
