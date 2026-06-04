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
  details?: string[];
  githubUrl?: string;
  officialUrl?: string;
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
      "UI実装からGoバックエンドとの通信層設計まで担当。キャッシュ戦略によるUX最適化も行った。",
    details: [
      "ホーム画面・サインアップ/ログイン画面（初期実装・API接続）を実装。プロフィール画面はバグ修正・動作改善を担当",
      "GoバックエンドのREST APIをDart側から繋ぎ込む通信層を設計・実装（ホーム画面JSON送受信・マッチ作品取得、サインアップ/ログインエンドポイント接続）",
      "precacheImage()で常に2枚先の画像をprefetch（ahead=2）しスワイプ遅延を解消。ResizeImageでデバイスDPR対応のメモリキャッシュ最適化も実施",
      "GitHubのIssue・PRテンプレートを整備し、チームの運用フローを改善",
    ],
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
    details: [
      "デザイナーからのUI修正依頼に対応し、プロダクションコードへのPRをマージ",
      "Web版の既存APIをモバイル側から呼び出すデータ取得・加工処理を実装",
      "VRT（Visual Regression Testing）によるUI変更の自動検証フローを体験",
      "アトミックデザインに基づくコンポーネント設計・ステートマシン実装など企業レベルの設計手法を習得",
    ],
  },
  {
    title: "価値観交流アプリ「Touch new」",
    date: "2025年8〜9月",
    category: "ハッカソン",
    techs: ["React Native", "TypeScript", "Firebase", "Spotify API", "Google Maps API"],
    role: "エンジニア / テックリード",
    teamSize: 6,
    award: "優秀賞受賞",
    summary:
      "React Native初挑戦で位置情報・すれ違い・画像交換機能を実装。コードマージや技術方針決定も担当した。",
    details: [
      "Expo + React Nativeを初めて使い、位置情報取得・すれ違い検知のコアロジックを実装",
      "Firebase Storage/Firestoreによるリアルタイム画像交換機能とホーム画面UIを設計・実装",
      "Spotify・Google Maps・YouTube等の複数外部APIを連携した情報統合システムを構築",
      "コードマージ担当・技術方針相談対応・GitHub運用サポートでエンジニアリーダー的役割を担当",
    ],
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
    details: [
      "チームリーダーとしてスプリント計画・タスク割り当て・進捗管理を担当",
      "Flutter/Dartでアルコール摂取量計算・通知機能のコア機能を実装",
      "GitHubのブランチ命名規則・コミットメッセージ規則を策定し、開発フローを標準化",
      "Discordへの疑似既読機能導入・マインドマップ活用により、非同期コミュニケーションを改善",
    ],
    githubUrl: "https://github.com/p2hacks2024/pre-17",
    officialUrl: "https://p2hacks2024.github.io/pregroup/",
  },
  {
    title: "大学支援アプリ「Dotto」",
    date: "2024年4月〜現在",
    category: "課外活動",
    techs: ["Flutter", "Dart", "Firebase", "Riverpod"],
    role: "フロントエンドエンジニア",
    summary:
      "学内約75%が利用する実用アプリ。学食メニュー機能の実装・UI改善を担当し、モブプロ中心のチーム開発を継続中。",
    details: [
      "学内約75%の学生が利用する大学支援アプリに参加し、継続的に機能開発を担当",
      "翌日の学食メニュー表示機能のUI設計からFirebase/Riverpodを用いたデータ取得ロジックまで一貫して実装",
      "コードレビュー・ペアプログラミングを通じたクリーンコード作成技術の向上",
      "モブプログラミングを主体としたチーム開発スタイルで多機能の実装に関与",
    ],
    githubUrl: "https://github.com/fun-dotto/dotto",
  },
];
