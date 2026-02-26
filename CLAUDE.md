# Claude Code Orchestration Workshop

株式会社Luna 社内研修システム。非エンジニアがAIを"チーム"として動かす体験を通じて、AI協調開発の実践力を身につける。

## Project Overview

- **目的**: Agent Orchestrator（エージェントチーム）を使ったAI協調開発を体験させる
- **対象**: 非エンジニア（コード未経験OK）
- **形式**: 株式会社Luna 社内標準カリキュラム（再現可能設計）
- **核心コンセプト**: 手動プロンプトではなく、事前設定されたエージェントチームが自動で設計→実装→検証を行う

## Technical Constraints

- Next.js Static Export（静的サイト）
- DB無し、API無し、フロントのみ
- Vercel Free Tier でデプロイ
- 理由: 成功確率を最大化するため

## Course Structure

### 初級編（120分 / 8ステップ）

エージェントチームに仕事を任せ、サービスを設計・構築・公開する体験。

| STEP | 内容 | 時間 |
|------|------|------|
| 0 | 環境確認 + スターターFork | 10分 |
| 1 | AIチームのしくみ | 10分 |
| 2 | 講師デモ | 15分 |
| 3 | 自動ビルド体験 | 40分 |
| 4 | カスタマイズ | 20分 |
| 5 | GitHub push | 10分 |
| 6 | Vercel公開 | 10分 |
| 7 | 振り返り + ロードマップ | 10分 |

スターターリポジトリ: `hinominant/cc-workshop-starter`

### 中級編（約5時間 / 9ステップ）

要求定義から組織設計・開発・品質担保まで、一気通貫でサービスを構築する体験。
題材: シンプルなメール配信システム（配信リスト管理 / テンプレート管理 / 配信実行 / 配信履歴）

| STEP | 内容 | 時間 |
|------|------|------|
| 0 | 環境準備（Claude Code + agent-orchestrator 導入） | 15分 |
| 1 | 要求定義書・要件定義書を作る（外部AI使用） | 40分 |
| 2 | 組織をつくる（エージェントチーム設計） | 30分 |
| 3 | 要求定義をぶち込む（Claude Codeに渡す） | 20分 |
| 4 | 開発をすすめる（質問応答・方向調整） | 60分 |
| 5 | テストと監査（テスト2回 + 外部監査） | 40分 |
| 6 | 仕上げ（README・要求定義書・要件定義書整備） | 30分 |
| 7 | デプロイ（Vercel） | 20分 |
| 8 | 発表/レビュー（KPT振り返り） | 20分 |

#### 中級編の特徴

- **要求定義は外部AI（GPT / Gemini）で作成**: Claude Codeの日本語課題を回避
- **必須成果物**: README.md + 要求定義書（docs/requirements.md）+ 要件定義書（docs/specifications.md）
- **品質ゲート**: テスト2回実行 + Sentinel外部監査（要求定義・要件定義ベース）の両方パスで「完了」
- **セットアップ**: Claude Code起動 → agent-orchestrator導入 → 読み取らせる（Fork不要）

## Agent Team（このリポジトリ用）

| Agent | 役割 |
|-------|------|
| Sherpa | タスク分解 |
| Artisan | Next.js フロントエンド実装 |
| Radar | テスト・検証 |
| Sentinel | セキュリティ・設計監査 |

## Key Rules

- Hub-spoke: all communication through orchestrator
- File ownership is law in parallel execution
- Guardrails L1-L4
- All outputs in Japanese
- Conventional Commits, no agent names in commits/PRs

## Deliverables

1. チュートリアルガイドサイト（Next.js） - 本リポジトリ
2. 参加者用スターターリポジトリ（初級: `hinominant/cc-workshop-starter`）
3. 講師デモ台本
4. 計測設計ドキュメント
