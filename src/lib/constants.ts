import type { Device, Orientation, SlideLayout, Theme, ThemeId } from "./types";

// ---------- Canvas dimensions (design at largest required resolution) ----------
export const CANVAS: Record<Device, { w: number; h: number; wL?: number; hL?: number }> = {
  iphone:        { w: 1320, h: 2868 },
  // iPad：竖屏 13" 档；横屏为对调尺寸（App Store Connect 13" / 12.9" 横屏）
  ipad:          { w: 2064, h: 2752, wL: 2752, hL: 2064 },
  // Mac App Store：固定 16:10，设计档取最大接受分辨率
  mac:           { w: 2880, h: 1800 },
  android:       { w: 1080, h: 1920 },
  "android-7":   { w: 1200, h: 1920, wL: 1920, hL: 1200 },
  "android-10":  { w: 1600, h: 2560, wL: 2560, hL: 1600 },
  "feature-graphic": { w: 1024, h: 500 },
};

// ---------- Export sizes per device ----------
export type ExportSize = { label: string; w: number; h: number };

export const EXPORT_SIZES: Record<Device, ExportSize[]> = {
  iphone: [
    { label: '6.9"', w: 1320, h: 2868 },
    { label: '6.5"', w: 1284, h: 2778 },
    { label: '6.3"', w: 1206, h: 2622 },
    { label: '6.1"', w: 1125, h: 2436 },
  ],
  ipad: [
    { label: '13" iPad',       w: 2064, h: 2752 },
    { label: '12.9" iPad Pro', w: 2048, h: 2732 },
  ],
  // Mac：App Store Connect 接受的四档 16:10
  mac: [
    { label: "Mac 2880", w: 2880, h: 1800 },
    { label: "Mac 2560", w: 2560, h: 1600 },
    { label: "Mac 1440", w: 1440, h: 900 },
    { label: "Mac 1280", w: 1280, h: 800 },
  ],
  android:       [{ label: "Phone",          w: 1080, h: 1920 }],
  "android-7":   [{ label: '7" Portrait',    w: 1200, h: 1920 }],
  "android-10":  [{ label: '10" Portrait',   w: 1600, h: 2560 }],
  "feature-graphic": [{ label: "Feature Graphic", w: 1024, h: 500 }],
};

// Landscape sizes（iPad + Android 平板）
export const EXPORT_SIZES_LANDSCAPE: Partial<Record<Device, ExportSize[]>> = {
  ipad: [
    { label: '13" iPad Landscape', w: 2752, h: 2064 },
    { label: '12.9" iPad Pro Landscape', w: 2732, h: 2048 },
  ],
  "android-7":  [{ label: '7" Landscape',  w: 1920, h: 1200 }],
  "android-10": [{ label: '10" Landscape', w: 2560, h: 1600 }],
};

export function supportsLandscape(device: Device): boolean {
  return device in EXPORT_SIZES_LANDSCAPE;
}

export function getExportSizes(device: Device, orientation: Orientation): ExportSize[] {
  if (orientation === "landscape") {
    return EXPORT_SIZES_LANDSCAPE[device] || EXPORT_SIZES[device];
  }
  return EXPORT_SIZES[device];
}

// ---------- Frame aspect ratios ----------
export const MK_RATIO    = 1022 / 2082; // iPhone PNG mockup
export const TAB_P_RATIO = 0.667;        // tablet portrait
export const TAB_L_RATIO = 1.5;          // tablet landscape
export const IPAD_RATIO  = 0.770;        // iPad 竖屏（与 IPad 机框一致）
export const IPAD_L_RATIO = 1000 / 770;  // iPad 横屏（竖屏机框宽高对调）
/** MacBook 整机（含窄底座）宽高比，与 MacBook 机框组件一致 */
export const MACBOOK_RATIO = 16 / 10.8;
/** macOS 应用窗口（标题栏 + 内容区）宽高比，与 MacWindow 机框一致 */
export const MAC_WINDOW_RATIO = 16 / 10.2;

// iPhone mockup screen overlay (pre-measured)
export const PHONE_SCREEN = {
  L: (52 / 1022) * 100,
  T: (46 / 2082) * 100,
  W: (918 / 1022) * 100,
  H: (1990 / 2082) * 100,
  RX: (126 / 918) * 100,
  RY: (126 / 1990) * 100,
};

// ---------- Width formula helpers ----------
export function phoneW(cW: number, cH: number, clamp = 0.84) {
  return Math.min(clamp, 0.72 * (cH / cW) * MK_RATIO);
}
export function phoneWSmall(cW: number, cH: number) {
  return phoneW(cW, cH, 0.66);
}
export function tabletPW(cW: number, cH: number, clamp = 0.80) {
  return Math.min(clamp, 0.72 * (cH / cW) * TAB_P_RATIO);
}
export function tabletLW(cW: number, cH: number, clamp = 0.62) {
  return Math.min(clamp, 0.75 * (cH / cW) * TAB_L_RATIO);
}
export function ipadW(cW: number, cH: number, clamp = 0.75) {
  return Math.min(clamp, 0.72 * (cH / cW) * IPAD_RATIO);
}

/** iPad 横屏机身宽度占比：略收窄，保证上方文案区可读（上文下图） */
export function ipadLW(cW: number, cH: number, clamp = 0.58) {
  return Math.min(clamp, 0.78 * (cH / cW) * IPAD_L_RATIO);
}

/** MacBook 机身宽度占比：16:10 画布上占满大部分宽度，上方留文案区 */
export function macW(cW: number, cH: number, clamp = 0.82) {
  return Math.min(clamp, 0.85 * (cH / cW) * MACBOOK_RATIO);
}

/** macOS 窗口宽度占比：略宽于 MacBook，突出窗口广告构图 */
export function macWindowW(cW: number, cH: number, clamp = 0.78) {
  return Math.min(clamp, 0.82 * (cH / cW) * MAC_WINDOW_RATIO);
}

/** wizju 品牌 Dark / Light 主题 id，供工具栏一键切换 */
export const WIZJU_THEME = {
  dark: "wizju-dark",
  light: "wizju-light",
} as const;

// ---------- Themes ----------
export const DEFAULT_THEME_ID: ThemeId = "clean-light";

export const THEMES: Record<string, Theme> = {
  "clean-light": {
    id: "clean-light",
    name: "Clean Light",
    bg: "#F6F1EA",
    bgAlt: "#171717",
    fg: "#171717",
    fgAlt: "#F6F1EA",
    accent: "#5B7CFA",
    muted: "#6B7280",
  },
  "dark-bold": {
    id: "dark-bold",
    name: "Dark Bold",
    bg: "#0B1020",
    bgAlt: "#F8FAFC",
    fg: "#F8FAFC",
    fgAlt: "#0B1020",
    accent: "#8B5CF6",
    muted: "#94A3B8",
  },
  "warm-editorial": {
    id: "warm-editorial",
    name: "Warm Editorial",
    bg: "#F7E8DA",
    bgAlt: "#2B1D17",
    fg: "#2B1D17",
    fgAlt: "#F7E8DA",
    accent: "#D97706",
    muted: "#7C5A47",
  },
  "ocean-fresh": {
    id: "ocean-fresh",
    name: "Ocean Fresh",
    bg: "#E0F2FE",
    bgAlt: "#0C4A6E",
    fg: "#0C4A6E",
    fgAlt: "#E0F2FE",
    accent: "#0284C7",
    muted: "#475569",
  },
  "bloom-roast": {
    id: "bloom-roast",
    name: "Bloom Roast",
    bg: "#F2ECE2",
    bgAlt: "#24352F",
    fg: "#1D2420",
    fgAlt: "#FFF7EA",
    accent: "#B8794A",
    muted: "#65736B",
  },
  // wizju 品牌主题：对齐旧截图工程 SemanticColors（LIVE 珊瑚红强调）
  "wizju-dark": {
    id: "wizju-dark",
    name: "wizju Dark",
    bg: "#000000",
    bgAlt: "#fafafa",
    fg: "#fafafa",
    fgAlt: "#292929",
    accent: "#E85C4A",
    muted: "#999999",
  },
  "wizju-light": {
    id: "wizju-light",
    name: "wizju Light",
    bg: "#fafafa",
    bgAlt: "#000000",
    fg: "#292929",
    fgAlt: "#fafafa",
    accent: "#D95240",
    muted: "#7a7a7a",
  },
};

export function themeById(themeId: string | undefined): Theme {
  return THEMES[themeId || ""] || THEMES[DEFAULT_THEME_ID];
}

export function hasTheme(themeId: string | undefined): boolean {
  return !!themeId && !!THEMES[themeId];
}

/** 判断当前 themeId 是否属于浅色档（用于 Dark/Light 控件选中态） */
export function isLightThemeId(themeId: string | undefined): boolean {
  if (!themeId) return true;
  if (themeId === WIZJU_THEME.light) return true;
  if (themeId === WIZJU_THEME.dark) return false;
  const theme = THEMES[themeId];
  if (!theme) return true;
  // 以背景亮度粗判：红通道 >= 0x80 视为浅色
  const hex = theme.bg.replace("#", "");
  if (hex.length < 2) return true;
  const r = parseInt(hex.slice(0, 2), 16);
  return Number.isFinite(r) ? r >= 0x80 : true;
}

export const STORAGE_KEY = "app-store-screenshots:project:v1";
export const PROJECT_SCHEMA_VERSION = 2;

export const DEVICE_LABEL: Record<Device, string> = {
  iphone: "iPhone",
  ipad: "iPad",
  mac: "Mac",
  android: "Android Phone",
  "android-7": 'Android 7" Tablet',
  "android-10": 'Android 10" Tablet',
  "feature-graphic": "Feature Graphic",
};

// Friendly labels for slide layouts (used in dropdowns)
export const LAYOUT_LABEL: Record<SlideLayout, string> = {
  hero: "Hero",
  "device-bottom": "Device bottom",
  "device-top": "Device top",
  "two-devices": "Two devices",
  "no-device": "No device",
  "split-landscape": "Split (landscape)",
  "mac-window": "Mac window",
  "feature-graphic": "Feature graphic",
};

// Short description shown under each layout name
export const LAYOUT_HINT: Record<SlideLayout, string> = {
  hero: "Headline above, device at bottom",
  "device-bottom": "Headline top, device anchored below",
  "device-top": "Flipped — device on top",
  "two-devices": "Layered back + front phones",
  "no-device": "Big standalone headline",
  "split-landscape": "Caption left, device right",
  "mac-window": "Headline above, app window chrome",
  "feature-graphic": "1024×500 Play Store banner",
};
