import React from "react";
import { DeviceCompProps } from "../../types";
import { MK_W, MK_H, SC_L, SC_T, SC_W, SC_H, SC_RX, SC_RY } from "../../constants";
import { ScreenContent } from "../ui/ScreenContent";

/**
 * iPhone 设备外观框架组件。
 *
 * 由早期的预渲染 mockup.png 图片外壳，改为纯 CSS 仿真的 Geist 中性灰外框：
 * - 外壳取色 100% 来自 Theme token（frameBezel 金属边 / surface3 过渡 / bg 屏幕底 /
 *   border 描边 / frameShadow 投影），随 dark / light 主题联动，避免旧版金色机身与
 *   Geist 单色体系冲突、导致导出图配色不协调。
 * - 屏幕区域沿用 mockup 时代的 SC_L/T/W/H 与 SC_RX/RY 几何常量，保证截图内容在
 *   新外框内的位置与旧版完全一致，无需重新对位。
 * - 顶部以 frameDetail 近黑色胶囊模拟"灵动岛"，作为 iPhone 的视觉识别特征。
 * - 注意：本组件仅决定机身外观与比例（MK_W / MK_H），导出 PNG 的最终像素尺寸由
 *   constants 中的画布常量（W / H、IPHONE_SIZES）控制，二者相互独立。
 * 使用 React.memo 避免同内容组件在主题 / 幻灯片切换时不必要重渲染。
 */
export const iPhoneFrame = React.memo(function iPhoneFrame({
  devicePath = "apple/iphone",
  alt,
  locale,
  screen,
  theme,
  style,
}: DeviceCompProps) {
  return (
    <div style={{ position: "relative", aspectRatio: `${MK_W}/${MK_H}`, ...style }}>
      {/* 机身外壳：Geist 灰金属渐变 + 描边 + 主题投影，圆角接近真机 */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "10% / 4.9%",
          background: `linear-gradient(160deg, ${theme.frameBezel} 0%, ${theme.surface3} 100%)`,
          boxShadow: `inset 0 0 0 1px ${theme.border}, ${theme.frameShadow}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 灵动岛：近黑色胶囊，居中贴顶，作为 iPhone 视觉标识，悬浮于屏幕之上 */}
        <div
          style={{
            position: "absolute",
            top: "6%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "22%",
            height: "3.8%",
            borderRadius: 999,
            background: theme.frameDetail,
            zIndex: 20,
          }}
        />
        {/*
         * 屏幕显示区域：沿用 SC_* 几何常量定位，bg 用 theme.bg 与画布同色，
         * 截图加载前不会出现突兀的黑底；内层 wrapper 承载 containerType 与无障碍标签。
         */}
        <div
          style={{
            position: "absolute",
            left: `${SC_L}%`,
            top: `${SC_T}%`,
            width: `${SC_W}%`,
            height: `${SC_H}%`,
            borderRadius: `${SC_RX}% / ${SC_RY}%`,
            overflow: "hidden",
            background: theme.bg,
          }}
        >
          <div aria-label={alt} style={{ width: "100%", height: "100%", containerType: "inline-size" }}>
            <ScreenContent devicePath={devicePath} locale={locale} screen={screen} alt={alt} />
          </div>
        </div>
      </div>
    </div>
  );
});
