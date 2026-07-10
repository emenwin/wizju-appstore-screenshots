import { MK_RATIO, TAB_P_RATIO, TAB_L_RATIO, IPAD_RATIO, MB_RATIO } from "../constants";

/**
 * 计算 iPhone / Android 手机在画布上的相对宽度比例。
 * 竖屏画布越高，设备宽度占比越小，避免与顶部文案重叠。
 */
export function phoneW(cW: number, cH: number, clamp = 0.84): number {
  const aspect = cH / cW;
  const base = aspect > 2.1 ? 0.68 : aspect > 1.85 ? 0.72 : 0.76;
  return Math.min(clamp, base * aspect * MK_RATIO);
}

/**
 * 计算 Android 平板（竖屏）在画布上的相对宽度比例。
 */
export function tabletPW(cW: number, cH: number, clamp = 0.8): number {
  return Math.min(clamp, 0.7 * (cH / cW) * TAB_P_RATIO);
}

/**
 * 计算 Android 平板（横屏）在画布上的相对宽度比例。
 */
export function tabletLW(cW: number, cH: number, clamp = 0.62): number {
  return Math.min(clamp, 0.72 * (cH / cW) * TAB_L_RATIO);
}

/**
 * 计算 iPad 在画布上的相对宽度比例。
 */
export function ipadW(cW: number, cH: number, clamp = 0.75): number {
  const aspect = cH / cW;
  const base = aspect > 1.35 ? 0.68 : 0.72;
  return Math.min(clamp, base * aspect * IPAD_RATIO);
}

/**
 * 计算 MacBook 在画布上的相对宽度比例
 * @param cW 画布宽度
 * @param cH 画布高度
 * @param clamp 最大宽度限制 (默认 0.78)
 * @returns {number} 宽度占比 (0-1)
 */
export function macbookW(cW: number, cH: number, clamp = 0.78): number {
  return Math.min(clamp, 0.72 * (cH / cW) * MB_RATIO);
}
