"use client";

import { useState } from "react";
import { StepLayout } from "@/components/StepLayout";
import { ChecklistItem } from "@/components/ChecklistItem";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";
import Link from "next/link";

const checks = [
  {
    id: "claude",
    label: "Claude Code がインストールされている",
    command: "claude --version",
    expected: "バージョン番号が表示される",
  },
  {
    id: "dir",
    label: "プロジェクトディレクトリを作成した",
    command: "mkdir my-email-service && cd my-email-service && npm init -y",
    expected: "package.json が生成される",
  },
  {
    id: "start",
    label: "Claude Code を起動した",
    command: "claude",
    expected: "Claude Code が起動する",
  },
  {
    id: "orchestrator",
    label: "agent-orchestrator を導入した",
    command: "",
    expected: "Claude Code に指示して導入済み",
  },
  {
    id: "agents",
    label: "エージェントファイルが存在する",
    command: "",
    expected:
      ".claude/agents/ に sherpa.md, artisan.md, radar.md, sentinel.md がある",
  },
];

export default function IntermediateStep0Page() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const allChecked = checks.every((check) => checkedItems[check.id]);

  const handleToggle = (id: string, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={0}
        title="環境準備"
        duration="15分"
        nextStep={1}
        courseBase="/intermediate/step"
        courseLabel="中級"
        topHref="/intermediate"
        accentColor="bg-intermediate"
      >
        <p className="text-slate-600 leading-relaxed">
          中級編の環境を整えましょう。
          初級編との違いを理解してから、プロジェクトの準備に入ります。
        </p>

        {/* 初級編との違い */}
        <h2 className="text-xl font-bold text-slate-900">初級編との違い</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h3 className="font-semibold text-blue-800">初級編</h3>
            <p className="mt-2 text-sm text-blue-700 leading-relaxed">
              AIチームに任せてサービスを公開する
            </p>
            <p className="mt-1 text-xs text-blue-600">
              Fork → AIが自動ビルド → デプロイ
            </p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <h3 className="font-semibold text-amber-800">中級編（今回）</h3>
            <p className="mt-2 text-sm text-amber-700 leading-relaxed">
              要求定義 → 組織設計 → 品質担保の
              プロジェクトマネジメント
            </p>
            <p className="mt-1 text-xs text-amber-600">
              何を作るか決める → 誰がやるか決める → 品質を確認する
            </p>
          </div>
        </div>

        <Callout type="info">
          中級編ではコードを1行も書きません。
          あなたの仕事は「何を作るか決めること」と「品質を確認すること」です。
          コードはすべて Claude Code が書きます。
        </Callout>

        {/* セットアップ手順 */}
        <h2 className="text-xl font-bold text-slate-900">
          セットアップ手順
        </h2>

        {/* Step 1: Claude Code 確認 */}
        <h3 className="text-lg font-semibold text-slate-800">
          1. Claude Code がインストールされているか確認
        </h3>
        <p className="text-slate-600 leading-relaxed">
          ターミナルで以下のコマンドを実行して、Claude Code がインストールされていることを確認します。
        </p>
        <CodeBlock code="claude --version" language="bash" />

        {/* Step 2: プロジェクトディレクトリ作成 */}
        <h3 className="text-lg font-semibold text-slate-800">
          2. 新しいプロジェクトディレクトリを作る
        </h3>
        <p className="text-slate-600 leading-relaxed">
          中級編では、空のプロジェクトからスタートします。
          ターミナルで以下のコマンドを実行して、プロジェクトディレクトリを作成します。
        </p>
        <CodeBlock
          code={`mkdir my-email-service && cd my-email-service && npm init -y`}
          language="bash"
        />

        {/* Step 3: Claude Code 起動 */}
        <h3 className="text-lg font-semibold text-slate-800">
          3. Claude Code を起動する
        </h3>
        <p className="text-slate-600 leading-relaxed">
          作成したディレクトリに移動して、Claude Code を起動します。
        </p>
        <CodeBlock
          code={`cd my-email-service
claude`}
          language="bash"
        />

        {/* Step 4: agent-orchestrator インストール */}
        <h3 className="text-lg font-semibold text-slate-800">
          4. agent-orchestrator を導入する
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Claude Code が起動したら、以下のように指示して agent-orchestrator を導入します。
          Claude Code が README を読んで、自動的にエージェントチームをセットアップしてくれます。
        </p>
        <CodeBlock
          code={`agent-orchestratorを導入してください。
https://github.com/hinominant/agent-orchestrator の README を読んで、
このプロジェクトにエージェントチームをセットアップしてください。`}
          language="text"
          filename="Claude Code への指示"
        />

        <Callout type="tip">
          Claude Code はURLを読み取って、自動的にファイルを生成します。
          「こういうファイルを作りますか？」と聞かれたら「はい」と答えてください。
        </Callout>

        {/* Step 5: エージェント確認 */}
        <h3 className="text-lg font-semibold text-slate-800">
          5. エージェントが導入されたことを確認する
        </h3>
        <p className="text-slate-600 leading-relaxed">
          以下のファイルが生成されていることを確認します。
        </p>

        <CodeBlock
          code={`.claude/agents/
  _framework.md   # チーム全体のルール
  sherpa.md       # 計画を立てる参謀
  artisan.md      # コードを書く実装者
  radar.md        # テストを実行する検証者
  sentinel.md     # セキュリティをチェックする監査役`}
          language="text"
          filename="確認するファイル"
        />

        <p className="text-slate-600 leading-relaxed">
          これらのファイルが「AIチームのメンバー定義」です。
          それぞれのエージェントがどんな役割を持つかは、STEP 2 で詳しく学びます。
        </p>

        {/* 環境チェックリスト */}
        <h2 className="text-xl font-bold text-slate-900">環境チェックリスト</h2>
        <p className="text-slate-600 leading-relaxed">
          以下の項目をすべて確認してください。
        </p>

        <div className="space-y-3">
          {checks.map((check) => (
            <div key={check.id}>
              <ChecklistItem
                onToggle={(checked) => handleToggle(check.id, checked)}
              >
                <span className="font-medium">{check.label}</span>
              </ChecklistItem>
              {check.command && (
                <CodeBlock code={check.command} language="bash" />
              )}
              {check.expected && (
                <p className="mt-1 text-xs text-slate-500">
                  期待される結果: {check.expected}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* 完了状態 */}
        <div className="mt-8 rounded-xl border-2 border-dashed border-slate-200 p-6 text-center">
          {allChecked ? (
            <div>
              <p className="text-lg font-semibold text-green-700">
                環境準備が完了しました
              </p>
              <p className="mt-1 text-sm text-slate-500">
                次のステップでは、「何を作るか」を決める要求定義書をつくります。
              </p>
              <Link
                href="/intermediate/step/1"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-intermediate px-5 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
              >
                STEP 1 へ進む
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            </div>
          ) : (
            <div>
              <p className="text-slate-500">
                上のチェックリストをすべて確認してください
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {Object.values(checkedItems).filter(Boolean).length} /{" "}
                {checks.length} 完了
              </p>
            </div>
          )}
        </div>
      </StepLayout>
    </div>
  );
}
