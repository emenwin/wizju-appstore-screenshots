import React from "react";
import { Locale, ScreenKind } from "../../types";

/**
 * 屏幕内容组件，根据传入的参数拼装目标截图的路径，并在设备框架中展示。
 * @param devicePath 平台设备对应的目录路径
 * @param locale 截屏支持的语言
 * @param screen 截图代表的功能模块种类
 * @param alt 可访问性标签文本
 */
export function ScreenContent({ 
  devicePath, 
  locale, 
  screen, 
  alt 
}: { 
  devicePath?: string; 
  locale: Locale; 
  screen: ScreenKind; 
  alt: string; 
}) {
  const src = `/screenshots/${devicePath}/${locale}/${screen}.png`;
  return (
    <img 
      src={src} 
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
      alt={alt} 
    />
  );
}
