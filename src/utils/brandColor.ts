/**
 * 品牌色工具 —— 与 wizju-swiftUI `SemanticColors` 对齐，供截图营销层解析 hex / 构建 rgba 阴影。
 */

/** 将 #RRGGBB 转为 rgba 字符串，供 CSS 阴影与渐变使用 */
export function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) return `rgba(0,0,0,${alpha})`;
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/** 判断主题是否为深色底，用于阴影 / 光晕强度分级 */
export function isDarkThemeBg(bg: string): boolean {
  const hex = bg.replace("#", "");
  if (hex.length !== 6) return true;
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

/**
 * Hero 设备浮起投影：仅中性黑阴影，不含品牌色 rim。
 */
export function heroDeviceDropShadow(
  cW: number,
  dark: boolean,
  baseScale = 1242,
): string {
  const scale = cW / baseScale;
  const near = dark ? 0.46 : 0.14;
  const far = dark ? 0.32 : 0.09;
  return [
    `drop-shadow(0 ${28 * scale}px ${72 * scale}px rgba(0,0,0,${near}))`,
    `drop-shadow(0 ${10 * scale}px ${28 * scale}px rgba(0,0,0,${far}))`,
  ].join(" ");
}
