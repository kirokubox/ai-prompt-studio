import type { AppData, PromptDraft } from "./types";

export const STORAGE_KEY = "yuki-ai-prompt-studio-data";
export const ACTIVE_VIEW_STORAGE_KEY = "yuki-ai-prompt-studio-active-view";

export const emptyDraft: PromptDraft = {
  title: "",
  targetAi: "ChatGPT",
  category: "アプリ開発",
  purpose: "",
  context: "",
  body: "",
  outputFormat: "",
  notes: "",
  resultMemo: "",
  rating: null,
  nextImproveMemo: "",
};

export const initialData: AppData = {
  prompts: [],
  settings: {
    version: 1,
  },
};
