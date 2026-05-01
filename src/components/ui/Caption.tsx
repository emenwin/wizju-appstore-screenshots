import React from "react";
import { Theme } from "../../types";

/**
 * 文本说明组件，展示大标题、标签和小字说明。
 * 使用 React.memo 防止不必要的重渲染。
 */
export const Caption = React.memo(function Caption({
  label,
  headline,
  note,
  theme,
  isLeft = false,
  isHero = false,
}: {
  label: string;
  headline: string[];
  note: string;
  theme: Theme;
  isLeft?: boolean;
  isHero?: boolean;
}) {
  return (
    <div style={{
      textAlign: isLeft ? "left" : "center",
      display: "flex",
      flexDirection: "column",
      alignItems: isLeft ? "flex-start" : "center",
      gap: isHero ? 36 : 26,
      width: isLeft ? "80%" : "90%",
      position: "relative",
      zIndex: 10,
    }}>
      {/* 标签胶囊：accent 微染色底 + 彩色描边，呼应主题主色 */}
      <div style={{
        display: "inline-block",
        background: `${theme.accent}1A`,
        color: theme.accent,
        padding: isHero ? "11px 30px" : "8px 22px",
        borderRadius: 999,
        fontSize: isHero ? 26 : 20,
        fontWeight: 800,
        letterSpacing: 3,
        border: `1.5px solid ${theme.accent}50`,
        boxShadow: `0 0 24px ${theme.accent}18, inset 0 1px 0 ${theme.accent}18`,
      }}>
        {label}
      </div>
      {/* 主标题：超粗，紧字距，暗色阴影增强立体感 */}
      <h1 style={{
        margin: 0,
        fontSize: isHero ? 96 : 82,
        fontWeight: 900,
        lineHeight: 1.08,
        color: theme.fg,
        letterSpacing: -2,
        textShadow: `0 8px 40px rgba(0,0,0,0.35)`,
      }}>
        {headline.map((line, i) => (
          <span key={i} style={{ display: "block" }}>{line}</span>
        ))}
      </h1>
      {/* 说明文字：中等字重，行距宽松，颜色用 muted 保持层次 */}
      <p style={{
        margin: 0,
        fontSize: isHero ? 32 : 28,
        fontWeight: 450,
        color: theme.muted,
        lineHeight: 1.55,
        maxWidth: "85%",
        letterSpacing: 0.2,
      }}>
        {note}
      </p>
    </div>
  );
});
