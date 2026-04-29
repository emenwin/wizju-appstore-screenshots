import React from "react";
import { Locale, ScreenKind, Theme } from "../../types";

/**
 * 屏幕内拟真 UI 组件：当没有真实截图资源时，通过代码在各设备框内渲染占位 UI 结构，用于模拟真实 App 的信息架构。
 * 不展示具体内容细节，仅提供大致色彩块和组件位置。
 */
export function MockScreen({
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
