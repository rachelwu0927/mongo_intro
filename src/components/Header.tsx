"use client";

import Link from "next/link";
import { useState } from "react";

// 首頁區塊用 "/#id"，從 /blog 等其他頁面點擊也能回到首頁對應位置
const links = [
  { href: "/#varieties", label: "品種" },
  { href: "/#shop", label: "商品" },
  { href: "/#schedule", label: "出貨時程" },
  { href: "/#order", label: "訂購須知" },
  { href: "/blog", label: "芒果誌" },
  { href: "/#game", label: "小遊戲" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-3">
          <span className="font-serif text-xl font-black tracking-wide">寶島果園</span>
          <span className="hidden font-display text-sm italic text-muted sm:inline md:max-lg:hidden">
            Yujing Mango
          </span>
        </Link>

        {/* 桌機版選單 */}
        <div className="hidden items-center gap-6 text-sm md:flex lg:gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="underline-offset-8 transition hover:text-accent hover:underline"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#notify"
            className="bg-ink px-5 py-2.5 text-paper transition hover:bg-accent"
          >
            開賣通知
          </a>
        </div>

        {/* 手機版選單按鈕 */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="切換選單"
          aria-expanded={open}
          className="text-sm tracking-widest md:hidden"
        >
          {open ? "關閉" : "選單"}
        </button>
      </nav>

      {/* 手機版展開選單 */}
      {open && (
        <div className="border-t border-line px-4 pb-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line py-3 font-serif text-lg"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#notify"
            onClick={() => setOpen(false)}
            className="mt-4 block bg-ink py-3 text-center tracking-widest text-paper"
          >
            登記開賣通知
          </a>
        </div>
      )}
    </header>
  );
}
