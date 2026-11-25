import Image from "next/image";
import Parallax from "./Parallax";

// 尚未開賣：價格為預計售價，按鈕導向頁尾的開賣通知表單
const products = [
  {
    id: "irwin-family",
    name: "愛文芒果 家庭箱",
    spec: "5 台斤 · 約 8–10 顆",
    price: 880,
    note: "自家吃最划算，大小不拘、一樣香甜。",
    image: "/images/mango-01.jpg",
    tag: "首推",
  },
  {
    id: "irwin-gift",
    name: "愛文芒果 精選禮盒",
    spec: "10 台斤 · 約 12–14 顆",
    price: 1680,
    note: "嚴選外觀與大小一致，附手提禮盒，送禮體面。",
    image: "/images/mango.jpg",
    tag: "送禮",
  },
  {
    id: "jinhuang",
    name: "金煌芒果 大果箱",
    spec: "10 台斤 · 約 6–8 顆",
    price: 1280,
    note: "單顆可達一斤半，果肉厚、纖維少，切片最過癮。",
    image: "/images/mango-03.jpg",
    tag: null,
  },
  {
    id: "mixed",
    name: "三品種 綜合箱",
    spec: "10 台斤 · 愛文＋金煌＋玉文",
    price: 1480,
    note: "一次吃遍玉井三大品種，最適合第一次嘗鮮。",
    image: "/images/mango-02.jpg",
    tag: "限量",
  },
];

const formatPrice = (n: number) => `NT$ ${n.toLocaleString("en-US")}`;

export default function Shop() {
  return (
    // 手機一欄、平板兩欄、電腦四欄
    <div className="grid gap-y-12 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-4 lg:gap-x-6">
      {products.map((p, i) => (
        // flex 直排 + 按鈕 mt-auto：同一排的卡片按鈕會對齊在底部
        <article key={p.id} className="group flex flex-col">
          {/* 四欄時卡片較窄，照片改成直式 */}
          <div className="relative aspect-[4/3] overflow-hidden bg-line lg:aspect-[4/5]">
            <Parallax range={6} className="absolute inset-x-0 -top-[8%] h-[116%]">
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </Parallax>
            {p.tag && (
              <span className="absolute left-0 top-0 bg-paper px-3 py-1.5 text-xs tracking-[0.2em]">
                {p.tag}
              </span>
            )}
          </div>

          {/* 名稱和價格：手機、平板並排（空間不夠會換行），電腦四欄時上下排 */}
          <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line pb-4 lg:flex-col lg:items-start">
            <h3 className="font-serif text-xl font-black lg:text-lg xl:text-xl">
              <span className="mr-3 font-display text-base font-normal text-muted lg:mr-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              {p.name}
            </h3>
            <p className="font-display text-xl xl:text-2xl">
              <span className="mr-1.5 font-sans text-xs text-muted">預計</span>
              {formatPrice(p.price)}
            </p>
          </div>
          <p className="mt-4 text-sm text-muted">{p.spec}</p>
          <p className="mt-2 leading-7 text-ink/80 lg:text-sm lg:leading-6">{p.note}</p>

          <div className="mt-auto pt-6">
            <a
              href="#notify"
              className="flex h-12 w-full items-center justify-center border border-ink text-sm tracking-widest transition hover:bg-ink hover:text-paper"
            >
              開賣通知我
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
