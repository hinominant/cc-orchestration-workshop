import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";

export default function IntermediateStep2Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={2}
        title="組織をつくる"
        duration="30分"
        prevStep={1}
        nextStep={3}
        courseBase="/intermediate/step"
        courseLabel="中級"
        topHref="/intermediate"
        accentColor="bg-intermediate"
      >
        <p className="text-slate-600 leading-relaxed">
          要求定義書ができたら、次は「誰が何をやるか」を決めます。
          ここで言う「誰」とは人間ではなく、AIエージェントのことです。
          アーキテクチャ設計ではなく、組織設計。チームの役割分担を決めましょう。
        </p>

        {/* エージェントチームの組織図 */}
        <h2 className="text-xl font-bold text-slate-900">
          エージェントチームの組織図
        </h2>
        <p className="text-slate-600 leading-relaxed">
          スターターリポジトリには、4つのエージェントが定義されています。
          あなたはプロジェクトオーナーとして、このチームに指示を出す立場です。
        </p>

        <ArchitectureDiagram />

        {/* 各エージェントの役割 */}
        <h2 className="text-xl font-bold text-slate-900">
          各エージェントの役割
        </h2>

        <div className="space-y-4">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
            <h3 className="font-semibold text-blue-800">
              Sherpa -- 要求を読んで計画を立てる参謀
            </h3>
            <p className="mt-2 text-sm text-blue-700 leading-relaxed">
              要求定義書を読み込み、「何をどの順番で作るか」の実装計画を立てます。
              大きなタスクを小さなタスクに分解するのが得意です。
              あなたが「何を作るか」を決めたら、Sherpa が「どう作るか」の道筋を示します。
            </p>
          </div>

          <div className="rounded-lg border border-purple-200 bg-purple-50 p-5">
            <h3 className="font-semibold text-purple-800">
              Builder / Artisan -- コードを書く実装者
            </h3>
            <p className="mt-2 text-sm text-purple-700 leading-relaxed">
              Sherpa の計画に沿って、実際にコードを書きます。
              TypeScript でバックエンドのロジックを実装し、テストコードも作成します。
              あなたがコードを書く必要はありません。
            </p>
          </div>

          <div className="rounded-lg border border-green-200 bg-green-50 p-5">
            <h3 className="font-semibold text-green-800">
              Radar -- テストを実行する検証者
            </h3>
            <p className="mt-2 text-sm text-green-700 leading-relaxed">
              実装が終わったら、テストを実行して動作を検証します。
              重要なのは、テストを最低2回実行すること。
              1回目で通っても、2回目で不安定なテスト（たまに落ちるテスト）が見つかることがあります。
            </p>
            <div className="mt-3 rounded-md bg-green-100 p-3">
              <p className="text-xs font-semibold text-green-800">
                なぜ2回実行するのか
              </p>
              <p className="mt-1 text-sm text-green-700">
                テストが1回通っただけでは「たまたま成功した」可能性があります。
                2回実行して両方通れば、信頼性が高いと判断できます。
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-red-200 bg-red-50 p-5">
            <h3 className="font-semibold text-red-800">
              Sentinel -- 第三者視点の監査役（必須）
            </h3>
            <p className="mt-2 text-sm text-red-700 leading-relaxed">
              コードを書いた人とは別の視点で、セキュリティ・設計の整合性・エッジケースをチェックします。
              「自分が書いたテストに自分で合格する」だけでは不十分です。
              第三者の監査が入ることで、見落としを防ぎます。
            </p>
            <div className="mt-3 rounded-md bg-red-100 p-3">
              <p className="text-xs font-semibold text-red-800">
                Sentinel がチェックすること
              </p>
              <ul className="mt-1 space-y-1 text-sm text-red-700">
                <li>- 秘密情報がコードに直書きされていないか</li>
                <li>- エラー処理が適切か（異常系を無視していないか）</li>
                <li>- 要求定義書との整合性が取れているか</li>
                <li>- テストでカバーできていないケースがないか</li>
              </ul>
            </div>
          </div>
        </div>

        <Callout type="warning">
          監査役（Sentinel）は必ずチームに入れてください。
          実装者だけのチームは「自分の答案を自分で採点する」のと同じです。
          第三者チェックがあるからこそ、品質が担保されます。
        </Callout>

        {/* 品質ゲート */}
        <h2 className="text-xl font-bold text-slate-900">
          品質ゲート（最重要ルール）
        </h2>
        <p className="text-slate-600 leading-relaxed">
          中級編で最も大事な概念です。
          「コードが動く」と「完了」は違います。以下の2つの条件を両方満たして初めて「完了」です。
        </p>

        <div className="rounded-xl border-2 border-slate-300 bg-white p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">
                1
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">
                  テストを最低2回実行して、両方パスする
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  1回目で通っても、2回目で不安定なテストが見つかることがある。
                  2回とも安定してパスすることを確認する。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white">
                2
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">
                  外部監査（Sentinel）で第三者チェックを通す
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  実装者とは別のエージェントが、セキュリティ・設計整合性・
                  エッジケースをチェックする。指摘があれば修正する。
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-slate-50 p-3 text-center">
            <p className="text-sm font-semibold text-slate-700">
              両方パスしないと「完了」にしない
            </p>
          </div>
        </div>

        {/* やること */}
        <h2 className="text-xl font-bold text-slate-900">
          このステップでやること
        </h2>

        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600">
                1
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">
                  .claude/agents/ の中身を確認する
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Claude Code で各エージェントの定義ファイルを読んでみましょう。
                  どんなルールで動くか、何が得意かが書いてあります。
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600">
                2
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">
                  各エージェントの役割を理解する
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  上の組織図を参考に、誰が何をやるかを把握します。
                  特に「Sentinel（監査役）」が必須であることを覚えておいてください。
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600">
                3
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">
                  CLAUDE.md に品質ゲートのルールを追記する
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  「テスト2回実行」「外部監査必須」のルールを CLAUDE.md に書き込むことで、
                  AIチーム全体がこのルールに従うようになります。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Claude Code への指示例 */}
        <h2 className="text-xl font-bold text-slate-900">
          Claude Code への指示例
        </h2>
        <p className="text-slate-600 leading-relaxed">
          Claude Code を起動して、以下のように指示を出しましょう。
        </p>

        <CodeBlock
          code={`CLAUDE.md を確認して、エージェントチームの構成を教えてください。

また、以下のルールを CLAUDE.md に追記してください:
- テストは最低2回実行して、両方パスすることを確認する
- 実装完了後、Sentinel（外部監査）を必ず通す
- テスト2回パス + 外部監査パスの両方を満たさないと「完了」にしない`}
          language="text"
          filename="Claude Code への指示例"
        />

        <Callout type="tip">
          CLAUDE.md を編集することで、エージェントの動き方を変えられます。
          初級編で体験した通りです。
          品質ゲートのルールをここに書いておけば、AIチームが自動的にルールを守ります。
        </Callout>

        <Callout type="info">
          組織が決まったら、次のステップでいよいよ Claude Code に実装を任せます。
          あなたの役割は「指示を出す」「品質を確認する」ことです。コードは書きません。
        </Callout>
      </StepLayout>
    </div>
  );
}
