import React from "react";
import { DeviceComp, SlideDef, WidthFn } from "../../types";
import { COPY, FEATURE_PILLS } from "../../constants";
import { SlideBackdrop } from "../ui/SlideBackdrop";
import { Caption } from "../ui/Caption";

/**
 * 生成横屏设备（如横屏 Android 平板）的宣传图幻灯片。
 * 
 * 布局特点：
 * - 0-4 索引图：左侧纵向居中文案，右侧纵向居中展示横向设备。
 * - 5 索引图：左侧纵向居中文案，右侧展示特性标签（Pills）流式布局。
 *
 * @param devicePath 设备素材的路径
 * @param index 幻灯片索引 (0-5)
 * @param DC 设备渲染组件 (例如 TabletLandscapeFrame)
 * @param widthFn 计算设备宽度的函数
 */
export function makeLandscapeSlide(devicePath: string, index: number, DC: DeviceComp, widthFn: WidthFn): SlideDef {
  return {
    id: COPY.en[index].id,
    component: ({ cW, cH, locale, theme }) => {
      const copy = COPY[locale][index];
      const fw = widthFn(cW, cH) * 100;
      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          {/* 背景层 */}
          <SlideBackdrop canvas={theme.canvas} canvasAlt={theme.canvasAlt} accent={theme.accent} />
          
          {/* 左侧文字区域，垂直居中 */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "5%",
            width: "36%",
            transform: "translateY(-50%)",
            zIndex: 30,
          }}>
            <Caption label={copy.label} headline={copy.headline} note={copy.note} theme={theme} isLeft={true} />
          </div>
          
          {/* 右侧内容区域：根据 index 判断展示设备还是特性标签 */}
          {index < 5 ? (
            // 前5张图（index < 5），右侧居中展示设备截图
            <DC
              devicePath={devicePath}
              alt={copy.label}
              locale={locale}
              screen={copy.screen}
              theme={theme}
              style={{
                position: "absolute",
                right: "-3%",
                top: "50%",
                width: `${fw}%`,
                // 垂直居中设备
                transform: "translateY(-50%)",
                zIndex: 20,
              }}
            />
          ) : (
            // 第6张图（index=5），右侧展示特性标签池
            <div style={{
              position: "absolute",
              right: "6%",
              top: "50%",
              width: "48%",
              transform: "translateY(-50%)",
              display: "flex",
              flexWrap: "wrap",
              gap: cW * 0.016,
              zIndex: 30,
            }}>
              {FEATURE_PILLS[locale].map((feature) => (
                <div key={feature} style={{
                  borderRadius: cW * 0.012,
                  padding: `${cW * 0.012}px ${cW * 0.02}px`,
                  background: theme.panelStrong,
                  border: `1px solid ${theme.border}`,
                  color: theme.fg,
                  fontSize: cW * 0.021,
                  fontWeight: 800,
                }}>
                  {feature}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    },
  };
}
