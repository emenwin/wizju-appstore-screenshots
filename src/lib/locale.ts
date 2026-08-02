import type { LocalizedText } from "./types";

export const DEFAULT_LOCALE = "en";

// Read the value for `locale` from a localized field. Falls back to en, then to
// the first locale that has a non-empty value, then to empty string. Used by
// the canvas/preview/thumb so switching to a locale the user hasn't filled in
// shows the source copy instead of blanks.
export function pickText(field: LocalizedText | undefined, locale: string): string {
  if (!field) return "";
  const direct = field[locale];
  if (direct && direct.length) return direct;
  const en = field[DEFAULT_LOCALE];
  if (en && en.length) return en;
  for (const k of Object.keys(field)) {
    const v = field[k];
    if (v && v.length) return v;
  }
  return "";
}

/**
 * 解析截图路径中的占位符。
 * - `{locale}` → 当前语言
 * - `{orientation}` → portrait / landscape（iPad 横竖屏分目录时使用）
 * Data URL 与空字符串原样返回。
 */
export function resolveScreenshot(
  path: string | undefined,
  locale: string,
  orientation?: string,
): string {
  if (!path) return "";
  if (path.startsWith("data:")) return path;
  let next = path;
  if (next.includes("{locale}")) {
    next = next.replace(/\{locale\}/g, locale);
  }
  if (orientation && next.includes("{orientation}")) {
    next = next.replace(/\{orientation\}/g, orientation);
  }
  return next;
}

// Convert legacy `string` headline/label fields to the per-locale shape. Safe
// to call on already-migrated data.
export function coerceLocalized(value: unknown): LocalizedText {
  if (typeof value === "string") return { [DEFAULT_LOCALE]: value };
  if (value && typeof value === "object") return value as LocalizedText;
  return {};
}

// Set or clear the value for `locale` on a localized field. Empty values delete
// the key so the persisted JSON stays free of "" placeholders.
export function writeLocalized(
  field: LocalizedText | undefined,
  locale: string,
  value: string,
): LocalizedText {
  const next: LocalizedText = { ...(field || {}) };
  if (value.length === 0) delete next[locale];
  else next[locale] = value;
  return next;
}
