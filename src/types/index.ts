import { ReactElement, CSSProperties } from "react";

/**
 * 支持截图的设备类型
 */
export type Device = "iphone" | "ipad" | "macos" | "android" | "android-7" | "android-10" | "feature-graphic";

/**
 * 平板等设备的屏幕方向
 */
export type Orientation = "portrait" | "landscape";

/**
 * 本地化语言枚举
 */
export type Locale = "en" | "zh-Hans";

/**
 * 主题标识
 */
export type ThemeId = "media-hub" | "signal-dark" | "native-light";

/**
 * 需要截图展示的功能屏幕类型
 */
export type ScreenKind = "hub" | "xtream" | "continue" | "emby" | "favorites" | "native";

/**
 * 具体主题的类型（包含颜色、背景等属性）
 */
export type Theme = {
  bg: string;
  fg: string;
  muted: string;
  accent: string;
  signal: string;
  emby: string;
  panel: string;
  panelStrong: string;
  border: string;
  canvas: string;
  canvasAlt: string;
};

/**
 * 屏幕文案数据结构
 */
export type SlideCopy = {
  id: string;
  label: string;
  headline: string[];
  note: string;
  screen: ScreenKind;
};

/**
 * 设备外框组件接收的通用属性
 */
export type DeviceCompProps = {
  devicePath?: string;
  alt: string;
  locale: Locale;
  screen: ScreenKind;
  style?: CSSProperties;
  theme: Theme;
};

/**
 * 设备组件类型定义
 */
export type DeviceComp = React.ComponentType<DeviceCompProps>;

/**
 * 单个截图幻灯片的组件属性
 */
export type SlideProps = { cW: number; cH: number; locale: Locale; theme: Theme };

/**
 * 定义截图幻灯片对象
 */
export type SlideDef = { id: string; component: (p: SlideProps) => ReactElement };

/**
 * 用于计算设备宽度的辅助函数类型
 */
export type WidthFn = (cW: number, cH: number, clamp?: number) => number;
