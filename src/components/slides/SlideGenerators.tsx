import React from "react";
import { DeviceComp, Locale, SlideCopy, SlideDef, Theme, WidthFn } from "../../types";
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

function makeMacSlide(devicePath: string, index: number): SlideDef {
  return {
    id: COPY.en[index].id,
    component: ({ cW, cH, locale, theme }) => {
      const copy = COPY[locale][index];
      const fw = macbookW(cW, cH, 0.64) * 100;
      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop canvas={theme.canvas} canvasAlt={theme.canvasAlt} accent={theme.accent} />
          <div style={{
            position: "absolute",
            top: "50%",
            left: "5%",
            width: "26%",
            transform: "translateY(-50%)",
            zIndex: 30,
          }}>
            <Caption label={copy.label} headline={copy.headline} note={copy.note} theme={theme} isLeft={true} />
          </div>
          <MacBookFrame
            devicePath={devicePath}
            alt={copy.label}
            locale={locale}
            screen={copy.screen}
            theme={theme}
            style={{
              position: "absolute",
              right: "-2%",
              top: "50%",
              width: `${fw}%`,
              transform: "translateY(-50%)",
              zIndex: 20,
            }}
          />
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
export const MACOS_SLIDES = [0, 1, 2, 3, 4, 5].map((index) => makeMacSlide("macos", index));
