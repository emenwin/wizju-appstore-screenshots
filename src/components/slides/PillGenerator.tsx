import React from "react";
import { SlideDef } from "../../types";
import { COPY, FEATURE_PILLS } from "../../constants";
import { img } from "../../utils/image";
import { SlideBackdrop } from "../ui/SlideBackdrop";
import { Caption } from "../ui/Caption";

/**
 * 生成特性标签（Pill）幻灯片。
 * 通常用于竖屏设备的最后一张宣传图，展示 App 的核心特性标签池。
 * 
 * 布局特点：
 * - 顶部：App 图标 + 居中标题与副标题
 * - 底部：特性标签流式布局（前三个标签高亮显示）
 */
export function makePillSlide(): SlideDef {
  return {
    id: COPY.en[5].id,
    component: ({ cW, locale, theme }) => {
      // 获取当前语言环境下的第6张图（index=5）的文案
      const copy = COPY[locale][5];
      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          {/* 背景层：渲染渐变背景与装饰性光晕 */}
          <SlideBackdrop canvas={theme.canvas} canvasAlt={theme.canvasAlt} accent={theme.accent} />
          
          {/* 顶部内容区域：包含 App 图标与文案 */}
          <div style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 30,
            textAlign: "center",
            width: "84%",
          }}>
            <img
              src={img("/app-icon.png")}
              alt="wizju"
              style={{
                width: cW * 0.18,
                height: cW * 0.18,
                borderRadius: cW * 0.038,
                marginBottom: cW * 0.05,
                // App 图标的投影效果，颜色与主题强调色相关
                boxShadow: `0 ${cW * 0.02}px ${cW * 0.06}px ${theme.accent}44`,
              }}
              draggable={false}
            />
            <Caption label={copy.label} headline={copy.headline} note={copy.note} theme={theme} isLeft={false} />
          </div>
          
          {/* 底部特性标签（Pill）流式布局区域 */}
          <div style={{
            position: "absolute",
            left: "8%",
            right: "8%",
            bottom: "9%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: cW * 0.022,
            zIndex: 30,
          }}>
            {FEATURE_PILLS[locale].map((feature, index) => (
              <div key={feature} style={{
                borderRadius: cW * 0.018,
                padding: `${cW * 0.016}px ${cW * 0.032}px`,
                // 前三个标签使用强背景色进行高亮，其余使用普通背景色
                background: index < 3 ? theme.panelStrong : theme.panel,
                border: `1px solid ${theme.border}`,
                // 高亮标签文字颜色较深/明亮，普通标签文字较暗
                color: index < 3 ? theme.fg : theme.muted,
                fontSize: cW * 0.029,
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
