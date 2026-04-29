"use client";

// ============================================================
// wizju · App Store / Google Play 截图生成器
//
// 这份页面把截图当成广告素材来生成：每一张只表达一个转化卖点。
// 当前叙事根据 Docs/ASO/ASO.md 调整为“个人 IPTV + Emby 媒体中枢”，
// 避免泛泛宣传万能播放器、全格式、HDR、NAS 等竞争拥挤且易夸大的能力。
// ============================================================

import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";

// ── 画布尺寸：按各商店最大常用尺寸设计，再缩放导出到其它规格 ──
const W = 1320;
const H = 2868;
const IPAD_W = 2064;
const IPAD_H = 2752;
const AW = 1080;
const AH = 1920;
const AT7P_W = 1200;
const AT7P_H = 1920;
const AT7L_W = 1920;
const AT7L_H = 1200;
const AT10P_W = 1600;
const AT10P_H = 2560;
const AT10L_W = 2560;
const AT10L_H = 1600;
const FGW = 1024;
const FGH = 500;
const MB_W = 2560;
const MB_H = 1600;

// ── 导出尺寸：文件名会包含具体尺寸，便于批量上传前核对 ─────────
const IPHONE_SIZES = [
  { label: "6.9\"", w: 1320, h: 2868 },
  { label: "6.5\"", w: 1284, h: 2778 },
  { label: "6.3\"", w: 1206, h: 2622 },
  { label: "6.1\"", w: 1125, h: 2436 },
] as const;

const IPAD_SIZES = [
  { label: "13\" iPad", w: 2064, h: 2752 },
  { label: "12.9\" iPad Pro", w: 2048, h: 2732 },
] as const;

const ANDROID_SIZES = [{ label: "Phone", w: 1080, h: 1920 }] as const;
const ANDROID_7P_SIZES = [{ label: "7\" Portrait", w: 1200, h: 1920 }] as const;
const ANDROID_7L_SIZES = [{ label: "7\" Landscape", w: 1920, h: 1200 }] as const;
const ANDROID_10P_SIZES = [{ label: "10\" Portrait", w: 1600, h: 2560 }] as const;
const ANDROID_10L_SIZES = [{ label: "10\" Landscape", w: 2560, h: 1600 }] as const;
const FG_SIZES = [{ label: "Feature Graphic", w: 1024, h: 500 }] as const;
const MACOS_SIZES = [
  { label: "MacBook Retina", w: 2560, h: 1600 },
  { label: "MacBook 1x", w: 1280, h: 800 },
] as const;

type Device = "iphone" | "ipad" | "macos" | "android" | "android-7" | "android-10" | "feature-graphic";
type Orientation = "portrait" | "landscape";
type Locale = (typeof LOCALES)[number];
type ThemeId = keyof typeof THEMES;
type ScreenKind = "hub" | "xtream" | "continue" | "emby" | "favorites" | "native";

const LOCALES = ["en", "zh-Hans"] as const;

// 所有界面文本集中在这里，避免 JSX 中散落硬编码文案。
const UI_TEXT = {
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

// 主题不只是一组颜色，也约束背景、边框和屏幕内 UI 的情绪。
const THEMES = {
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

// ASO 叙事：首图定位，随后依次解释 Xtream、继续观看、Emby、收藏和原生多端。
const COPY: Record<Locale, Array<{
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

const FEATURE_PILLS: Record<Locale, string[]> = {
  en: ["M3U / IPTV", "Xtream Codes", "Emby", "Continue Watching", "Favorites", "iPhone", "iPad", "Mac"],
  "zh-Hans": ["M3U / IPTV", "Xtream Codes", "Emby", "继续观看", "收藏", "iPhone", "iPad", "Mac"],
};

// ── iPhone mockup 预测量值：与 public/mockup.png 严格对齐 ────
const MK_W = 1022;
const MK_H = 2082;
const SC_L = (52 / MK_W) * 100;
const SC_T = (46 / MK_H) * 100;
const SC_W = (918 / MK_W) * 100;
const SC_H = (1990 / MK_H) * 100;
const SC_RX = (126 / 918) * 100;
const SC_RY = (126 / 1990) * 100;

const MK_RATIO = MK_W / MK_H;
const TAB_P_RATIO = 0.667;
const TAB_L_RATIO = 1.5;
const IPAD_RATIO = 0.77;
const MB_RATIO = MB_W / MB_H;

type WidthFn = (cW: number, cH: number, clamp?: number) => number;

function phoneW(cW: number, cH: number, clamp = 0.84): number {
  return Math.min(clamp, 0.72 * (cH / cW) * MK_RATIO);
}

function tabletPW(cW: number, cH: number, clamp = 0.8): number {
  return Math.min(clamp, 0.72 * (cH / cW) * TAB_P_RATIO);
}

function tabletLW(cW: number, cH: number, clamp = 0.62): number {
  return Math.min(clamp, 0.75 * (cH / cW) * TAB_L_RATIO);
}

function ipadW(cW: number, cH: number, clamp = 0.75): number {
  return Math.min(clamp, 0.72 * (cH / cW) * IPAD_RATIO);
}

function macbookW(cW: number, cH: number, clamp = 0.78): number {
  return Math.min(clamp, 0.72 * (cH / cW) * MB_RATIO);
}

// ── 图片预加载：html-to-image 导出时使用 data URI，减少黑屏概率 ──
const IMAGE_PATHS = ["/mockup.png", "/app-icon.png"];
const imageCache: Record<string, string> = {};

async function preloadAllImages(): Promise<void> {
  await Promise.all(
    IMAGE_PATHS.map(async (path) => {
      try {
        const resp = await fetch(path);
        const blob = await resp.blob();
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
        imageCache[path] = dataUrl;
      } catch {
        // 本地缺资源时保留原路径，方便开发时直接看到失败位置。
      }
    }),
  );
}

function img(path: string): string {
  return imageCache[path] || path;
}

type Theme = (typeof THEMES)[ThemeId];
type SlideCopy = (typeof COPY)[Locale][number];
type DeviceComp = (props: {
  alt: string;
  locale: Locale;
  screen: ScreenKind;
  style?: React.CSSProperties;
  theme: Theme;
}) => React.ReactElement;

// ── 屏幕内拟真 UI：没有真实截图时，仍然让每张图展示对应功能语境 ──
function MockScreen({
  kind,
  locale,
  theme,
}: {
  kind: ScreenKind;
  locale: Locale;
  theme: Theme;
}) {
  const screenText = {
    hub: locale === "en"
      ? { title: "Sources", tabs: ["M3U / IPTV", "Xtream Codes", "Emby"], chips: ["Live", "Movies", "Series"] }
      : { title: "来源", tabs: ["M3U / IPTV", "Xtream Codes", "Emby"], chips: ["直播", "电影", "剧集"] },
    xtream: locale === "en"
      ? { title: "Xtream", tabs: ["Live", "VOD", "Series"], chips: ["Sports", "News", "Cinema"] }
      : { title: "Xtream", tabs: ["直播", "点播", "剧集"], chips: ["体育", "新闻", "影院"] },
    continue: locale === "en"
      ? { title: "Continue", tabs: ["Next", "Recent", "Saved"], chips: ["58%", "24 min", "Episode 4"] }
      : { title: "继续观看", tabs: ["继续", "最近", "已收藏"], chips: ["58%", "24 分钟", "第 4 集"] },
    emby: locale === "en"
      ? { title: "Emby", tabs: ["Movies", "Shows", "Live TV"], chips: ["Latest", "Library", "Home"] }
      : { title: "Emby", tabs: ["电影", "剧集", "直播"], chips: ["最新", "媒体库", "首页"] },
    favorites: locale === "en"
      ? { title: "Favorites", tabs: ["Channels", "Films", "Series"], chips: ["Pinned", "Today", "HD"] }
      : { title: "收藏", tabs: ["频道", "影片", "剧集"], chips: ["置顶", "今日", "HD"] },
    native: locale === "en"
      ? { title: "wizju", tabs: ["iPhone", "iPad", "Mac"], chips: ["Native", "Sidebar", "Dark"] }
      : { title: "wizju", tabs: ["iPhone", "iPad", "Mac"], chips: ["原生", "侧边栏", "深色"] },
  }[kind];

  const cards = {
    hub: ["M3U", "XC", "Emby", "Live"],
    xtream: ["Live", "VOD", "Series", "Search"],
    continue: ["58%", "12%", "86%", "New"],
    emby: ["Movies", "Shows", "TV", "New"],
    favorites: ["★", "HD", "EPG", "4K"],
    native: ["iOS", "iPad", "macOS", "Sync"],
  }[kind];

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "linear-gradient(180deg, #121417 0%, #181B1E 48%, #0B0D0F 100%)",
      color: "#F8FAFC",
      overflow: "hidden",
      position: "relative",
      fontFamily: "var(--font-plus-jakarta), sans-serif",
    }}>
      {/* 顶部栏用来模拟真实 App 的信息架构，不展示操作说明。 */}
      <div style={{
        position: "absolute",
        inset: "4% 5% auto",
        height: "9%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontSize: "4.8cqw", fontWeight: 800, lineHeight: 1 }}>{screenText.title}</div>
          <div style={{ marginTop: "1.2cqw", color: "rgba(248,250,252,0.48)", fontSize: "2.1cqw", fontWeight: 600 }}>
            wizju
          </div>
        </div>
        <div style={{
          width: "9cqw",
          height: "9cqw",
          borderRadius: "2.2cqw",
          background: theme.accent,
          boxShadow: `0 1.4cqw 5cqw ${theme.accent}55`,
        }} />
      </div>

      <div style={{
        position: "absolute",
        top: "16%",
        left: "5%",
        right: "5%",
        display: "flex",
        gap: "2%",
      }}>
        {screenText.tabs.map((tab, index) => (
          <div key={tab} style={{
            flex: 1,
            textAlign: "center",
            borderRadius: "2.8cqw",
            padding: "2.2cqw 0",
            background: index === 0 ? theme.accent : "rgba(255,255,255,0.08)",
            color: index === 0 ? "#111315" : "rgba(248,250,252,0.76)",
            fontSize: "2.4cqw",
            fontWeight: 800,
          }}>
            {tab}
          </div>
        ))}
      </div>

      <div style={{
        position: "absolute",
        top: "26%",
        left: "5%",
        right: "5%",
        height: "20%",
        borderRadius: "5cqw",
        overflow: "hidden",
        background: `linear-gradient(135deg, ${theme.signal} 0%, ${theme.accent} 100%)`,
      }}>
        <div style={{
          position: "absolute",
          inset: "auto 5% 10%",
          display: "flex",
          gap: "2%",
          flexWrap: "wrap",
        }}>
          {screenText.chips.map((chip) => (
            <div key={chip} style={{
              borderRadius: "999px",
              padding: "1.2cqw 2.2cqw",
              background: "rgba(0,0,0,0.24)",
              color: "white",
              fontSize: "2.2cqw",
              fontWeight: 800,
            }}>
              {chip}
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position: "absolute",
        top: "50%",
        left: "5%",
        right: "5%",
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "3.2cqw",
      }}>
        {cards.map((card, index) => (
          <div key={`${card}-${index}`} style={{
            minHeight: "26cqw",
            borderRadius: "4cqw",
            background: index === 0 ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.08)",
            border: "0.24cqw solid rgba(255,255,255,0.08)",
            padding: "3.2cqw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
            <div style={{
              width: "100%",
              height: "10cqw",
              borderRadius: "2.4cqw",
              background: index % 2 === 0 ? `${theme.emby}55` : `${theme.signal}55`,
            }} />
            <div style={{ color: "#F8FAFC", fontSize: "3cqw", fontWeight: 800 }}>{card}</div>
            <div style={{
              width: index % 2 === 0 ? "72%" : "54%",
              height: "1.5cqw",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.2)",
            }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneFrame({ alt, locale, screen, style, theme }: Parameters<DeviceComp>[0]) {
  return (
    <div style={{ position: "relative", aspectRatio: `${MK_W}/${MK_H}`, ...style }}>
      <img src={img("/mockup.png")} alt="" style={{ display: "block", width: "100%", height: "100%" }} draggable={false} />
      <div style={{
        position: "absolute",
        zIndex: 10,
        overflow: "hidden",
        left: `${SC_L}%`,
        top: `${SC_T}%`,
        width: `${SC_W}%`,
        height: `${SC_H}%`,
        borderRadius: `${SC_RX}% / ${SC_RY}%`,
      }}>
        <div aria-label={alt} style={{ width: "100%", height: "100%", containerType: "inline-size" }}>
          <MockScreen kind={screen} locale={locale} theme={theme} />
        </div>
      </div>
    </div>
  );
}

function AndroidPhoneFrame({ alt, locale, screen, style, theme }: Parameters<DeviceComp>[0]) {
  return (
    <div style={{ position: "relative", aspectRatio: "9/19.5", ...style }}>
      <div style={{
        width: "100%",
        height: "100%",
        borderRadius: "8% / 4%",
        background: "linear-gradient(160deg, #2A2A2E 0%, #18181B 100%)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 20px 70px rgba(0,0,0,0.48)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: "1.5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "3%",
          height: "1.4%",
          borderRadius: "50%",
          background: "#0D0D0F",
          zIndex: 20,
        }} />
        <div style={{
          position: "absolute",
          left: "3.5%",
          top: "2%",
          width: "93%",
          height: "96%",
          borderRadius: "5.5% / 2.6%",
          overflow: "hidden",
          background: "#000",
          containerType: "inline-size",
        }}>
          <MockScreen kind={screen} locale={locale} theme={theme} />
        </div>
      </div>
    </div>
  );
}

function TabletPortraitFrame({ alt, locale, screen, style, theme }: Parameters<DeviceComp>[0]) {
  return (
    <div style={{ position: "relative", aspectRatio: "5/8", ...style }}>
      <div style={{
        width: "100%",
        height: "100%",
        borderRadius: "4.5% / 2.8%",
        background: "linear-gradient(160deg, #2A2A2E 0%, #18181B 100%)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 20px 80px rgba(0,0,0,0.5)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: "1.2%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1.4%",
          height: "0.88%",
          borderRadius: "50%",
          background: "#0D0D0F",
          zIndex: 20,
        }} />
        <div style={{
          position: "absolute",
          left: "3.5%",
          top: "2.2%",
          width: "93%",
          height: "95.6%",
          borderRadius: "2.5% / 1.6%",
          overflow: "hidden",
          background: "#000",
          containerType: "inline-size",
        }}>
          <MockScreen kind={screen} locale={locale} theme={theme} />
        </div>
      </div>
    </div>
  );
}

function TabletLandscapeFrame({ alt, locale, screen, style, theme }: Parameters<DeviceComp>[0]) {
  return (
    <div style={{ position: "relative", aspectRatio: "8/5", ...style }}>
      <div style={{
        width: "100%",
        height: "100%",
        borderRadius: "2.8% / 4.5%",
        background: "linear-gradient(160deg, #2A2A2E 0%, #18181B 100%)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 20px 80px rgba(0,0,0,0.5)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          left: "1.2%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "0.88%",
          height: "1.4%",
          borderRadius: "50%",
          background: "#0D0D0F",
          zIndex: 20,
        }} />
        <div style={{
          position: "absolute",
          left: "2.2%",
          top: "3.5%",
          width: "95.6%",
          height: "93%",
          borderRadius: "1.6% / 2.5%",
          overflow: "hidden",
          background: "#000",
          containerType: "inline-size",
        }}>
          <MockScreen kind={screen} locale={locale} theme={theme} />
        </div>
      </div>
    </div>
  );
}

function IPadFrame({ alt, locale, screen, style, theme }: Parameters<DeviceComp>[0]) {
  return (
    <div style={{ position: "relative", aspectRatio: "770/1000", ...style }}>
      <div style={{
        width: "100%",
        height: "100%",
        borderRadius: "5% / 3.6%",
        background: "linear-gradient(180deg, #2C2C2E 0%, #1C1C1E 100%)",
        position: "relative",
        overflow: "hidden",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1), 0 20px 80px rgba(0,0,0,0.5)",
      }}>
        <div style={{
          position: "absolute",
          top: "1.2%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "0.9%",
          height: "0.65%",
          borderRadius: "50%",
          background: "#111113",
          zIndex: 20,
        }} />
        <div style={{
          position: "absolute",
          left: "4%",
          top: "2.8%",
          width: "92%",
          height: "94.4%",
          borderRadius: "2.2% / 1.6%",
          overflow: "hidden",
          background: "#000",
          containerType: "inline-size",
        }}>
          <MockScreen kind={screen} locale={locale} theme={theme} />
        </div>
      </div>
    </div>
  );
}

function MacBookFrame({ alt, locale, screen, style, theme }: Parameters<DeviceComp>[0]) {
  return (
    <div style={{ position: "relative", ...style }}>
      <div style={{
        position: "relative",
        aspectRatio: "16/10",
        width: "100%",
        borderRadius: "2.5% / 4%",
        background: "linear-gradient(180deg, #CACACC 0%, #A9A9AC 100%)",
        padding: "2.2% 2.2% 1.8%",
        boxShadow: "0 14px 44px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.3)",
      }}>
        <div style={{
          width: "100%",
          height: "100%",
          borderRadius: "1% / 1.6%",
          overflow: "hidden",
          background: "#000",
          position: "relative",
          containerType: "inline-size",
        }}>
          <div aria-label={alt} style={{ width: "100%", height: "100%" }}>
            <MockScreen kind={screen} locale={locale} theme={theme} />
          </div>
        </div>
      </div>
      <div style={{
        width: "112%",
        marginLeft: "-6%",
        height: "3.5%",
        background: "linear-gradient(180deg, #B8B8BA 0%, #96969A 100%)",
        borderRadius: "0 0 8% 8% / 0 0 60% 60%",
        boxShadow: "0 8px 18px rgba(0,0,0,0.25)",
      }} />
    </div>
  );
}

// 背景由渐变、信号带和径向光晕组成，提供层次感而不遮挡设备和文案。
function SlideBackdrop({
  cW,
  theme,
  variant = "dark",
}: {
  cW: number;
  theme: Theme;
  variant?: "dark" | "light" | "split";
}) {
  const background = variant === "light" ? theme.canvasAlt : theme.canvas;
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background }} />
      {/* 右上角 accent 径向光晕，增加视觉层次 */}
      <div style={{
        position: "absolute",
        top: "-18%",
        right: "-18%",
        width: cW * 0.72,
        height: cW * 0.72,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${theme.accent}22 0%, ${theme.signal}10 40%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      {/* 左下角 emby 柔光晕 */}
      <div style={{
        position: "absolute",
        bottom: "-20%",
        left: "-15%",
        width: cW * 0.6,
        height: cW * 0.6,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${theme.emby}18 0%, transparent 65%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        top: "-12%",
        right: "-28%",
        width: cW * 0.9,
        height: cW * 0.34,
        transform: "rotate(-22deg)",
        background: `linear-gradient(90deg, ${theme.signal}00 0%, ${theme.signal}28 45%, ${theme.accent}38 100%)`,
      }} />
      <div style={{
        position: "absolute",
        bottom: "8%",
        left: "-20%",
        width: cW * 0.76,
        height: cW * 0.24,
        transform: "rotate(-18deg)",
        background: `linear-gradient(90deg, ${theme.emby}2E 0%, ${theme.accent}00 100%)`,
      }} />
      {variant === "split" && (
        <div style={{
          position: "absolute",
          inset: "0 0 0 55%",
          background: "rgba(255,255,255,0.08)",
          borderLeft: `1px solid ${theme.border}`,
        }} />
      )}
    </>
  );
}

function Caption({
  cW,
  copy,
  theme,
  align = "left",
  inverse = false,
}: {
  cW: number;
  copy: SlideCopy;
  theme: Theme;
  align?: "left" | "center" | "right";
  inverse?: boolean;
}) {
  const fg = inverse ? "#151515" : theme.fg;
  const muted = inverse ? "#4B4B4B" : theme.muted;
  return (
    <div style={{ position: "relative", zIndex: 30, textAlign: align }}>
      {/* 标签使用 pill 徽章样式，强化视觉层级 */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        fontSize: cW * 0.023,
        fontWeight: 800,
        color: theme.accent,
        letterSpacing: "0.07em",
        marginBottom: cW * 0.024,
        textTransform: "uppercase",
        background: `${theme.accent}1A`,
        border: `1px solid ${theme.accent}45`,
        borderRadius: cW * 0.007,
        padding: `${cW * 0.005}px ${cW * 0.016}px`,
      }}>
        {copy.label}
      </div>
      {copy.headline.map((line) => (
        <div key={line} style={{
          fontSize: cW * 0.092,
          fontWeight: 800,
          color: fg,
          lineHeight: 0.96,
          letterSpacing: "-0.01em",
        }}>
          {line}
        </div>
      ))}
      <div style={{
        marginTop: cW * 0.028,
        maxWidth: cW * 0.62,
        marginLeft: align === "center" ? "auto" : undefined,
        marginRight: align === "center" || align === "right" ? "auto" : undefined,
        color: muted,
        fontSize: cW * 0.028,
        fontWeight: 500,
        lineHeight: 1.45,
      }}>
        {copy.note}
      </div>
    </div>
  );
}

type SlideProps = { cW: number; cH: number; locale: Locale; theme: Theme };
type SlideDef = { id: string; component: (p: SlideProps) => React.ReactElement };

function makeHeroSlide(DC: DeviceComp, widthFn: WidthFn): SlideDef {
  return {
    id: COPY.en[0].id,
    component: ({ cW, cH, locale, theme }) => {
      const copy = COPY[locale][0];
      const fw = widthFn(cW, cH) * 100;
      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop cW={cW} theme={theme} />
          <div style={{ position: "absolute", top: "7%", left: "8%", right: "8%", zIndex: 30 }}>
            <img
              src={img("/app-icon.png")}
              alt="wizju"
              style={{
                width: cW * 0.13,
                height: cW * 0.13,
                borderRadius: cW * 0.028,
                marginBottom: cW * 0.04,
                boxShadow: `0 ${cW * 0.016}px ${cW * 0.05}px ${theme.accent}44`,
              }}
              draggable={false}
            />
            <Caption cW={cW} copy={copy} theme={theme} />
          </div>
          <DC
            alt={copy.label}
            locale={locale}
            screen={copy.screen}
            theme={theme}
            style={{
              position: "absolute",
              bottom: 0,
              width: `${fw}%`,
              left: "50%",
              transform: "translateX(-50%) translateY(8%)",
              zIndex: 20,
            }}
          />
        </div>
      );
    },
  };
}

function makeRightDeviceSlide(index: number, DC: DeviceComp, widthFn: WidthFn): SlideDef {
  return {
    id: COPY.en[index].id,
    component: ({ cW, cH, locale, theme }) => {
      const copy = COPY[locale][index];
      const fw = widthFn(cW, cH, 0.78) * 100;
      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop cW={cW} theme={theme} variant={index === 2 ? "split" : "dark"} />
          <div style={{ position: "absolute", top: "8%", left: "8%", width: "78%", zIndex: 30 }}>
            <Caption cW={cW} copy={copy} theme={theme} />
          </div>
          <DC
            alt={copy.label}
            locale={locale}
            screen={copy.screen}
            theme={theme}
            style={{
              position: "absolute",
              bottom: 0,
              right: index === 1 ? "-6%" : "-2%",
              width: `${fw}%`,
              transform: `translateY(${index === 1 ? "7%" : "5%"})`,
              zIndex: 20,
            }}
          />
        </div>
      );
    },
  };
}

function makeLeftDeviceSlide(index: number, DC: DeviceComp, widthFn: WidthFn): SlideDef {
  return {
    id: COPY.en[index].id,
    component: ({ cW, cH, locale, theme }) => {
      const copy = COPY[locale][index];
      const fw = widthFn(cW, cH, 0.76) * 100;
      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop cW={cW} theme={theme} variant="dark" />
          {/* 文案置于右上角，与左侧设备完全错开 */}
          <div style={{ position: "absolute", top: "7%", right: "7%", width: "56%", zIndex: 30 }}>
            <Caption cW={cW} copy={copy} theme={theme} align="right" />
          </div>
          <DC
            alt={copy.label}
            locale={locale}
            screen={copy.screen}
            theme={theme}
            style={{
              position: "absolute",
              bottom: 0,
              left: "-4%",
              width: `${fw}%`,
              transform: "translateY(6%)",
              zIndex: 20,
            }}
          />
        </div>
      );
    },
  };
}

function makePillSlide(): SlideDef {
  return {
    id: COPY.en[5].id,
    component: ({ cW, locale, theme }) => {
      const copy = COPY[locale][5];
      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop cW={cW} theme={theme} />
          <div style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 30,
            textAlign: "center",
            width: "84%",
          }}>
            <img
              src={img("/app-icon.png")}
              alt="wizju"
              style={{
                width: cW * 0.18,
                height: cW * 0.18,
                borderRadius: cW * 0.038,
                marginBottom: cW * 0.05,
                boxShadow: `0 ${cW * 0.02}px ${cW * 0.06}px ${theme.accent}44`,
              }}
              draggable={false}
            />
            <Caption cW={cW} copy={copy} theme={theme} align="center" />
          </div>
          <div style={{
            position: "absolute",
            left: "8%",
            right: "8%",
            bottom: "9%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: cW * 0.022,
            zIndex: 30,
          }}>
            {FEATURE_PILLS[locale].map((feature, index) => (
              <div key={feature} style={{
                borderRadius: cW * 0.018,
                padding: `${cW * 0.016}px ${cW * 0.032}px`,
                background: index < 3 ? theme.panelStrong : theme.panel,
                border: `1px solid ${theme.border}`,
                color: index < 3 ? theme.fg : theme.muted,
                fontSize: cW * 0.029,
                fontWeight: 800,
              }}>
                {feature}
              </div>
            ))}
          </div>
        </div>
      );
    },
  };
}

function makeLandscapeSlide(index: number, DC: DeviceComp, widthFn: WidthFn): SlideDef {
  return {
    id: COPY.en[index].id,
    component: ({ cW, cH, locale, theme }) => {
      const copy = COPY[locale][index];
      const fw = widthFn(cW, cH) * 100;
      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop cW={cW} theme={theme} variant="dark" />
          <div style={{
            position: "absolute",
            top: "50%",
            left: "5%",
            width: "36%",
            transform: "translateY(-50%)",
            zIndex: 30,
          }}>
            <Caption cW={cW} copy={copy} theme={theme} />
          </div>
          {index < 5 ? (
            <DC
              alt={copy.label}
              locale={locale}
              screen={copy.screen}
              theme={theme}
              style={{
                position: "absolute",
                right: "-3%",
                top: "50%",
                width: `${fw}%`,
                transform: "translateY(-50%)",
                zIndex: 20,
              }}
            />
          ) : (
            <div style={{
              position: "absolute",
              right: "6%",
              top: "50%",
              width: "48%",
              transform: "translateY(-50%)",
              display: "flex",
              flexWrap: "wrap",
              gap: cW * 0.016,
              zIndex: 30,
            }}>
              {FEATURE_PILLS[locale].map((feature) => (
                <div key={feature} style={{
                  borderRadius: cW * 0.012,
                  padding: `${cW * 0.012}px ${cW * 0.02}px`,
                  background: theme.panelStrong,
                  border: `1px solid ${theme.border}`,
                  color: theme.fg,
                  fontSize: cW * 0.021,
                  fontWeight: 800,
                }}>
                  {feature}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    },
  };
}

function makeMacSlide(index: number): SlideDef {
  return {
    id: COPY.en[index].id,
    component: ({ cW, cH, locale, theme }) => {
      const copy = COPY[locale][index];
      // macOS 横屏：文案在左、设备在右，两者不重叠
      // clamp 0.64 使 MacBook 宽度约为 64%，从 right:-2% 开始，左边缘在 34%
      const fw = macbookW(cW, cH, 0.64) * 100;
      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop cW={cW} theme={theme} variant="dark" />
          {/* 文案区：左侧 5-32%，垂直居中，使用整体画布宽度的约 35% 作字号基准 */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "5%",
            width: "26%",
            transform: "translateY(-50%)",
            zIndex: 30,
          }}>
            <Caption cW={cW * 0.34} copy={copy} theme={theme} />
          </div>
          {/* MacBook 在右侧，垂直居中 */}
          <MacBookFrame
            alt={copy.label}
            locale={locale}
            screen={copy.screen}
            theme={theme}
            style={{
              position: "absolute",
              right: "-2%",
              top: "50%",
              width: `${fw}%`,
              transform: "translateY(-50%)",
              zIndex: 20,
            }}
          />
        </div>
      );
    },
  };
}

const FEATURE_GRAPHIC_SLIDE: SlideDef = {
  id: "feature-graphic",
  component: ({ cW, locale, theme }) => {
    const copy = COPY[locale][0];
    const tagline = locale === "en"
      ? "Personal IPTV and Emby in one media hub."
      : "个人 IPTV 与 Emby，一处管理。";
    return (
      <div style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        background: theme.canvas,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `0 ${cW * 0.06}px`,
      }}>
        <SlideBackdrop cW={cW} theme={theme} />
        <div style={{ display: "flex", alignItems: "center", gap: cW * 0.03, zIndex: 10 }}>
          <img
            src={img("/app-icon.png")}
            alt="wizju"
            style={{
              width: cW * 0.11,
              height: cW * 0.11,
              borderRadius: cW * 0.022,
              boxShadow: `0 ${cW * 0.012}px ${cW * 0.042}px ${theme.accent}44`,
            }}
            draggable={false}
          />
          <div>
            <div style={{ fontSize: cW * 0.052, fontWeight: 800, color: theme.fg, lineHeight: 1.08 }}>wizju</div>
            <div style={{ fontSize: cW * 0.026, color: theme.muted, marginTop: cW * 0.008, fontWeight: 700 }}>
              {tagline}
            </div>
          </div>
        </div>
        <div style={{ zIndex: 10, width: "38%" }}>
          <Caption cW={cW * 0.52} copy={copy} theme={theme} align="right" />
        </div>
      </div>
    );
  },
};

function makePortraitSlides(DC: DeviceComp, widthFn: WidthFn): SlideDef[] {
  return [
    makeHeroSlide(DC, widthFn),
    makeRightDeviceSlide(1, DC, widthFn),
    makeLeftDeviceSlide(2, DC, widthFn),
    makeRightDeviceSlide(3, DC, widthFn),
    makeLeftDeviceSlide(4, DC, widthFn),
    makePillSlide(),
  ];
}

const IPHONE_SLIDES = makePortraitSlides(PhoneFrame, phoneW);
const IPAD_SLIDES = makePortraitSlides(IPadFrame, ipadW);
const ANDROID_SLIDES = makePortraitSlides(AndroidPhoneFrame, phoneW);
const ANDROID_7P_SLIDES = makePortraitSlides(TabletPortraitFrame, tabletPW);
const ANDROID_10P_SLIDES = makePortraitSlides(TabletPortraitFrame, tabletPW);
const ANDROID_7L_SLIDES = [0, 1, 2, 3, 4, 5].map((index) => makeLandscapeSlide(index, TabletLandscapeFrame, tabletLW));
const ANDROID_10L_SLIDES = [0, 1, 2, 3, 4, 5].map((index) => makeLandscapeSlide(index, TabletLandscapeFrame, tabletLW));
const MACOS_SLIDES = [0, 1, 2, 3, 4, 5].map((index) => makeMacSlide(index));

function ScreenshotPreview({
  slide,
  cW,
  cH,
  locale,
  theme,
  onExport,
}: {
  slide: SlideDef;
  cW: number;
  cH: number;
  locale: Locale;
  theme: Theme;
  onExport: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setScale(el.clientWidth / cW));
    observer.observe(el);
    return () => observer.disconnect();
  }, [cW]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 12,
        boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
        cursor: "pointer",
        aspectRatio: `${cW}/${cH}`,
        background: "#111315",
      }}
      onClick={onExport}
      title={`${UI_TEXT.export} ${slide.id}`}
    >
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: cW,
        height: cH,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        fontFamily: "var(--font-plus-jakarta), sans-serif",
      }}>
        {slide.component({ cW, cH, locale, theme })}
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0,
          transition: "opacity 0.2s",
          borderRadius: 12,
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.opacity = "1";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.opacity = "0";
        }}
      >
        <span style={{ color: "white", fontWeight: 800, fontSize: 14 }}>{UI_TEXT.export}</span>
      </div>
    </div>
  );
}

export default function ScreenshotsPage() {
  const [ready, setReady] = useState(false);
  const [device, setDevice] = useState<Device>("iphone");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [locale, setLocale] = useState<Locale>("zh-Hans");
  const [themeId, setThemeId] = useState<ThemeId>("media-hub");
  const [sizeIdx, setSizeIdx] = useState(0);
  const [exporting, setExporting] = useState<string | null>(null);
  const exportRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    preloadAllImages().then(() => setReady(true));
  }, []);

  const theme = THEMES[themeId];
  const isTablet = device === "android-7" || device === "android-10";

  // 设备、方向和导出尺寸一起决定当前渲染的画布与幻灯片集合。
  const { cW, cH, currentSizes, slides } = (() => {
    if (device === "android-7") {
      return orientation === "landscape"
        ? { cW: AT7L_W, cH: AT7L_H, currentSizes: ANDROID_7L_SIZES, slides: ANDROID_7L_SLIDES }
        : { cW: AT7P_W, cH: AT7P_H, currentSizes: ANDROID_7P_SIZES, slides: ANDROID_7P_SLIDES };
    }
    if (device === "android-10") {
      return orientation === "landscape"
        ? { cW: AT10L_W, cH: AT10L_H, currentSizes: ANDROID_10L_SIZES, slides: ANDROID_10L_SLIDES }
        : { cW: AT10P_W, cH: AT10P_H, currentSizes: ANDROID_10P_SIZES, slides: ANDROID_10P_SLIDES };
    }
    if (device === "android") return { cW: AW, cH: AH, currentSizes: ANDROID_SIZES, slides: ANDROID_SLIDES };
    if (device === "ipad") return { cW: IPAD_W, cH: IPAD_H, currentSizes: IPAD_SIZES, slides: IPAD_SLIDES };
    if (device === "macos") return { cW: MB_W, cH: MB_H, currentSizes: MACOS_SIZES, slides: MACOS_SLIDES };
    if (device === "feature-graphic") return { cW: FGW, cH: FGH, currentSizes: FG_SIZES, slides: [FEATURE_GRAPHIC_SLIDE] };
    return { cW: W, cH: H, currentSizes: IPHONE_SIZES, slides: IPHONE_SLIDES };
  })();

  async function captureSlide(el: HTMLElement, targetW: number, targetH: number): Promise<string> {
    const originalLeft = el.style.left;
    const originalOpacity = el.style.opacity;
    const originalZIndex = el.style.zIndex;
    const scaleX = targetW / cW;
    const scaleY = targetH / cH;

    el.style.left = "0px";
    el.style.opacity = "1";
    el.style.zIndex = "-1";

    const opts = {
      width: targetW,
      height: targetH,
      pixelRatio: 1,
      cacheBust: true,
      style: {
        transform: `scale(${scaleX}, ${scaleY})`,
        transformOrigin: "top left",
        width: `${cW}px`,
        height: `${cH}px`,
      },
    };

    await toPng(el, opts);
    const dataUrl = await toPng(el, opts);

    el.style.left = originalLeft;
    el.style.opacity = originalOpacity;
    el.style.zIndex = originalZIndex;

    return dataUrl;
  }

  async function exportSlide(index: number) {
    const el = exportRefs.current[index];
    const size = currentSizes[sizeIdx];
    if (!el || !size) return;
    setExporting(`${index + 1}/${slides.length}`);
    const dataUrl = await captureSlide(el, size.w, size.h);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${String(index + 1).padStart(2, "0")}-${slides[index].id}-${locale}-${size.w}x${size.h}.png`;
    a.click();
    setExporting(null);
  }

  async function exportAll() {
    const size = currentSizes[sizeIdx];
    if (!size) return;
    for (let index = 0; index < slides.length; index += 1) {
      const el = exportRefs.current[index];
      if (!el) continue;
      setExporting(`${index + 1}/${slides.length}`);
      const dataUrl = await captureSlide(el, size.w, size.h);
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${String(index + 1).padStart(2, "0")}-${slides[index].id}-${locale}-${size.w}x${size.h}.png`;
      a.click();
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    setExporting(null);
  }

  if (!ready) {
    return (
      <div style={{ minHeight: "100vh", background: "#101214", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#B8B0A3", fontWeight: 700 }}>{UI_TEXT.loading}</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F3F4F6", position: "relative", overflowX: "hidden" }}>
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "white",
        borderBottom: "1px solid #E5E7EB",
        display: "flex",
        alignItems: "center",
      }}>
        <div style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 16px",
          overflowX: "auto",
          minWidth: 0,
        }}>
          <span style={{ fontWeight: 800, fontSize: 14, whiteSpace: "nowrap" }}>{UI_TEXT.title}</span>

          <select
            value={locale}
            onChange={(event) => setLocale(event.target.value as Locale)}
            style={{ fontSize: 12, border: "1px solid #E5E7EB", borderRadius: 6, padding: "5px 10px" }}
          >
            {LOCALES.map((item) => (
              <option key={item} value={item}>{UI_TEXT.localeName[item]}</option>
            ))}
          </select>

          <select
            value={themeId}
            onChange={(event) => setThemeId(event.target.value as ThemeId)}
            style={{ fontSize: 12, border: "1px solid #E5E7EB", borderRadius: 6, padding: "5px 10px" }}
          >
            <option value="media-hub">Media Hub</option>
            <option value="signal-dark">Signal Dark</option>
            <option value="native-light">Native Light</option>
          </select>

          <div style={{ display: "flex", gap: 4, background: "#F3F4F6", borderRadius: 8, padding: 4, flexShrink: 0 }}>
            {(["iphone", "ipad", "macos", "android", "feature-graphic"] as Device[]).map((item) => (
              <button
                key={item}
                onClick={() => {
                  setDevice(item);
                  setSizeIdx(0);
                  setOrientation("portrait");
                }}
                style={{
                  padding: "4px 14px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  background: device === item ? "white" : "transparent",
                  color: device === item ? "#2563EB" : "#6B7280",
                }}
              >
                {UI_TEXT.devices[item]}
              </button>
            ))}
            <select
              value={isTablet ? device : ""}
              onChange={(event) => {
                if (event.target.value) {
                  setDevice(event.target.value as Device);
                  setSizeIdx(0);
                }
              }}
              style={{
                fontSize: 12,
                border: "none",
                borderRadius: 6,
                padding: "4px 10px",
                cursor: "pointer",
                background: isTablet ? "white" : "transparent",
                color: isTablet ? "#2563EB" : "#6B7280",
              }}
            >
              <option value="" disabled>{UI_TEXT.androidTablet}</option>
              <option value="android-7">{UI_TEXT.devices["android-7"]}</option>
              <option value="android-10">{UI_TEXT.devices["android-10"]}</option>
            </select>
          </div>

          {isTablet && (
            <div style={{ display: "flex", gap: 4, background: "#F3F4F6", borderRadius: 8, padding: 4, flexShrink: 0 }}>
              {(["portrait", "landscape"] as Orientation[]).map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setOrientation(item);
                    setSizeIdx(0);
                  }}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 6,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 700,
                    background: orientation === item ? "white" : "transparent",
                    color: orientation === item ? "#2563EB" : "#6B7280",
                  }}
                >
                  {item === "portrait" ? UI_TEXT.portrait : UI_TEXT.landscape}
                </button>
              ))}
            </div>
          )}

          <select
            value={sizeIdx}
            onChange={(event) => setSizeIdx(Number(event.target.value))}
            style={{ fontSize: 12, border: "1px solid #E5E7EB", borderRadius: 6, padding: "4px 10px" }}
          >
            {currentSizes.map((size, index) => (
              <option key={`${size.w}-${size.h}`} value={index}>{size.label} - {size.w}x{size.h}</option>
            ))}
          </select>
        </div>

        <div style={{ flexShrink: 0, padding: "10px 16px", borderLeft: "1px solid #E5E7EB" }}>
          <button
            onClick={exportAll}
            disabled={!!exporting}
            style={{
              padding: "7px 20px",
              background: exporting ? "#93C5FD" : "#2563EB",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 800,
              cursor: exporting ? "default" : "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {exporting ? `${UI_TEXT.exporting} ${exporting}` : UI_TEXT.exportAll}
          </button>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: cW > cH ? "repeat(auto-fill, minmax(480px, 1fr))" : "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 24,
        padding: 24,
      }}>
        {slides.map((slide, index) => (
          <ScreenshotPreview
            key={`${device}-${orientation}-${locale}-${themeId}-${slide.id}`}
            slide={slide}
            cW={cW}
            cH={cH}
            locale={locale}
            theme={theme}
            onExport={() => exportSlide(index)}
          />
        ))}
      </div>

      <div style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none", width: 0, height: 0, overflow: "hidden" }}>
        {slides.map((slide, index) => (
          <div
            key={`export-${device}-${orientation}-${locale}-${themeId}-${slide.id}`}
            ref={(el) => {
              exportRefs.current[index] = el;
            }}
            style={{
              width: cW,
              height: cH,
              position: "absolute",
              left: "-9999px",
              top: 0,
              fontFamily: "var(--font-plus-jakarta), sans-serif",
            }}
          >
            {slide.component({ cW, cH, locale, theme })}
          </div>
        ))}
      </div>
    </div>
  );
}
