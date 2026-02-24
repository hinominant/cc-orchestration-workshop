import { StepLayout } from "@/components/StepLayout";
import { Callout } from "@/components/Callout";

export default function Step7Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={7}
        title="振り返り + ロードマップ"
        duration="10分"
        prevStep={6}
      >
        <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-6 sm:p-8">
          <p className="text-center text-2xl font-bold text-slate-800 sm:text-3xl">
            おめでとうございます
          </p>
          <p className="mt-2 text-center text-sm text-slate-600">
            AIチームに仕事を任せて、サービスを設計・構築・公開しました
          </p>
        </div>

        {/* KPT */}
        <h2 className="text-xl font-bold text-slate-900">KPT（振り返り）</h2>
        <p className="text-slate-600 leading-relaxed">
          この講座を振り返って、以下の3つの観点で考えてみましょう。
          正解はありません。感じたことを素直に書き出してみてください。
        </p>

        <div className="space-y-4">
          <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                K
              </span>
              <div>
                <h3 className="font-semibold text-blue-800">
                  Keep（良かったこと）
                </h3>
                <p className="mt-1 text-sm text-blue-600">
                  今日の講座で「これは良かった」「続けたい」と思ったことは何ですか？
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
                P
              </span>
              <div>
                <h3 className="font-semibold text-amber-800">
                  Problem（困ったこと）
                </h3>
                <p className="mt-1 text-sm text-amber-600">
                  うまくいかなかったこと、わかりにくかった部分はありますか？
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border-2 border-green-200 bg-green-50 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">
                T
              </span>
              <div>
                <h3 className="font-semibold text-green-800">
                  Try（次にやりたいこと）
                </h3>
                <p className="mt-1 text-sm text-green-600">
                  今日の学びを活かして、次に挑戦してみたいことは何ですか？
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 今日のまとめ */}
        <h2 className="text-xl font-bold text-slate-900">
          今日のまとめ: AIチームに仕事を任せる3つのポイント
        </h2>

        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-4">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
              1
            </span>
            <div>
              <p className="font-semibold text-blue-800">
                指示書（CLAUDE.md）で方向性を定義する
              </p>
              <p className="mt-1 text-sm text-blue-600">
                プロジェクトの目的、技術制約、デザインの好みを書いておくと、
                AIチームはその方針に沿って動きます。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg bg-purple-50 p-4">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white">
              2
            </span>
            <div>
              <p className="font-semibold text-purple-800">
                専門家（agents）に実行を任せる
              </p>
              <p className="mt-1 text-sm text-purple-600">
                計画はSherpa、実装はArtisan、検証はRadar。
                専門家に分業させることで、安定した品質が得られます。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg bg-green-50 p-4">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
              3
            </span>
            <div>
              <p className="font-semibold text-green-800">
                結果を確認し、指示を調整する
              </p>
              <p className="mt-1 text-sm text-green-600">
                修正依頼やCLAUDE.mdの編集で出力を変える。
                人間が方向を決め、AIチームが実行する。このサイクルが大事です。
              </p>
            </div>
          </div>
        </div>

        {/* カリキュラムロードマップ */}
        <h2 className="text-xl font-bold text-slate-900">カリキュラムロードマップ</h2>
        <p className="text-slate-600 leading-relaxed">
          今日の講座はここまでですが、学びはここからが本番です。
        </p>

        <div className="space-y-4">
          <div className="rounded-lg border-2 border-blue-300 bg-blue-50 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                1
              </span>
              <div>
                <h3 className="font-semibold text-blue-800">
                  本日: AIチームを「使う」体験
                </h3>
                <p className="mt-1 text-sm text-blue-600">
                  事前設定されたエージェントチームに仕事を任せ、サービスを公開しました。
                  CLAUDE.mdを編集して出力が変わることも体験しました。
                </p>
                <span className="mt-2 inline-block rounded-full bg-blue-200 px-3 py-0.5 text-xs font-semibold text-blue-800">
                  完了
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-300 text-sm font-bold text-white">
                2
              </span>
              <div>
                <h3 className="font-semibold text-slate-800">
                  次回（予定）: 自分で「エージェントを設計する」体験
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  .claude/agents/ に新しいエージェントを定義し、
                  自分の業務に特化したAIチームを設計します。
                </p>
                <span className="mt-2 inline-block rounded-full bg-slate-200 px-3 py-0.5 text-xs font-semibold text-slate-600">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-300 text-sm font-bold text-white">
                3
              </span>
              <div>
                <h3 className="font-semibold text-slate-800">
                  将来: 業務プロセスをAIチームで「自動化する」
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  定型業務やレポート作成など、日常の業務プロセスを
                  エージェントチームで自動化します。
                </p>
                <span className="mt-2 inline-block rounded-full bg-slate-200 px-3 py-0.5 text-xs font-semibold text-slate-600">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 次のアクション */}
        <h2 className="text-xl font-bold text-slate-900">今日からできること</h2>

        <div className="space-y-3">
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">
              作ったサービスを改善する
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Claude Codeに追加機能を依頼したり、デザインを変えてみましょう。
              CLAUDE.mdを編集して、出力の変化を試してみてください。
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">
              別のサービスを作ってみる
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              スターターリポジトリを再度Forkして、別のアイデアで
              エージェントチームに作ってもらいましょう。
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">
              URLを共有する
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Vercelで公開したURLを同僚や友人に共有してみましょう。
              「AIチームに作ってもらった」と説明してみてください。
            </p>
          </div>
        </div>

        <Callout type="tip">
          今日作ったサービスのURLを同僚や友人に共有してみましょう。
          「自分が指揮して、AIチームが作った」と言えるサービスがあることは、大きな自信になります。
        </Callout>
      </StepLayout>
    </div>
  );
}
