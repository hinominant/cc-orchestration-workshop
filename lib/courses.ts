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
  subtitle: "Project 2 - 実サービス水準のオーケストレーション基盤",
  basePath: "/intermediate/step",
  topPath: "/intermediate",
  duration: "約5時間",
  color: "bg-intermediate",
  colorDark: "bg-intermediate-dark",
  colorLight: "bg-intermediate-light",
  steps: [
    { id: 0, title: "環境準備", duration: "15分", description: "中級用スターターの準備とSecrets管理ルールの確認" },
    { id: 1, title: "要求定義", duration: "20分", description: "ユースケース・非機能要件・運用設計を定義する" },
    { id: 2, title: "アーキテクチャ設計", duration: "30分", description: "コンポーネント構成とデータフローを設計する" },
    { id: 3, title: "Provider Adapter", duration: "45分", description: "Webhook受信とSlack通知のAdapter実装" },
    { id: 4, title: "Orchestration", duration: "60分", description: "agent-orchestratorへの接続とルール分岐" },
    { id: 5, title: "信頼性", duration: "45分", description: "冪等性・リトライ・Dead Letter Queue" },
    { id: 6, title: "観測性", duration: "30分", description: "構造化ログ・メトリクス・アラート" },
    { id: 7, title: "セキュリティ・運用", duration: "30分", description: "Secrets管理・権限分離・監査ログ・環境分離" },
    { id: 8, title: "発表/レビュー", duration: "20分", description: "成果発表とRubric評価・KPT振り返り" },
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
