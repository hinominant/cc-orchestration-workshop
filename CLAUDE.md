# Claude Code Orchestration Workshop

非エンジニアが2時間で「AIに役割を与え → サービス設計 → コード生成 → GitHub push → Vercel公開」まで完走するチュートリアル実行システム。

## Project Overview

- **目的**: AIオーケストレーション（整理・批判・実行の3分業）を体験させる
- **対象**: 非エンジニア（Windows利用、コード未経験OK）
- **形式**: 社内標準カリキュラム（再現可能設計）
- **参加者**: 3名（初回パイロット）

## Technical Constraints

- Next.js Static Export（静的サイト）
- DB無し、API無し、フロントのみ
- フォームは外部連携しない
- Vercel Free Tier でデプロイ
- 理由: 成功確率を最大化するため

## ARIS Four Minds Evaluation (2026-02-24)

| Mind | 判定 | 要点 |
|------|------|------|
| Founder | PASS | 社長時間効率向上に寄与。Luna本体への影響なし |
| Vision | PASS | Luna Learning Hubの前段階。AI活用能力の底上げ基盤 |
| Execution | PASS | P1即着手。パイロット→改善サイクルで前進 |
| Audit | WARN | 3点の補強必須（下記） |

### Audit WARN 補強事項（実装必須）

1. **データ収集設計**: 事前スキル測定、つまずきポイント記録、1ヶ月後追跡
2. **失敗時の組織学習設計**: 複数ゴール設定（最低限/標準/理想）、振り返り会必須
3. **期限とマイルストーン**: 具体的日付とチェックポイント

## Workshop Structure (120min)

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

## Agent Team

| Agent | 役割 |
|-------|------|
| ARIS | Head - 四人格評価（完了） |
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

1. チュートリアルガイドサイト（Next.js）
2. オーケストレーション設計テンプレート
3. 講師デモ台本
4. 完成リポジトリ（fork用フォールバック）
5. 計測設計ドキュメント

## Business Context

- `.agents/LUNA_CONTEXT.md` - Luna ビジネス文脈
- `.agents/PROJECT.md` - 共有知識
