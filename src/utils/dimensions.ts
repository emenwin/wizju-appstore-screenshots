import { MK_RATIO, TAB_P_RATIO, TAB_L_RATIO, IPAD_RATIO, MB_RATIO } from "../constants";

/**
 * 计算 iPhone 设备在画布上的相对宽度比例
 * @param cW 画布宽度
 * @param cH 画布高度
 * @param clamp 最大宽度限制 (默认 0.84)
 * @returns {number} 宽度占比 (0-1)
 */
export function phoneW(cW: number, cH: number, clamp = 0.84): number {
  return Math.min(clamp, 0.72 * (cH / cW) * MK_RATIO);
}

/**
 * 计算 Android 平板（竖屏）在画布上的相对宽度比例
 * @param cW 画布宽度
 * @param cH 画布高度
 * @param clamp 最大宽度限制 (默认 0.8)
 * @returns {number} 宽度占比 (0-1)
 */
export function tabletPW(cW: number, cH: number, clamp = 0.8): number {
  return Math.min(clamp, 0.72 * (cH / cW) * TAB_P_RATIO);
}

/**
 * 计算 Android 平板（横屏）在画布上的相对宽度比例
 * @param cW 画布宽度
 * @param cH 画布高度
 * @param clamp 最大宽度限制 (默认 0.62)
 * @returns {number} 宽度占比 (0-1)
 */
export function tabletLW(cW: number, cH: number, clamp = 0.62): number {
  return Math.min(clamp, 0.75 * (cH / cW) * TAB_L_RATIO);
}

/**
 * 计算 iPad 在画布上的相对宽度比例
 * @param cW 画布宽度
 * @param cH 画布高度
 * @param clamp 最大宽度限制 (默认 0.75)
 * @returns {number} 宽度占比 (0-1)
 */
export function ipadW(cW: number, cH: number, clamp = 0.75): number {
  return Math.min(clamp, 0.72 * (cH / cW) * IPAD_RATIO);
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
