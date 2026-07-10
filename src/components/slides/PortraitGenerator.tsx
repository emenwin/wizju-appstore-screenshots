import React from "react";
import { DeviceComp, SlideDef, WidthFn } from "../../types";
import { COPY } from "../../constants";
import { img } from "../../utils/image";
import { SlideBackdrop } from "../ui/SlideBackdrop";
import { Caption } from "../ui/Caption";
import { HeroDeviceStage } from "../ui/HeroDeviceStage";
import { makePillSlide } from "./PillGenerator";

/**
 * 生成竖屏设备的首张宣传图（Hero 幻灯片）。
 *
 * 布局：顶部居中 App 图标 + 标题；底部 HeroDeviceStage 浮起展示设备（0° 正立 + 双层阴影）。
 */
export function makeHeroSlide(devicePath: string, DC: DeviceComp, widthFn: WidthFn): SlideDef {
  return {
    id: COPY.en[0].id,
    component: ({ cW, cH, locale, theme }) => {
      const copy = COPY[locale][0];
      const fw = widthFn(cW, cH, 0.8) * 100;
      const iconSize = cW * 0.105;

      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop background={theme.canvas} />

          <div style={{
            position: "absolute",
            top: "5.5%",
            left: "7%",
            right: "7%",
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <img
              src={img("/app-icon.png")}
              alt="wizju"
              style={{
                width: iconSize,
                height: iconSize,
                borderRadius: iconSize * 0.22,
                marginBottom: cW * 0.032,
                boxShadow: `0 ${cW * 0.014}px ${cW * 0.048}px ${theme.brand}55, 0 ${cW * 0.006}px ${cW * 0.02}px rgba(0,0,0,0.25)`,
              }}
              draggable={false}
            />
            <Caption
              label={copy.label}
              headline={copy.headline}
              emphasisLine={copy.emphasisLine}
              note={copy.note}
              theme={theme}
              cW={cW}
              isHero={true}
            />
          </div>

          <HeroDeviceStage cW={cW} cH={cH} theme={theme} widthPercent={fw}>
            <DC
              devicePath={devicePath}
              alt={copy.label}
              locale={locale}
              screen={copy.screen}
              theme={theme}
              style={{ width: "100%" }}
            />
          </HeroDeviceStage>
        </div>
      );
    },
  };
}

/**
 * 生成竖屏设备的靠右布局宣传图：文案在左，设备在右。
 */
export function makeRightDeviceSlide(index: number, devicePath: string, DC: DeviceComp, widthFn: WidthFn): SlideDef {
  return {
    id: COPY.en[index].id,
    component: ({ cW, cH, locale, theme }) => {
      const copy = COPY[locale][index];
      const fw = widthFn(cW, cH, 0.7) * 100;

      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop background={theme.canvas} />

          {/* 左侧文案区：收窄宽度，避免与右侧设备重叠 */}
          <div style={{
            position: "absolute",
            top: "9%",
            left: "7%",
            width: "44%",
            zIndex: 30,
          }}>
            <Caption
              label={copy.label}
              headline={copy.headline}
              emphasisLine={copy.emphasisLine}
              note={copy.note}
              theme={theme}
              cW={cW}
              isLeft={true}
              compact={true}
            />
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
              right: index === 1 ? "-4%" : "-1%",
              width: `${fw}%`,
              transform: `translateY(${index === 1 ? "4%" : "3%"})`,
              zIndex: 20,
            }}
          />
        </div>
      );
    },
  };
}

/**
 * 生成竖屏设备的靠左布局宣传图：文案在右，设备在左。
 */
export function makeLeftDeviceSlide(index: number, devicePath: string, DC: DeviceComp, widthFn: WidthFn): SlideDef {
  return {
    id: COPY.en[index].id,
    component: ({ cW, cH, locale, theme }) => {
      const copy = COPY[locale][index];
      const fw = widthFn(cW, cH, 0.68) * 100;

      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop background={theme.canvas} />

          {/* 右侧文案区 */}
          <div style={{
            position: "absolute",
            top: "9%",
            right: "6%",
            width: "42%",
            zIndex: 30,
          }}>
            <Caption
              label={copy.label}
              headline={copy.headline}
              emphasisLine={copy.emphasisLine}
              note={copy.note}
              theme={theme}
              cW={cW}
              isLeft={true}
              compact={true}
            />
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
              left: "-2%",
              width: `${fw}%`,
              transform: "translateY(3%)",
              zIndex: 20,
            }}
          />
        </div>
      );
    },
  };
}

/**
 * 组装竖屏设备完整宣传图集：Hero + 左右交替 + 特性标签收尾。
 */
export function makePortraitSlides(devicePath: string, DC: DeviceComp, widthFn: WidthFn): SlideDef[] {
  return [
    makeHeroSlide(devicePath, DC, widthFn),
    makeRightDeviceSlide(1, devicePath, DC, widthFn),
    makeLeftDeviceSlide(2, devicePath, DC, widthFn),
    makeRightDeviceSlide(3, devicePath, DC, widthFn),
    makeLeftDeviceSlide(4, devicePath, DC, widthFn),
    makePillSlide(),
  ];
}
