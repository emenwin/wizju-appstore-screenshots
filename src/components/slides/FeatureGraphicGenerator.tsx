import React from "react";
import { SlideDef } from "../../types";
import { COPY } from "../../constants";
import { img } from "../../utils/image";
import { SlideBackdrop } from "../ui/SlideBackdrop";
import { Caption } from "../ui/Caption";

/**
 * 生成通用的特性大图（Feature Graphic）。
 * 通常用于应用商店顶部宽幅大图（如 Google Play 的 Feature Graphic）。
 * 
 * 布局特点：
 * - 左侧展示 App 图标、应用名称与一句话口号（Tagline）。
 * - 右侧展示首图的核心文案（Headline & Note）。
 */
export const FEATURE_GRAPHIC_SLIDE: SlideDef = {
  id: "feature-graphic",
  component: ({ cW, locale, theme }) => {
    // 获取核心文案，这里借用首图 (index 0) 的内容
    const copy = COPY[locale][0];
    
    // 应用一句话宣传语，根据语言环境切换
    const tagline = locale === "en"
      ? "Personal IPTV and Emby in one media hub."
      : "个人 IPTV 与 Emby，一处管理。";
      
    return (
      <div style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        background: theme.canvas,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `0 ${cW * 0.06}px`,
      }}>
        {/* 背景层 */}
        <SlideBackdrop canvas={theme.canvas} canvasAlt={theme.canvasAlt} accent={theme.accent} />
        
        {/* 左侧信息区：App 图标 + 名称 + Slogan */}
        <div style={{ display: "flex", alignItems: "center", gap: cW * 0.03, zIndex: 10 }}>
          <img
            src={img("/app-icon.png")}
            alt="wizju"
            style={{
              width: cW * 0.11,
              height: cW * 0.11,
              borderRadius: cW * 0.022,
              boxShadow: `0 ${cW * 0.012}px ${cW * 0.042}px ${theme.accent}44`,
            }}
            draggable={false}
          />
          <div>
            <div style={{ fontSize: cW * 0.052, fontWeight: 800, color: theme.fg, lineHeight: 1.08 }}>wizju</div>
            <div style={{ fontSize: cW * 0.026, color: theme.muted, marginTop: cW * 0.008, fontWeight: 700 }}>
              {tagline}
            </div>
          </div>
        </div>
        
        {/* 右侧说明区：文案展示 */}
        <div style={{ zIndex: 10, width: "38%" }}>
          <Caption label={copy.label} headline={copy.headline} note={copy.note} theme={theme} isLeft={true} />
        </div>
      </div>
    );
  },
};
