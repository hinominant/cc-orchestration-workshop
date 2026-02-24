# Claude Code オーケストレーション講座

非エンジニアが2時間で「AIに役割を与え → サービス設計 → コード生成 → GitHub push → Vercel公開」まで完走するチュートリアル実行システム。

## 概要

| 項目 | 内容 |
|------|------|
| 対象 | 非エンジニア（コード未経験OK） |
| 時間 | 120分（STEP0〜7） |
| 技術 | Next.js Static Export + Tailwind CSS |
| デプロイ | Vercel Free Tier |

## ワークショップの流れ

| STEP | 内容 | 時間 |
|------|------|------|
| 0 | 環境確認 | 10分 |
| 1 | 思想理解（AIはチーム） | 10分 |
| 2 | 講師デモ | 15分 |
| 3 | サービス設計（3役テンプレ） | 40分 |
| 4 | Claude Codeでコード生成 | 20分 |
| 5 | GitHub連携 | 10分 |
| 6 | Vercel公開 | 10分 |
| 7 | 振り返り | 10分 |

## 環境トラブル時のフォールバック手順

環境構築がうまくいかない場合、このリポジトリをforkして直接デプロイできます。

### 手順

1. **Forkする**
   - このページ右上の「Fork」ボタンをクリック
   - リポジトリ名はそのままでOK

2. **Vercelにインポート**
   - [Vercel](https://vercel.com) にログイン
   - 「Add New...」→「Project」をクリック
   - 先ほどForkしたリポジトリを選択
   - 「Deploy」をクリック

3. **公開URLを確認**
   - デプロイ完了後に表示されるURLをクリック
   - サイトが表示されれば成功

### 注意事項

- ForkはGitHubアカウントが必要です（事前準備で作成済みのはず）
- Vercelアカウントも必要です（GitHub連携でログイン）
- フォールバックを使った場合でも、STEP3のサービス設計は通常通り実施できます

## ローカル開発

```bash
npm install
npm run dev
```

http://localhost:3000 で確認できます。

## ビルド

```bash
npm run build
```

`out/` ディレクトリに静的ファイルが生成されます。

## ドキュメント

| ファイル | 内容 |
|---------|------|
| `public/templates/orchestration-design.md` | オーケストレーション設計テンプレート |
| `docs/instructor/demo-script.md` | 講師デモ台本（STEP2用） |
| `docs/measurement/measurement-plan.md` | 計測設計ドキュメント |
