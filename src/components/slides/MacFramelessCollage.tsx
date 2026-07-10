import React from "react";
import { ScreenKind, SlideDef } from "../../types";
import { COPY } from "../../constants";
import { SlideBackdrop } from "../ui/SlideBackdrop";
import { Caption } from "../ui/Caption";
import { MacBookFrame } from "../frames/MacBookFrame";

/**
 * 生成多窗口拼贴的 macOS 无框截图。
 * 布局：顶部居中紧凑标题，下方双窗口层叠悬浮。
 */
export function makeMacFramelessCollageSlide(devicePath: string, index: number, config?: import("./MacOsGenerator").MacSlideConfig): SlideDef {
  return {
    id: COPY.en[index].id,
    component: ({ cW, cH, locale, theme }) => {
      const copy = COPY[locale][index];
      const primaryScreen = config?.primaryScreen ?? copy.screen;

      const defaultSecondaryScreens: Record<number, ScreenKind> = {
        1: "hub",
        3: "hub",
        5: "favorites",
      };
      const flSecondaryScreen = config?.secondaryScreen ?? defaultSecondaryScreens[index] ?? "hub";
      const primaryOnLeftFL = config?.primaryOnLeft ?? (index === 3);

      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop background={theme.canvas} />

          <div style={{
            position: "absolute",
            top: "4.5%",
            left: "22%",
            width: "56%",
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <Caption
              label={copy.label}
              headline={copy.headline}
              emphasisLine={copy.emphasisLine}
              note={copy.note}
              theme={theme}
              cW={cW}
              isLeft={false}
              compact={true}
              showNote={false}
            />
          </div>

          <MacBookFrame
            devicePath={devicePath}
            alt={copy.label}
            locale={locale}
            screen={flSecondaryScreen}
            theme={theme}
            showFrame={false}
            style={{
              position: "absolute",
              ...(primaryOnLeftFL ? { right: "-2%" } : { left: "-2%" }),
              top: "48%",
              width: "42%",
              zIndex: 15,
              opacity: 0.45,
              filter: "brightness(0.55)",
              transform: primaryOnLeftFL
                ? "translateY(-12%) rotate(-2.5deg)"
                : "translateY(-12%) rotate(2.5deg)",
            }}
          />

          <MacBookFrame
            devicePath={devicePath}
            alt={copy.label}
            locale={locale}
            screen={primaryScreen}
            theme={theme}
            showFrame={false}
            style={{
              position: "absolute",
              ...(primaryOnLeftFL ? { left: "2%" } : { right: "2%" }),
              top: "40%",
              width: "58%",
              zIndex: 20,
              transform: primaryOnLeftFL
                ? "translateY(-16%) rotate(2deg)"
                : "translateY(-16%) rotate(-2deg)",
            }}
          />

          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "20%",
            background: `linear-gradient(to top, ${theme.bg} 0%, transparent 100%)`,
            zIndex: 25,
            pointerEvents: "none",
          }} />
        </div>
      );
    },
  };
}
