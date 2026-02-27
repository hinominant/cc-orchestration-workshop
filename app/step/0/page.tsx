"use client";

import { useState } from "react";
import { StepLayout } from "@/components/StepLayout";
import { ChecklistItem } from "@/components/ChecklistItem";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";
import Link from "next/link";

const checks = [
  {
    id: "git",
    label: "Git がインストールされている",
    command: "git --version",
    expected: "git version 2.x.x と表示される",
  },
  {
    id: "node",
    label: "Node.js がインストールされている",
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
    label: "GitHub アカウントを持っている",
    command: "gh auth status",
    expected: "Logged in と表示される（またはブラウザでgithub.comにログインできる）",
  },
];

export default function Step0Page() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const allChecked = checks.every((check) => checkedItems[check.id]);

  const handleToggle = (id: string, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={0}
        title="環境確認 + スターターFork"
        duration="10分"
        nextStep={1}
      >
        <p className="text-slate-600 leading-relaxed">
          まず、講座で使用するツールが揃っているか確認し、
          スターターリポジトリをForkしてローカルに準備します。
        </p>

        <Callout type="info">
          ターミナルの開き方：Macの場合は「ターミナル」アプリ、Windowsの場合は「PowerShell」を使います。
        </Callout>

        {/* 環境チェック */}
        <h2 className="text-xl font-bold text-slate-900">環境チェック</h2>

        <div className="space-y-6">
          {checks.map((check) => (
            <div key={check.id}>
              <ChecklistItem
                onToggle={(checked) => handleToggle(check.id, checked)}
              >
                <span className="font-medium">{check.label}</span>
              </ChecklistItem>
              <CodeBlock code={check.command} language="bash" />
              <p className="mt-1 text-xs text-slate-500">
                期待される結果: {check.expected}
              </p>
            </div>
          ))}
        </div>

        <Callout type="warning">
          コマンドが見つからない（command not found）と表示される場合は、
          下記の「インストール手順」を参考にインストールしてください。
          それでも解決しない場合は、講師に声をかけてください。
        </Callout>

        {/* Windows向けインストール手順 */}
        <h2 className="text-xl font-bold text-slate-900">
          インストール手順（Windows）
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Windowsの場合は <strong>PowerShell</strong> を管理者権限で開いて、以下のコマンドを実行してください。
        </p>

        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="mb-2 font-semibold text-slate-900">
              Git for Windows
            </h3>
            <p className="mb-2 text-sm text-slate-600">
              Windowsには標準でGitが入っていないため、Git for Windowsをインストールします。
            </p>
            <CodeBlock code="winget install --id Git.Git -e --source winget" language="powershell" />
            <p className="mt-1 text-xs text-slate-500">
              WinGetが使えない場合は{" "}
              <a
                href="https://gitforwindows.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-primary-dark"
              >
                https://gitforwindows.org/
              </a>{" "}
              からインストーラをダウンロードしてください。
              インストール後、PowerShellを再起動してください。
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="mb-2 font-semibold text-slate-900">Node.js</h3>
            <CodeBlock code="winget install --id OpenJS.NodeJS.LTS -e --source winget" language="powershell" />
            <p className="mt-1 text-xs text-slate-500">
              WinGetが使えない場合は{" "}
              <a
                href="https://nodejs.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-primary-dark"
              >
                https://nodejs.org/
              </a>{" "}
              からLTS版をダウンロードしてください。
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="mb-2 font-semibold text-slate-900">
              Claude Code
            </h3>
            <CodeBlock code="npm install -g @anthropic-ai/claude-code" language="powershell" />
            <p className="mt-1 text-xs text-slate-500">
              Node.jsのインストール後に実行してください。
            </p>
          </div>
        </div>

        <Callout type="info">
          Macの場合は Homebrew（
          <code className="rounded bg-blue-100 px-1 py-0.5 text-xs font-mono">
            brew install git node
          </code>
          ）でインストールできます。
          Claude CodeはMac/共通で上記のnpmコマンドを使います。
        </Callout>

        {/* スターターリポジトリのFork */}
        <h2 className="text-xl font-bold text-slate-900">
          スターターリポジトリのFork
        </h2>
        <p className="text-slate-600 leading-relaxed">
          この講座では、エージェントチームが事前設定されたスターターリポジトリを使います。
          以下の手順でForkしてローカルに準備してください。
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="mb-2 font-semibold text-slate-900">
              1. スターターリポジトリにアクセス
            </h3>
            <p className="mb-2 text-sm text-slate-600">
              ブラウザで以下のURLを開きます。
            </p>
            <CodeBlock code="https://github.com/hinominant/cc-workshop-starter" language="text" />
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-slate-900">
              2. 「Fork」ボタンをクリック
            </h3>
            <p className="text-sm text-slate-600">
              ページ右上の「Fork」ボタンをクリックして、自分のアカウントにコピーします。
              設定はデフォルトのまま「Create fork」をクリックしてください。
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-slate-900">
              3. ローカルにClone
            </h3>
            <p className="mb-2 text-sm text-slate-600">
              「YOUR_NAME」を自分のGitHubユーザー名に置き換えてください。
            </p>
            <CodeBlock code="git clone https://github.com/YOUR_NAME/cc-workshop-starter.git" language="bash" />
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-slate-900">
              4. 依存パッケージをインストール
            </h3>
            <CodeBlock
              code={`cd cc-workshop-starter
npm install`}
              language="bash"
            />
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-slate-900">
              5. Claude Codeでプロジェクトを開く
            </h3>
            <CodeBlock code="claude" language="bash" />
            <p className="mt-2 text-sm text-slate-600">
              Claude Code が起動すれば準備完了です。
              次のSTEPでは、このプロジェクトに入っている「AIチームの設定」を見ていきます。
            </p>
          </div>
        </div>

        {/* 安全設定について */}
        <h2 className="text-xl font-bold text-slate-900">
          安全設定（自動で適用されます）
        </h2>
        <p className="text-slate-600 leading-relaxed">
          スターターリポジトリには、Claude Code の安全設定があらかじめ含まれています。
          以下の設定が自動で適用されるため、安心して作業を始められます。
        </p>

        <div className="space-y-4">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <h3 className="font-semibold text-red-800">サンドボックス（OS レベルの隔離）</h3>
            <p className="mt-2 text-sm text-red-700 leading-relaxed">
              Claude Code の動作環境を「隔離された箱」の中に閉じ込めます。
              ファイルシステムやネットワークへのアクセスが OS レベルで制限されるため、
              万が一の暴走でもパソコン全体に被害が及びません。
            </p>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <h3 className="font-semibold text-amber-800">3 層パーミッション設定（DCP 準拠）</h3>
            <p className="mt-2 text-sm text-amber-700 leading-relaxed">
              Claude Code の操作が危険度に応じて 3 段階に分類されています。
            </p>
            <ul className="mt-2 space-y-1 text-sm text-amber-700">
              <li>- <strong>自動許可</strong>: ファイルの読み取り、テスト実行など安全な操作</li>
              <li>- <strong>確認して実行</strong>: ファイル変更、削除系コマンドなど（何をするか表示されます）</li>
              <li>- <strong>絶対禁止</strong>: 管理者権限の実行、秘密情報へのアクセスなど</li>
            </ul>
          </div>
        </div>

        <Callout type="warning">
          Claude Code は必ずプロジェクトフォルダの中で起動してください。
          ホームディレクトリ（ ~ ）で起動すると、書類・SSH鍵・クラウドの認証情報など
          すべてのファイルにアクセスできる状態になり、事故のリスクが高まります。
          今回は cc-workshop-starter フォルダの中で起動するので問題ありません。
        </Callout>

        <Callout type="tip">
          Forkしたリポジトリには、CLAUDE.md や .claude/agents/ といったファイルが入っています。
          これらがAIチームの「設計図」です。次のSTEPで詳しく見ていきます。
        </Callout>

        <div className="mt-8 rounded-xl border-2 border-dashed border-slate-200 p-6 text-center">
          {allChecked ? (
            <div>
              <p className="text-lg font-semibold text-green-700">
                すべての環境確認が完了しました
              </p>
              <p className="mt-1 text-sm text-slate-500">
                スターターリポジトリもForkできたら、次のステップに進みましょう。
              </p>
              <Link
                href="/step/1"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
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
