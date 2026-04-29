import React, { useEffect, useRef, useState } from "react";
import { Locale, SlideDef, Theme } from "../../types";
import { UI_TEXT } from "../../constants";

/**
 * 屏幕预览组件。
 * 将根据给定尺寸绘制出的 Slide 缩放到适合当前容器的尺寸。
 * 使用 React.memo 并提取出与当前组件无关的 state (如 exporting)，避免页面导出状态改变时所有预览重新渲染。
 */
export const ScreenshotPreview = React.memo(function ScreenshotPreview({
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

  // 根据容器宽度计算缩放比例
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
});
