import React from "react";
import { Theme } from "../../types";

/**
 * Caption —— 截图幻灯片的文字说明组件。
 *
 * 组件职责：
 * 在每张 App Store 截图幻灯片上，自上而下渲染三段文字层级：
 *   1) 标签胶囊（label）：小尺寸、加粗、宽字距的"眉标"，标注当前幻灯片的功能分类
 *      （如「媒体中枢」「XTREAM」「EMBY」），是视觉层级中最弱的一层。
 *   2) 主标题（headline）：超大、超粗、紧字距的卖点文案，是文字层级的焦点。
 *   3) 说明文字（note）：中等字重、宽行距的补充描述，颜色用 muted 保持层次。
 *
 * 设计取舍（对齐 Geist 单色体系 + App Store 截图可读性）：
 * - 全部颜色取自 Theme token，不使用任何品牌色 / 硬编码色值，dark / light 自动联动。
 * - 标签胶囊采用中性灰（panelStrong 底 + border 描边 + fg 文字），不再使用蓝色染色与
 *   蓝色光晕，避免与截图内容抢色，让"产品截图本身"成为画面里唯一的色彩焦点。
 * - 文字层级靠 尺寸 / 字重 / 字距 / 颜色 共同拉开，而非靠彩色装饰。
 *
 * 布局变体：
 * - isLeft=true：左对齐，宽度 80%，用于图文左右排布的幻灯片。
 * - isLeft=false：居中对齐，宽度 90%，用于图文上下排布的幻灯片。
 * - isHero=true：首屏放大版（字号、内边距、间距整体放大），用于第一张主视觉。
 *
 * 使用 React.memo 包裹：Caption 仅依赖 props，memo 可在幻灯片切换 / 主题切换时
 * 避免同内容组件的不必要重渲染，提升多幻灯片列表的渲染性能。
 */
export const Caption = React.memo(function Caption({
  label,
  headline,
  note,
  theme,
  isLeft = false,
  isHero = false,
}: {
  /** 眉标文案，如「媒体中枢」「MEDIA HUB」 */
  label: string;
  /** 主标题，按行拆分为数组，每行渲染为独立 <span>，便于控制换行与行距 */
  headline: string[];
  /** 说明文字，单段字符串 */
  note: string;
  /** 当前主题 token（dark / light），所有颜色由此派生 */
  theme: Theme;
  /** 是否左对齐（左右排布幻灯片用）；默认居中（上下排布幻灯片用） */
  isLeft?: boolean;
  /** 是否首屏放大版；默认 false */
  isHero?: boolean;
}) {
  return (
    <div
      style={{
        // 文字对齐方向：左排布幻灯片左对齐，其余居中
        textAlign: isLeft ? "left" : "center",
        // 用 flex 纵向排布三段文字，保证对齐方向一致
        display: "flex",
        flexDirection: "column",
        // 左对齐时靠左，居中时居中
        alignItems: isLeft ? "flex-start" : "center",
        // 首屏三段文字间距更大，强化主视觉呼吸感
        gap: isHero ? 36 : 26,
        // 左排布略窄（给右侧设备留位），居中排布略宽
        width: isLeft ? "80%" : "90%",
        position: "relative",
        // 抬高文字层，避免被背景渐变 / 装饰遮挡
        zIndex: 10,
      }}
    >
      {/*
       * 标签胶囊（眉标）。
       * 中性 Geist 灰配色：panelStrong 微透灰底 + border 描边 + fg 文字，无彩色光晕。
       * 圆角 999px 形成胶囊；宽字距(letter-spacing:3) + 加粗(800) 营造"标签感"。
       * isHero 时整体放大（内边距 11/30、字号 26），其余幻灯片收窄（8/22、字号 20）。
       */}
      <div
        style={{
          display: "inline-block",
          // 胶囊底色：gray-alpha-300 微透灰，仅做轻微表面区分，不抢色
          background: theme.panelStrong,
          // 文字色：gray-1000 主文字色，保证 App Store 小图预览下仍清晰可读
          color: theme.fg,
          padding: isHero ? "11px 30px" : "8px 22px",
          borderRadius: 999,
          fontSize: isHero ? 26 : 20,
          fontWeight: 800,
          letterSpacing: 3,
          // 描边：gray-alpha-400 细边，强化胶囊轮廓，保持中性
          border: `1.5px solid ${theme.border}`,
        }}
      >
        {label}
      </div>
      {/*
       * 主标题。
       * 超大（首屏 96 / 其余 82）+ 超粗(900) + 紧字距(-2) 形成强视觉冲击；
       * 颜色用 fg 主文字色，是文字层级的焦点。轻量投影增加与背景的分离感。
       * headline 为字符串数组，每行一个 <span>，便于精确控制换行与行距。
       */}
      <h1
        style={{
          margin: 0,
          fontSize: isHero ? 96 : 82,
          fontWeight: 900,
          lineHeight: 1.08,
          color: theme.fg,
          letterSpacing: -2,
          textShadow: `0 8px 40px rgba(0,0,0,0.35)`,
        }}
      >
        {headline.map((line, i) => (
          <span key={i} style={{ display: "block" }}>{line}</span>
        ))}
      </h1>
      {/*
       * 说明文字。
       * 中等字重(450) + 宽行距(1.55)，颜色用 muted(gray-900) 拉开与主标题的层次，
       * 限制 maxWidth:85% 避免单行过长影响可读性；轻微字距(0.2) 提升精致度。
       */}
      <p
        style={{
          margin: 0,
          fontSize: isHero ? 32 : 28,
          fontWeight: 450,
          color: theme.muted,
          lineHeight: 1.55,
          maxWidth: "85%",
          letterSpacing: 0.2,
        }}
      >
        {note}
      </p>
    </div>
  );
});
