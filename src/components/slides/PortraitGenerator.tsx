import React from "react";
import { DeviceComp, SlideDef, WidthFn } from "../../types";
import { COPY } from "../../constants";
import { img } from "../../utils/image";
import { SlideBackdrop } from "../ui/SlideBackdrop";
import { Caption } from "../ui/Caption";
import { makePillSlide } from "./PillGenerator";

/**
 * 生成竖屏设备的首张宣传图（Hero 幻灯片）。
 * 
 * 布局特点：
 * - 顶部居中：App 图标 + 核心标题、副标题
 * - 底部：设备边框与屏幕截图居中，从底部向上延伸
 *
 * @param devicePath 设备素材的路径（例如 "apple/iphone"）
 * @param DC 设备渲染组件（例如 PhoneFrame）
 * @param widthFn 计算设备宽度的函数
 */
export function makeHeroSlide(devicePath: string, DC: DeviceComp, widthFn: WidthFn): SlideDef {
  return {
    id: COPY.en[0].id,
    component: ({ cW, cH, locale, theme }) => {
      // 获取首张图的文案
      const copy = COPY[locale][0];
      // 计算设备宽度百分比
      const fw = widthFn(cW, cH) * 100;
      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          {/* 渲染渐变背景与光晕 */}
          <SlideBackdrop canvas={theme.canvas} canvasAlt={theme.canvasAlt} accent={theme.accent} />
          
          {/* 顶部文本与图标区域 */}
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
            {/* isHero=true 会应用首张图专属的排版样式 */}
            <Caption label={copy.label} headline={copy.headline} note={copy.note} theme={theme} isHero={true} />
          </div>
          
          {/* 设备渲染区域（居中） */}
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
              // 使用 translateX 居中，向下偏移隐藏设备底部部分
              transform: "translateX(-50%) translateY(8%)",
              zIndex: 20,
            }}
          />
        </div>
      );
    },
  };
}

/**
 * 生成竖屏设备的靠右布局宣传图。
 * 文案在左侧，设备在右侧。
 *
 * @param index 幻灯片索引
 * @param devicePath 设备素材路径
 * @param DC 设备渲染组件
 * @param widthFn 宽度计算函数
 */
export function makeRightDeviceSlide(index: number, devicePath: string, DC: DeviceComp, widthFn: WidthFn): SlideDef {
  return {
    id: COPY.en[index].id,
    component: ({ cW, cH, locale, theme }) => {
      const copy = COPY[locale][index];
      // 使用 0.78 作为缩放系数，使得设备比例适中
      const fw = widthFn(cW, cH, 0.78) * 100;
      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop canvas={theme.canvas} canvasAlt={theme.canvasAlt} accent={theme.accent} />
          
          {/* 左侧文本区域 */}
          <div style={{ position: "absolute", top: "8%", left: "8%", width: "78%", zIndex: 30 }}>
            <Caption label={copy.label} headline={copy.headline} note={copy.note} theme={theme} isLeft={true} />
          </div>
          
          {/* 右侧设备区域 */}
          <DC
            devicePath={devicePath}
            alt={copy.label}
            locale={locale}
            screen={copy.screen}
            theme={theme}
            style={{
              position: "absolute",
              bottom: 0,
              // 根据 index 微调右侧距离
              right: index === 1 ? "-6%" : "-2%",
              width: `${fw}%`,
              // 根据 index 微调垂直偏移
              transform: `translateY(${index === 1 ? "7%" : "5%"})`,
              zIndex: 20,
            }}
          />
        </div>
      );
    },
  };
}

/**
 * 生成竖屏设备的靠左布局宣传图。
 * 文案在右侧，设备在左侧。
 *
 * @param index 幻灯片索引
 * @param devicePath 设备素材路径
 * @param DC 设备渲染组件
 * @param widthFn 宽度计算函数
 */
export function makeLeftDeviceSlide(index: number, devicePath: string, DC: DeviceComp, widthFn: WidthFn): SlideDef {
  return {
    id: COPY.en[index].id,
    component: ({ cW, cH, locale, theme }) => {
      const copy = COPY[locale][index];
      // 使用 0.76 作为缩放系数
      const fw = widthFn(cW, cH, 0.76) * 100;
      return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          <SlideBackdrop canvas={theme.canvas} canvasAlt={theme.canvasAlt} accent={theme.accent} />
          
          {/* 右侧文本区域 */}
          <div style={{ position: "absolute", top: "7%", right: "7%", width: "56%", zIndex: 30 }}>
            <Caption label={copy.label} headline={copy.headline} note={copy.note} theme={theme} isLeft={true} />
          </div>
          
          {/* 左侧设备区域 */}
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

/**
 * 组装一组完整的竖屏设备宣传图。
 * 包含：首图、右侧设备图、左侧设备图交叉布局，以及最后一张特性标签图。
 *
 * @param devicePath 设备素材路径
 * @param DC 设备渲染组件
 * @param widthFn 宽度计算函数
 */
export function makePortraitSlides(devicePath: string, DC: DeviceComp, widthFn: WidthFn): SlideDef[] {
  return [
    makeHeroSlide(devicePath, DC, widthFn),           // 第1张：首图（居中）
    makeRightDeviceSlide(1, devicePath, DC, widthFn), // 第2张：设备在右侧
    makeLeftDeviceSlide(2, devicePath, DC, widthFn),  // 第3张：设备在左侧
    makeRightDeviceSlide(3, devicePath, DC, widthFn), // 第4张：设备在右侧
    makeLeftDeviceSlide(4, devicePath, DC, widthFn),  // 第5张：设备在左侧
    makePillSlide(),                                  // 第6张：特性标签图
  ];
}
