import React from "react";
import { DeviceCompProps } from "../../types";
import { ScreenContent } from "../ui/ScreenContent";

/**
 * iPad 设备外观框架组件，使用 CSS 模拟深色边框。
 */
export const IPadFrame = React.memo(function IPadFrame({ 
  devicePath = "apple/ipad", 
  alt, 
  locale, 
  screen, 
  style 
}: DeviceCompProps) {
  return (
    <div style={{ position: "relative", aspectRatio: "770/1000", ...style }}>
      <div style={{
        width: "100%",
        height: "100%",
        borderRadius: "5% / 3.6%",
        background: "linear-gradient(180deg, #2C2C2E 0%, #1C1C1E 100%)",
        position: "relative",
        overflow: "hidden",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1), 0 20px 80px rgba(0,0,0,0.5)",
      }}>
        <div style={{
          position: "absolute",
          top: "1.2%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "0.9%",
          height: "0.65%",
          borderRadius: "50%",
          background: "#111113",
          zIndex: 20,
        }} />
        <div style={{
          position: "absolute",
          left: "4%",
          top: "2.8%",
          width: "92%",
          height: "94.4%",
          borderRadius: "2.2% / 1.6%",
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
