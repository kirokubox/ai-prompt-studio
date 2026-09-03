import type { PromptDraft, PromptItem, Rating } from "./types";

export function ratingLabel(rating: Rating) {
  return rating === null ? "未評価" : `★${rating}`;
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function makeWholePromptText(prompt: PromptDraft | PromptItem) {
  const sections = [
    ["# ", prompt.title],
    ["## 対象AI\n\n", prompt.targetAi],
    ["## カテゴリ\n\n", prompt.category],
    ["## 目的\n\n", prompt.purpose],
    ["## 前提情報\n\n", prompt.context],
    ["## 依頼本文\n\n", prompt.body],
    ["## 出力形式\n\n", prompt.outputFormat],
    ["## 注意点\n\n", prompt.notes],
  ];

  return sections
    .filter(([, value]) => String(value).trim().length > 0)
    .map(([heading, value], index) => (index === 0 ? `${heading}${value}` : `${heading}${value}`))
    .join("\n\n");
}
