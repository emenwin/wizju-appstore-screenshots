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
 * 主题标识：仅保留 Geist Dark / Light 两种模式。
 */
export type ThemeId = "dark" | "light";

/**
 * 需要截图展示的功能屏幕类型
 */
export type ScreenKind = "hub" | "xtream" | "continue" | "emby" | "favorites" | "native";

/**
 * 具体主题的类型（包含颜色、背景等属性）。
 *
 * 字段名为语义角色，取值 100% 来自 Geist 设计 token（dark / light 两套）：
 * - bg：页面 / 屏幕底色（background-100）
 * - fg：主文字（gray-1000）
 * - muted：次级文字（gray-900）
 * - panel / panelStrong：卡片表面（gray-alpha-200 / 300）
 * - border：边框（gray-alpha-400）
 * - surface1 / 2 / 3：屏幕渐变三段面（gray-100 / 200 / 300），供 MockScreen 屏幕底渐变使用
 * - frameBezel：设备外框金属边主色（gray-400），随主题联动，保证设备在画布上有清晰边缘
 * - frameDetail：设备物理细节色（灵动岛 / 摄像头 / 屏幕间隙），近黑，两套主题均保持深色
 * - frameShadow：设备外框投影（多层 rgba 阴影串），随主题强度调整
 * - brand：wizju LIVE 珊瑚红（与 App SemanticColors.live 一致）— 品牌主色
 * - accent：与 brand 同值，供 headline 强调 / 图标光晕
 * - signal：IPTV / Live 语义青；emby：Emby 语义绿
 * - canvas：幻灯片纯色背景（与 bg 一致）
 */
export type Theme = {
  bg: string;
  fg: string;
  muted: string;
  brand: string;
  accent: string;
  signal: string;
  emby: string;
  panel: string;
  panelStrong: string;
  border: string;
  surface1: string;
  surface2: string;
  surface3: string;
  frameBezel: string;
  frameDetail: string;
  frameShadow: string;
  canvas: string;
};

/**
 * 屏幕文案数据结构
 */
export type SlideCopy = {
  id: string;
  label: string;
  headline: string[];
  /** 主标题中需要 accent 强调的行索引（0-based），提升缩略图可读性 */
  emphasisLine?: number;
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
