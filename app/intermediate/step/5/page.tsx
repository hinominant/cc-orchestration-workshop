import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function IntermediateStep5Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={5}
        title="テストと監査"
        duration="40分"
        prevStep={4}
        nextStep={6}
        courseBase="/intermediate/step"
        courseLabel="中級"
        topHref="/intermediate"
        accentColor="bg-intermediate"
      >
        <p className="text-slate-600 leading-relaxed">
          動くだけでは不十分です。
          テスト2回実行と外部監査で品質を担保します。
          これが「とりあえず動く」と「安心して使える」の違いです。
        </p>

        {/* 品質ゲートの考え方 */}
        <h2 className="text-xl font-bold text-slate-900">品質ゲート（Quality Gate）とは</h2>
        <p className="text-slate-600 leading-relaxed">
          品質ゲートは「この基準を満たさないと完了と認めない」というチェックポイントです。
          今回のワークショップでは、3つのステップで品質を確認します。
        </p>

        <div className="my-6 space-y-3">
          <div className="flex items-center gap-4 rounded-lg border border-blue-300 bg-blue-50 p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
              1
            </span>
            <div>
              <p className="font-semibold text-slate-900">テストを2回実行する（安定性確認）</p>
              <p className="text-sm text-slate-600">1回だけでなく2回実行して、安定して通ることを確認します</p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </div>

          <div className="flex items-center gap-4 rounded-lg border border-amber-300 bg-amber-50 p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
              2
            </span>
            <div>
              <p className="font-semibold text-slate-900">外部監査（Sentinel）を実行する</p>
              <p className="text-sm text-slate-600">実装者とは別のエージェントがセキュリティ・設計をチェックします</p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </div>

          <div className="flex items-center gap-4 rounded-lg border border-green-300 bg-green-50 p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">
              3
            </span>
            <div>
              <p className="font-semibold text-slate-900">両方パスして初めて「完了」</p>
              <p className="text-sm text-slate-600">テスト2回パス + 監査パスで品質が担保されます</p>
            </div>
          </div>
        </div>

        {/* テスト2回実行 */}
        <h2 className="text-xl font-bold text-slate-900">テストを2回実行する</h2>

        <h3 className="text-lg font-semibold text-slate-900">なぜ2回？</h3>
        <p className="text-slate-600 leading-relaxed">
          1回目で通っても、2回目で失敗するテストがあります。
          これは「不安定なテスト」と呼ばれ、タイミングや順番に依存して結果が変わるものです。
          不安定なテストを放置すると、本番で予期しない障害の原因になります。
        </p>

        <div className="my-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
            <h3 className="font-semibold text-red-800">1回だけで判断</h3>
            <div className="mt-2 space-y-1 text-sm text-red-700">
              <p>1回目: 全テスト通過</p>
              <p>→ 「よし、完了！」</p>
              <p className="font-bold">リスク: 不安定なテストを見逃す</p>
            </div>
          </div>
          <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4">
            <h3 className="font-semibold text-green-800">2回実行で確認</h3>
            <div className="mt-2 space-y-1 text-sm text-green-700">
              <p>1回目: 全テスト通過</p>
              <p>2回目: 全テスト通過</p>
              <p className="font-bold">安心: 安定して動くことを確認</p>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-slate-900">Claude Code への指示</h3>
        <p className="text-slate-600 leading-relaxed">
          まず1回目のテストを実行し、結果を確認してから2回目を実行します。
        </p>

        <CodeBlock
          code={`テストを実行してください`}
          language="text"
          filename="1回目のテスト指示"
        />

        <p className="text-slate-600 leading-relaxed">
          1回目が全件パスしたら、2回目の指示を出します。
        </p>

        <CodeBlock
          code={`もう一度テストを実行してください`}
          language="text"
          filename="2回目のテスト指示"
        />

        <Callout type="warning">
          テスト1回だけで「通った！」と判断しないでください。
          不安定なテストは本番で障害の原因になります。
        </Callout>

        <h3 className="text-lg font-semibold text-slate-900">テストが失敗したら</h3>
        <p className="text-slate-600 leading-relaxed">
          テストが失敗しても、あなたがコードを直す必要はありません。
          Claude Code に修正を依頼するだけです。
        </p>

        <CodeBlock
          code={`テストが失敗しています。修正してからもう一度テストを実行してください`}
          language="text"
          filename="テスト失敗時の指示"
        />

        <p className="text-slate-600 leading-relaxed">
          Claude Code がエラー内容を分析して自動で修正し、テストを再実行してくれます。
          2回とも全件パスするまでこのサイクルを繰り返してください。
        </p>

        {/* 外部監査 */}
        <h2 className="text-xl font-bold text-slate-900">外部監査（Sentinel）を実行する</h2>
        <p className="text-slate-600 leading-relaxed">
          テストが2回パスしたら、次は外部監査です。
          外部監査は「自分の答案を他人に採点してもらう」ことと同じです。
          実装を担当したエージェント（Builder / Artisan）とは別のエージェント（Sentinel）が、
          第三者の目でコードをチェックします。
        </p>

        <Callout type="info">
          外部監査は「自分の答案を他人に採点してもらう」ことです。
          実装者が見落とした問題を第三者視点で発見します。
        </Callout>

        <h3 className="text-lg font-semibold text-slate-900">Sentinel がチェックすること</h3>
        <div className="my-6 space-y-3">
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-sm font-bold text-red-600">
                S
              </span>
              <div>
                <h4 className="font-semibold text-slate-900">セキュリティ</h4>
                <p className="mt-1 text-sm text-slate-600">
                  .env ファイルに秘密情報（パスワードやAPIキー）がハードコーディングされていないか。
                  危険な外部入力がそのまま使われていないか。
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-600">
                D
              </span>
              <div>
                <h4 className="font-semibold text-slate-900">設計整合性</h4>
                <p className="mt-1 text-sm text-slate-600">
                  要求定義書（docs/requirements.md）と要件定義書（docs/specifications.md）に書かれた機能がすべて実装されているか。
                  要件定義の仕様と実装が一致しているか。
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-sm font-bold text-amber-600">
                E
              </span>
              <div>
                <h4 className="font-semibold text-slate-900">エッジケース</h4>
                <p className="mt-1 text-sm text-slate-600">
                  通常ではありえない入力（空文字、超巨大データ、不正な形式など）に対して
                  適切にエラー処理されているか。
                </p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-slate-900">Claude Code への指示</h3>

        <CodeBlock
          code={`Sentinel エージェントで外部監査を実行してください。
docs/requirements.md と docs/specifications.md をベースに、
要求との整合性・セキュリティ・エッジケースをチェックしてください。`}
          language="text"
          filename="外部監査の指示"
        />

        {/* 監査で問題が見つかったら */}
        <h2 className="text-xl font-bold text-slate-900">監査で問題が見つかったら</h2>
        <p className="text-slate-600 leading-relaxed">
          監査で問題が見つかるのは正常です。
          むしろ、問題がゼロのほうが珍しいくらいです。
          問題が見つかったら以下のサイクルを回してください。
        </p>

        <div className="my-6 rounded-lg border border-slate-200 p-5">
          <h3 className="mb-4 font-semibold text-slate-900">修正 → 再テスト → 再監査のサイクル</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
                1
              </span>
              <p className="text-sm text-slate-700">監査結果を確認する（Claude Code が問題の一覧を教えてくれます）</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
                2
              </span>
              <p className="text-sm text-slate-700">「この問題を修正してください」と指示する</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
                3
              </span>
              <p className="text-sm text-slate-700">修正が完了したら、テストを2回実行する</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
                4
              </span>
              <p className="text-sm text-slate-700">テスト通過後、再度 Sentinel で外部監査を実行する</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
                5
              </span>
              <p className="text-sm text-slate-700">テスト2回パス + 監査パスで完了</p>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`この問題を修正してください。
修正後、テストを2回実行し、もう一度 Sentinel で docs/requirements.md と docs/specifications.md をベースに監査を実行してください。`}
          language="text"
          filename="問題発見時のまとめ指示"
        />

        <Callout type="tip">
          監査で問題が見つかるのは正常です。
          問題がゼロの方が珍しいくらいです。
          修正 → 再テスト → 再監査のサイクルを回しましょう。
        </Callout>

        {/* 完了基準 */}
        <h2 className="text-xl font-bold text-slate-900">完了基準</h2>
        <p className="text-slate-600 leading-relaxed">
          以下の3つを全て満たしたら、この STEP は完了です。
        </p>

        <div className="my-6 space-y-2">
          <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-green-500">
              <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <p className="text-sm font-medium text-green-800">テスト1回目: 全件パス</p>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-green-500">
              <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <p className="text-sm font-medium text-green-800">テスト2回目: 全件パス</p>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-green-500">
              <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <p className="text-sm font-medium text-green-800">外部監査（Sentinel）: パス（問題なし、または修正済み）</p>
          </div>
        </div>

        {/* まとめ */}
        <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-5">
          <h3 className="font-semibold text-amber-800">この STEP のまとめ</h3>
          <ul className="mt-2 space-y-2 text-sm text-amber-700">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              テストは2回実行して安定性を確認する
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              外部監査（Sentinel）で第三者視点のチェックを受ける
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              テスト2回パス + 監査パスで品質を担保する
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              問題が見つかったら「修正 → 再テスト → 再監査」のサイクルを回す
            </li>
          </ul>
        </div>
      </StepLayout>
    </div>
  );
}
