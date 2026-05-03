/**
 * 幻灯片生成器入口文件。
 * 将各种设备的宣传图生成逻辑汇总于此，便于其他组件导入使用。
 */

import { PhoneFrame } from "../frames/PhoneFrame";
import { IPadFrame } from "../frames/IPadFrame";
import { AndroidPhoneFrame } from "../frames/AndroidPhoneFrame";
import { TabletPortraitFrame } from "../frames/TabletPortraitFrame";
import { TabletLandscapeFrame } from "../frames/TabletLandscapeFrame";
import { phoneW, ipadW, tabletPW, tabletLW } from "../../utils/dimensions";

// 导入拆分后的各设备/布局生成器
import { makePortraitSlides } from "./PortraitGenerator";
import { makeLandscapeSlide } from "./LandscapeGenerator";
import { makeMacSlide } from "./MacOsGenerator";

// 导出 Feature Graphic
export { FEATURE_GRAPHIC_SLIDE } from "./FeatureGraphicGenerator";

// ========== 各设备宣传图集导出 ==========

/** iPhone 竖屏系列图集 */
export const IPHONE_SLIDES = makePortraitSlides("apple/iphone", PhoneFrame, phoneW);

/** iPad 竖屏系列图集 */
export const IPAD_SLIDES = makePortraitSlides("apple/ipad", IPadFrame, ipadW);

/** Android 手机系列图集 */
export const ANDROID_SLIDES = makePortraitSlides("android/phone", AndroidPhoneFrame, phoneW);

/** Android 7寸平板竖屏图集 */
export const ANDROID_7P_SLIDES = makePortraitSlides("android/tablet-7/portrait", TabletPortraitFrame, tabletPW);

/** Android 10寸平板竖屏图集 */
export const ANDROID_10P_SLIDES = makePortraitSlides("android/tablet-10/portrait", TabletPortraitFrame, tabletPW);

/** Android 7寸平板横屏图集 */
export const ANDROID_7L_SLIDES = [0, 1, 2, 3, 4, 5].map((index) =>
  makeLandscapeSlide("android/tablet-7/landscape", index, TabletLandscapeFrame, tabletLW)
);

/** Android 10寸平板横屏图集 */
export const ANDROID_10L_SLIDES = [0, 1, 2, 3, 4, 5].map((index) =>
  makeLandscapeSlide("android/tablet-10/landscape", index, TabletLandscapeFrame, tabletLW)
);

/** 
 * macOS 有框系列图集
 * 
 * 💡 如果你需要随意调整拼接或单张使用的图片，请取消注释下方的自定义数组写法，
 * 使用 config 参数自由覆盖默认逻辑：
 * - isCollage: 强制设为拼贴或单张
 * - primaryScreen: 强制指定主屏图片
 * - secondaryScreen: 强制指定辅屏图片（拼贴模式有效）
 * - primaryOnLeft: 强制指定主屏在左侧（拼贴模式有效）
 */
/*
export const MACOS_SLIDES = [
  makeMacSlide("macos", 0, true, { isCollage: false, primaryScreen: "hub" }),
  makeMacSlide("macos", 1, true, { isCollage: true, primaryScreen: "xtream", secondaryScreen: "emby", primaryOnLeft: true }),
  makeMacSlide("macos", 2, true, { isCollage: false, primaryScreen: "emby" }),
  makeMacSlide("macos", 3, true, { isCollage: true, primaryScreen: "favorites", secondaryScreen: "hub" }),
  makeMacSlide("macos", 4, true, { isCollage: false, primaryScreen: "continue" }),
  makeMacSlide("macos", 5, true, { isCollage: true, primaryScreen: "native", secondaryScreen: "favorites" }),
];
*/
export const MACOS_SLIDES = [
  makeMacSlide("macos", 0, true, { isCollage: false, primaryScreen: "hub" }),
  makeMacSlide("macos", 1, true, { isCollage: true, primaryScreen: "xtream", secondaryScreen: "emby", primaryOnLeft: true }),
  makeMacSlide("macos", 2, true, { isCollage: false, primaryScreen: "emby" }),
  makeMacSlide("macos", 3, true, { isCollage: true, primaryScreen: "favorites", secondaryScreen: "continue" }),
  makeMacSlide("macos", 4, true, { isCollage: false, primaryScreen: "continue" }),
  makeMacSlide("macos", 5, true, { isCollage: true, primaryScreen: "native", secondaryScreen: "favorites" }),
];

/** 
 * macOS 无框系列图集 
 * 截图全高铺满右侧，ID 加 -fl 后缀确保切换时强制刷新以展示最新效果。
 */
export const MACOS_FRAMELESS_SLIDES = [
  { ...makeMacSlide("macos", 0, false, { isCollage: false, primaryScreen: "hub" }) },
  { ...makeMacSlide("macos", 1, false, { isCollage: true, primaryScreen: "xtream", secondaryScreen: "emby", primaryOnLeft: false }) },
  { ...makeMacSlide("macos", 2, false, { isCollage: false, primaryScreen: "emby" }) },
  { ...makeMacSlide("macos", 3, false, { isCollage: true, primaryScreen: "favorites", secondaryScreen: "continue" }) },
  { ...makeMacSlide("macos", 4, false, { isCollage: false, primaryScreen: "continue" }) },
  { ...makeMacSlide("macos", 5, false, { isCollage: true, primaryScreen: "native", secondaryScreen: "favorites" }) },
].map(slide => ({ ...slide, id: `${slide.id}-fl` }));
