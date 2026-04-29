import React from "react";
import { DeviceCompProps } from "../../types";
import { ScreenContent } from "../ui/ScreenContent";

/**
 * MacBook 设备外观框架组件，使用 CSS 模拟深色边框。
 */
export const MacBookFrame = React.memo(function MacBookFrame({ 
  devicePath = "macos", 
  alt, 
  locale, 
  screen, 
  style 
}: DeviceCompProps) {
  return (
    <div style={{ position: "relative", ...style }}>
      <div style={{
        position: "relative",
        aspectRatio: "16/10",
        width: "100%",
        borderRadius: "2.5% / 4%",
        background: "linear-gradient(180deg, #CACACC 0%, #A9A9AC 100%)",
        padding: "2.2% 2.2% 1.8%",
        boxShadow: "0 14px 44px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.3)",
      }}>
        <div style={{
          width: "100%",
          height: "100%",
          borderRadius: "1% / 1.6%",
          overflow: "hidden",
          background: "#000",
          position: "relative",
          containerType: "inline-size",
        }}>
          <div aria-label={alt} style={{ width: "100%", height: "100%" }}>
            <ScreenContent devicePath={devicePath} locale={locale} screen={screen} alt={alt} />
          </div>
        </div>
      </div>
      <div style={{
        position: "absolute",
        bottom: "-3.5%",
        left: "-4%",
        right: "-4%",
        height: "3.5%",
        background: "linear-gradient(180deg, #E6E6E8 0%, #B5B5B8 100%)",
        borderRadius: "0 0 20px 20px",
        boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "14%",
          height: "40%",
          background: "#A3A3A6",
          borderRadius: "0 0 8px 8px",
        }} />
      </div>
    </div>
  );
});
