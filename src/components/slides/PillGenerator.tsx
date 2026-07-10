import React from "react";
import { SlideDef } from "../../types";
import { COPY, FEATURE_PILLS } from "../../constants";
import { img } from "../../utils/image";
import { SlideBackdrop } from "../ui/SlideBackdrop";
import { Caption } from "../ui/Caption";

/**
 * 生成特性标签（Pill）收尾幻灯片。
 * 布局：上部居中图标 + 标题，下部特性标签流式排列。
 */
export function makePillSlide(): SlideDef {
  return {
    id: COPY.en[5].id,
    component: ({ cW, locale, theme }) => {
      const copy = COPY[locale][5];
      const iconSize = cW * 0.15;

      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop background={theme.canvas} />

          <div style={{
            position: "absolute",
            top: "8%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 30,
            textAlign: "center",
            width: "82%",
          }}>
            <img
              src={img("/app-icon.png")}
              alt="wizju"
              style={{
                width: iconSize,
                height: iconSize,
                borderRadius: iconSize * 0.21,
                marginBottom: cW * 0.042,
                boxShadow: `0 ${cW * 0.018}px ${cW * 0.055}px ${theme.brand}44`,
              }}
              draggable={false}
            />
            <Caption
              label={copy.label}
              headline={copy.headline}
              emphasisLine={copy.emphasisLine}
              note={copy.note}
              theme={theme}
              cW={cW}
              isLeft={false}
              showNote={false}
            />
          </div>

          <div style={{
            position: "absolute",
            left: "7%",
            right: "7%",
            bottom: "8%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: cW * 0.02,
            zIndex: 30,
          }}>
            {FEATURE_PILLS[locale].map((feature, index) => (
              <div key={feature} style={{
                borderRadius: cW * 0.016,
                padding: `${cW * 0.014}px ${cW * 0.028}px`,
                background: index < 3 ? theme.panelStrong : theme.panel,
                border: `1px solid ${theme.border}`,
                color: index < 3 ? theme.fg : theme.muted,
                fontSize: cW * 0.027,
                fontWeight: 800,
              }}>
                {feature}
              </div>
            ))}
          </div>
        </div>
      );
    },
  };
}
