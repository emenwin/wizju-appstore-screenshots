import React from "react";
import { Theme } from "../../types";

/**
 * Caption —— 截图幻灯片的文字说明组件。
 *
 * 组件职责：
 * 在每张 App Store 截图幻灯片上，自上而下渲染三段文字层级：
 *   1) 标签胶囊（label）：小尺寸、加粗、宽字距的"眉标"
 *   2) 主标题（headline）：超大、超粗、紧字距的卖点文案
 *   3) 说明文字（note）：中等字重、宽行距的补充描述
 *
 * 布局变体：
 * - isLeft=true：左对齐，用于图文左右排布
 * - isHero=true：首屏放大版
 * - compact=true：侧栏紧凑模式，缩小字号并隐藏 note，避免与设备截图重叠
 * - cW：画布宽度，用于跨 iPhone / iPad / Android / macOS 等比缩放字号
 */
export const Caption = React.memo(function Caption({
  label,
  headline,
  emphasisLine,
  note,
  theme,
  cW = 1242,
  isLeft = false,
  isHero = false,
  compact = false,
  showNote = true,
}: {
  label: string;
  headline: string[];
  emphasisLine?: number;
  note: string;
  theme: Theme;
  /** 画布宽度，驱动字号等比缩放 */
  cW?: number;
  isLeft?: boolean;
  isHero?: boolean;
  /** 侧栏紧凑模式：缩小字号、隐藏 note */
  compact?: boolean;
  showNote?: boolean;
}) {
  // 以 iPhone 1242px 为基准，保证各平台导出图文字占比一致
  const scale = cW / 1242;
  const compactScale = compact ? 0.88 : 1;
  const labelSize = (isHero ? 26 : compact ? 18 : 20) * scale * compactScale;
  const headlineSize = (isHero ? 96 : compact ? 68 : 82) * scale * compactScale;
  const noteSize = (isHero ? 32 : compact ? 24 : 28) * scale * compactScale;
  const labelPad = isHero
    ? `${11 * scale}px ${30 * scale}px`
    : `${8 * scale}px ${22 * scale}px`;
  const gap = (isHero ? 36 : compact ? 18 : 26) * scale;

  return (
    <div
      style={{
        textAlign: isLeft ? "left" : "center",
        display: "flex",
        flexDirection: "column",
        alignItems: isLeft ? "flex-start" : "center",
        gap,
        width: isLeft ? (compact ? "100%" : "80%") : "90%",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: "inline-block",
          background: theme.panelStrong,
          color: theme.fg,
          padding: labelPad,
          borderRadius: 999,
          fontSize: labelSize,
          fontWeight: 800,
          letterSpacing: 3 * scale,
          border: `${1.5 * scale}px solid ${theme.border}`,
        }}
      >
        {label}
      </div>
      <h1
        style={{
          margin: 0,
          fontSize: headlineSize,
          fontWeight: 900,
          lineHeight: 1.06,
          color: theme.fg,
          letterSpacing: -2 * scale,
          textShadow: `0 ${8 * scale}px ${40 * scale}px rgba(0,0,0,0.35)`,
        }}
      >
        {headline.map((line, i) => (
          <span
            key={i}
            style={{
              display: "block",
              color: emphasisLine === i ? theme.brand : theme.fg,
            }}
          >
            {line}
          </span>
        ))}
      </h1>
      {showNote && !compact && note ? (
        <p
          style={{
            margin: 0,
            fontSize: noteSize,
            fontWeight: 450,
            color: theme.muted,
            lineHeight: 1.5,
            maxWidth: isLeft ? "100%" : "85%",
            letterSpacing: 0.2 * scale,
          }}
        >
          {note}
        </p>
      ) : null}
    </div>
  );
});
