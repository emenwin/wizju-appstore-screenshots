import { Locale, ScreenKind, Theme, ThemeId, SlideCopy } from "../types";

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
 * 截图内容主题：与 wizju App `SemanticColors` 对齐的 dark / light 两套。
 *
 * 色彩角色：
 * - brand / accent：LIVE 珊瑚红（Sidebar「ju」、About 品牌色）— 营销主强调
 * - signal：IPTV / Live 语义青（Xtream、直播相关点缀）
 * - emby：Emby 媒体库语义绿
 * - canvas：幻灯片纯色背景（与 bg 一致）
 */
export const THEMES: Record<ThemeId, Theme> = {
  dark: {
    bg: "#000000",
    fg: "#fafafa",
    muted: "#999999",
    brand: "#E85C4A",
    accent: "#E85C4A",
    signal: "#2dd4bf",
    emby: "#34d399",
    panel: "#ffffff14",
    panelStrong: "#ffffff1f",
    border: "#ffffff24",
    surface1: "#1c1c1c",
    surface2: "#232323",
    surface3: "#2c2c2c",
    frameBezel: "#383838",
    frameDetail: "#000000",
    frameShadow: "0 24px 70px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.45)",
    canvas: "#000000",
  },
  light: {
    bg: "#fafafa",
    fg: "#292929",
    muted: "#7a7a7a",
    brand: "#D95240",
    accent: "#D95240",
    signal: "#0d9488",
    emby: "#059669",
    panel: "#00000014",
    panelStrong: "#0000001f",
    border: "#00000024",
    surface1: "#f5f5f5",
    surface2: "#e8e8e8",
    surface3: "#d4d4d4",
    frameBezel: "#a1a1a1",
    frameDetail: "#0a0a0a",
    frameShadow: "0 24px 60px rgba(0,0,0,0.22), 0 8px 20px rgba(0,0,0,0.12)",
    canvas: "#fafafa",
  },
};

export const COPY: Record<Locale, SlideCopy[]> = {
  en: [
    {
      id: "iptv-emby-hub",
      label: "MEDIA HUB",
      headline: ["IPTV and Emby,", "one home."],
      emphasisLine: 1,
      note: "M3U, Xtream, and Emby in one place.",
      screen: "hub",
    },
    {
      id: "xtream-sections",
      label: "XTREAM",
      headline: ["Live. Movies.", "Series sorted."],
      emphasisLine: 1,
      note: "Browse Live, VOD, and Series separately.",
      screen: "xtream",
    },
    {
      id: "continue-watching",
      label: "NEXT UP",
      headline: ["Pick up", "where you left."],
      emphasisLine: 0,
      note: "Recent items and progress on launch.",
      screen: "continue",
    },
    {
      id: "emby-library",
      label: "EMBY",
      headline: ["Your Emby", "library native."],
      emphasisLine: 1,
      note: "Libraries, latest, and live TV together.",
      screen: "emby",
    },
    {
      id: "favorites",
      label: "FAVORITES",
      headline: ["Favorites", "within reach."],
      emphasisLine: 0,
      note: "Channels and films stay one tap away.",
      screen: "favorites",
    },
    {
      id: "native-apple",
      label: "NATIVE",
      headline: ["Built for", "iPhone and Mac."],
      emphasisLine: 1,
      note: "Apple-first IPTV and media library experience.",
      screen: "native",
    },
  ],
  "zh-Hans": [
    {
      id: "iptv-emby-hub",
      label: "媒体中枢",
      headline: ["IPTV 与 Emby", "一处管理。"],
      emphasisLine: 1,
      note: "M3U、Xtream、Emby 来源集中整理。",
      screen: "hub",
    },
    {
      id: "xtream-sections",
      label: "XTREAM",
      headline: ["直播电影", "剧集分区。"],
      emphasisLine: 1,
      note: "Live、VOD、Series 分开浏览。",
      screen: "xtream",
    },
    {
      id: "continue-watching",
      label: "继续观看",
      headline: ["打开", "接着看。"],
      emphasisLine: 1,
      note: "最近观看与进度回到首页。",
      screen: "continue",
    },
    {
      id: "emby-library",
      label: "EMBY",
      headline: ["Emby 媒体库", "原生呈现。"],
      emphasisLine: 0,
      note: "媒体库、最新添加与直播入口合一。",
      screen: "emby",
    },
    {
      id: "favorites",
      label: "收藏",
      headline: ["常看内容", "随手打开。"],
      emphasisLine: 0,
      note: "频道与影片收藏后更快回到播放。",
      screen: "favorites",
    },
    {
      id: "native-apple",
      label: "原生体验",
      headline: ["为 iPhone", "和 Mac 打造。"],
      emphasisLine: 1,
      note: "面向个人 IPTV 与媒体库的 Apple 体验。",
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
