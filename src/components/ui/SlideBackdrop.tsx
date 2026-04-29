import React from "react";

/**
 * 幻灯片背景组件，负责渲染整个幻灯片的底色渐变以及一些发光的光晕效果。
 * 使用 React.memo 避免因不相关的外部状态更改（例如正在导出哪个幻灯片）导致的重新渲染。
 */
export const SlideBackdrop = React.memo(function SlideBackdrop({
  canvas,
  canvasAlt,
  accent,
}: {
  canvas: string;
  canvasAlt: string;
  accent: string;
}) {
  return (
    <>
      <div style={{
        position: "absolute",
        inset: 0,
        background: canvas,
      }} />
      <div style={{
        position: "absolute",
        inset: 0,
        background: canvasAlt,
        opacity: 0.12,
        mixBlendMode: "overlay",
      }} />
      {/* 光晕装饰点 */}
      <div style={{
        position: "absolute",
        top: "20%",
        left: "30%",
        width: "60%",
        height: "60%",
        background: accent,
        opacity: 0.08,
        filter: "blur(180px)",
        borderRadius: "50%",
      }} />
    </>
  );
});
