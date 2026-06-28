import React from "react";
import { DeviceCompProps } from "../../types";
import { ScreenContent } from "../ui/ScreenContent";

/**
 * Android 手机设备外观框架组件，纯 CSS 仿真 Geist 中性灰外框。
 *
 * 取色 100% 来自 Theme token，随 dark / light 主题联动：
 * - 机身：frameBezel(gray-400) → surface3(gray-300) 金属灰渐变 + border 描边 + frameShadow 投影。
 * - 顶部居中挖孔摄像头：frameDetail 近黑圆点，符合物理特征。
 * - 屏幕底色：theme.bg，截图加载前与画布同色，避免突兀黑底。
 * 使用 React.memo 避免同内容组件在主题 / 幻灯片切换时不必要重渲染。
 */
export const AndroidPhoneFrame = React.memo(function AndroidPhoneFrame({
  devicePath = "android/phone",
  alt,
  locale,
  screen,
  theme,
  style,
}: DeviceCompProps) {
  return (
    <div style={{ position: "relative", aspectRatio: "9/19.5", ...style }}>
      {/* 机身外壳：Geist 灰金属渐变 + 描边 + 主题投影 */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "8% / 4%",
          background: `linear-gradient(160deg, ${theme.frameBezel} 0%, ${theme.surface3} 100%)`,
          boxShadow: `inset 0 0 0 1px ${theme.border}, ${theme.frameShadow}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 顶部居中挖孔摄像头：近黑圆点 */}
        <div
          style={{
            position: "absolute",
            top: "1.5%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "3%",
            height: "1.4%",
            borderRadius: "50%",
            background: theme.frameDetail,
            zIndex: 20,
          }}
        />
        {/* 屏幕显示区域：theme.bg 打底，截图覆盖其上 */}
        <div
          style={{
            position: "absolute",
            left: "3.5%",
            top: "2%",
            width: "93%",
            height: "96%",
            borderRadius: "5.5% / 2.6%",
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
