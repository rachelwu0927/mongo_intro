import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MangoGame from "@/components/MangoGame";
import Parallax from "@/components/Parallax";
import Shop from "@/components/Shop";
import WelcomeGreeting from "@/components/WelcomeGreeting";

const container = "mx-auto w-full max-w-6xl px-4 sm:px-6";

const promises = [
  { value: "樹上熟", label: "轉色才採收，不催熟" },
  { value: "48h", label: "採收到出貨" },
  { value: "2–8°C", label: "全程冷藏宅配" },
  { value: "壞果包退", label: "到貨拍照即補寄" },
];

const varieties = [
  {
    no: "I",
    name: "愛文",
    en: "Irwin",
    brix: 15,
    weight: "250 – 400 g",
    text: "外皮由綠轉紅，像蘋果一樣鮮豔。果肉細緻、香氣濃郁，是台灣芒果冰的標準配備，也是我們的招牌。",
  },
  {
    no: "II",
    name: "金煌",
    en: "Chin Hwang",
    brix: 14,
    weight: "800 – 1,200 g",
    text: "台灣本土育成的大果品種，熟成時外皮仍帶黃綠。果肉厚實、纖維少，一顆就能切滿一盤。",
  },
  {
    no: "III",
    name: "玉文",
    en: "Yu Wen",
    brix: 17,
    weight: "500 – 800 g",
    text: "玉井農民由愛文與金煌選育而來，兼具愛文的香氣與金煌的份量，產量少、每年最早被訂完。",
  },
];

// 出貨時程：5 月到 9 月，每個月分上、下半月
const halfMonths = ["5上", "5下", "6上", "6下", "7上", "7下", "8上", "8下", "9上", "9下"];
const schedule = [
  { name: "愛文", from: 2, to: 5 },
  { name: "玉文", from: 3, to: 6 },
  { name: "金煌", from: 4, to: 7 },
];

const steps = [
  { title: "樹上熟成", text: "等果實在樹上自然轉色、香氣出來才採收，不提早採摘催熟。" },
  { title: "人工分級", text: "逐顆檢查外觀與重量，有碰傷、黑點的果子不會進箱。" },
  { title: "冷藏出貨", text: "清晨採收、當天預冷，48 小時內交由冷藏宅配出貨。" },
  { title: "到府享用", text: "收到後常溫放置一兩天，聞到香氣、果皮微軟即是最佳賞味期。" },
];

const faqs = [
  {
    q: "什麼時候開賣？",
    a: "2027 年產季的確切開賣日期會依今年冬春的天候與開花狀況決定。在頁面下方留下 email，開賣當天會第一時間通知你。",
  },
  {
    q: "什麼時候會出貨？",
    a: "芒果依品種產季分批出貨，愛文約 6 月上旬開始。開賣後會依訂購順序安排，出貨前一天以簡訊通知。",
  },
  {
    q: "可以指定到貨日嗎？",
    a: "可以指定「不希望收到」的日期，但因為採收要看天候與熟度，無法保證指定某一天到貨。",
  },
  {
    q: "收到芒果有損傷怎麼辦？",
    a: "請在到貨 24 小時內拍下外箱與果實照片傳給客服，我們會補寄或退款，不需要寄回。",
  },
  {
    q: "芒果要怎麼保存？",
    a: "還偏硬的芒果放常溫陰涼處催熟；已經變軟、有香氣的再放冰箱冷藏，並在 3 天內吃完。",
  },
  {
    q: "有哪些付款方式？",
    a: "開賣後將提供信用卡、ATM 轉帳與 LINE Pay。訂購 3 箱以上可以來信詢問團購優惠。",
  },
];

function SectionLabel({ no, children }: { no: string; children: string }) {
  return (
    <p className="mb-10 flex items-center gap-4 text-xs tracking-[0.3em] text-muted">
      <span className="font-display text-base tracking-normal text-accent">{no}</span>
      <span className="h-px w-10 bg-line" />
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* 一般區塊放在置中容器內，全幅區塊（視差文字帶、照片區）放在容器外 */}
        <div className={container}>
        {/* 主視覺 */}
        {/* 手機：上下堆疊；平板以上：左文右圖 */}
        <section className="grid grid-cols-12 items-center gap-y-10 py-10 sm:py-16 md:gap-x-8 lg:gap-x-12 lg:py-20">
          <div className="col-span-12 md:col-span-7">
            <WelcomeGreeting />
            <p className="mb-6 text-xs tracking-[0.3em] text-muted sm:mb-8">2027 夏季 · 即將開賣</p>
            <Parallax range={8}>
              <h1 className="font-serif text-5xl font-black leading-[1.1] tracking-tight sm:text-7xl lg:text-8xl">
                玉井愛文666，
                <br />
                <span className="text-accent">樹上熟</span>
                <br />
                才採。
              </h1>
            </Parallax>
            <p className="mt-8 max-w-md leading-8 text-ink/75 sm:mt-10">
              台南玉井山區的芒果園，等果實在枝頭自然轉紅、香氣飽滿才動手採收。清晨採下，冷藏直送到你家。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-10">
              <a
                href="#notify"
                className="bg-ink px-8 py-4 text-center tracking-widest text-paper transition hover:bg-accent max-sm:w-full"
              >
                登記開賣通知
              </a>
              <p className="text-sm text-muted">
                預計售價 <span className="font-display text-2xl text-ink">NT$ 880</span> 起
              </p>
            </div>
          </div>

          <figure className="col-span-12 md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden md:aspect-[2/3]">
              {/* 圖片比外框高 20%，視差位移時才不會露出空白 */}
              <Parallax range={8} className="absolute inset-x-0 -top-[10%] h-[120%]">
                <Image
                  src="/images/mango-01.jpg"
                  alt="掛在枝頭、帶著露水的芒果"
                  fill
                  preload
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </Parallax>
            </div>
            <figcaption className="mt-3 flex justify-between text-xs text-muted">
              <span className="font-display text-sm italic">Fig. 1</span>
              <span>枝頭上自然轉色的芒果</span>
            </figcaption>
          </figure>
        </section>

        {/* 承諾 */}
        {/* 用 gap-px 露出底色當作格線 */}
        <section className="grid grid-cols-2 gap-px border-y border-line bg-line md:grid-cols-4">
          {promises.map((p) => (
            <div key={p.label} className="bg-paper px-4 py-6 sm:px-6 sm:py-8">
              <p className="font-serif text-2xl font-black lg:text-3xl">{p.value}</p>
              <p className="mt-2 text-xs text-muted sm:text-sm">{p.label}</p>
            </div>
          ))}
        </section>
        </div>

        {/* 視差文字帶：空心大字隨捲動橫向滑過 */}
        <div aria-hidden className="flex justify-center overflow-hidden pt-16 sm:pt-24 lg:pt-32">
          <Parallax range={14} axis="x" className="shrink-0">
            <p className="whitespace-nowrap pb-[0.2em] font-display text-[22vw] italic leading-none text-transparent [-webkit-text-stroke:1px_var(--color-ink)] sm:text-[14vw]">
              Irwin · <span className="[-webkit-text-stroke-color:var(--color-accent)]">Chin Hwang</span> · Yu Wen · Irwin
            </p>
          </Parallax>
        </div>

        <div className={container}>
        {/* 品種 */}
        <section id="varieties" className="scroll-mt-20 pb-16 pt-10 sm:pb-24 sm:pt-16 lg:pb-32">
          <SectionLabel no="01">品種</SectionLabel>
          <div className="mb-14 grid grid-cols-12 gap-y-6">
            <h2 className="col-span-12 font-serif text-4xl font-black leading-tight sm:text-5xl md:col-span-6">
              三種芒果，
              <br />
              三種夏天。
            </h2>
            <p className="col-span-12 self-end leading-8 text-ink/75 md:col-span-5 md:col-start-8">
              玉井是台灣芒果的故鄉，我們只種最適合這片土地的三個品種。糖度為往年採收的平均值，實際依天候略有不同。
            </p>
          </div>

          {/* 手機一欄、平板以上三欄 */}
          <div className="grid gap-12 md:grid-cols-3 md:gap-6 lg:gap-8">
            {varieties.map((v) => (
              <div key={v.name} className="border-t border-ink pt-6">
                <div className="flex items-baseline justify-between">
                  <p className="font-display text-2xl italic text-accent">{v.no}</p>
                  <p className="font-display text-lg italic text-muted">{v.en}</p>
                </div>
                <h3 className="mt-4 font-serif text-5xl font-black md:text-4xl lg:text-5xl">{v.name}</h3>

                {/* 糖度條：以 20° 為滿格 */}
                <div className="mt-6">
                  <div className="flex justify-between text-xs text-muted">
                    <span>糖度</span>
                    <span className="font-display text-base text-ink">{v.brix}° Brix</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-line">
                    <div className="h-full bg-accent" style={{ width: `${(v.brix / 20) * 100}%` }} />
                  </div>
                </div>
                <p className="mt-4 flex justify-between border-b border-line pb-4 text-xs text-muted">
                  <span>單顆重量</span>
                  <span className="text-sm text-ink">{v.weight}</span>
                </p>
                <p className="mt-4 text-sm leading-7 text-ink/75">{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 商品預覽（尚未開賣） */}
        <section id="shop" className="scroll-mt-20 pb-16 sm:pb-24 lg:pb-32">
          <SectionLabel no="02">商品</SectionLabel>
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-serif text-4xl font-black leading-tight sm:text-5xl">
              2027 產季，
              <br />
              即將開賣。
            </h2>
            <p className="text-sm text-muted">
              以下為預計售價（含稅、含冷藏運費），正式價格於開賣時公布
            </p>
          </div>
          <Shop />
        </section>

        </div>

        {/* 全幅視差照片：背景比文字捲得慢，做出景深 */}
        <section className="relative h-[75svh] min-h-[420px] overflow-hidden bg-ink lg:h-[90vh]">
          <Parallax range={10} className="absolute inset-x-0 -top-[15%] h-[130%]">
            <Image
              src="/images/mango-02.jpg"
              alt="堆滿紅黃色芒果的果箱"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/10" />
          <div className={`${container} relative flex h-full items-end pb-16 sm:pb-24`}>
            <Parallax range={-10}>
              <p className="mb-4 font-display text-lg italic text-paper/70 sm:text-xl">Summer only.</p>
              <h2 className="font-serif text-5xl font-black leading-tight text-paper sm:text-7xl lg:text-8xl">
                一年，
                <br />
                只有這一季。
              </h2>
              <p className="mt-6 max-w-sm leading-8 text-paper/75">
                芒果只在夏天的幾個星期裡最好吃。錯過了，就要再等一整年。
              </p>
            </Parallax>
          </div>
        </section>

        <div className={container}>
        {/* 出貨時程 */}
        <section id="schedule" className="scroll-mt-20 py-16 sm:py-24 lg:py-32">
          <SectionLabel no="03">出貨時程</SectionLabel>
          <div className="mb-10 grid grid-cols-12 gap-y-6">
            <h2 className="col-span-12 font-serif text-4xl font-black leading-tight sm:text-5xl md:col-span-6">
              熟了才出貨，
              <br />
              不早一天。
            </h2>
            <p className="col-span-12 self-end leading-8 text-ink/75 md:col-span-5 md:col-start-8">
              三個品種的產季前後接力。開賣後依品種產季與訂購順序出貨，實際日期會因當年天候前後調整。
            </p>
          </div>

          {/* 固定欄寬，手機上 10 個半月欄也能塞進畫面，不需左右捲動 */}
          <table className="w-full table-fixed border-collapse text-sm">
            <thead>
              <tr>
                <th className="w-12 pb-3 text-left text-xs font-normal text-muted sm:w-20 sm:tracking-[0.2em]">
                  <span className="max-sm:sr-only">月份</span>
                </th>
                {halfMonths.map((m) => (
                  <th
                    key={m}
                    className="pb-3 font-display text-xs font-normal text-muted sm:text-base"
                  >
                    {m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr key={row.name} className="border-t border-line">
                  <td className="py-4 font-serif font-semibold sm:py-5 sm:text-lg">{row.name}</td>
                  {halfMonths.map((m, i) => (
                    <td key={m} className="py-4 sm:py-5">
                      {i >= row.from && i <= row.to ? (
                        <div className="h-3 bg-accent sm:h-4" />
                      ) : (
                        <div className="mx-auto h-px w-1/2 bg-line" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 從果園到餐桌 */}
        <section className="pb-16 sm:pb-24 lg:pb-32">
          <SectionLabel no="04">從果園到餐桌</SectionLabel>
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t border-ink pt-5">
                <p className="font-display text-4xl text-accent sm:text-5xl">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-serif text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink/75">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 訂購須知 */}
        <section id="order" className="scroll-mt-20 pb-16 sm:pb-24 lg:pb-32">
          <SectionLabel no="05">訂購須知</SectionLabel>
          <div className="grid grid-cols-12 gap-y-10">
            <h2 className="col-span-12 font-serif text-4xl font-black leading-tight sm:text-5xl md:col-span-4">
              常見問題
            </h2>
            <div className="col-span-12 border-b border-line md:col-span-8">
              {faqs.map((f) => (
                <details key={f.q} className="group border-t border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-base font-semibold sm:py-6 sm:text-lg [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="shrink-0 font-display text-2xl font-normal text-accent transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="max-w-xl pb-6 leading-8 text-ink/75">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 接芒果小遊戲 */}
        <section id="game" className="scroll-mt-20 pb-16 sm:pb-24 lg:pb-32">
          <SectionLabel no="06">小遊戲</SectionLabel>
          <div className="grid grid-cols-12 gap-y-10">
            <div className="col-span-12 md:col-span-4">
              <h2 className="font-serif text-4xl font-black leading-tight sm:text-5xl">接芒果</h2>
              <p className="mt-6 leading-8 text-ink/75">
                芒果熟了會自己掉下來！在 15 秒內用籃子接住越多芒果越好，純屬娛樂，等開賣的時候玩一下。
              </p>
            </div>
            <div className="col-span-12 md:col-span-8">
              <MangoGame />
            </div>
          </div>
        </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
