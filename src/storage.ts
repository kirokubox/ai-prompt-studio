import { ACTIVE_VIEW_STORAGE_KEY, STORAGE_KEY, initialData } from "./constants";
import { CATEGORIES, TARGET_AIS } from "./types";
import type { AppData, Category, PromptItem, Rating, TargetAi, View } from "./types";

export function isTargetAi(value: unknown): value is TargetAi {
  return typeof value === "string" && TARGET_AIS.includes(value as TargetAi);
}

export function isCategory(value: unknown): value is Category {
  return typeof value === "string" && CATEGORIES.includes(value as Category);
}

export function isRating(value: unknown): value is Rating {
  return value === null || value === 1 || value === 2 || value === 3 || value === 4 || value === 5;
}

export function normalizeImportedPrompt(value: unknown): PromptItem | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  if (
    typeof item.id !== "string" ||
    typeof item.title !== "string" ||
    !isTargetAi(item.targetAi) ||
    !isCategory(item.category) ||
    typeof item.body !== "string"
  ) {
    return null;
  }

  return {
    id: item.id,
    title: item.title,
    targetAi: item.targetAi,
    category: item.category,
    purpose: typeof item.purpose === "string" ? item.purpose : "",
    context: typeof item.context === "string" ? item.context : "",
    body: item.body,
    outputFormat: typeof item.outputFormat === "string" ? item.outputFormat : "",
    notes: typeof item.notes === "string" ? item.notes : "",
    resultMemo: typeof item.resultMemo === "string" ? item.resultMemo : "",
    rating: isRating(item.rating) ? item.rating : null,
    nextImproveMemo: typeof item.nextImproveMemo === "string" ? item.nextImproveMemo : "",
    createdAt: typeof item.createdAt === "string" ? item.createdAt : new Date().toISOString(),
    updatedAt: typeof item.updatedAt === "string" ? item.updatedAt : new Date().toISOString(),
  };
}

export function loadData(): AppData {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return initialData;

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return initialData;
    const data = parsed as Record<string, unknown>;
    if (!Array.isArray(data.prompts)) return initialData;

    return {
      prompts: data.prompts.map(normalizeImportedPrompt).filter((item): item is PromptItem => Boolean(item)),
      settings: { version: 1 },
    };
  } catch {
    return initialData;
  }
}

export function isView(value: unknown): value is View {
  return value === "create" || value === "list" || value === "settings";
}

export function loadActiveView(): View {
  const savedView = localStorage.getItem(ACTIVE_VIEW_STORAGE_KEY);
  return isView(savedView) ? savedView : "create";
}
