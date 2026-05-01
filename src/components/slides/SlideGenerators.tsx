import React from "react";
import { DeviceComp, Locale, ScreenKind, SlideCopy, SlideDef, Theme, WidthFn } from "../../types";
import { COPY, FEATURE_PILLS } from "../../constants";
import { img } from "../../utils/image";
import { SlideBackdrop } from "../ui/SlideBackdrop";
import { Caption } from "../ui/Caption";
import { PhoneFrame } from "../frames/PhoneFrame";
import { IPadFrame } from "../frames/IPadFrame";
import { AndroidPhoneFrame } from "../frames/AndroidPhoneFrame";
import { TabletPortraitFrame } from "../frames/TabletPortraitFrame";
import { TabletLandscapeFrame } from "../frames/TabletLandscapeFrame";
import { MacBookFrame } from "../frames/MacBookFrame";
import { phoneW, ipadW, tabletPW, tabletLW, macbookW } from "../../utils/dimensions";

function makeHeroSlide(devicePath: string, DC: DeviceComp, widthFn: WidthFn): SlideDef {
  return {
    id: COPY.en[0].id,
    component: ({ cW, cH, locale, theme }) => {
      const copy = COPY[locale][0];
      const fw = widthFn(cW, cH) * 100;
      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop canvas={theme.canvas} canvasAlt={theme.canvasAlt} accent={theme.accent} />
          <div style={{ position: "absolute", top: "7%", left: "8%", right: "8%", zIndex: 30 }}>
            <img
              src={img("/app-icon.png")}
              alt="wizju"
              style={{
                width: cW * 0.13,
                height: cW * 0.13,
                borderRadius: cW * 0.028,
                marginBottom: cW * 0.04,
                boxShadow: `0 ${cW * 0.016}px ${cW * 0.05}px ${theme.accent}44`,
              }}
              draggable={false}
            />
            <Caption label={copy.label} headline={copy.headline} note={copy.note} theme={theme} isHero={true} />
          </div>
          <DC
            devicePath={devicePath}
            alt={copy.label}
            locale={locale}
            screen={copy.screen}
            theme={theme}
            style={{
              position: "absolute",
              bottom: 0,
              width: `${fw}%`,
              left: "50%",
              transform: "translateX(-50%) translateY(8%)",
              zIndex: 20,
            }}
          />
        </div>
      );
    },
  };
}

function makeRightDeviceSlide(index: number, devicePath: string, DC: DeviceComp, widthFn: WidthFn): SlideDef {
  return {
    id: COPY.en[index].id,
    component: ({ cW, cH, locale, theme }) => {
      const copy = COPY[locale][index];
      const fw = widthFn(cW, cH, 0.78) * 100;
      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop canvas={theme.canvas} canvasAlt={theme.canvasAlt} accent={theme.accent} />
          <div style={{ position: "absolute", top: "8%", left: "8%", width: "78%", zIndex: 30 }}>
            <Caption label={copy.label} headline={copy.headline} note={copy.note} theme={theme} isLeft={true} />
          </div>
          <DC
            devicePath={devicePath}
            alt={copy.label}
            locale={locale}
            screen={copy.screen}
            theme={theme}
            style={{
              position: "absolute",
              bottom: 0,
              right: index === 1 ? "-6%" : "-2%",
              width: `${fw}%`,
              transform: `translateY(${index === 1 ? "7%" : "5%"})`,
              zIndex: 20,
            }}
          />
        </div>
      );
    },
  };
}

function makeLeftDeviceSlide(index: number, devicePath: string, DC: DeviceComp, widthFn: WidthFn): SlideDef {
  return {
    id: COPY.en[index].id,
    component: ({ cW, cH, locale, theme }) => {
      const copy = COPY[locale][index];
      const fw = widthFn(cW, cH, 0.76) * 100;
      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop canvas={theme.canvas} canvasAlt={theme.canvasAlt} accent={theme.accent} />
          <div style={{ position: "absolute", top: "7%", right: "7%", width: "56%", zIndex: 30 }}>
            <Caption label={copy.label} headline={copy.headline} note={copy.note} theme={theme} isLeft={true} />
          </div>
          <DC
            devicePath={devicePath}
            alt={copy.label}
            locale={locale}
            screen={copy.screen}
            theme={theme}
            style={{
              position: "absolute",
              bottom: 0,
              left: "-4%",
              width: `${fw}%`,
              transform: "translateY(6%)",
              zIndex: 20,
            }}
          />
        </div>
      );
    },
  };
}

function makePillSlide(): SlideDef {
  return {
    id: COPY.en[5].id,
    component: ({ cW, locale, theme }) => {
      const copy = COPY[locale][5];
      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop canvas={theme.canvas} canvasAlt={theme.canvasAlt} accent={theme.accent} />
          <div style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 30,
            textAlign: "center",
            width: "84%",
          }}>
            <img
              src={img("/app-icon.png")}
              alt="wizju"
              style={{
                width: cW * 0.18,
                height: cW * 0.18,
                borderRadius: cW * 0.038,
                marginBottom: cW * 0.05,
                boxShadow: `0 ${cW * 0.02}px ${cW * 0.06}px ${theme.accent}44`,
              }}
              draggable={false}
            />
            <Caption label={copy.label} headline={copy.headline} note={copy.note} theme={theme} isLeft={false} />
          </div>
          <div style={{
            position: "absolute",
            left: "8%",
            right: "8%",
            bottom: "9%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: cW * 0.022,
            zIndex: 30,
          }}>
            {FEATURE_PILLS[locale].map((feature, index) => (
              <div key={feature} style={{
                borderRadius: cW * 0.018,
                padding: `${cW * 0.016}px ${cW * 0.032}px`,
                background: index < 3 ? theme.panelStrong : theme.panel,
                border: `1px solid ${theme.border}`,
                color: index < 3 ? theme.fg : theme.muted,
                fontSize: cW * 0.029,
                fontWeight: 800,
              }}>
                {feature}
              </div>
            ))}
          </div>
        </div>
      );
    },
  };
}

function makeLandscapeSlide(devicePath: string, index: number, DC: DeviceComp, widthFn: WidthFn): SlideDef {
  return {
    id: COPY.en[index].id,
    component: ({ cW, cH, locale, theme }) => {
      const copy = COPY[locale][index];
      const fw = widthFn(cW, cH) * 100;
      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop canvas={theme.canvas} canvasAlt={theme.canvasAlt} accent={theme.accent} />
          <div style={{
            position: "absolute",
            top: "50%",
            left: "5%",
            width: "36%",
            transform: "translateY(-50%)",
            zIndex: 30,
          }}>
            <Caption label={copy.label} headline={copy.headline} note={copy.note} theme={theme} isLeft={true} />
          </div>
          {index < 5 ? (
            <DC
              devicePath={devicePath}
              alt={copy.label}
              locale={locale}
              screen={copy.screen}
              theme={theme}
              style={{
                position: "absolute",
                right: "-3%",
                top: "50%",
                width: `${fw}%`,
                transform: "translateY(-50%)",
                zIndex: 20,
              }}
            />
          ) : (
            <div style={{
              position: "absolute",
              right: "6%",
              top: "50%",
              width: "48%",
              transform: "translateY(-50%)",
              display: "flex",
              flexWrap: "wrap",
              gap: cW * 0.016,
              zIndex: 30,
            }}>
              {FEATURE_PILLS[locale].map((feature) => (
                <div key={feature} style={{
                  borderRadius: cW * 0.012,
                  padding: `${cW * 0.012}px ${cW * 0.02}px`,
                  background: theme.panelStrong,
                  border: `1px solid ${theme.border}`,
                  color: theme.fg,
                  fontSize: cW * 0.021,
                  fontWeight: 800,
                }}>
                  {feature}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    },
  };
}

/**
 * 生成单张 macOS 截图幻灯片。
 *
 * 支持两种布局：
 * - 有框（showFrame=true）：左侧说明文字 + 右侧 MacBook 外壳截图，首帧额外展示 App 图标。
 * - 无框（showFrame=false）：截图占右侧 60% 全高铺满，左侧渐变过渡到说明文字，
 *   视觉更开阔、更杂志感。
 */
function makeMacSlide(devicePath: string, index: number, showFrame = true): SlideDef {
  return {
    id: COPY.en[index].id,
    component: ({ cW, cH, locale, theme }) => {
      const copy = COPY[locale][index];
      const isHero = index === 0;

      if (!showFrame) {
        // 无框模式复用 Style 3 / Style 4 布局，MacBook 以悬浮阴影方式展现，更有空气感

        // 多窗口拼贴时使用的次要截图屏幕（与有框版保持一致）
        const flSecondaryScreens: Record<number, ScreenKind> = {
          1: "hub",
          3: "hub",
          5: "favorites",
        };
        const isCollageFL = index % 2 === 1;
        const primaryOnLeftFL = index === 3;

        const macWfl = isHero ? 68 : 66;
        const macLeftfl = (100 - macWfl) / 2;
        const textWfl = isHero ? 70 : 62;
        const textLeftfl = (100 - textWfl) / 2;

        if (!isCollageFL) {
          // Style 3（无框版）：截图居中悬浮 + 上方文字
          return (
            <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
              <SlideBackdrop canvas={theme.canvas} canvasAlt={theme.canvasAlt} accent={theme.accent} />

              {/* 顶部居中文字区 */}
              <div style={{
                position: "absolute",
                top: isHero ? "6%" : "7%",
                left: `${textLeftfl}%`,
                width: `${textWfl}%`,
                zIndex: 30,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
                {isHero && (
                  <img
                    src={img("/app-icon.png")}
                    alt="wizju"
                    style={{
                      width: cW * 0.058,
                      height: cW * 0.058,
                      borderRadius: cW * 0.012,
                      marginBottom: cW * 0.028,
                      boxShadow: `0 ${cW * 0.010}px ${cW * 0.036}px ${theme.accent}55`,
                    }}
                    draggable={false}
                  />
                )}
                <Caption
                  label={copy.label}
                  headline={copy.headline}
                  note={copy.note}
                  theme={theme}
                  isLeft={false}
                  isHero={isHero}
                />
              </div>

              {/* 无框悬浮 MacBook，底部溢出形成沉浸感 */}
              <MacBookFrame
                devicePath={devicePath}
                alt={copy.label}
                locale={locale}
                screen={copy.screen}
                theme={theme}
                showFrame={false}
                style={{
                  position: "absolute",
                  left: `${macLeftfl}%`,
                  width: `${macWfl}%`,
                  top: isHero ? "43%" : "41%",
                  zIndex: 20,
                }}
              />

              {/* 底部渐变收口 */}
              <div style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                height: "24%",
                background: `linear-gradient(to top, ${theme.bg} 0%, transparent 100%)`,
                zIndex: 25,
                pointerEvents: "none",
              }} />
            </div>
          );
        }

        // Style 4（无框版）：多窗口拼贴，截图以悬浮阴影叠层展示
        const flSecondaryScreen = flSecondaryScreens[index] ?? ("hub" as ScreenKind);
        return (
          <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
            <SlideBackdrop canvas={theme.canvas} canvasAlt={theme.canvasAlt} accent={theme.accent} />

            {/* 顶部居中文字 */}
            <div style={{
              position: "absolute",
              top: "7%",
              left: "20%",
              width: "60%",
              zIndex: 30,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
              <Caption
                label={copy.label}
                headline={copy.headline}
                note={copy.note}
                theme={theme}
                isLeft={false}
                isHero={false}
              />
            </div>

            {/* 次要窗口：低亮度悬浮，制造景深层次 */}
            <MacBookFrame
              devicePath={devicePath}
              alt={copy.label}
              locale={locale}
              screen={flSecondaryScreen}
              theme={theme}
              showFrame={false}
              style={{
                position: "absolute",
                ...(primaryOnLeftFL ? { right: "-4%" } : { left: "-4%" }),
                top: "40%",
                width: "46%",
                zIndex: 15,
                opacity: 0.45,
                filter: "brightness(0.55)",
                transform: primaryOnLeftFL
                  ? "translateY(-32%) rotate(-3deg)"
                  : "translateY(-32%) rotate(3deg)",
              }}
            />

            {/* 主要窗口：大尺寸视觉焦点 */}
            <MacBookFrame
              devicePath={devicePath}
              alt={copy.label}
              locale={locale}
              screen={copy.screen}
              theme={theme}
              showFrame={false}
              style={{
                position: "absolute",
                ...(primaryOnLeftFL ? { left: "-1%" } : { right: "-1%" }),
                top: "29%",
                width: "62%",
                zIndex: 20,
                transform: primaryOnLeftFL
                  ? "translateY(-48%) rotate(2.5deg)"
                  : "translateY(-48%) rotate(-2.5deg)",
              }}
            />

            {/* 底部渐变收口 */}
            <div style={{
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              height: "22%",
              background: `linear-gradient(to top, ${theme.bg} 0%, transparent 100%)`,
              zIndex: 25,
              pointerEvents: "none",
            }} />
          </div>
        );
      }

      // ── 有框模式：根据 index 选择两种高质感布局 ──
      // 偶数（0, 2, 4）→ Style 3：大图居中 + 上方标题，MacBook 底部自然溢出
      // 奇数（1, 3, 5）→ Style 4：多窗口拼贴，主窗口突出，次要窗口辅助背景，类 Setapp 质感

      // 多窗口拼贴时使用的次要截图屏幕（与当前功能形成内容互补）
      const secondaryScreens: Record<number, ScreenKind> = {
        1: "hub",
        3: "hub",
        5: "favorites",
      };

      const isCollage = index % 2 === 1;

      if (!isCollage) {
        // ── Style 3: 大图居中 + 上方文字 ──
        // Hero（index=0）：顶部 App 图标 + 大标题；其余：顶部标题
        const macW = isHero ? 68 : 66;
        const macLeft = (100 - macW) / 2;
        const textW = isHero ? 70 : 62;
        const textLeft = (100 - textW) / 2;
        return (
          <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
            <SlideBackdrop canvas={theme.canvas} canvasAlt={theme.canvasAlt} accent={theme.accent} />

            {/* 顶部居中文字区 */}
            <div style={{
              position: "absolute",
              top: isHero ? "6%" : "7%",
              left: `${textLeft}%`,
              width: `${textW}%`,
              zIndex: 30,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
              {isHero && (
                <img
                  src={img("/app-icon.png")}
                  alt="wizju"
                  style={{
                    width: cW * 0.058,
                    height: cW * 0.058,
                    borderRadius: cW * 0.012,
                    marginBottom: cW * 0.028,
                    boxShadow: `0 ${cW * 0.010}px ${cW * 0.036}px ${theme.accent}55`,
                  }}
                  draggable={false}
                />
              )}
              <Caption
                label={copy.label}
                headline={copy.headline}
                note={copy.note}
                theme={theme}
                isLeft={false}
                isHero={isHero}
              />
            </div>

            {/* MacBook 居中大图，底部自然溢出画布约 8-12% 形成沉浸感 */}
            <MacBookFrame
              devicePath={devicePath}
              alt={copy.label}
              locale={locale}
              screen={copy.screen}
              theme={theme}
              showFrame={true}
              style={{
                position: "absolute",
                left: `${macLeft}%`,
                width: `${macW}%`,
                top: isHero ? "43%" : "41%",
                zIndex: 20,
              }}
            />

            {/* 底部渐变收口：柔化 MacBook 底部溢出边缘 */}
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "24%",
              background: `linear-gradient(to top, ${theme.bg} 0%, transparent 100%)`,
              zIndex: 25,
              pointerEvents: "none",
            }} />
          </div>
        );
      }

      // ── Style 4: 多窗口拼贴 ──
      // 上方居中文字 + 下方两个 MacBook 错层叠放
      // index=3（emby）主窗口在左；其余主窗口在右，营造视觉方向交替感
      const secondaryScreen = secondaryScreens[index] ?? ("hub" as ScreenKind);
      const primaryOnLeft = index === 3;

      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop canvas={theme.canvas} canvasAlt={theme.canvasAlt} accent={theme.accent} />

          {/* 顶部居中文字 */}
          <div style={{
            position: "absolute",
            top: "7%",
            left: "20%",
            width: "60%",
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <Caption
              label={copy.label}
              headline={copy.headline}
              note={copy.note}
              theme={theme}
              isLeft={false}
              isHero={false}
            />
          </div>

          {/* 次要窗口：辅助截图，小尺寸、低亮度、轻旋转，制造景深层次 */}
          <MacBookFrame
            devicePath={devicePath}
            alt={copy.label}
            locale={locale}
            screen={secondaryScreen}
            theme={theme}
            showFrame={true}
            style={{
              position: "absolute",
              ...(primaryOnLeft ? { right: "-4%" } : { left: "-4%" }),
              top: "40%",
              width: "46%",
              zIndex: 15,
              opacity: 0.52,
              filter: "brightness(0.6)",
              transform: primaryOnLeft
                ? "translateY(-32%) rotate(-3deg)"
                : "translateY(-32%) rotate(3deg)",
            }}
          />

          {/* 主要窗口：当前功能截图，大尺寸、高亮、轻微反向旋转，视觉焦点 */}
          <MacBookFrame
            devicePath={devicePath}
            alt={copy.label}
            locale={locale}
            screen={copy.screen}
            theme={theme}
            showFrame={true}
            style={{
              position: "absolute",
              ...(primaryOnLeft ? { left: "-1%" } : { right: "-1%" }),
              top: "29%",
              width: "62%",
              zIndex: 20,
              transform: primaryOnLeft
                ? "translateY(-48%) rotate(2.5deg)"
                : "translateY(-48%) rotate(-2.5deg)",
            }}
          />

          {/* 底部渐变收口 */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "22%",
            background: `linear-gradient(to top, ${theme.bg} 0%, transparent 100%)`,
            zIndex: 25,
            pointerEvents: "none",
          }} />
        </div>
      );
    },
  };
}

export const FEATURE_GRAPHIC_SLIDE: SlideDef = {
  id: "feature-graphic",
  component: ({ cW, locale, theme }) => {
    const copy = COPY[locale][0];
    const tagline = locale === "en"
      ? "Personal IPTV and Emby in one media hub."
      : "个人 IPTV 与 Emby，一处管理。";
    return (
      <div style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        background: theme.canvas,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `0 ${cW * 0.06}px`,
      }}>
        <SlideBackdrop canvas={theme.canvas} canvasAlt={theme.canvasAlt} accent={theme.accent} />
        <div style={{ display: "flex", alignItems: "center", gap: cW * 0.03, zIndex: 10 }}>
          <img
            src={img("/app-icon.png")}
            alt="wizju"
            style={{
              width: cW * 0.11,
              height: cW * 0.11,
              borderRadius: cW * 0.022,
              boxShadow: `0 ${cW * 0.012}px ${cW * 0.042}px ${theme.accent}44`,
            }}
            draggable={false}
          />
          <div>
            <div style={{ fontSize: cW * 0.052, fontWeight: 800, color: theme.fg, lineHeight: 1.08 }}>wizju</div>
            <div style={{ fontSize: cW * 0.026, color: theme.muted, marginTop: cW * 0.008, fontWeight: 700 }}>
              {tagline}
            </div>
          </div>
        </div>
        <div style={{ zIndex: 10, width: "38%" }}>
          <Caption label={copy.label} headline={copy.headline} note={copy.note} theme={theme} isLeft={true} />
        </div>
      </div>
    );
  },
};

function makePortraitSlides(devicePath: string, DC: DeviceComp, widthFn: WidthFn): SlideDef[] {
  return [
    makeHeroSlide(devicePath, DC, widthFn),
    makeRightDeviceSlide(1, devicePath, DC, widthFn),
    makeLeftDeviceSlide(2, devicePath, DC, widthFn),
    makeRightDeviceSlide(3, devicePath, DC, widthFn),
    makeLeftDeviceSlide(4, devicePath, DC, widthFn),
    makePillSlide(),
  ];
}

export const IPHONE_SLIDES = makePortraitSlides("apple/iphone", PhoneFrame, phoneW);
export const IPAD_SLIDES = makePortraitSlides("apple/ipad", IPadFrame, ipadW);
export const ANDROID_SLIDES = makePortraitSlides("android/phone", AndroidPhoneFrame, phoneW);
export const ANDROID_7P_SLIDES = makePortraitSlides("android/tablet-7/portrait", TabletPortraitFrame, tabletPW);
export const ANDROID_10P_SLIDES = makePortraitSlides("android/tablet-10/portrait", TabletPortraitFrame, tabletPW);
export const ANDROID_7L_SLIDES = [0, 1, 2, 3, 4, 5].map((index) => makeLandscapeSlide("android/tablet-7/landscape", index, TabletLandscapeFrame, tabletLW));
export const ANDROID_10L_SLIDES = [0, 1, 2, 3, 4, 5].map((index) => makeLandscapeSlide("android/tablet-10/landscape", index, TabletLandscapeFrame, tabletLW));
export const MACOS_SLIDES = [0, 1, 2, 3, 4, 5].map((index) => makeMacSlide("macos", index, true));

/** 无框模式幻灯片：截图全高铺满右侧，ID 加 -fl 后缀确保切换时强制刷新 */
export const MACOS_FRAMELESS_SLIDES = [0, 1, 2, 3, 4, 5].map((index) => {
  const slide = makeMacSlide("macos", index, false);
  return { ...slide, id: `${slide.id}-fl` };
});
