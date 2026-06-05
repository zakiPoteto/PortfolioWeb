# zakiPoteto | Portfolio

> ハッカソン・インターン・チーム開発の制作実績をまとめたポートフォリオWebサイト

[![CI](https://github.com/zakiPoteto/PortfolioWeb/actions/workflows/ci.yaml/badge.svg)](https://github.com/zakiPoteto/PortfolioWeb/actions/workflows/ci.yaml)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)

**[🔗 Live Demo](https://project-07kun.vercel.app)**

---

## Overview

山﨑壮馬（zakiPoteto）の制作実績ポートフォリオサイト。
ハッカソン受賞・企業インターン・長期チーム開発など5プロジェクトをカード形式で一覧し、モーダルで詳細確認できる構成。

## Screenshot

<!-- TODO: スクリーンショットを追加 -->
<!-- ![screenshot](public/screenshot.png) -->

## Features

- 制作実績カード一覧 + 詳細モーダル
- ハッカソン受賞バッジ（KDDI アジャイル賞 / 優秀賞）
- GitHub 統計連携（コントリビューション数・ストリーク・PR 数・公開リポジトリ数）
- App Store / Google Play リンク（実リリースアプリ「Dotto」）
- Framer Motion によるアニメーション
- レスポンシブデザイン（ダークテーマ固定）

## Tech Stack

| カテゴリ | 技術・バージョン |
|---|---|
| フレームワーク | Next.js 16 (App Router) |
| 言語 | TypeScript 5 |
| スタイリング | Tailwind CSS v4 |
| アニメーション | Framer Motion |
| アイコン | lucide-react, simple-icons |
| パッケージマネージャ | pnpm 11 |
| Node.js | 22 |

## Getting Started

**Prerequisites:** Node.js 22+, pnpm 11+

```bash
git clone https://github.com/zakiPoteto/PortfolioWeb.git
cd PortfolioWeb
pnpm install
pnpm dev
```

[http://localhost:3000](http://localhost:3000) で確認。

### Scripts

```bash
pnpm dev      # 開発サーバー起動
pnpm build    # 本番ビルド
pnpm start    # 本番サーバー起動
pnpm lint     # ESLint 実行
```

## Project Structure

```
src/
├── app/                   # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── api/github-stats/  # GitHub統計取得 API Route
├── components/            # UIコンポーネント
│   ├── HeroSection.tsx
│   ├── ExperiencesSection.tsx
│   ├── ExperienceCard.tsx
│   ├── ExperienceDetailModal.tsx
│   └── ...
├── data/
│   └── experiences.ts     # 制作実績データ定義
└── lib/
    └── categoryStyle.ts   # カテゴリスタイル定義
```

## CI

PR・main へのプッシュ時に GitHub Actions で自動実行：

| ステップ | 内容 |
|---|---|
| Lint | ESLint |
| Type check | `tsc --noEmit` |
| Build | `next build` |

## Author

**山﨑壮馬（zakiPoteto）**

公立はこだて未来大学 複雑系知能学科 3年 / 28卒予定

- GitHub: [@zakiPoteto](https://github.com/zakiPoteto)
