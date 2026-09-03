export const TARGET_AIS = ["ChatGPT", "Codex", "その他"] as const;
export const CATEGORIES = ["アプリ開発", "資料整理", "エラー調査", "文章作成", "生活", "その他"] as const;
export const RATINGS = [
  { label: "未評価", value: "" },
  { label: "★1", value: "1" },
  { label: "★2", value: "2" },
  { label: "★3", value: "3" },
  { label: "★4", value: "4" },
  { label: "★5", value: "5" },
] as const;

export type TargetAi = (typeof TARGET_AIS)[number];
export type Category = (typeof CATEGORIES)[number];
export type Rating = null | 1 | 2 | 3 | 4 | 5;
export type View = "create" | "list" | "settings";
export type SortKey = "updatedAt" | "createdAt" | "rating";

export type PromptItem = {
  id: string;
  title: string;
  targetAi: TargetAi;
  category: Category;
  purpose: string;
  context: string;
  body: string;
  outputFormat: string;
  notes: string;
  resultMemo: string;
  rating: Rating;
  nextImproveMemo: string;
  createdAt: string;
  updatedAt: string;
};

export type AppData = {
  prompts: PromptItem[];
  settings: {
    version: 1;
  };
};

export type PromptDraft = Omit<PromptItem, "id" | "createdAt" | "updatedAt">;
