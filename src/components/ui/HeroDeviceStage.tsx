import React from "react";
import { Theme } from "../../types";
import { isDarkThemeBg, heroDeviceDropShadow } from "../../utils/brandColor";

/**
 * HeroDeviceStage —— Hero 竖屏设备浮起舞台（纯色背景上的中性投影，无彩色光效）。
 */
export const HeroDeviceStage = React.memo(function HeroDeviceStage({
  cW,
  cH,
  theme,
  widthPercent,
  children,
}: {
  cW: number;
  cH: number;
  theme: Theme;
  widthPercent: number;
  children: React.ReactNode;
}) {
  const dark = isDarkThemeBg(theme.bg);
  const dropShadow = heroDeviceDropShadow(cW, dark);
  const groundOpacity = dark ? 0.32 : 0.12;

  return (
    <div
      style={{
        position: "absolute",
        bottom: `${cH * 0.035}px`,
        left: "50%",
        width: `${widthPercent}%`,
        transform: "translateX(-50%)",
        zIndex: 20,
      }}
    >
      {/* 接地阴影：中性灰黑椭圆，不含品牌色 */}
      <div
        style={{
          position: "absolute",
          bottom: `-${cW * 0.018}px`,
          left: "50%",
          transform: "translateX(-50%)",
          width: "78%",
          height: `${cW * 0.05}px`,
          borderRadius: "50%",
          background: `radial-gradient(ellipse at center, rgba(0,0,0,${groundOpacity}) 0%, transparent 72%)`,
          filter: `blur(${cW * 0.02}px)`,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          zIndex: 2,
          filter: dropShadow,
        }}
      >
        {children}
      </div>
    </div>
  );
});

/**
 * HeroMacStage —— macOS Hero 浮起舞台（纯色背景 + 中性投影）。
 */
export const HeroMacStage = React.memo(function HeroMacStage({
  cW,
  theme,
  leftPercent,
  widthPercent,
  topPercent,
  children,
}: {
  cW: number;
  theme: Theme;
  leftPercent: number;
  widthPercent: number;
  topPercent: number;
  children: React.ReactNode;
}) {
  const dark = isDarkThemeBg(theme.bg);
  const dropShadow = heroDeviceDropShadow(cW, dark, 2560);
  const groundOpacity = dark ? 0.3 : 0.1;

  return (
    <div
      style={{
        position: "absolute",
        left: `${leftPercent}%`,
        width: `${widthPercent}%`,
        top: `${topPercent}%`,
        zIndex: 20,
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: `-${cW * 0.012}px`,
          left: "50%",
          transform: "translateX(-50%)",
          width: "72%",
          height: `${cW * 0.028}px`,
          borderRadius: "50%",
          background: `radial-gradient(ellipse at center, rgba(0,0,0,${groundOpacity}) 0%, transparent 70%)`,
          filter: `blur(${cW * 0.014}px)`,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div style={{ position: "relative", width: "100%", zIndex: 2, filter: dropShadow }}>
        {children}
      </div>
    </div>
  );
});
