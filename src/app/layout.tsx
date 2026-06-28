import type { Metadata } from "next";
// 引入 Vercel Geist 字体：Geist Sans 用于 UI 与正文，Geist Mono 用于代码与版本号。
// 该包通过 next/font 本地化加载 woff2，并在挂载的 className 上注入
// --font-geist-sans / --font-geist-mono 两个 CSS 变量，供全站引用。
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

// Geist Sans 字体变量类，挂到 <html> 后即可使用 var(--font-geist-sans)
const geistSans = GeistSans.variable;
// Geist Mono 字体变量类，挂到 <html> 后即可使用 var(--font-geist-mono)
const geistMono = GeistMono.variable;

export const metadata: Metadata = {
  title: "wizju · App Store Screenshot Generator",
  description: "面向个人 IPTV 与 Emby 媒体中枢定位的 wizju 应用商店截图生成器",
};

/**
 * 根布局组件。
 *
 * 设计系统：100% 采用 Vercel Geist 设计 token（详见 globals.css），仅保留 dark / light 两种模式。
 * - 默认主题为 dark（与 Geist Dark 官方一致），通过 <html data-theme="dark"> 预置，
 *   避免首屏水合前的主题闪烁。
 * - 运行时由 page.tsx 中的 useEffect 同步 document.documentElement.dataset.theme，
 *   实现用户切换 dark / light 时外壳与截图内容的联动。
 * - suppressHydrationWarning：因 data-theme 会在客户端被动态修改，
 *   关闭 <html> 属性的服务端/客户端一致性校验，避免 React 水合告警。
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans} ${geistMono} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
