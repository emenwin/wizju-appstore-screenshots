import React from "react";
import { DeviceComp, SlideDef, WidthFn } from "../../types";
import { COPY, FEATURE_PILLS } from "../../constants";
import { SlideBackdrop } from "../ui/SlideBackdrop";
import { Caption } from "../ui/Caption";

/**
 * 生成横屏设备（Android 平板横屏）宣传图。
 *
 * 布局：左侧垂直居中文案，右侧垂直居中设备或特性标签。
 */
export function makeLandscapeSlide(devicePath: string, index: number, DC: DeviceComp, widthFn: WidthFn): SlideDef {
  return {
    id: COPY.en[index].id,
    component: ({ cW, cH, locale, theme }) => {
      const copy = COPY[locale][index];
      const fw = widthFn(cW, cH, 0.58) * 100;

      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop background={theme.canvas} />

          <div style={{
            position: "absolute",
            top: "50%",
            left: "6%",
            width: "34%",
            transform: "translateY(-50%)",
            zIndex: 30,
          }}>
            <Caption
              label={copy.label}
              headline={copy.headline}
              emphasisLine={copy.emphasisLine}
              note={copy.note}
              theme={theme}
              cW={cW}
              isLeft={true}
              compact={index < 5}
              showNote={index === 0}
            />
          </div>

          {index < 5 ? (
            <DC
              devicePath={devicePath}
              alt={copy.label}
              locale={locale}
              screen={copy.screen}
              theme={theme}
              style={{
                position: "absolute",
                right: "-1%",
                top: "50%",
                width: `${fw}%`,
                transform: "translateY(-50%)",
                zIndex: 20,
              }}
            />
          ) : (
            <div style={{
              position: "absolute",
              right: "5%",
              top: "50%",
              width: "46%",
              transform: "translateY(-50%)",
              display: "flex",
              flexWrap: "wrap",
              gap: cW * 0.014,
              zIndex: 30,
            }}>
              {FEATURE_PILLS[locale].map((feature) => (
                <div key={feature} style={{
                  borderRadius: cW * 0.012,
                  padding: `${cW * 0.011}px ${cW * 0.018}px`,
                  background: theme.panelStrong,
                  border: `1px solid ${theme.border}`,
                  color: theme.fg,
                  fontSize: cW * 0.02,
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
