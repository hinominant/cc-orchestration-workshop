"use client";

import { useState } from "react";
import { StepLayout } from "@/components/StepLayout";
import { ChecklistItem } from "@/components/ChecklistItem";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";
import Link from "next/link";

const checks = [
  {
    id: "node",
    label: "Node.js v18+ がインストールされている",
    command: "node -v",
    expected: "v18 以上が表示される",
  },
  {
    id: "claude",
    label: "Claude Code がインストールされている",
    command: "claude --version",
    expected: "バージョン番号が表示される",
  },
  {
    id: "github",
    label: "GitHub アカウントが準備できている",
    command: "gh auth status",
    expected: "Logged in と表示される",
  },
  {
    id: "fork",
    label: "中級スターターリポジトリを Fork & Clone した",
    command:
      "git clone https://github.com/YOUR_NAME/cc-workshop-intermediate-starter.git",
    expected: "ローカルにリポジトリがクローンされる",
  },
  {
    id: "install",
    label: "npm install が完了した",
    command: "cd cc-workshop-intermediate-starter && npm install",
    expected: "依存パッケージがインストールされる",
  },
  {
    id: "env",
    label: ".env を .env.example から作成した",
    command: "cp .env.example .env",
    expected: ".env ファイルが作成される",
  },
  {
    id: "slack",
    label: "Slack Webhook URL を設定した（テスト用でOK）",
    command: "",
    expected: ".env の SLACK_WEBHOOK_URL にURLが設定されている",
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
          中級編では「Event Orchestration Service（EOS）」を題材に、要求定義から設計・実装・運用まで一気通貫で学びます。
          初級編との違いを理解し、開発環境を整えましょう。
        </p>

        {/* 初級編との違い */}
        <h2 className="text-xl font-bold text-slate-900">初級編との違い</h2>
        <p className="text-slate-600 leading-relaxed">
          初級編では「AIチームに任せてサービスを公開する」体験がゴールでした。
          中級編では、それに加えて以下の要素が加わります。
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h3 className="font-semibold text-blue-800">初級編</h3>
            <ul className="mt-2 space-y-1 text-sm text-blue-700">
              <li>- 静的サイトの自動ビルド</li>
              <li>- CLAUDE.md による指示</li>
              <li>- Fork → Build → Deploy</li>
            </ul>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <h3 className="font-semibold text-amber-800">中級編（今回）</h3>
            <ul className="mt-2 space-y-1 text-sm text-amber-700">
              <li>- バックエンドサービスの設計・実装</li>
              <li>- 要求定義書の作成</li>
              <li>- 非機能要件（信頼性・観測性）</li>
              <li>- 運用設計（セキュリティ・監視）</li>
            </ul>
          </div>
        </div>

        <Callout type="info">
          中級編のゴールは「動くサービスを作る」だけでなく、「なぜその設計にしたのか」を説明できるようになることです。
          要求定義→設計→実装→運用の流れを体験します。
        </Callout>

        {/* シークレット管理ルール */}
        <h2 className="text-xl font-bold text-slate-900">シークレット管理のルール</h2>
        <p className="text-slate-600 leading-relaxed">
          中級編ではAPIキーやWebhook URLなどの秘密情報を扱います。
          以下のルールを必ず守ってください。
        </p>

        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              NG
            </span>
            <div>
              <p className="font-semibold text-red-800">
                コードに直接書かない
              </p>
              <p className="mt-1 text-sm text-red-600">
                APIキーやURLをソースコードに直書きすると、GitHubにpushした瞬間に全世界に公開されます。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              NG
            </span>
            <div>
              <p className="font-semibold text-red-800">
                .envファイルを共有しない
              </p>
              <p className="mt-1 text-sm text-red-600">
                .envは .gitignore に含まれています。Slackやメールで送るのも禁止です。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
              OK
            </span>
            <div>
              <p className="font-semibold text-green-800">
                環境変数（.env）経由で読み込む
              </p>
              <p className="mt-1 text-sm text-green-600">
                すべての秘密情報は .env ファイルに記述し、process.env 経由で読み込みます。
              </p>
            </div>
          </div>
        </div>

        <Callout type="warning">
          講座ではダミーのProviderキーとテスト用のSlack Webhook URLを使います。
          本番のAPIキーは絶対に使わないでください。
        </Callout>

        {/* サンドボックス環境 */}
        <h2 className="text-xl font-bold text-slate-900">サンドボックス環境のセットアップ</h2>
        <p className="text-slate-600 leading-relaxed">
          講座では安全なサンドボックス環境を使います。
          .env.example をコピーして .env を作成し、テスト用の値を設定してください。
        </p>

        <CodeBlock
          code={`# .env.example の内容
# Provider A（ダミー）
PROVIDER_A_SECRET=dummy-webhook-secret-for-workshop

# Slack通知（テスト用Webhook URL）
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/TEST/WEBHOOK

# ストレージ（ローカルファイル）
STORAGE_PATH=./data/events

# 環境
NODE_ENV=development`}
          language="bash"
          filename=".env.example"
        />

        <CodeBlock code="cp .env.example .env" language="bash" />

        <Callout type="tip">
          Slack Webhook URLの取得方法: Slackの「Incoming Webhooks」アプリから作成できます。
          テスト用チャンネルに向けたURLを使うと安全です。
          講師が用意したテスト用URLを使っても構いません。
        </Callout>

        {/* agent-orchestrator 確認 */}
        <h2 className="text-xl font-bold text-slate-900">agent-orchestrator の確認</h2>
        <p className="text-slate-600 leading-relaxed">
          中級スターターリポジトリには agent-orchestrator のエージェント定義が含まれています。
          Claude Codeを起動して、エージェントが認識されていることを確認しましょう。
        </p>

        <CodeBlock
          code={`cd cc-workshop-intermediate-starter
claude`}
          language="bash"
        />

        <p className="text-slate-600 leading-relaxed">
          Claude Codeが起動したら、以下のようにプロジェクト構成を確認します。
        </p>

        <CodeBlock
          code={`# Claude Code 内で実行
ls .claude/agents/`}
          language="bash"
        />

        <p className="text-slate-600 leading-relaxed">
          以下のエージェント定義ファイルが表示されれば準備完了です。
        </p>

        <CodeBlock
          code={`_framework.md   # フレームワークプロトコル
sherpa.md       # 要求分析・タスク分解
artisan.md      # フロントエンド/バックエンド実装
radar.md        # テスト・検証
sentinel.md     # セキュリティ監査`}
          language="text"
        />

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
                次のステップでは、EOSの要求定義書を書いていきます。
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
                {Object.values(checkedItems).filter(Boolean).length} / {checks.length} 完了
              </p>
            </div>
          )}
        </div>
      </StepLayout>
    </div>
  );
}
