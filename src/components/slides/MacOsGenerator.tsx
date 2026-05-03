import { ScreenKind, SlideDef } from "../../types";
import { makeMacFramelessSingleSlide } from "./MacFramelessSingle";
import { makeMacFramelessCollageSlide } from "./MacFramelessCollage";
import { makeMacFramedSingleSlide } from "./MacFramedSingle";
import { makeMacFramedCollageSlide } from "./MacFramedCollage";

export interface MacSlideConfig {
  /** 是否强制使用拼贴(多窗口)布局。如果不传，则默认奇数 index 为拼贴，偶数为单窗口 */
  isCollage?: boolean;
  /** 主窗口屏幕显示的截图类型。如果不传，默认使用 COPY 对应 index 的 screen */
  primaryScreen?: ScreenKind;
  /** 辅窗口屏幕显示的截图类型（仅在拼贴布局下有效） */
  secondaryScreen?: ScreenKind;
  /** 主窗口是否在左侧（仅在拼贴布局下有效） */
  primaryOnLeft?: boolean;
}

/**
 * 组装单张 macOS 截图宣传图的路由函数。
 * 
 * 它根据配置项（是否有外框，以及是否为多窗口拼贴组合）
 * 将请求分发到对应的具体生成器中，从而保证各组件的单一职责和清晰性。
 *
 * @param devicePath 设备素材路径 (例如 "macos")
 * @param index 幻灯片索引 (0-5)
 * @param showFrame 是否显示 MacBook 设备外框
 * @param config 可选的配置对象，允许你随心所欲地覆盖拼接模式、单张使用的图片
 */
export function makeMacSlide(
  devicePath: string, 
  index: number, 
  showFrame = true,
  config?: MacSlideConfig
): SlideDef {
  // 是否使用拼贴布局：优先使用 config，否则默认奇数索引使用拼贴
  const isCollage = config?.isCollage ?? (index % 2 === 1);

  if (!showFrame) {
    if (!isCollage) {
      // 偶数（单窗口）：无框悬浮大图
      return makeMacFramelessSingleSlide(devicePath, index, config);
    } else {
      // 奇数（多窗口）：无框拼贴图
      return makeMacFramelessCollageSlide(devicePath, index, config);
    }
  } else {
    if (!isCollage) {
      // 偶数（单窗口）：有框大图
      return makeMacFramedSingleSlide(devicePath, index, config);
    } else {
      // 奇数（多窗口）：有框拼贴图
      return makeMacFramedCollageSlide(devicePath, index, config);
    }
  }
}
