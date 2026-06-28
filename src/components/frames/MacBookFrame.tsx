import React from "react";
import { DeviceCompProps } from "../../types";
import { ScreenContent } from "../ui/ScreenContent";

/**
 * MacBook 设备外观框架组件，纯 CSS 仿真 Geist 中性灰外框。
 *
 * 支持两种展示模式：
 * - showFrame=true（默认）：CSS 仿真 MacBook 机身（Geist 灰金属渐变 + 描边 + 主题投影），
 *   含 FaceTime 摄像头圆点与铰链底座，屏幕区以 theme.bg 打底。
 * - showFrame=false：无外框模式，截图以"悬浮屏幕"形式呈现，配合主题投影营造沉浸感。
 *
 * 取色 100% 来自 Theme token，随 dark / light 主题联动，避免旧版"空间灰"硬编码色
 * 与 Geist 单色体系冲突、导致导出图配色不协调。
 * 使用 React.memo 避免同内容组件在主题 / 幻灯片切换时不必要重渲染。
 */
export const MacBookFrame = React.memo(function MacBookFrame({
  devicePath = "macos",
  alt,
  locale,
  screen,
  theme,
  style,
  showFrame = true,
}: DeviceCompProps & { showFrame?: boolean }) {
  if (!showFrame) {
    // 无框模式：截图以悬浮屏幕风格展示，投影由外层布局负责
    return (
      <div style={{ position: "relative", ...style }}>
        <ScreenContent devicePath={devicePath} locale={locale} screen={screen} alt={alt} />
      </div>
    );
  }

  return (
    <div style={{ position: "relative", ...style }}>
      {/* MacBook 机身：Geist 灰金属渐变 + 描边 + 主题投影，padding 留出屏幕边框 */}
      <div
        style={{
          position: "relative",
          aspectRatio: "16/10",
          width: "100%",
          borderRadius: "2.1% / 3.4%",
          background: `linear-gradient(175deg, ${theme.frameBezel} 0%, ${theme.surface3} 45%, ${theme.surface2} 100%)`,
          padding: "2.6% 1.8% 2%",
          boxShadow: `inset 0 0 0 1px ${theme.border}, ${theme.frameShadow}`,
        }}
      >
        {/* FaceTime 摄像头圆点：居中贴顶，近黑色，配 border 描边微凹感 */}
        <div
          style={{
            position: "absolute",
            top: "1.15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "1.1%",
            height: "1.6%",
            background: theme.frameDetail,
            borderRadius: "50%",
            zIndex: 10,
            boxShadow: `0 0 0 1px ${theme.border}`,
          }}
        />
        {/* 屏幕显示区域：theme.bg 打底，截图覆盖其上 */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "0.5% / 0.8%",
            overflow: "hidden",
            background: theme.bg,
            position: "relative",
          }}
        >
          <div aria-label={alt} style={{ width: "100%", height: "100%" }}>
            <ScreenContent devicePath={devicePath} locale={locale} screen={screen} alt={alt} />
          </div>
        </div>
      </div>
      {/* 铰链底座：Geist 灰渐变 + 描边，略宽于机身，模拟笔记本底座 */}
      <div
        style={{
          position: "absolute",
          bottom: "-3.2%",
          left: "-3.8%",
          right: "-3.8%",
          height: "3.2%",
          background: `linear-gradient(180deg, ${theme.surface3} 0%, ${theme.surface2} 55%, ${theme.surface1} 100%)`,
          borderRadius: "0 0 8px 8px",
          boxShadow: `inset 0 0 0 1px ${theme.border}`,
        }}
      >
        {/* 开盖缺口指示：用 panelStrong 半透明叠加，表示底座凹槽 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "9%",
            height: "52%",
            background: theme.panelStrong,
            borderRadius: "0 0 5px 5px",
          }}
        />
      </div>
    </div>
  );
});
