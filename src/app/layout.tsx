import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// 使用 Plus Jakarta Sans 字体 — 适合高端媒体应用的现代无衬线字体
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "wizju · App Store Screenshot Generator",
  description: "面向个人 IPTV 与 Emby 媒体中枢定位的 wizju 应用商店截图生成器",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{children}</body>
    </html>
  );
}
