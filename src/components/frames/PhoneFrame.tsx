import React from "react";
import { DeviceCompProps } from "../../types";
import { MK_W, MK_H, SC_L, SC_T, SC_W, SC_H, SC_RX, SC_RY } from "../../constants";
import { img } from "../../utils/image";
import { ScreenContent } from "../ui/ScreenContent";

/**
 * iPhone 设备外观框架组件，使用预渲染的 mockup.png 图片作为外壳。
 * 内部嵌入 ScreenContent 来展示特定屏幕的截图内容。
 */
export const PhoneFrame = React.memo(function PhoneFrame({ 
  devicePath = "apple/iphone", 
  alt, 
  locale, 
  screen, 
  style 
}: DeviceCompProps) {
  return (
    <div style={{ position: "relative", aspectRatio: `${MK_W}/${MK_H}`, ...style }}>
      <img 
        src={img("/mockup.png")} 
        alt="" 
        style={{ display: "block", width: "100%", height: "100%" }} 
        draggable={false} 
      />
      <div style={{
        position: "absolute",
        zIndex: 10,
        overflow: "hidden",
        left: `${SC_L}%`,
        top: `${SC_T}%`,
        width: `${SC_W}%`,
        height: `${SC_H}%`,
        borderRadius: `${SC_RX}% / ${SC_RY}%`,
      }}>
        <div aria-label={alt} style={{ width: "100%", height: "100%", containerType: "inline-size" }}>
          <ScreenContent devicePath={devicePath} locale={locale} screen={screen} alt={alt} />
        </div>
      </div>
    </div>
  );
});
