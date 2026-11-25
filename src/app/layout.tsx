import type { Metadata } from "next";
import { Instrument_Serif, Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import Lottery from "@/components/Lottery";
import WelcomeDialog from "@/components/WelcomeDialog";
import "./globals.css";

// 中文字體檔很大，不預先載入
const serifTC = Noto_Serif_TC({
  variable: "--font-serif-tc",
  weight: ["400", "600", "900"],
  preload: false,
});

const sansTC = Noto_Sans_TC({
  variable: "--font-sans-tc",
  weight: ["400", "500", "700"],
  preload: false,
});

// 英文與數字用的標題字體
const display = Instrument_Serif({
  variable: "--font-display",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "寶島果園｜台南玉井愛文芒果 產地直送",
  description: "樹上熟成才採收的玉井愛文、金煌芒果，低溫冷藏宅配到府。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${serifTC.variable} ${sansTC.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {/* 全站的抽獎按鈕與視窗 */}
        <Lottery />
        {/* 第一次造訪時詢問稱呼 */}
        <WelcomeDialog />
      </body>
    </html>
  );
}
