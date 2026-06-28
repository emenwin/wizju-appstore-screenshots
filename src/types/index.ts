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
 * - accent：主强调色（Geist blue，替代旧的橙色品牌色）
 * - signal：信号语义色（Geist teal）
 * - emby：媒体语义色（Geist green）
 * - canvas / canvasAlt：幻灯片背景渐变与叠加渐变（Geist 灰阶）
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
  surface1: string;
  surface2: string;
  surface3: string;
  frameBezel: string;
  frameDetail: string;
  frameShadow: string;
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
