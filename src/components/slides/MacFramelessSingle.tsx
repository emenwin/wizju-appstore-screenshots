import React from "react";
import { SlideDef } from "../../types";
import { COPY } from "../../constants";
import { img } from "../../utils/image";
import { SlideBackdrop } from "../ui/SlideBackdrop";
import { Caption } from "../ui/Caption";
import { MacBookFrame } from "../frames/MacBookFrame";

/**
 * 生成单张 macOS 无框悬浮截图宣传图（单一窗口）。
 * 
 * 布局特点：
 * - 截图全宽大尺寸铺设，底部溢出隐藏，悬浮在居中位置。
 * - 上方居中文字。
 * - 无边框设计，更注重界面的空气感与沉浸感。
 * 
 * @param devicePath 设备素材路径
 * @param index 幻灯片索引
 * @param config 支持覆盖使用的图片
 */
export function makeMacFramelessSingleSlide(devicePath: string, index: number, config?: import("./MacOsGenerator").MacSlideConfig): SlideDef {
  return {
    id: COPY.en[index].id,
    component: ({ cW, cH, locale, theme }) => {
      const copy = COPY[locale][index];
      const isHero = index === 0;

      // 如果提供了 config.primaryScreen，则使用它，否则默认使用 copy.screen
      const primaryScreen = config?.primaryScreen ?? copy.screen;

      // 计算不同视图下的宽度与偏移百分比
      const macWfl = isHero ? 68 : 66;
      const macLeftfl = (100 - macWfl) / 2;
      const textWfl = isHero ? 70 : 62;
      const textLeftfl = (100 - textWfl) / 2;

      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop canvas={theme.canvas} canvasAlt={theme.canvasAlt} accent={theme.accent} />

          {/* 顶部居中文字区 */}
          <div style={{
            position: "absolute",
            top: isHero ? "6%" : "7%",
            left: `${textLeftfl}%`,
            width: `${textWfl}%`,
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

          {/* 无框悬浮 MacBook，底部溢出形成沉浸感 */}
          <MacBookFrame
            devicePath={devicePath}
            alt={copy.label}
            locale={locale}
            screen={primaryScreen}
            theme={theme}
            showFrame={false}
            style={{
              position: "absolute",
              left: `${macLeftfl}%`,
              width: `${macWfl}%`,
              top: isHero ? "43%" : "41%",
              zIndex: 20,
            }}
          />

          {/* 底部渐变收口：平滑过渡边缘 */}
          <div style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
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
