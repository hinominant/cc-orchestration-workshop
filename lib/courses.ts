export interface Step {
  id: number;
  title: string;
  duration: string;
  description: string;
}

export interface Course {
  id: string;
  label: string;
  subtitle: string;
  basePath: string;
  topPath: string;
  duration: string;
  steps: Step[];
  color: string;
  colorDark: string;
  colorLight: string;
}

export const beginnerCourse: Course = {
  id: "beginner",
  label: "初級編",
  subtitle: "Project 1 - オーケストレーションの基本",
  basePath: "/step",
  topPath: "/",
  duration: "120分",
  color: "bg-primary",
  colorDark: "bg-primary-dark",
  colorLight: "bg-primary-light",
  steps: [
    { id: 0, title: "環境確認", duration: "10分", description: "ツール確認とスターターリポジトリのFork" },
    { id: 1, title: "しくみ理解", duration: "10分", description: "CLAUDE.mdとエージェント定義を理解する" },
    { id: 2, title: "講師デモ", duration: "15分", description: "エージェントチームが動く様子を見る" },
    { id: 3, title: "自動ビルド", duration: "40分", description: "アイデアを一言伝えてエージェントが自動ビルド" },
    { id: 4, title: "カスタマイズ", duration: "20分", description: "修正依頼とCLAUDE.md編集で出力を変える" },
    { id: 5, title: "GitHub push", duration: "10分", description: "コードをGitHubにアップロード" },
    { id: 6, title: "Vercel公開", duration: "10分", description: "サービスをインターネットに公開" },
    { id: 7, title: "振り返り", duration: "10分", description: "学びの整理と次のステップ" },
  ],
};

export const intermediateCourse: Course = {
  id: "intermediate",
  label: "中級編",
  subtitle: "Project 2 - 要求定義から開発・監査まで一気通貫",
  basePath: "/intermediate/step",
  topPath: "/intermediate",
  duration: "約5時間",
  color: "bg-intermediate",
  colorDark: "bg-intermediate-dark",
  colorLight: "bg-intermediate-light",
  steps: [
    { id: 0, title: "環境準備", duration: "15分", description: "Claude Code + agent-orchestrator のセットアップ" },
    { id: 1, title: "要求定義をつくる", duration: "40分", description: "AIと相談しながらLuna標準フォーマットで要求定義書を作る" },
    { id: 2, title: "組織をつくる", duration: "30分", description: "エージェントチームの組織図を設計する（監査役必須）" },
    { id: 3, title: "要求定義をぶち込む", duration: "20分", description: "Claude Codeに要求定義を渡して開発をスタートする" },
    { id: 4, title: "開発をすすめる", duration: "60分", description: "Claude Codeが実装、あなたは質問に答えて方向を調整" },
    { id: 5, title: "テストと監査", duration: "40分", description: "テスト2回実行 + 外部監査で品質を担保する" },
    { id: 6, title: "仕上げ", duration: "30分", description: "セキュリティ・運用の基本チェックと最終確認" },
    { id: 7, title: "デプロイ", duration: "20分", description: "動作確認とデモ準備" },
    { id: 8, title: "発表/レビュー", duration: "20分", description: "成果発表とKPT振り返り" },
  ],
};

export const allCourses = [beginnerCourse, intermediateCourse] as const;

export function getCourseByPath(pathname: string): Course | undefined {
  if (pathname.startsWith("/intermediate")) {
    return intermediateCourse;
  }
  if (pathname.startsWith("/step")) {
    return beginnerCourse;
  }
  return undefined;
}
