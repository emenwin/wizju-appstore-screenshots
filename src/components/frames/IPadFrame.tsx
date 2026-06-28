import React from "react";
import { DeviceCompProps } from "../../types";
import { ScreenContent } from "../ui/ScreenContent";

/**
 * iPad 设备外观框架组件，纯 CSS 仿真 Geist 中性灰外框。
 *
 * 取色 100% 来自 Theme token，随 dark / light 主题联动：
 * - 机身：frameBezel(gray-400) → surface3(gray-300) 金属灰渐变 + border 描边 + frameShadow 投影。
 * - 前置摄像头圆点：frameDetail 近黑，两套主题均保持深色，符合物理特征。
 * - 屏幕底色：theme.bg，截图加载前与画布同色，避免突兀黑底。
 * 使用 React.memo 避免同内容组件在主题 / 幻灯片切换时不必要重渲染。
 */
export const IPadFrame = React.memo(function IPadFrame({
  devicePath = "apple/ipad",
  alt,
  locale,
  screen,
  theme,
  style,
}: DeviceCompProps) {
  return (
    <div style={{ position: "relative", aspectRatio: "770/1000", ...style }}>
      {/* 机身外壳：Geist 灰金属渐变 + 描边 + 主题投影 */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "5% / 3.6%",
          background: `linear-gradient(180deg, ${theme.frameBezel} 0%, ${theme.surface3} 100%)`,
          position: "relative",
          overflow: "hidden",
          boxShadow: `inset 0 0 0 1px ${theme.border}, ${theme.frameShadow}`,
        }}
      >
        {/* 前置摄像头圆点：居中贴顶，近黑色 */}
        <div
          style={{
            position: "absolute",
            top: "1.2%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "0.9%",
            height: "0.65%",
            borderRadius: "50%",
            background: theme.frameDetail,
            zIndex: 20,
          }}
        />
        {/* 屏幕显示区域：theme.bg 打底，截图覆盖其上 */}
        <div
          style={{
            position: "absolute",
            left: "4%",
            top: "2.8%",
            width: "92%",
            height: "94.4%",
            borderRadius: "2.2% / 1.6%",
            overflow: "hidden",
            background: theme.bg,
            containerType: "inline-size",
          }}
        >
          <ScreenContent devicePath={devicePath} locale={locale} screen={screen} alt={alt} />
        </div>
      </div>
    </div>
  );
});
