import { Locale, ScreenKind, Theme, ThemeId } from "../types";

// iPhone 默认画布尺寸：以 App Store Connect 6.5" 竖屏基准 1242 × 2688 为准，
// 与 IPHONE_SIZES 首项保持一致，保证默认预览与导出像素 1:1 对齐、不产生缩放糊化。
export const W = 1242;
export const H = 2688;
export const IPAD_W = 2064;
export const IPAD_H = 2752;
export const AW = 1080;
export const AH = 1920;
export const AT7P_W = 1200;
export const AT7P_H = 1920;
export const AT7L_W = 1920;
export const AT7L_H = 1200;
export const AT10P_W = 1600;
export const AT10P_H = 2560;
export const AT10L_W = 2560;
export const AT10L_H = 1600;
export const FGW = 1024;
export const FGH = 500;
export const MB_W = 2560;
export const MB_H = 1600;

// iPhone 导出尺寸：严格对齐 App Store Connect 6.5" / 6.7" 竖屏要求，
// 两个尺寸均属同一截图档位，二选一即可覆盖 6.5"–6.9" 设备展示位。
// - 1242 × 2688：6.5" 档（iPhone XS Max / 11 Pro Max）
// - 1284 × 2778：6.7" 档（iPhone 12 Pro Max / 13 Pro Max / 14 Plus）
export const IPHONE_SIZES = [
  { label: '6.5"', w: 1242, h: 2688 },
  { label: '6.7"', w: 1284, h: 2778 },
] as const;

export const IPAD_SIZES = [
  { label: '13" iPad', w: 2064, h: 2752 },
  { label: '12.9" iPad Pro', w: 2048, h: 2732 },
] as const;

export const ANDROID_SIZES = [{ label: "Phone", w: 1080, h: 1920 }] as const;
export const ANDROID_7P_SIZES = [
  { label: '7" Portrait', w: 1200, h: 1920 },
] as const;
export const ANDROID_7L_SIZES = [
  { label: '7" Landscape', w: 1920, h: 1200 },
] as const;
export const ANDROID_10P_SIZES = [
  { label: '10" Portrait', w: 1600, h: 2560 },
] as const;
export const ANDROID_10L_SIZES = [
  { label: '10" Landscape', w: 2560, h: 1600 },
] as const;
export const FG_SIZES = [
  { label: "Feature Graphic", w: 1024, h: 500 },
] as const;
export const MACOS_SIZES = [
  { label: "MacBook Retina", w: 2560, h: 1600 },
  { label: "MacBook 1x", w: 1280, h: 800 },
] as const;

export const LOCALES = ["en", "zh-Hans"] as const;

export const UI_TEXT = {
  title: "wizju · Screenshots",
  loading: "正在加载图片资源...",
  export: "导出",
  exportAll: "全部导出",
  exporting: "导出中...",
  localeName: { en: "EN", "zh-Hans": "简体中文" },
  themeName: { dark: "Dark", light: "Light" },
  devices: {
    iphone: "iPhone",
    ipad: "iPad",
    macos: "macOS",
    android: "Android",
    "android-7": 'Android 7"',
    "android-10": 'Android 10"',
    "feature-graphic": "Feature Graphic",
  },
  androidTablet: "Android Tab.",
  portrait: "Portrait",
  landscape: "Landscape",
} as const;

/*
 * 截图内容主题：仅保留 Geist Dark / Light 两套，取值 100% 来自 Geist 设计 token。
 * 字段名为语义角色（见 Theme 类型注释），值随主题切换。
 * - accent：Geist blue（替代旧橙色品牌色）
 * - signal：Geist teal；emby：Geist green
 * - canvas / canvasAlt：Geist 灰阶渐变，无任何品牌色
 */
export const THEMES: Record<ThemeId, Theme> = {
  dark: {
    bg: "#000000",
    fg: "#ededed",
    muted: "#a0a0a0",
    panel: "#ffffff14",
    panelStrong: "#ffffff1f",
    border: "#ffffff24",
    surface1: "#1c1c1c",
    surface2: "#232323",
    surface3: "#2c2c2c",
    frameBezel: "#383838",
    frameDetail: "#000000",
    frameShadow: "0 24px 70px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.45)",
    accent: "#47a8ff",
    signal: "#2dd4bf",
    emby: "#34d399",
    canvas: "linear-gradient(150deg, #000000 0%, #1c1c1c 50%, #2c2c2c 100%)",
    canvasAlt: "linear-gradient(145deg, #2c2c2c 0%, #1c1c1c 55%, #000000 100%)",
  },
  light: {
    bg: "#ffffff",
    fg: "#111111",
    muted: "#666666",
    panel: "#00000014",
    panelStrong: "#0000001f",
    border: "#00000024",
    surface1: "#f5f5f5",
    surface2: "#e8e8e8",
    surface3: "#d4d4d4",
    frameBezel: "#a1a1a1",
    frameDetail: "#0a0a0a",
    frameShadow: "0 24px 60px rgba(0,0,0,0.22), 0 8px 20px rgba(0,0,0,0.12)",
    accent: "#0070f3",
    signal: "#0d9488",
    emby: "#059669",
    canvas: "linear-gradient(150deg, #ffffff 0%, #f5f5f5 50%, #e8e8e8 100%)",
    canvasAlt: "linear-gradient(145deg, #e8e8e8 0%, #f5f5f5 55%, #ffffff 100%)",
  },
};

export const COPY: Record<
  Locale,
  Array<{
    id: string;
    label: string;
    headline: string[];
    note: string;
    screen: ScreenKind;
  }>
> = {
  en: [
    {
      id: "iptv-emby-hub",
      label: "MEDIA HUB",
      headline: ["IPTV and Emby,", "one home."],
      note: "M3U, Xtream Codes, and Emby sources stay organized together.",
      screen: "hub",
    },
    {
      id: "xtream-sections",
      label: "XTREAM",
      headline: ["Live, movies,", "series sorted."],
      note: "Browse Live TV, VOD, and Series without digging through mixed lists.",
      screen: "xtream",
    },
    {
      id: "continue-watching",
      label: "NEXT UP",
      headline: ["Pick up where", "you stopped."],
      note: "Recent items and progress are ready the moment you open wizju.",
      screen: "continue",
    },
    {
      id: "emby-library",
      label: "EMBY",
      headline: ["Your Emby library", "feels native."],
      note: "Hero banners, libraries, latest additions, and live TV in one flow.",
      screen: "emby",
    },
    {
      id: "favorites",
      label: "FAVORITES",
      headline: ["Favorites stay", "within reach."],
      note: "Keep channels and films close without rebuilding every source list.",
      screen: "favorites",
    },
    {
      id: "native-apple",
      label: "NATIVE",
      headline: ["Made for iPhone", "and Mac."],
      note: "A focused Apple-first experience for personal streams and libraries.",
      screen: "native",
    },
  ],
  "zh-Hans": [
    {
      id: "iptv-emby-hub",
      label: "媒体中枢",
      headline: ["IPTV 与 Emby，", "一处管理。"],
      note: "M3U、Xtream Codes、Emby 来源集中整理。",
      screen: "hub",
    },
    {
      id: "xtream-sections",
      label: "XTREAM",
      headline: ["直播电影剧集，", "清楚分区。"],
      note: "Live、VOD、Series 分开浏览，少翻找。",
      screen: "xtream",
    },
    {
      id: "continue-watching",
      label: "继续观看",
      headline: ["打开就接着看。"],
      note: "最近观看与播放进度回到首页。",
      screen: "continue",
    },
    {
      id: "emby-library",
      label: "EMBY",
      headline: ["你的 Emby 库，", "原生呈现。"],
      note: "海报、媒体库、最新添加和直播入口放在一起。",
      screen: "emby",
    },
    {
      id: "favorites",
      label: "收藏",
      headline: ["常看内容，", "随手打开。"],
      note: "频道与影片收藏后更快回到播放。",
      screen: "favorites",
    },
    {
      id: "native-apple",
      label: "原生体验",
      headline: ["为 iPhone", "和 Mac 打造。"],
      note: "面向个人 IPTV 与媒体库的 Apple 平台体验。",
      screen: "native",
    },
  ],
};

export const FEATURE_PILLS: Record<Locale, string[]> = {
  en: [
    "M3U / IPTV",
    "Xtream Codes",
    "Emby",
    "Continue Watching",
    "Favorites",
    "iPhone",
    "iPad",
    "Mac",
  ],
  "zh-Hans": [
    "M3U / IPTV",
    "Xtream Codes",
    "Emby",
    "继续观看",
    "收藏",
    "iPhone",
    "iPad",
    "Mac",
  ],
};

export const MK_W = 1022;
export const MK_H = 2082;
export const SC_L = (52 / MK_W) * 100;
export const SC_T = (46 / MK_H) * 100;
export const SC_W = (918 / MK_W) * 100;
export const SC_H = (1990 / MK_H) * 100;
export const SC_RX = (126 / 918) * 100;
export const SC_RY = (126 / 1990) * 100;

export const MK_RATIO = MK_W / MK_H;
export const TAB_P_RATIO = 0.667;
export const TAB_L_RATIO = 1.5;
export const IPAD_RATIO = 0.77;
export const MB_RATIO = MB_W / MB_H;
