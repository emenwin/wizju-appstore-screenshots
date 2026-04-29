import React from "react";
import { DeviceCompProps } from "../../types";
import { ScreenContent } from "../ui/ScreenContent";

/**
 * Android 手机设备外观框架组件，使用 CSS 模拟深色边框。
 */
export const AndroidPhoneFrame = React.memo(function AndroidPhoneFrame({ 
  devicePath = "android/phone", 
  alt, 
  locale, 
  screen, 
  style 
}: DeviceCompProps) {
  return (
    <div style={{ position: "relative", aspectRatio: "9/19.5", ...style }}>
      <div style={{
        width: "100%",
        height: "100%",
        borderRadius: "8% / 4%",
        background: "linear-gradient(160deg, #2A2A2E 0%, #18181B 100%)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 20px 70px rgba(0,0,0,0.48)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: "1.5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "3%",
          height: "1.4%",
          borderRadius: "50%",
          background: "#0D0D0F",
          zIndex: 20,
        }} />
        <div style={{
          position: "absolute",
          left: "3.5%",
          top: "2%",
          width: "93%",
          height: "96%",
          borderRadius: "5.5% / 2.6%",
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
