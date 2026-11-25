import Link from "next/link";
import SubscribeForm from "./SubscribeForm";

const quickLinks = [
  { href: "/#varieties", label: "品種介紹" },
  { href: "/#shop", label: "商品預覽" },
  { href: "/#schedule", label: "出貨時程" },
  { href: "/#order", label: "訂購須知" },
  { href: "/blog", label: "芒果誌" },
  { href: "/#game", label: "接芒果小遊戲" },
];

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-20 bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* 開賣通知：蒐集有興趣的 email 名單 */}
        <div
          id="notify"
          className="grid scroll-mt-20 grid-cols-12 items-end gap-y-10 border-b border-paper/15 py-16 sm:py-24 md:gap-x-8 lg:py-28"
        >
          <div className="col-span-12 md:col-span-6 lg:col-span-7">
            <p className="mb-6 font-display text-lg italic text-paper/50">Coming next summer.</p>
            <h2 className="font-serif text-4xl font-black leading-tight sm:text-6xl lg:text-7xl">
              今年夏天的
              <br />
              第一口<span className="text-yellow-400">愛文</span>。
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <p className="mb-8 leading-8 text-paper/70">
              2027 產季即將開放預購。留下 email，開賣當天第一時間通知你——每年產量有限，早一步登記，就不會錯過。
            </p>
            <SubscribeForm />
          </div>
        </div>

        {/* 手機兩欄、電腦四欄；品牌欄在手機上獨占一行 */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 sm:py-14 lg:grid-cols-4">
          <div className="max-lg:col-span-2">
            <p className="font-serif text-xl font-black">寶島果園</p>
            <p className="mt-1 font-display italic text-paper/50">Yujing Mango</p>
            <p className="mt-4 text-sm leading-7 text-paper/60">台南玉井 · 產地直送</p>
          </div>

          <div>
            <h3 className="mb-4 text-xs tracking-[0.3em] text-paper/50">目錄</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs tracking-[0.3em] text-paper/50">客服</h3>
            <ul className="space-y-2 text-sm">
              <li>hello@fruit.example</li>
              <li>LINE：@mango-example</li>
              <li>週一至週六 09:00 – 18:00</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs tracking-[0.3em] text-paper/50">配送</h3>
            <ul className="space-y-2 text-sm">
              <li>全程低溫冷藏宅配</li>
              <li>台灣本島免運</li>
              <li>外島與海外暫不配送</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-2 border-t border-paper/15 py-6 text-xs text-paper/40">
          <span>© 2026 寶島果園</span>
          <span>
            練習用網站 · 圖片來源 Unsplash、
            <a
              href="https://commons.wikimedia.org/wiki/File:Mango_Irwin_Asit_fs8.jpg"
              className="underline underline-offset-2 hover:text-paper"
            >
              Wikimedia Commons（CC BY-SA 3.0）
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
