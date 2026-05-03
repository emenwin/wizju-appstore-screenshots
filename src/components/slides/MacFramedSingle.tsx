import React from "react";
import { SlideDef } from "../../types";
import { COPY } from "../../constants";
import { img } from "../../utils/image";
import { SlideBackdrop } from "../ui/SlideBackdrop";
import { Caption } from "../ui/Caption";
import { MacBookFrame } from "../frames/MacBookFrame";

/**
 * 生成单张 macOS 有框截图宣传图（单一窗口）。
 * 
 * 布局特点：
 * - 大图居中，保留完整的 MacBook 物理外壳。
 * - 底部自然溢出画布约 8-12% 形成沉浸感，并用渐变遮罩收口。
 * 
 * @param devicePath 设备素材路径
 * @param index 幻灯片索引
 * @param config 自定义配置
 */
export function makeMacFramedSingleSlide(devicePath: string, index: number, config?: import("./MacOsGenerator").MacSlideConfig): SlideDef {
  return {
    id: COPY.en[index].id,
    component: ({ cW, cH, locale, theme }) => {
      const copy = COPY[locale][index];
      const isHero = index === 0;

      // 如果提供了 config.primaryScreen，则使用它，否则默认使用 copy.screen
      const primaryScreen = config?.primaryScreen ?? copy.screen;

      // Hero（index=0）：顶部 App 图标 + 大标题；其余：顶部标题
      const macW = isHero ? 68 : 66;
      const macLeft = (100 - macW) / 2;
      const textW = isHero ? 70 : 62;
      const textLeft = (100 - textW) / 2;

      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop canvas={theme.canvas} canvasAlt={theme.canvasAlt} accent={theme.accent} />

          {/* 顶部居中文字区 */}
          <div style={{
            position: "absolute",
            top: isHero ? "6%" : "7%",
            left: `${textLeft}%`,
            width: `${textW}%`,
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            {isHero && (
              <img
                src={img("/app-icon.png")}
                alt="wizju"
                style={{
                  width: cW * 0.058,
                  height: cW * 0.058,
                  borderRadius: cW * 0.012,
                  marginBottom: cW * 0.028,
                  boxShadow: `0 ${cW * 0.010}px ${cW * 0.036}px ${theme.accent}55`,
                }}
                draggable={false}
              />
            )}
            <Caption
              label={copy.label}
              headline={copy.headline}
              note={copy.note}
              theme={theme}
              isLeft={false}
              isHero={isHero}
            />
          </div>

          {/* MacBook 居中大图，底部自然溢出画布 */}
          <MacBookFrame
            devicePath={devicePath}
            alt={copy.label}
            locale={locale}
            screen={primaryScreen}
            theme={theme}
            showFrame={true}
            style={{
              position: "absolute",
              left: `${macLeft}%`,
              width: `${macW}%`,
              top: isHero ? "43%" : "41%",
              zIndex: 20,
            }}
          />

          {/* 底部渐变收口：柔化 MacBook 底部溢出边缘 */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "24%",
            background: `linear-gradient(to top, ${theme.bg} 0%, transparent 100%)`,
            zIndex: 25,
            pointerEvents: "none",
          }} />
        </div>
      );
    },
  };
}
