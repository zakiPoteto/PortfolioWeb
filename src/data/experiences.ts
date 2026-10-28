export type Category = "ハッカソン" | "イベント" | "インターン" | "課外活動";

export type Experience = {
  title: string;
  slug?: string;
  date: string;
  /** 並び替え用の開始日(YYYY-MM-DD) */
  startDate: string;
  /** 継続中の活動 */
  ongoing?: boolean;
  category: Category;
  techs: string[];
  teamSize?: number;
  award?: string;
  summary: string;
  details?: string[];
  githubUrl?: string;
  officialUrl?: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
};

const entries: Experience[] = [
  {
    title: "大学広報Webアプリ「FUN o'clock」（FISH2026）",
    date: "2026年10月",
    startDate: "2026-10-01",
    category: "ハッカソン",
    techs: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    teamSize: 5,
    summary:
      "高校生が時計を見る瞬間を未来大との出会いにする、ホールクロック型の広報Webアプリ。",
    details: [
      "仕様の未確定事項をチームで確定し、部品の型・受け入れ条件・担当範囲・依存関係を書いた、AIがそのまま実装できる粒度のIssue約40件に分解",
      "全PRにAIレビューを通して指摘の採否を判断し、重要な不具合を含む指摘7件をマージ前に修正",
      "IndexedDBのデータ層を実装。通信が不安定でも表示を続け、使えない環境では同梱データへフォールバックする設計",
      "上下スワイプ操作を判定ロジック・タッチ検出・状態管理に分けて実装。指への追従、取り消し、2本目の指、操作の中断に対応",
      "審査基準や賞の性質から逆算せずに企画したため、開発の速さを評価される点に活かせなかった。評価する側が重視する点から逆算して企画する大切さを学んだ",
    ],
  },
  {
    title: "企業インターンシップ（株式会社オプティム）",
    date: "2026年8月31日〜9月4日",
    startDate: "2026-08-31",
    category: "インターン",
    techs: ["Go", "MySQL", "OpenAPI", "Docker", "Flutter"],
    summary:
      "物品管理SaaSのバックエンドで、一覧の部分一致検索APIを実装。API仕様を先に固める進め方で、実装からレビュー・マージまでを5日間で一通り経験した。",
    details: [
      "API仕様を先に定義し、既存の挙動を変えない形でGoのAPIに部分一致検索を実装",
      "入力チェックを追加し、境界値を含む単体テストを作成。レビュー指摘を受けてDB層のテストも追加",
      "ローカルDBとPostmanで動作確認。「ヒットする語」と「しない語」を対で試し、機能の問題かデータの問題かを切り分けた",
      "既存仕様の意図を調査で理解し、安易に直さず原因を切り分ける判断を学んだ",
      "最終日にはFlutter側の共通入力コンポーネントの拡張にも着手。Merge Requestでレビュー対応まで経験",
    ],
  },
  {
    title: "創作者向け交流プラットフォーム「Kiratto（キラット）」",
    slug: "kiratto",
    date: "2025年12月",
    startDate: "2025-12-01",
    category: "ハッカソン",
    techs: ["Flutter", "Dart", "Go", "Supabase", "GitHub Actions"],
    teamSize: 4,
    summary:
      "UI実装からGoバックエンドとの通信層設計まで担当。先読みキャッシュでスワイプのラグを解消。",
    details: [
      "ホーム画面・サインアップ/ログイン画面（初期実装・API接続）を実装。プロフィール画面はバグ修正・動作改善を担当",
      "GoバックエンドのREST APIをDart側から繋ぎ込む通信層を設計・実装（ホーム画面JSON送受信・マッチ作品取得、サインアップ/ログインエンドポイント接続）",
      "スワイプ先の画像を2枚先読みすることでスワイプ遅延を解消。デバイス解像度に応じたキャッシュサイズ指定でメモリ効率を改善",
      "GitHubのIssue・PRテンプレートを整備し、チームの運用フローを改善",
    ],
    githubUrl: "https://github.com/p2hacks2025/pre-12",
    officialUrl: "https://p2hacks2025.github.io/pregroup/",
  },
  {
    title: "企業インターンシップ（チームラボ株式会社）",
    date: "2025年9月1日〜9月10日",
    startDate: "2025-09-01",
    category: "インターン",
    techs: ["Flutter", "Dart"],
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
    slug: "touch-new",
    date: "2025年8〜9月",
    startDate: "2025-08-01",
    category: "ハッカソン",
    techs: ["React Native", "TypeScript", "Firebase", "Spotify API", "Google Maps API"],
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
    slug: "callaco",
    date: "2024年12月",
    startDate: "2024-12-01",
    category: "ハッカソン",
    techs: ["Flutter", "Dart"],
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
    slug: "dotto",
    date: "2024年4月〜現在",
    startDate: "2024-04-01",
    ongoing: true,
    category: "課外活動",
    techs: ["Flutter", "Dart", "Firebase", "Riverpod", "Go", "TypeSpec"],
    summary:
      "学内約75%が利用する実用アプリ。学食メニュー機能の実装・UI改善を担当し、2026年7月からはサーバーサイド（Go）の新機能設計にも取り組む。モブプロ中心のチーム開発を継続中。",
    details: [
      "学内約75%の学生が利用する大学支援アプリに参加し、継続的に機能開発を担当",
      "翌日の学食メニュー表示機能のUI設計からFirebase/Riverpodを用いたデータ取得ロジックまで一貫して実装",
      "コードレビュー・ペアプログラミングを通じたクリーンコード作成技術の向上",
      "モブプログラミング中心のチーム開発で 継続的に関与",
      "2026年7月〜：科目登録・時間割改善施策のサーバーサイド（Go）を担当。API・エラーレスポンス設計を含む仕様書を作成し、API定義（TypeSpec）の変更をPR中。実装は進行中",
      "全体の構成は、Flutterアプリ・Goのマイクロサービス（PostgreSQL）・TypeSpecで一元管理するAPI定義。API定義（OpenAPI）から各リポジトリのコードを生成して開発する",
    ],
    githubUrl: "https://github.com/fun-dotto/app",
    appStoreUrl: "https://apps.apple.com/jp/app/dotto/id6471561803",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=jp.ac.fun.dotto",
  },
];

// 開始日の昇順(古い→新しい)。配列の記述順に依存させない
export const experiences: Experience[] = [...entries].sort((a, b) =>
  a.startDate.localeCompare(b.startDate),
);
