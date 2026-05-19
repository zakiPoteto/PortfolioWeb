export type Category = "ハッカソン" | "イベント" | "インターン" | "課外活動";

export type Experience = {
  title: string;
  date: string;
  category: Category;
  techs: string[];
  role: string;
  teamSize?: number;
  award?: string;
  summary: string;
  githubUrl?: string;
  officialUrl?: string;
};

export const experiences: Experience[] = [
  {
    title: "創作者向け交流プラットフォーム「Kiratto（キラット）」",
    date: "2025年12月",
    category: "ハッカソン",
    techs: ["Flutter", "Dart", "Go", "Supabase"],
    role: "フロントエンドエンジニア",
    teamSize: 4,
    summary:
      "UI実装からGoバックエンドとの通信層設計まで担当。キャッシュ戦略によるUX最適化も行った。",
    githubUrl: "https://github.com/p2hacks2025/pre-12",
    officialUrl: "https://p2hacks2025.github.io/pregroup/",
  },
  {
    title: "企業インターンシップ（チームラボ株式会社）",
    date: "2025年9月1日〜9月10日",
    category: "インターン",
    techs: ["Flutter", "Dart"],
    role: "モバイルエンジニア（インターン）",
    summary:
      "UI修正対応・Web版API連携を担当。VRTやコンポーネント設計など企業レベルの開発手法を習得した。",
  },
  {
    title: "価値観交流アプリ「Touch new」",
    date: "2025年8〜9月",
    category: "ハッカソン",
    techs: ["React Native", "TypeScript", "Firebase"],
    role: "エンジニア / テックリード",
    teamSize: 6,
    award: "優秀賞受賞",
    summary:
      "React Native初挑戦で位置情報・すれ違い・画像交換機能を実装。コードマージや技術方針決定も担当した。",
    githubUrl: "https://github.com/tornado2025-05-momentum/Touch-new",
    officialUrl: "https://tornado-official.jp/tornado2025/",
  },
  {
    title: "アルコール摂取管理アプリ「Callaco」",
    date: "2024年12月",
    category: "ハッカソン",
    techs: ["Flutter", "Dart"],
    role: "チームリーダー / エンジニア",
    teamSize: 4,
    award: "KDDIアジャイル賞受賞",
    summary:
      "チームリーダーとしてプロジェクトを統括しながらコア機能を実装。GitHub運用ルール策定でチーム開発フローを整備した。",
    githubUrl: "https://github.com/p2hacks2024/pre-17",
    officialUrl: "https://p2hacks2024.github.io/pregroup/",
  },
  {
    title: "大学支援アプリ「Dotto」",
    date: "2024年4月〜現在",
    category: "課外活動",
    techs: ["Flutter", "Dart", "Firebase"],
    role: "フロントエンドエンジニア",
    summary:
      "学内約75%が利用する実用アプリ。学食メニュー機能の実装・UI改善を担当し、モブプロ中心のチーム開発を継続中。",
    githubUrl: "https://github.com/fun-dotto/dotto",
  },
];
