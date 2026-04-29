import { Locale, ScreenKind } from "../types";

export const W = 1320;
export const H = 2868;
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

export const IPHONE_SIZES = [
  { label: "6.9\"", w: 1320, h: 2868 },
  { label: "6.5\"", w: 1284, h: 2778 },
  { label: "6.3\"", w: 1206, h: 2622 },
  { label: "6.1\"", w: 1125, h: 2436 },
] as const;

export const IPAD_SIZES = [
  { label: "13\" iPad", w: 2064, h: 2752 },
  { label: "12.9\" iPad Pro", w: 2048, h: 2732 },
] as const;

export const ANDROID_SIZES = [{ label: "Phone", w: 1080, h: 1920 }] as const;
export const ANDROID_7P_SIZES = [{ label: "7\" Portrait", w: 1200, h: 1920 }] as const;
export const ANDROID_7L_SIZES = [{ label: "7\" Landscape", w: 1920, h: 1200 }] as const;
export const ANDROID_10P_SIZES = [{ label: "10\" Portrait", w: 1600, h: 2560 }] as const;
export const ANDROID_10L_SIZES = [{ label: "10\" Landscape", w: 2560, h: 1600 }] as const;
export const FG_SIZES = [{ label: "Feature Graphic", w: 1024, h: 500 }] as const;
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
  devices: {
    iphone: "iPhone",
    ipad: "iPad",
    macos: "macOS",
    android: "Android",
    "android-7": "Android 7\"",
    "android-10": "Android 10\"",
    "feature-graphic": "Feature Graphic",
  },
  androidTablet: "Android Tab.",
  portrait: "Portrait",
  landscape: "Landscape",
} as const;

export const THEMES = {
  "media-hub": {
    bg: "#101214",
    fg: "#F7F3EA",
    muted: "#B8B0A3",
    accent: "#F56145",
    signal: "#38BDF8",
    emby: "#52D273",
    panel: "rgba(255,255,255,0.08)",
    panelStrong: "rgba(255,255,255,0.13)",
    border: "rgba(255,255,255,0.15)",
    canvas: "linear-gradient(150deg, #111315 0%, #20251E 48%, #351A14 100%)",
    canvasAlt: "linear-gradient(145deg, #F2EEE6 0%, #DCE7DE 55%, #F7C7B3 100%)",
  },
  "signal-dark": {
    bg: "#080C10",
    fg: "#F8FAFC",
    muted: "#A9B4C0",
    accent: "#F56145",
    signal: "#60A5FA",
    emby: "#4ADE80",
    panel: "rgba(255,255,255,0.07)",
    panelStrong: "rgba(255,255,255,0.12)",
    border: "rgba(255,255,255,0.14)",
    canvas: "linear-gradient(150deg, #080C10 0%, #111827 50%, #2A1612 100%)",
    canvasAlt: "linear-gradient(145deg, #EEF2F7 0%, #DDE7F0 58%, #FFD4C7 100%)",
  },
  "native-light": {
    bg: "#F5F0E8",
    fg: "#151515",
    muted: "#5E625F",
    accent: "#D84B32",
    signal: "#0E7490",
    emby: "#15803D",
    panel: "rgba(255,255,255,0.62)",
    panelStrong: "rgba(255,255,255,0.82)",
    border: "rgba(21,21,21,0.11)",
    canvas: "linear-gradient(150deg, #F6F1EA 0%, #E7F0E8 52%, #FFD2C2 100%)",
    canvasAlt: "linear-gradient(145deg, #121416 0%, #1F2721 58%, #351A14 100%)",
  },
} as const;

export const COPY: Record<Locale, Array<{
  id: string;
  label: string;
  headline: string[];
  note: string;
  screen: ScreenKind;
}>> = {
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
  en: ["M3U / IPTV", "Xtream Codes", "Emby", "Continue Watching", "Favorites", "iPhone", "iPad", "Mac"],
  "zh-Hans": ["M3U / IPTV", "Xtream Codes", "Emby", "继续观看", "收藏", "iPhone", "iPad", "Mac"],
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
