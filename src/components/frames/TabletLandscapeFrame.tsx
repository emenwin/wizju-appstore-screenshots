import React from "react";
import { DeviceCompProps } from "../../types";
import { ScreenContent } from "../ui/ScreenContent";

/**
 * Android 平板（横屏）外观框架组件，使用 CSS 模拟边框和前置摄像头。
 */
export const TabletLandscapeFrame = React.memo(function TabletLandscapeFrame({ 
  devicePath, 
  alt, 
  locale, 
  screen, 
  style 
}: DeviceCompProps) {
  return (
    <div style={{ position: "relative", aspectRatio: "8/5", ...style }}>
      <div style={{
        width: "100%",
        height: "100%",
        borderRadius: "2.8% / 4.5%",
        background: "linear-gradient(160deg, #2A2A2E 0%, #18181B 100%)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 20px 80px rgba(0,0,0,0.5)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          left: "1.2%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "0.88%",
          height: "1.4%",
          borderRadius: "50%",
          background: "#0D0D0F",
          zIndex: 20,
        }} />
        <div style={{
          position: "absolute",
          left: "2.2%",
          top: "3.5%",
          width: "95.6%",
          height: "93%",
          borderRadius: "1.6% / 2.5%",
          overflow: "hidden",
          background: "#000",
          containerType: "inline-size",
        }}>
          <ScreenContent devicePath={devicePath} locale={locale} screen={screen} alt={alt} />
        </div>
      </div>
    </div>
  );
});
