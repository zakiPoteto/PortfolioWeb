const languages = ["Dart", "Go", "TypeScript"];
const frameworks = ["Flutter", "React Native"];
const services = ["Firebase"];

export default function HeroSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <div className="space-y-4 text-center">
        <p className="text-blue-400 font-medium text-sm tracking-widest uppercase">
          Portfolio
        </p>
        <h1 className="text-4xl font-bold tracking-tight">ざっきーぽてと</h1>
        <p className="text-slate-400 text-lg">
          公立はこだて未来大学 システム情報科学部 3年
        </p>
        <p className="text-slate-300 max-w-2xl leading-relaxed mx-auto">
          モバイルアプリ開発（Flutter）を中心に、ハッカソン・インターン・チーム開発を通じて成長してきたエンジニアです。
          実用アプリの継続開発から企業インターン、複数のハッカソン受賞まで幅広く経験しています。
        </p>
        <div className="flex flex-col gap-2 pt-2 items-center">
          <div className="flex flex-wrap gap-2 justify-center">
            {languages.map((lang) => (
              <span
                key={lang}
                className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-full font-mono"
              >
                {lang}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {frameworks.map((fw) => (
              <span
                key={fw}
                className="px-3 py-1 bg-blue-950/60 text-blue-300 text-sm rounded-full font-medium"
              >
                {fw}
              </span>
            ))}
            {services.map((svc) => (
              <span
                key={svc}
                className="px-3 py-1 bg-violet-950/60 text-violet-300 text-sm rounded-full font-medium"
              >
                {svc}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
