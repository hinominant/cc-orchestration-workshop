# ENGINE_ROUTING Override — cc-orchestration-workshop

## プロジェクト特性

- **性質**: 社内研修システム。非エンジニア向けAI協調開発体験コンテンツ
- **技術**: Next.js Static Export（静的サイト）、TypeScript
- **ドメイン固有度**: 低（コンテンツサイト。複雑なビジネスロジックなし）
- **ミスの影響**: 低（研修コンテンツ。本番サービスへの影響なし）

## グローバルからの変更点

| タスク | グローバル | このプロジェクト |
|--------|-----------|----------------|
| Next.jsページ実装・UI | Codex PRIMARY | Codex o4-mini |
| コンテンツ・テキスト編集 | Gemini PRIMARY | Gemini（文章生成得意） |
| コンポーネント実装 | Codex PRIMARY | Codex o4-mini |
| 静的サイト設定 | Codex PRIMARY | Codex o4-mini |
| ドキュメント・README | Gemini | Gemini |
| アーキテクチャ変更 | Claude Code | Claude Code（変更頻度低） |

## 注意点

- 本番サービスへの影響なし → エスカレーション閾値は高め（Codex に多く任せる）
- コンテンツ品質はGeminiで十分

## 実質的なエンジン比率（目安）

| Engine | 比率 |
|--------|------|
| Claude Code | ~20% |
| Codex | ~50%（UI・実装が中心） |
| Gemini | ~30%（コンテンツ・ドキュメント多め） |
