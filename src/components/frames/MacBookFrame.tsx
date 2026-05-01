import React from "react";
import { DeviceCompProps } from "../../types";
import { ScreenContent } from "../ui/ScreenContent";

/**
 * MacBook 设备外观框架组件。
 *
 * 支持两种展示模式：
 * - showFrame=true（默认）：使用 CSS 精确模拟现代 MacBook 空间灰铝合金哑光外观，
 *   含 FaceTime 摄像头圆点、精细铰链底座比例。
 * - showFrame=false：无外框模式，截图以"悬浮屏幕"形式呈现，
 *   配合环境光晕阴影与主题配色，营造沉浸感更强的展示效果。
 */
export const MacBookFrame = React.memo(function MacBookFrame({
  devicePath = "macos",
  alt,
  locale,
  screen,
  style,
  theme,
  showFrame = true,
}: DeviceCompProps & { showFrame?: boolean }) {
  if (!showFrame) {
    // 无框模式：截图以悬浮屏幕风格展示，搭配环境光晕
    return (
      <div style={{ position: "relative", ...style }}>
        <div
          style={{
            position: "relative",
            // aspectRatio: "16/10",
            // width: "100%",
            // borderRadius: "0.5%",
            // overflow: "hidden",
            // boxShadow: [
            //   "0 0 0 1px rgba(255,255,255,0.07)",
            //   "0 2px 0 1px rgba(0,0,0,0.5)",
            //   "0 36px 100px rgba(0,0,0,0.6)",
            //   "0 10px 30px rgba(0,0,0,0.35)",
            //   `0 0 140px ${theme.accent}1A`,
            // ].join(", "),
          }}
        >
          <ScreenContent devicePath={devicePath} locale={locale} screen={screen} alt={alt} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", ...style }}>
      {/* MacBook 机身 — 空间灰铝合金哑光外壳 */}
      <div
        style={{
          position: "relative",
          aspectRatio: "16/10",
          width: "100%",
          borderRadius: "2.1% / 3.4%",
          background: "linear-gradient(175deg, #424244 0%, #343436 40%, #272729 100%)",
          padding: "2.6% 1.8% 2%",
          boxShadow: [
            "0 0 0 1px rgba(0,0,0,0.75)",
            "0 0 0 2px rgba(75,75,80,0.5)",
            "0 36px 90px rgba(0,0,0,0.6)",
            "0 8px 28px rgba(0,0,0,0.35)",
            "inset 0 1.5px 0 rgba(255,255,255,0.13)",
            "inset 0 -1px 0 rgba(0,0,0,0.45)",
          ].join(", "),
        }}
      >
        {/* FaceTime 摄像头圆点 */}
        <div
          style={{
            position: "absolute",
            top: "1.15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "1.1%",
            height: "1.6%",
            background: "#111113",
            borderRadius: "50%",
            zIndex: 10,
            boxShadow: "0 0 0 1.5px rgba(255,255,255,0.06), inset 0 1px 2px rgba(0,0,0,0.9)",
          }}
        />
        {/* 屏幕显示区域 */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "0.5% / 0.8%",
            overflow: "hidden",
            background: "#000",
            position: "relative",
          }}
        >
          <div aria-label={alt} style={{ width: "100%", height: "100%" }}>
            <ScreenContent devicePath={devicePath} locale={locale} screen={screen} alt={alt} />
          </div>
        </div>
      </div>
      {/* 铰链底座 */}
      <div
        style={{
          position: "absolute",
          bottom: "-3.2%",
          left: "-3.8%",
          right: "-3.8%",
          height: "3.2%",
          background: "linear-gradient(180deg, #363637 0%, #2C2C2E 55%, #222223 100%)",
          borderRadius: "0 0 8px 8px",
          boxShadow: [
            "0 8px 28px rgba(0,0,0,0.45)",
            "inset 0 1px 0 rgba(255,255,255,0.07)",
            "inset 0 -1px 0 rgba(0,0,0,0.4)",
          ].join(", "),
        }}
      >
        {/* 开盖缺口指示 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "9%",
            height: "52%",
            background: "rgba(0,0,0,0.35)",
            borderRadius: "0 0 5px 5px",
          }}
        />
      </div>
    </div>
  );
});
