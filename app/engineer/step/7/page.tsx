import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function EngineerStep7Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={7}
        title="チーム運用とスケーリング"
        duration="30分"
        prevStep={6}
        courseBase="/engineer/step"
        courseLabel="エンジニア"
        topHref="/engineer"
        accentColor="bg-engineer"
      >
        <p className="text-slate-600 leading-relaxed">
          エージェントチームを実プロジェクトに導入するためのパターン、
          スケーリング手法、ベストプラクティスを学びます。
        </p>

        {/* 導入パターン */}
        <h2 className="text-xl font-bold text-slate-900">実プロジェクトへの導入パターン</h2>

        <div className="space-y-4">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <h3 className="font-bold text-emerald-900">Phase 1: 個人利用（1-2週間）</h3>
            <p className="mt-2 text-sm text-emerald-700">
              まず1人のエンジニアが CLAUDE.md + settings.json を整備して日常業務で使う。
              バグ修正・小機能追加・テスト追加から始める。
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-emerald-200 px-2 py-0.5 text-xs text-emerald-800">CLAUDE.md</span>
              <span className="rounded-full bg-emerald-200 px-2 py-0.5 text-xs text-emerald-800">settings.json</span>
            </div>
          </div>

          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
            <h3 className="font-bold text-blue-900">Phase 2: エージェント導入（2-4週間）</h3>
            <p className="mt-2 text-sm text-blue-700">
              Sherpa + Artisan + Radar の3体構成を導入。
              タスク分解 → 実装 → テストのサイクルを回す。
              チームメンバーに共有し、フィードバックを収集。
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-200 px-2 py-0.5 text-xs text-blue-800">Sherpa</span>
              <span className="rounded-full bg-blue-200 px-2 py-0.5 text-xs text-blue-800">Artisan</span>
              <span className="rounded-full bg-blue-200 px-2 py-0.5 text-xs text-blue-800">Radar</span>
            </div>
          </div>

          <div className="rounded-xl border border-purple-200 bg-purple-50 p-5">
            <h3 className="font-bold text-purple-900">Phase 3: フルオーケストレーション（1-2ヶ月）</h3>
            <p className="mt-2 text-sm text-purple-700">
              Sentinel（監査役）を追加し、セキュリティチェックを組み込む。
              CI/CD との連携、Managed Settings による組織ポリシー適用。
              新規プロジェクトの立ち上げをエージェントチームで行う。
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-purple-200 px-2 py-0.5 text-xs text-purple-800">Sentinel</span>
              <span className="rounded-full bg-purple-200 px-2 py-0.5 text-xs text-purple-800">CI/CD連携</span>
              <span className="rounded-full bg-purple-200 px-2 py-0.5 text-xs text-purple-800">組織ポリシー</span>
            </div>
          </div>
        </div>

        {/* スケーリングの考え方 */}
        <h2 className="text-xl font-bold text-slate-900">スケーリングの考え方</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">エージェントの追加</h3>
            <p className="mt-1 text-sm text-slate-500">
              プロジェクトの成長に合わせてドメイン専門エージェントを追加。
              例: DB設計専門、API設計専門、パフォーマンス専門。
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">並列度の調整</h3>
            <p className="mt-1 text-sm text-slate-500">
              Rally パターンで最大4ブランチの並列実行。
              ファイルオーナーシップの設計が鍵。
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">知識の蓄積</h3>
            <p className="mt-1 text-sm text-slate-500">
              .agents/PROJECT.md にプロジェクト知識を蓄積。
              新しいエージェントセッションでも文脈を維持。
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">カスタムスキル</h3>
            <p className="mt-1 text-sm text-slate-500">
              繰り返しの操作をスキル（.claude/commands/）に定義。
              /deploy、/review、/audit などのショートカット。
            </p>
          </div>
        </div>

        {/* ベストプラクティス */}
        <h2 className="text-xl font-bold text-slate-900">ベストプラクティス</h2>

        <div className="space-y-3">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <h3 className="font-semibold text-emerald-800">CLAUDE.md はルーティングテーブル</h3>
            <p className="mt-1 text-sm text-emerald-700">
              知識の格納庫ではなく、「何をどこで見ればよいか」のポインタ集として設計する。
              膨大な情報を詰め込むとコンテキスト効率が下がる。
            </p>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <h3 className="font-semibold text-emerald-800">小さく始めて育てる</h3>
            <p className="mt-1 text-sm text-emerald-700">
              最初から完璧なエージェント構成を目指さない。
              2-3体で始めて、必要に応じて追加・調整する。
            </p>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <h3 className="font-semibold text-emerald-800">人間は方向性の指示と品質確認に集中</h3>
            <p className="mt-1 text-sm text-emerald-700">
              コードを書くのはAI。人間の仕事は「何を作るか」「品質は十分か」の判断。
              実装の詳細に介入しすぎない。
            </p>
          </div>

          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <h3 className="font-semibold text-red-800">アンチパターン: 過信</h3>
            <p className="mt-1 text-sm text-red-700">
              AIの出力を無条件に信頼しない。テスト・監査・レビューのチェックポイントは必須。
              特にセキュリティに関わる実装は人間の目で確認する。
            </p>
          </div>
        </div>

        {/* カスタムコマンドの例 */}
        <h2 className="text-xl font-bold text-slate-900">カスタムコマンドの作成</h2>

        <p className="text-slate-600 leading-relaxed">
          繰り返し使う操作は <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">.claude/commands/</code> に定義して
          スラッシュコマンドとして呼び出せます。
        </p>

        <CodeBlock
          code={`# .claude/commands/pr-review.md

このPRの変更内容をレビューしてください。

## チェック項目
1. **機能**: 要求仕様を満たしているか
2. **テスト**: 主要パスのテストがあるか
3. **セキュリティ**: 入力バリデーション、認証チェック
4. **型安全**: TypeScript strict mode 違反がないか
5. **エラー処理**: エッジケースの考慮

## 出力フォーマット
- 問題の重要度（Critical / High / Medium / Low）
- ファイル名と行番号
- 具体的な改善提案`}
          language="markdown"
          filename=".claude/commands/pr-review.md"
        />

        <CodeBlock
          code={`# Claude Code 内で実行
/pr-review`}
          language="text"
        />

        {/* 振り返り */}
        <h2 className="text-xl font-bold text-slate-900">エンジニア編の振り返り</h2>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="mb-3 font-bold text-slate-900">学んだこと</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">0</span>
              <p className="text-sm text-slate-700">Claude Code のアーキテクチャ（Agent Loop）</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">1</span>
              <p className="text-sm text-slate-700">CLAUDE.md の設計思想とスラッシュコマンド</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">2</span>
              <p className="text-sm text-slate-700">パーミッション・サンドボックス・Hooks のセキュリティ設計</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">3</span>
              <p className="text-sm text-slate-700">エージェント定義の書き方と役割設計</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">4</span>
              <p className="text-sm text-slate-700">Hub-spoke・並列実行・ファイルオーナーシップ</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">5</span>
              <p className="text-sm text-slate-700">エージェントチームでのバックエンド構築実践</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">6</span>
              <p className="text-sm text-slate-700">QAスコアリング・外部監査・品質ゲート</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">7</span>
              <p className="text-sm text-slate-700">実プロジェクトへの段階的導入パターン</p>
            </div>
          </div>
        </div>

        <Callout type="tip">
          <strong>次のステップ</strong>: 自分の実プロジェクトに Phase 1（個人利用）から始めてみてください。
          CLAUDE.md + settings.json を整備し、日常のバグ修正やテスト追加で Claude Code を使い始めるのが
          最もスムーズな導入方法です。
        </Callout>

        {/* KPT */}
        <h2 className="text-xl font-bold text-slate-900">KPT 振り返り</h2>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h3 className="font-semibold text-blue-800">Keep（良かったこと）</h3>
            <ul className="mt-2 space-y-1 text-sm text-blue-700">
              <li>- うまくいった点は？</li>
              <li>- 発見・気づきは？</li>
              <li>- 続けたいことは？</li>
            </ul>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <h3 className="font-semibold text-amber-800">Problem（課題）</h3>
            <ul className="mt-2 space-y-1 text-sm text-amber-700">
              <li>- 困った点は？</li>
              <li>- 想定と違った点は？</li>
              <li>- 改善したい点は？</li>
            </ul>
          </div>
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <h3 className="font-semibold text-green-800">Try（次に試すこと）</h3>
            <ul className="mt-2 space-y-1 text-sm text-green-700">
              <li>- 実プロジェクトでの導入計画は？</li>
              <li>- 追加で学びたいことは？</li>
              <li>- チームに展開する方法は？</li>
            </ul>
          </div>
        </div>
      </StepLayout>
    </div>
  );
}
