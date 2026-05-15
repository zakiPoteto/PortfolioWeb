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
      <div className="space-y-4 text-center">
        <p className="text-blue-400 font-medium text-sm tracking-widest uppercase">
          Portfolio
        </p>
        <h1 className="text-4xl font-bold tracking-tight">ざっきーぽてと</h1>
        <p className="text-slate-400 text-lg">
          公立はこだて未来大学 システム情報科学部 3年 ／ zakiPoteto
        </p>
        <p className="text-slate-300 max-w-2xl leading-relaxed mx-auto">
          モバイルアプリ開発（Flutter）を中心に、ハッカソン・インターン・チーム開発を通じて成長してきたエンジニアです。
          実用アプリの継続開発から企業インターン、複数のハッカソン受賞まで幅広く経験しています。
        </p>
        <div className="flex flex-wrap gap-2 pt-2 justify-center">
          {techs.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-blue-950/60 text-blue-300 text-sm rounded-full font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
