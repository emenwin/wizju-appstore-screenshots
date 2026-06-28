"use client";

import React, { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";

import { Device, Orientation, Locale, ThemeId } from "../types";
import {
  W, H, IPAD_W, IPAD_H, AW, AH,
  AT7P_W, AT7P_H, AT7L_W, AT7L_H,
  AT10P_W, AT10P_H, AT10L_W, AT10L_H,
  FGW, FGH, MB_W, MB_H,
  IPHONE_SIZES, IPAD_SIZES, ANDROID_SIZES,
  ANDROID_7P_SIZES, ANDROID_7L_SIZES, ANDROID_10P_SIZES, ANDROID_10L_SIZES,
  FG_SIZES, MACOS_SIZES, LOCALES, UI_TEXT, THEMES
} from "../constants";
import { preloadAllImages } from "../utils/image";
import { ScreenshotPreview } from "../components/slides/ScreenshotPreview";
import {
  IPHONE_SLIDES, IPAD_SLIDES, ANDROID_SLIDES,
  ANDROID_7P_SLIDES, ANDROID_10P_SLIDES,
  ANDROID_7L_SLIDES, ANDROID_10L_SLIDES, MACOS_SLIDES, MACOS_FRAMELESS_SLIDES, FEATURE_GRAPHIC_SLIDE
} from "../components/slides/SlideGenerators";

/*
 * 通用内联样式片段：引用 Geist CSS 变量，随 <html data-theme> 切换 dark / light。
 * 集中维护以避免散落各处的重复样式，并保证全站色彩 100% 来自 Geist token。
 */
const selectStyle: React.CSSProperties = {
  fontSize: 12,
  border: "1px solid var(--gray-alpha-400)",
  borderRadius: 6,
  padding: "5px 10px",
  background: "var(--background-200)",
  color: "var(--gray-1000)",
};

// 分段控件轨道：半透明灰底
const segmentTrackStyle: React.CSSProperties = {
  display: "flex",
  gap: 4,
  background: "var(--gray-alpha-100)",
  borderRadius: 8,
  padding: 4,
  flexShrink: 0,
};

/**
 * 生成分段按钮的内联样式。
 * 选中态：灰-alpha-300 底 + accent 文字；未选中：透明底 + gray-900 文字。
 */
function segmentButtonStyle(active: boolean): React.CSSProperties {
  return {
    padding: "4px 14px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 700,
    whiteSpace: "nowrap",
    background: active ? "var(--gray-alpha-300)" : "transparent",
    color: active ? "var(--accent)" : "var(--gray-900)",
  };
}

export default function ScreenshotsPage() {
  const [ready, setReady] = useState(false);
  const [device, setDevice] = useState<Device>("iphone");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [locale, setLocale] = useState<Locale>("zh-Hans");
  // 主题标识：仅 dark / light 两种模式（Geist 设计系统）
  const [themeId, setThemeId] = useState<ThemeId>("dark");
  const [sizeIdx, setSizeIdx] = useState(0);
  const [exporting, setExporting] = useState<string | null>(null);
  const [showMacFrame, setShowMacFrame] = useState(true);
  const exportRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    preloadAllImages().then(() => setReady(true));
  }, []);

  // 同步外壳 data-theme：themeId 同时驱动外壳 CSS 变量与截图内容 THEMES[themeId]
  useEffect(() => {
    document.documentElement.dataset.theme = themeId;
  }, [themeId]);

  const theme = THEMES[themeId];
  const isTablet = device === "android-7" || device === "android-10";

  // 设备、方向和导出尺寸一起决定当前渲染的画布与幻灯片集合。
  const { cW, cH, currentSizes, slides } = (() => {
    if (device === "android-7") {
      return orientation === "landscape"
        ? { cW: AT7L_W, cH: AT7L_H, currentSizes: ANDROID_7L_SIZES, slides: ANDROID_7L_SLIDES }
        : { cW: AT7P_W, cH: AT7P_H, currentSizes: ANDROID_7P_SIZES, slides: ANDROID_7P_SLIDES };
    }
    if (device === "android-10") {
      return orientation === "landscape"
        ? { cW: AT10L_W, cH: AT10L_H, currentSizes: ANDROID_10L_SIZES, slides: ANDROID_10L_SLIDES }
        : { cW: AT10P_W, cH: AT10P_H, currentSizes: ANDROID_10P_SIZES, slides: ANDROID_10P_SLIDES };
    }
    if (device === "android") return { cW: AW, cH: AH, currentSizes: ANDROID_SIZES, slides: ANDROID_SLIDES };
    if (device === "ipad") return { cW: IPAD_W, cH: IPAD_H, currentSizes: IPAD_SIZES, slides: IPAD_SLIDES };
    if (device === "macos") return { cW: MB_W, cH: MB_H, currentSizes: MACOS_SIZES, slides: showMacFrame ? MACOS_SLIDES : MACOS_FRAMELESS_SLIDES };
    if (device === "feature-graphic") return { cW: FGW, cH: FGH, currentSizes: FG_SIZES, slides: [FEATURE_GRAPHIC_SLIDE] };
    return { cW: W, cH: H, currentSizes: IPHONE_SIZES, slides: IPHONE_SLIDES };
  })();

  async function captureSlide(el: HTMLElement, targetW: number, targetH: number): Promise<string> {
    const originalLeft = el.style.left;
    const originalOpacity = el.style.opacity;
    const originalZIndex = el.style.zIndex;
    const scaleX = targetW / cW;
    const scaleY = targetH / cH;

    el.style.left = "0px";
    el.style.opacity = "1";
    el.style.zIndex = "-1";

    const opts = {
      width: targetW,
      height: targetH,
      pixelRatio: 1,
      cacheBust: true,
      style: {
        transform: `scale(${scaleX}, ${scaleY})`,
        transformOrigin: "top left",
        width: `${cW}px`,
        height: `${cH}px`,
      },
    };

    await toPng(el, opts);
    const dataUrl = await toPng(el, opts);

    el.style.left = originalLeft;
    el.style.opacity = originalOpacity;
    el.style.zIndex = originalZIndex;

    return dataUrl;
  }

  async function exportSlide(index: number) {
    const el = exportRefs.current[index];
    const size = currentSizes[sizeIdx];
    if (!el || !size) return;
    setExporting(`${index + 1}/${slides.length}`);
    const dataUrl = await captureSlide(el, size.w, size.h);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${String(index + 1).padStart(2, "0")}-${slides[index].id}-${locale}-${size.w}x${size.h}.png`;
    a.click();
    setExporting(null);
  }

  async function exportAll() {
    const size = currentSizes[sizeIdx];
    if (!size) return;
    for (let index = 0; index < slides.length; index += 1) {
      const el = exportRefs.current[index];
      if (!el) continue;
      setExporting(`${index + 1}/${slides.length}`);
      const dataUrl = await captureSlide(el, size.w, size.h);
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${String(index + 1).padStart(2, "0")}-${slides[index].id}-${locale}-${size.w}x${size.h}.png`;
      a.click();
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    setExporting(null);
  }

  if (!ready) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--background-200)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--gray-900)", fontWeight: 700 }}>{UI_TEXT.loading}</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--background-100)", position: "relative", overflowX: "hidden" }}>
      {/* 顶部 sticky 工具栏：Geist 表面 + gray-alpha 底边框 */}
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--background-100)",
        borderBottom: "1px solid var(--gray-alpha-400)",
        display: "flex",
        alignItems: "center",
      }}>
        <div style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 16px",
          overflowX: "auto",
          minWidth: 0,
        }}>
          <span style={{ fontWeight: 800, fontSize: 14, whiteSpace: "nowrap", color: "var(--gray-1000)" }}>{UI_TEXT.title}</span>

          <select
            value={locale}
            onChange={(event) => setLocale(event.target.value as Locale)}
            className="geist-focus"
            style={selectStyle}
          >
            {LOCALES.map((item) => (
              <option key={item} value={item}>{UI_TEXT.localeName[item]}</option>
            ))}
          </select>

          {/* 主题选择器：仅 Dark / Light 两种模式 */}
          <select
            value={themeId}
            onChange={(event) => setThemeId(event.target.value as ThemeId)}
            className="geist-focus"
            style={selectStyle}
          >
            <option value="dark">{UI_TEXT.themeName.dark}</option>
            <option value="light">{UI_TEXT.themeName.light}</option>
          </select>

          <div style={segmentTrackStyle}>
            {(["iphone", "ipad", "macos", "android", "feature-graphic"] as Device[]).map((item) => (
              <button
                key={item}
                onClick={() => {
                  setDevice(item);
                  setSizeIdx(0);
                  setOrientation("portrait");
                }}
                className="geist-focus"
                style={segmentButtonStyle(device === item)}
              >
                {UI_TEXT.devices[item]}
              </button>
            ))}
            <select
              value={isTablet ? device : ""}
              onChange={(event) => {
                if (event.target.value) {
                  setDevice(event.target.value as Device);
                  setSizeIdx(0);
                }
              }}
              className="geist-focus"
              style={{
                fontSize: 12,
                border: "none",
                borderRadius: 6,
                padding: "4px 10px",
                cursor: "pointer",
                background: isTablet ? "var(--gray-alpha-300)" : "transparent",
                color: isTablet ? "var(--accent)" : "var(--gray-900)",
              }}
            >
              <option value="" disabled>{UI_TEXT.androidTablet}</option>
              <option value="android-7">{UI_TEXT.devices["android-7"]}</option>
              <option value="android-10">{UI_TEXT.devices["android-10"]}</option>
            </select>
          </div>

          {device === "macos" && (
            <div style={segmentTrackStyle}>
              {([true, false] as boolean[]).map((framed) => (
                <button
                  key={String(framed)}
                  onClick={() => setShowMacFrame(framed)}
                  className="geist-focus"
                  style={segmentButtonStyle(showMacFrame === framed)}
                >
                  {framed ? "有框" : "无框"}
                </button>
              ))}
            </div>
          )}

          {isTablet && (
            <div style={segmentTrackStyle}>
              {(["portrait", "landscape"] as Orientation[]).map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setOrientation(item);
                    setSizeIdx(0);
                  }}
                  className="geist-focus"
                  style={segmentButtonStyle(orientation === item)}
                >
                  {item === "portrait" ? UI_TEXT.portrait : UI_TEXT.landscape}
                </button>
              ))}
            </div>
          )}

          <select
            value={sizeIdx}
            onChange={(event) => setSizeIdx(Number(event.target.value))}
            className="geist-focus"
            style={selectStyle}
          >
            {currentSizes.map((size, index) => (
              <option key={`${size.w}-${size.h}`} value={index}>{size.label} - {size.w}x{size.h}</option>
            ))}
          </select>
        </div>

        <div style={{ flexShrink: 0, padding: "10px 16px", borderLeft: "1px solid var(--gray-alpha-400)" }}>
          <button
            onClick={exportAll}
            disabled={!!exporting}
            className="geist-focus geist-button-primary"
            style={{
              padding: "7px 20px",
              border: "none",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 800,
              cursor: exporting ? "default" : "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {exporting ? `${UI_TEXT.exporting} ${exporting}` : UI_TEXT.exportAll}
          </button>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: cW > cH ? "repeat(auto-fill, minmax(480px, 1fr))" : "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 24,
        padding: 24,
      }}>
        {slides.map((slide, index) => (
          <ScreenshotPreview
            key={`${device}-${orientation}-${locale}-${themeId}-${slide.id}`}
            slide={slide}
            cW={cW}
            cH={cH}
            locale={locale}
            theme={theme}
            onExport={() => exportSlide(index)}
          />
        ))}
      </div>

      {/* 导出用隐藏画布：字体使用 Geist Sans，保证导出 PNG 字体一致 */}
      <div style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none", width: 0, height: 0, overflow: "hidden" }}>
        {slides.map((slide, index) => (
          <div
            key={`export-${device}-${orientation}-${locale}-${themeId}-${slide.id}`}
            ref={(el) => {
              exportRefs.current[index] = el;
            }}
            style={{
              width: cW,
              height: cH,
              position: "absolute",
              left: "-9999px",
              top: 0,
              fontFamily: "var(--font-geist-sans), sans-serif",
            }}
          >
            {slide.component({ cW, cH, locale, theme })}
          </div>
        ))}
      </div>
    </div>
  );
}
