import { DEFAULT_LOCALE } from "./locale";
import { DEFAULT_THEME_ID, PROJECT_SCHEMA_VERSION } from "./constants";
import type { Device, Platform, ProjectState, Slide } from "./types";

let _id = 0;
export const nid = () => `s_${Date.now().toString(36)}_${(_id++).toString(36)}`;

const en = (s: string) => ({ [DEFAULT_LOCALE]: s });

function makeStarterSlides(): Slide[] {
  return [
    {
      id: nid(),
      layout: "hero",
      label: en("MEET YOUR APP"),
      headline: en("Sell one\nidea per slide."),
      screenshot: "",
    },
    {
      id: nid(),
      layout: "device-bottom",
      label: en("FEATURE 01"),
      headline: en("Your headline\nlives here."),
      screenshot: "",
    },
    {
      id: nid(),
      layout: "two-devices",
      label: en("FEATURE 02"),
      headline: en("Show two\nscreens at once."),
      screenshot: "",
      screenshotSecondary: "",
    },
    {
      id: nid(),
      layout: "device-top",
      label: en("FEATURE 03"),
      headline: en("Flip the contrast\nfor visual rhythm."),
      screenshot: "",
      inverted: true,
    },
    {
      id: nid(),
      layout: "no-device",
      label: en("MORE"),
      headline: en("And so\nmuch more."),
      screenshot: "",
    },
  ];
}

function ipadStarter(): Slide[] {
  return [
    {
      id: nid(),
      layout: "hero",
      label: en("MEET YOUR APP"),
      headline: en("Made for\nthe big screen."),
      screenshot: "",
    },
    {
      id: nid(),
      layout: "device-bottom",
      label: en("FEATURE 01"),
      headline: en("Built for\nfocus."),
      screenshot: "",
    },
    {
      id: nid(),
      layout: "device-top",
      label: en("FEATURE 02"),
      headline: en("Always within reach."),
      screenshot: "",
      inverted: true,
    },
  ];
}

function tabletStarter(kind: "7" | "10"): Slide[] {
  return [
    {
      id: nid(),
      layout: "hero",
      label: en("MEET YOUR APP"),
      headline: en(kind === "7" ? "Pocket-sized\npower." : "Made for\nthe big screen."),
      screenshot: "",
    },
    {
      id: nid(),
      layout: "split-landscape",
      label: en("FEATURE 01"),
      headline: en("Wide canvas,\nbigger ideas."),
      screenshot: "",
    },
  ];
}

function fgStarter(): Slide[] {
  return [
    {
      id: nid(),
      layout: "feature-graphic",
      label: {},
      headline: en("Your tagline goes here."),
      screenshot: "",
    },
  ];
}

/** macOS starter：MacBook 默认布局 + mac-window 窗口变体 + 纯文案页 */
function macStarter(): Slide[] {
  return [
    {
      id: nid(),
      layout: "hero",
      label: en("MEET YOUR APP"),
      headline: en("Made for\nMac."),
      screenshot: "",
    },
    {
      id: nid(),
      layout: "device-bottom",
      label: en("FEATURE 01"),
      headline: en("Big screen,\nbigger focus."),
      screenshot: "",
    },
    {
      id: nid(),
      layout: "mac-window",
      label: en("FEATURE 02"),
      headline: en("Your window\nto media."),
      screenshot: "",
    },
    {
      id: nid(),
      layout: "no-device",
      label: en("MORE"),
      headline: en("And so\nmuch more."),
      screenshot: "",
      inverted: true,
    },
  ];
}

export const DEFAULT_PROJECT: ProjectState = {
  schemaVersion: PROJECT_SCHEMA_VERSION,
  appName: "My App",
  themeId: DEFAULT_THEME_ID,
  connectedCanvas: true,
  locales: [DEFAULT_LOCALE],
  locale: DEFAULT_LOCALE,
  device: "iphone",
  orientation: "portrait",
  appIcon: "",
  slidesByDevice: {
    iphone: makeStarterSlides(),
    android: makeStarterSlides(),
    ipad: ipadStarter(),
    mac: macStarter(),
    "android-7": tabletStarter("7"),
    "android-10": tabletStarter("10"),
    "feature-graphic": fgStarter(),
  },
};

export function newSlide(layout: Slide["layout"] = "device-bottom"): Slide {
  return {
    id: nid(),
    layout,
    label: en("NEW"),
    headline: en("Edit this\nheadline."),
    screenshot: "",
  };
}

export function detectPlatform(device: Device): Platform {
  if (device === "mac") return "macos";
  return device === "iphone" || device === "ipad" ? "ios" : "android";
}
