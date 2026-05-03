import React from "react";
import { ScreenKind, SlideDef } from "../../types";
import { COPY } from "../../constants";
import { SlideBackdrop } from "../ui/SlideBackdrop";
import { Caption } from "../ui/Caption";
import { MacBookFrame } from "../frames/MacBookFrame";

/**
 * 生成多窗口拼贴的 macOS 有框截图宣传图。
 * 
 * 布局特点：
 * - 包含 MacBook 外壳的两个窗口错层叠放，营造类似 Setapp 的质感。
 * - 上方居中文字 + 下方两个窗口（辅助窗口低亮度、轻旋转位于后方，主窗口高亮在前）。
 * 
 * @param devicePath 设备素材路径
 * @param index 幻灯片索引
 * @param config 自定义配置（主屏、辅屏、左右位置等）
 */
export function makeMacFramedCollageSlide(devicePath: string, index: number, config?: import("./MacOsGenerator").MacSlideConfig): SlideDef {
  return {
    id: COPY.en[index].id,
    component: ({ cW, cH, locale, theme }) => {
      const copy = COPY[locale][index];

      // 1. 主屏内容
      const primaryScreen = config?.primaryScreen ?? copy.screen;

      // 2. 辅屏内容
      const defaultSecondaryScreens: Record<number, ScreenKind> = {
        1: "hub",
        3: "hub",
        5: "favorites",
      };
      const secondaryScreen = config?.secondaryScreen ?? defaultSecondaryScreens[index] ?? "hub";

      // 3. 主屏位置
      const primaryOnLeft = config?.primaryOnLeft ?? (index === 3);

      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop canvas={theme.canvas} canvasAlt={theme.canvasAlt} accent={theme.accent} />

          {/* 顶部居中文字 */}
          <div style={{
            position: "absolute",
            top: "7%",
            left: "20%",
            width: "60%",
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <Caption
              label={copy.label}
              headline={copy.headline}
              note={copy.note}
              theme={theme}
              isLeft={false}
              isHero={false}
            />
          </div>

          {/* 次要窗口：辅助截图，小尺寸、低亮度、轻旋转，制造景深层次 */}
          <MacBookFrame
            devicePath={devicePath}
            alt={copy.label}
            locale={locale}
            screen={secondaryScreen}
            theme={theme}
            showFrame={true}
            style={{
              position: "absolute",
              ...(primaryOnLeft ? { right: "-4%" } : { left: "-4%" }),
              top: "46%",
              width: "46%",
              zIndex: 15,
              opacity: 0.52,
              filter: "brightness(0.6)",
              transform: primaryOnLeft
                ? "translateY(-15%) rotate(-3deg)"
                : "translateY(-15%) rotate(3deg)",
            }}
          />

          {/* 主要窗口：当前功能截图，大尺寸、高亮、轻微反向旋转，视觉焦点 */}
          <MacBookFrame
            devicePath={devicePath}
            alt={copy.label}
            locale={locale}
            screen={primaryScreen}
            theme={theme}
            showFrame={true}
            style={{
              position: "absolute",
              ...(primaryOnLeft ? { left: "-1%" } : { right: "-1%" }),
              top: "38%",
              width: "62%",
              zIndex: 20,
              transform: primaryOnLeft
                ? "translateY(-20%) rotate(2.5deg)"
                : "translateY(-20%) rotate(-2.5deg)",
            }}
          />

          {/* 底部渐变收口 */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "22%",
            background: `linear-gradient(to top, ${theme.bg} 0%, transparent 100%)`,
            zIndex: 25,
            pointerEvents: "none",
          }} />
        </div>
      );
    },
  };
}
