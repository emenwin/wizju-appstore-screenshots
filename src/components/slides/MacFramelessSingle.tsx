import React from "react";
import { SlideDef } from "../../types";
import { COPY } from "../../constants";
import { img } from "../../utils/image";
import { SlideBackdrop } from "../ui/SlideBackdrop";
import { Caption } from "../ui/Caption";
import { HeroMacStage } from "../ui/HeroDeviceStage";
import { MacBookFrame } from "../frames/MacBookFrame";

/**
 * 生成单张 macOS 无框悬浮截图（单一窗口）。
 * 布局：顶部居中标题，下方大尺寸截图从底边溢出。
 */
export function makeMacFramelessSingleSlide(devicePath: string, index: number, config?: import("./MacOsGenerator").MacSlideConfig): SlideDef {
  return {
    id: COPY.en[index].id,
    component: ({ cW, cH, locale, theme }) => {
      const copy = COPY[locale][index];
      const isHero = index === 0;
      const primaryScreen = config?.primaryScreen ?? copy.screen;

      const macW = isHero ? 64 : 62;
      const macLeft = (100 - macW) / 2;
      const textW = isHero ? 58 : 54;
      const textLeft = (100 - textW) / 2;

      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop background={theme.canvas} />

          <div style={{
            position: "absolute",
            top: isHero ? "5%" : "6%",
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
                  width: cW * 0.052,
                  height: cW * 0.052,
                  borderRadius: cW * 0.011,
                  marginBottom: cW * 0.024,
                  boxShadow: `0 ${cW * 0.008}px ${cW * 0.034}px ${theme.brand}55, 0 ${cW * 0.004}px ${cW * 0.014}px rgba(0,0,0,0.2)`,
                }}
                draggable={false}
              />
            )}
            <Caption
              label={copy.label}
              headline={copy.headline}
              emphasisLine={copy.emphasisLine}
              note={copy.note}
              theme={theme}
              cW={cW}
              isLeft={false}
              isHero={isHero}
              showNote={isHero}
            />
          </div>

          {isHero ? (
            <HeroMacStage
              cW={cW}
              theme={theme}
              leftPercent={macLeft}
              widthPercent={macW}
              topPercent={42.5}
            >
              <MacBookFrame
                devicePath={devicePath}
                alt={copy.label}
                locale={locale}
                screen={primaryScreen}
                theme={theme}
                showFrame={false}
                style={{ width: "100%" }}
              />
            </HeroMacStage>
          ) : (
            <MacBookFrame
              devicePath={devicePath}
              alt={copy.label}
              locale={locale}
              screen={primaryScreen}
              theme={theme}
              showFrame={false}
              style={{
                position: "absolute",
                left: `${macLeft}%`,
                width: `${macW}%`,
                top: "42%",
                zIndex: 20,
              }}
            />
          )}

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
