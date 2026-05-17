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
  noteUrl: string;
  githubUrl?: string;
};

export const experiences: Experience[] = [
  {
    title: "創作者向け交流プラットフォーム「Kiratto（キラット）」",
    date: "2025年12月",
    category: "ハッカソン",
    techs: ["Flutter", "Dart", "Go", "Supabase", "GitHub Actions"],
    role: "フロントエンドエンジニア",
    teamSize: 4,
    summary:
      "P2HACKS2025にて創作者向け交流プラットフォームを開発。ホーム画面・登録画面・プロフィール修正画面などのUI実装に加え、GoバックエンドのAPIをFlutter（Dart）から繋ぎ込む通信層の設計・実装を担当。キャッシュ戦略によるUX最適化やGitHub運用整備も行った。",
    noteUrl: "#",
    githubUrl: "https://github.com/p2hacks2025/pre-12",
  },
  {
    title: "価値観交流アプリ「Touch new」",
    date: "2025年8〜9月",
    category: "ハッカソン",
    techs: ["React Native", "TypeScript", "Firebase", "Spotify API", "Google Maps API"],
    role: "エンジニア / エンジニアリーダー的役割",
    teamSize: 6,
    award: "優秀賞受賞",
    summary:
      "tornado2025にて「偶然のすれ違いを価値観の交換に変える」位置情報ベースの交流アプリを開発（1ヶ月間の長期ハッカソン）。React Native初挑戦で位置情報機能・すれ違い機能・Firebase Storage活用の画像交換機能を実装。コードマージ担当や技術方針相談など、エンジニアリーダー的役割も担い優秀賞を受賞。",
    noteUrl: "#",
    githubUrl: "https://github.com/tornado2025-05-momentum/Touch-new",
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
      "P2HACKS2024にて新成人向けアルコール摂取管理アプリを開発。チームリーダーとしてプロジェクト全体を統括しながら、アルコール摂取量計算・通知機能などコア機能の実装を担当。GitHubでのブランチ・コミット命名規則策定でチーム開発フローを整備し、KDDIアジャイル賞を受賞。",
    noteUrl: "#",
    githubUrl: "https://github.com/p2hacks2024/pre-17",
  },
  {
    title: "企業インターンシップ（チームラボ株式会社）",
    date: "2024年9月",
    category: "インターン",
    techs: ["Flutter", "Dart"],
    role: "モバイルエンジニア（インターン）",
    summary:
      "10日間のサマーインターンで実践的な開発業務を経験。デザイナーからのUI修正対応、Web版APIとの連携によるデータ取得・加工処理の実装を担当。VRT（Visual Regression Testing）やコンポーネント設計・ステートマシン実装など、企業レベルの開発手法を学んだ。",
    noteUrl: "#",
  },
  {
    title: "大学支援アプリ「Dotto」",
    date: "2024年4月〜現在",
    category: "課外活動",
    techs: ["Flutter", "Dart", "Firebase", "Riverpod"],
    role: "フロントエンドエンジニア",
    summary:
      "未来大生向け支援アプリ。学内の約75%の学生が利用する実用アプリケーション。翌日の学食メニュー閲覧機能の実装やUI改善を担当。モブプログラミング・ペアプログラミングを中心とした実践的なチーム開発を現在まで継続して経験中。",
    noteUrl: "#",
    githubUrl: "https://github.com/fun-dotto/dotto",
  },
];
