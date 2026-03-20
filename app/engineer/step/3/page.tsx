import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function EngineerStep3Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={3}
        title="エージェント定義の設計"
        duration="30分"
        prevStep={2}
        nextStep={4}
        courseBase="/engineer/step"
        courseLabel="エンジニア"
        topHref="/engineer"
        accentColor="bg-engineer"
      >
        <p className="text-slate-600 leading-relaxed">
          エージェント定義ファイルの書き方と、プロジェクトに合わせた役割分担の設計を学びます。
        </p>

        {/* エージェントとは */}
        <h2 className="text-xl font-bold text-slate-900">エージェントとは</h2>

        <p className="text-slate-600 leading-relaxed">
          Claude Code のエージェントは <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">.claude/agents/</code> に置く
          Markdown ファイルです。各ファイルが1つの「専門家」を定義します。
          Claude Code が <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">Agent</code> ツールでサブプロセスを起動する際、
          このファイルがシステムプロンプトとして注入されます。
        </p>

        <CodeBlock
          code={`.claude/agents/
  _framework.md   # 全エージェント共通のルール
  sherpa.md       # 計画・タスク分解
  artisan.md      # コード実装
  radar.md        # テスト・品質検証
  sentinel.md     # セキュリティ監査`}
          language="text"
          filename="エージェント定義のディレクトリ構成"
        />

        {/* エージェントファイルの構造 */}
        <h2 className="text-xl font-bold text-slate-900">エージェントファイルの構造</h2>

        <CodeBlock
          code={`# Artisan - 実装エージェント

## Identity
あなたは Artisan、TypeScript バックエンド実装の専門家です。

## Responsibilities
- Sherpa が分解したタスクを受け取り、本番品質のコードを実装する
- TypeScript strict mode で型安全なコードを書く
- 実装完了後、Radar に検証を依頼する

## Rules
1. テストなしのコードは未完成。必ずテストを書くか、Radarに依頼する
2. 外部入力は必ずバリデーションする
3. エラーハンドリングは省略しない
4. コメントは「なぜ」を書く（「何を」はコードが語る）

## Tools
- Write / Edit: コード実装
- Bash: npm run dev / npm test の実行
- Read / Glob / Grep: 既存コードの調査

## Communication Protocol
- 実装完了時: 変更ファイル一覧 + テスト実行結果を報告
- 判断に迷う場合: Sherpa に相談（直接ユーザーに聞かない）
- セキュリティ懸念: Sentinel にフラグを立てる`}
          language="markdown"
          filename=".claude/agents/artisan.md の例"
        />

        <Callout type="tip">
          エージェント定義で最も重要なのは <strong>Responsibilities（責任範囲）</strong> と
          <strong>Rules（制約条件）</strong> の明確化です。
          曖昧な定義は、エージェントが想定外の行動をする原因になります。
        </Callout>

        {/* フレームワーク */}
        <h2 className="text-xl font-bold text-slate-900">フレームワーク（_framework.md）</h2>

        <p className="text-slate-600 leading-relaxed">
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">_framework.md</code> は
          全エージェントに共通するルールを定義します。
        </p>

        <CodeBlock
          code={`# Agent Orchestration Framework

## Communication Protocol
- Hub-spoke: すべての通信はオーケストレーター経由
- エージェント同士が直接通信しない

## Execution Rules
- 1つのタスクは15分以内で完了する粒度に分解する
- ファイルオーナーシップ: 同じファイルを複数エージェントが同時に書き換えない

## Quality Standards
- テストカバレッジ: 主要パスは全カバー
- 型安全: TypeScript strict mode
- セキュリティ: 外部入力は必ずバリデーション

## Guardrails
- L1（注意）: 軽微な問題、自動修正可能
- L2（警告）: 品質基準未達、修正必要
- L3（停止）: セキュリティ問題、即座に停止
- L4（禁止）: 秘密情報漏洩、絶対禁止`}
          language="markdown"
          filename=".claude/agents/_framework.md の例"
        />

        {/* 4体チーム構成 */}
        <h2 className="text-xl font-bold text-slate-900">基本チーム構成（4体）</h2>

        <div className="space-y-4">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200 text-sm font-bold text-blue-800">S</span>
              <div>
                <h3 className="font-bold text-blue-900">Sherpa（計画役）</h3>
                <p className="text-sm text-blue-700">複雑なタスクを15分以内のAtomic Stepに分解。実装はしない。</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-purple-200 bg-purple-50 p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-200 text-sm font-bold text-purple-800">A</span>
              <div>
                <h3 className="font-bold text-purple-900">Artisan（実装役）</h3>
                <p className="text-sm text-purple-700">Sherpaのステップに従いコードを実装。本番品質。</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-200 text-sm font-bold text-amber-800">R</span>
              <div>
                <h3 className="font-bold text-amber-900">Radar（検証役）</h3>
                <p className="text-sm text-amber-700">テスト追加・実行・カバレッジ分析。QAスコアリング。</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-red-200 bg-red-50 p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-200 text-sm font-bold text-red-800">Se</span>
              <div>
                <h3 className="font-bold text-red-900">Sentinel（監査役）</h3>
                <p className="text-sm text-red-700">セキュリティ静的分析。OWASP Top 10チェック。脆弱性の分類・報告。</p>
              </div>
            </div>
          </div>
        </div>

        <Callout type="info">
          この4体構成はあくまで基本形です。プロジェクトの規模や種類に応じて
          エージェントを追加・カスタマイズします（例: DBスキーマ専門、フロントエンド専門など）。
        </Callout>

        {/* 実践 */}
        <h2 className="text-xl font-bold text-slate-900">実践: エージェント定義を作成する</h2>

        <CodeBlock
          code={`以下のエージェント定義を作成してください：

1. .claude/agents/_framework.md - 共通ルール
2. .claude/agents/sherpa.md - タスク分解専門
3. .claude/agents/artisan.md - TypeScript実装専門
4. .claude/agents/radar.md - テスト・品質検証専門
5. .claude/agents/sentinel.md - セキュリティ監査専門

ルール:
- Hub-spoke 通信（エージェント同士は直接通信しない）
- 1タスク15分以内の粒度
- TypeScript strict mode
- テスト必須
- 日本語出力`}
          language="text"
          filename="Claude Code への指示"
        />

        <Callout type="tip">
          より実践的なアプローチとして、agent-orchestrator スターターを導入する方法もあります。
          次のステップでオーケストレーション構成を学ぶ際にこの方法も紹介します。
        </Callout>
      </StepLayout>
    </div>
  );
}
