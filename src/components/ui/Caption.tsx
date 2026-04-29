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
      gap: isHero ? 32 : 24,
      width: isLeft ? "80%" : "90%",
      position: "relative",
      zIndex: 10,
    }}>
      <div style={{
        display: "inline-block",
        background: theme.panel,
        color: theme.accent,
        padding: isHero ? "12px 28px" : "8px 24px",
        borderRadius: 999,
        fontSize: isHero ? 28 : 22,
        fontWeight: 800,
        letterSpacing: 2,
        border: `2px solid ${theme.border}`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.12)`,
      }}>
        {label}
      </div>
      <h1 style={{
        margin: 0,
        fontSize: isHero ? 96 : 82,
        fontWeight: 800,
        lineHeight: 1.1,
        color: theme.fg,
        letterSpacing: -1.5,
        textShadow: `0 12px 48px rgba(0,0,0,0.4)`,
      }}>
        {headline.map((line, i) => (
          <span key={i} style={{ display: "block" }}>{line}</span>
        ))}
      </h1>
      <p style={{
        margin: 0,
        fontSize: isHero ? 32 : 28,
        fontWeight: 500,
        color: theme.muted,
        lineHeight: 1.4,
        maxWidth: "85%",
        textShadow: `0 4px 16px rgba(0,0,0,0.4)`,
      }}>
        {note}
      </p>
    </div>
  );
});
