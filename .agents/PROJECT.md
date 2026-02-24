# Project Knowledge Base

> 全エージェントが参照する共有知識ファイル。

---

## Architecture Decisions

| Decision | Choice | Rationale | Date |
|----------|--------|-----------|------|
| フレームワーク | Next.js (Static Export) | Vercel Free Tierで無料公開可能、非エンジニアでも扱いやすい | 2026-02-24 |
| スタイリング | Tailwind CSS | CDN不要、ビルドに統合、クラスベースで理解しやすい | 2026-02-24 |
| DB | 無し | 成功確率最大化のため技術範囲を限定 | 2026-02-24 |
| API | 無し | 同上 | 2026-02-24 |
| デプロイ | Vercel Free Tier | GitHub連携でワンクリックデプロイ、無料 | 2026-02-24 |
| 認証 | 無し | 静的サイトで完結 | 2026-02-24 |
| Head Agent | ARIS | 四人格思考で講座コンセプトを評価。総合PASS（Audit WARN→補強済み） | 2026-02-24 |

---

## Domain Glossary

| Term | Definition | Notes |
|------|------------|-------|
| オーケストレーション | AIに役割を分担させて協調動作させること | 講座の核心概念 |
| 整理役 | 目的・ターゲット・提供価値を整理するAIの役割 | 3分業の1つ目 |
| 批判役 | 弱点・曖昧点・失敗リスクを指摘するAIの役割 | 3分業の2つ目 |
| 実行役 | MVP機能一覧を定義するAIの役割 | 3分業の3つ目 |
| STEP | チュートリアルの各段階（STEP0〜STEP7） | 120分を8段階に分割 |
| fork用フォールバック | 環境トラブル時に参加者がforkして使う完成リポジトリ | リスク対策 |

---

## Target Users

- 技術リテラシー: なし
- ターミナル: 初心者
- コード: 未経験OK
- OS: Windows 10/11
- 人数: 3名（初回パイロット）

---

## Known Gotchas

- **Windows環境**: Claude Code は WinGet or PowerShellスクリプトでインストール。npm install は非推奨
  - Discovered by: Research Agent
  - Impact: 事前準備手順に影響
- **Git Bash必須**: Windows版Claude CodeはGit Bashが必要
  - Discovered by: Research Agent
  - Impact: Git for Windowsインストールが前提条件
- **Node.js**: Claude Code自体には不要だが、Next.js開発には必要
  - Discovered by: Research Agent
  - Impact: 事前準備で明記が必要

---

## Success Criteria (KPI)

| 指標 | 基準 | 計測方法 |
|------|------|---------|
| 公開URL取得率 | 3/3名（100%） | 当日確認 |
| 環境トラブル | 0件 | 当日記録 |
| オーケストレーション理解 | 「AIに役割を与える」を説明できる | 振り返りで確認 |
| 1ヶ月後実務適用 | 1件以上 | フォローアップ |

---

## Activity Log

| Date | Agent | Action | Scope | Outcome |
|------|-------|--------|-------|---------|
| 2026-02-24 | ARIS | 四人格評価 | 講座コンセプト全体 | PASS (Audit WARN→補強設計追加) |
| 2026-02-24 | Sherpa | タスク分解 | 全成果物 | 完了（24ステップ / 5フェーズ） |
| 2026-02-24 | Artisan | Next.jsサイト構築 | 全ページ・コンポーネント | 完了（10ページ・8コンポーネント） |
| 2026-02-24 | Scribe | ドキュメント3点作成 | テンプレート・デモ台本・計測設計 | 完了 |
| 2026-02-24 | Radar | 品質検証 | ビルド・コード・コンテンツ・Static Export | 完了（3件修正: next.config, STEP0手順, 文字化け） |
| 2026-02-24 | Nexus | Vercelデプロイ | 本番環境 | 完了（https://cc-orchestration-workshop.vercel.app） |
| 2026-02-24 | Nexus | リポジトリ公開化 | fork用フォールバック | 完了（Public化 + README追記） |
| 2026-02-24 | Nexus | Notion同期 | リソースリンク追加 | 完了（公開URL・GitHubリンク・フォールバック案内） |
| 2026-02-24 | ARIS | 方向転換評価 | Agent Orchestrator導入コンセプト | PASS（Founder PASS / Vision・Execution・Audit WARN→補強設計追加） |
| 2026-02-24 | Artisan | スターターリポジトリ作成 | hinominant/cc-workshop-starter | 完了（CLAUDE.md + 3エージェント + Next.js基盤） |
| 2026-02-24 | Artisan | サイト全面リビルド | 全10ページ・2コンポーネント | 完了（Agent Orchestratorコンセプトに変更） |
| 2026-02-24 | Scribe | ドキュメント全面リビルド | デモ台本・計測設計・テンプレート | 完了（旧3役→新エージェントチーム） |

---

## Update Guidelines

**Every agent MUST update Activity Log after completing work.**

| Section | When to Update | Primary Agents |
|---------|----------------|----------------|
| Activity Log | After every task | ALL |
| Architecture Decisions | New tech choices | Artisan |
| Known Gotchas | Tricky issues | Artisan, Radar |
