import React from "react";

/**
 * 幻灯片背景 —— 单层纯色底，无渐变、无光晕。
 */
export const SlideBackdrop = React.memo(function SlideBackdrop({
  background,
}: {
  /** 与 theme.canvas / theme.bg 一致的纯色 */
  background: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background,
      }}
    />
  );
});
