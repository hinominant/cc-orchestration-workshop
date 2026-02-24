# Claude Code Orchestration Workshop

非エンジニアが2時間で「Agent Orchestratorを使い → サービス設計 → 自動ビルド → GitHub push → Vercel公開」まで完走するチュートリアル実行システム。

## Project Overview

- **目的**: Agent Orchestrator（エージェントチーム）を使ったAI協調開発を体験させる
- **対象**: 非エンジニア（Windows利用、コード未経験OK）
- **形式**: 社内標準カリキュラム（再現可能設計）
- **参加者**: 3名（初回パイロット）
- **核心コンセプト**: 手動プロンプトではなく、事前設定されたエージェントチームが自動で設計→実装→検証を行う

## Technical Constraints

- Next.js Static Export（静的サイト）
- DB無し、API無し、フロントのみ
- Vercel Free Tier でデプロイ
- 理由: 成功確率を最大化するため

## ARIS Four Minds Evaluation - 方向転換評価 (2026-02-24)

| Mind | 判定 | 要点 |
|------|------|------|
| Founder | PASS | 方向転換は創業思想と整合。社長時間効率の最大化と実践知の伝達を両立 |
| Vision | WARN | Luna経済圏への貢献経路が不明瞭。スケーラビリティ設計が必要 |
| Execution | WARN | 「学び」の設計が不足。ブラックボックス化を防ぐ段階的開示設計が必要 |
| Audit | WARN | 教育事業としての目的定義・効果測定設計・Luna経済圏との接続が未設計 |

### WARN 補強設計（実装必須）

1. **段階的開示**: STEP1で構造を見せ → STEP2で動きを見せ → STEP3で体験 → STEP4で改変（ブラックボックス化防止）
2. **Luna経済圏接続**: STEP7でカリキュラムロードマップを提示（本講座 → 応用 → 独自エージェント設計）
3. **効果測定**: 事前/事後/1ヶ月後の3点測定（理解度・活用度）
4. **複数ゴール**: 最低限（Fork→デプロイ）/ 標準（自動ビルド→デプロイ）/ 理想（カスタマイズ→デプロイ）

## Workshop Structure (120min)

| STEP | 内容 | 時間 | 段階的開示 |
|------|------|------|-----------|
| 0 | 環境確認 + スターターFork | 10分 | - |
| 1 | AIチームのしくみ | 10分 | 構造を見せる |
| 2 | 講師デモ | 15分 | 動きを見せる |
| 3 | 自動ビルド体験 | 40分 | 体験する |
| 4 | カスタマイズ | 20分 | 指示を変えてみる |
| 5 | GitHub push | 10分 | - |
| 6 | Vercel公開 | 10分 | - |
| 7 | 振り返り + ロードマップ | 10分 | 全体を理解する |

## Starter Repository

参加者がForkするスターターリポジトリ: `hinominant/cc-workshop-starter`

構成:
- `CLAUDE.md` - プロジェクト文脈（参加者のサービスアイデアに対応）
- `.claude/agents/sherpa.md` - タスク分解エージェント
- `.claude/agents/artisan.md` - フロントエンド実装エージェント
- `.claude/agents/radar.md` - テスト・検証エージェント
- `.claude/agents/_framework.md` - フレームワークプロトコル
- `package.json` + `next.config.ts` - Next.js Static Export基盤

## Agent Team（このリポジトリ用）

| Agent | 役割 |
|-------|------|
| ARIS | Head - 四人格評価（完了: 方向転換PASS） |
| Sherpa | タスク分解 |
| Scribe | チュートリアルコンテンツ作成 |
| Artisan | Next.js フロントエンド実装 |
| Radar | テスト・検証 |

## Key Rules

- Hub-spoke: all communication through orchestrator
- File ownership is law in parallel execution
- Guardrails L1-L4
- All outputs in Japanese
- Conventional Commits, no agent names in commits/PRs

## Deliverables

1. チュートリアルガイドサイト（Next.js） - 本リポジトリ
2. 参加者用スターターリポジトリ（Orchestrator搭載）
3. 講師デモ台本
4. 計測設計ドキュメント
5. Notionページ（参加者向け案内）

## Business Context

- `.agents/LUNA_CONTEXT.md` - Luna ビジネス文脈
- `.agents/PROJECT.md` - 共有知識
