import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function EngineerStep6Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={6}
        title="テスト・品質管理"
        duration="30分"
        prevStep={5}
        nextStep={7}
        courseBase="/engineer/step"
        courseLabel="エンジニア"
        topHref="/engineer"
        accentColor="bg-engineer"
      >
        <p className="text-slate-600 leading-relaxed">
          エージェントチームを使った開発における品質管理の仕組みを学びます。
          テスト自動化、カバレッジ管理、外部監査の運用パターンを実践します。
        </p>

        {/* テスト戦略 */}
        <h2 className="text-xl font-bold text-slate-900">テスト戦略</h2>

        <p className="text-slate-600 leading-relaxed">
          エージェントチーム開発では「テストなしのコードは未完成」が鉄則です。
          Radar エージェントが品質を担保しますが、人間がチェックポイントを設計する必要があります。
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">単体テスト</h3>
            <p className="mt-1 text-sm text-slate-500">
              各関数・モジュールの動作検証。
              Artisan が実装後に Radar が追加。
            </p>
            <p className="mt-2 text-xs text-slate-400">例: 署名検証、ルーティング、冪等性チェック</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">統合テスト</h3>
            <p className="mt-1 text-sm text-slate-500">
              エンドポイント全体の動作検証。
              実際の HTTP リクエストをシミュレート。
            </p>
            <p className="mt-2 text-xs text-slate-400">例: Webhook受信→ルーティング→通知の一連の流れ</p>
          </div>
        </div>

        {/* Radar の QA スコアリング */}
        <h2 className="text-xl font-bold text-slate-900">QA スコアリング</h2>

        <p className="text-slate-600 leading-relaxed">
          Radar エージェントは8次元の加重ルーブリックでコード品質をスコアリングします。
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-2 pr-4 text-left font-semibold text-slate-900">項目</th>
                <th className="py-2 px-4 text-left font-semibold text-slate-900">重み</th>
                <th className="py-2 text-left font-semibold text-slate-900">チェック内容</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4">Functionality</td>
                <td className="py-2 px-4">20%</td>
                <td className="py-2">要求仕様通りに動作するか</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4">Test Coverage</td>
                <td className="py-2 px-4">15%</td>
                <td className="py-2">主要パスのテストカバレッジ</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4">Console Errors</td>
                <td className="py-2 px-4">15%</td>
                <td className="py-2">実行時エラーの有無</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4">Accessibility</td>
                <td className="py-2 px-4">15%</td>
                <td className="py-2">APIのエラーレスポンス設計</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4">Type Safety</td>
                <td className="py-2 px-4">10%</td>
                <td className="py-2">TypeScript strict mode 準拠</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4">Performance</td>
                <td className="py-2 px-4">10%</td>
                <td className="py-2">不要な計算・メモリリークの有無</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4">Error Handling</td>
                <td className="py-2 px-4">10%</td>
                <td className="py-2">エッジケースの考慮</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Code Quality</td>
                <td className="py-2 px-4">5%</td>
                <td className="py-2">命名・構造・可読性</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-center">
            <p className="font-bold text-green-800">PASS</p>
            <p className="text-sm text-green-700">70点以上</p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-center">
            <p className="font-bold text-amber-800">WARN</p>
            <p className="text-sm text-amber-700">50-69点</p>
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-center">
            <p className="font-bold text-red-800">FAIL</p>
            <p className="text-sm text-red-700">50点未満</p>
          </div>
        </div>

        {/* 外部監査（Sentinel） */}
        <h2 className="text-xl font-bold text-slate-900">外部監査（Sentinel）</h2>

        <p className="text-slate-600 leading-relaxed">
          テストとは別に、Sentinel による外部監査を実施します。
          Sentinel は要求定義書・要件定義書をベースに、
          実装が仕様を満たしているかをチェックします。
        </p>

        <CodeBlock
          code={`# 監査の実行指示

全ての実装が完了しました。
Sentinel に以下の観点で最終監査を実施してください：

1. OWASP Top 10 のセキュリティチェック
2. 要求仕様との整合性確認
3. エラーハンドリングの網羅性
4. 入力バリデーションの完全性
5. ログにPIIが含まれていないか`}
          language="text"
          filename="Claude Code への指示"
        />

        {/* 品質ゲート */}
        <h2 className="text-xl font-bold text-slate-900">品質ゲート</h2>

        <p className="text-slate-600 leading-relaxed">
          コミット・プッシュ前に以下の品質ゲートをすべてパスする必要があります。
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">1</span>
            <p className="text-sm text-slate-700"><strong>型チェック</strong>: <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">tsc --noEmit</code> がエラーなし</p>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">2</span>
            <p className="text-sm text-slate-700"><strong>テスト</strong>: <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">vitest run</code> が全パス</p>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">3</span>
            <p className="text-sm text-slate-700"><strong>セキュリティ監査</strong>: Sentinel チェックで Critical/High が 0 件</p>
          </div>
        </div>

        <CodeBlock
          code={`# 品質ゲートの一括実行
npm run audit  # vitest run && tsc --noEmit`}
          language="bash"
        />

        <Callout type="tip">
          実務では CI/CD パイプラインにこれらのチェックを組み込み、
          PR マージ条件として自動化するのがベストプラクティスです。
        </Callout>

        {/* 実践 */}
        <h2 className="text-xl font-bold text-slate-900">実践: STEP 5 の成果物を検証する</h2>

        <CodeBlock
          code={`STEP 5 で構築したサービスに対して以下を実行してください：

1. Radar にテストを追加・実行してもらう（QAスコア70点以上を目指す）
2. テストが全パスしたら、Sentinel にセキュリティ監査を依頼する
3. 指摘があれば Artisan に修正を依頼する
4. 最終的に npm run audit が通ることを確認する`}
          language="text"
          filename="Claude Code への指示"
        />
      </StepLayout>
    </div>
  );
}
