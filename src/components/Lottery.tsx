"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { drawLottery, type LotteryResult } from "@/app/actions";

// 每個瀏覽器只能抽一次，結果記在 localStorage
const STORAGE_KEY = "mango-lottery-v1";
// 抽獎動畫時間，讓結果揭曉有點期待感
const SPIN_MS = 1800;
const REEL = ["9 折", "銘謝惠顧", "再接再厲", "9 折", "差一點", "銘謝惠顧"];

type Phase = "ready" | "spinning" | "done" | "error";

function loadResult(): LotteryResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LotteryResult) : null;
  } catch {
    return null;
  }
}

function saveResult(result: LotteryResult) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  } catch {
    // 無痕模式等情況可能無法寫入，不影響這次的結果顯示
  }
}

export default function Lottery() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [phase, setPhase] = useState<Phase>("ready");
  const [result, setResult] = useState<LotteryResult | null>(null);
  const [reelIndex, setReelIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const open = () => {
    // 開啟時讀取先前的抽獎結果，抽過就直接顯示結果
    const saved = loadResult();
    if (saved) {
      setResult(saved);
      setPhase("done");
    }
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  const draw = async () => {
    // 再確認一次是否已抽過（避免畫面還沒更新時被重複點擊）
    const saved = loadResult();
    if (saved) {
      setResult(saved);
      setPhase("done");
      return;
    }

    setPhase("spinning");
    setCopied(false);
    const timer = setInterval(() => setReelIndex((i) => (i + 1) % REEL.length), 90);
    try {
      // 結果由伺服器決定；同時等滿動畫時間再揭曉
      const [res] = await Promise.all([
        drawLottery(),
        new Promise((resolve) => setTimeout(resolve, SPIN_MS)),
      ]);
      saveResult(res);
      setResult(res);
      setPhase("done");
    } catch {
      setPhase("error");
    } finally {
      clearInterval(timer);
    }
  };

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      // 不支援剪貼簿時，使用者仍可手動選取優惠碼
    }
  };

  return (
    <>
      {/* 右下角固定的抽獎按鈕 */}
      <button
        type="button"
        onClick={open}
        className="fixed bottom-5 right-4 z-40 flex items-center gap-2 bg-accent px-5 py-3 text-sm tracking-widest text-paper shadow-lg shadow-ink/20 transition hover:-translate-y-0.5 hover:bg-ink sm:right-6"
      >
        <span aria-hidden className="font-display text-lg italic leading-none">%</span>
        抽 9 折券
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="lottery-title"
        // 點擊視窗外的暗色背景時關閉
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto w-[min(92vw,28rem)] bg-paper p-0 text-ink backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
      >
        <div className="relative px-6 pb-8 pt-10 sm:px-10">
          <button
            type="button"
            onClick={close}
            aria-label="關閉"
            className="absolute right-4 top-4 text-sm tracking-widest text-muted transition hover:text-accent"
          >
            關閉
          </button>

          <p className="font-display text-lg italic text-accent">Lucky draw</p>
          <h2 id="lottery-title" className="mt-2 font-serif text-3xl font-black">
            夏日芒果抽獎
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink/75">
            每人一次機會，有 10% 機率抽中芒果 <strong className="text-accent">9 折優惠券</strong>
            ，開賣時結帳即可使用。
          </p>

          {/* 結果顯示區 */}
          <div
            aria-live="polite"
            className="mt-8 flex min-h-36 flex-col items-center justify-center border border-line px-4 py-6 text-center"
          >
            {phase === "ready" && (
              <p className="font-serif text-5xl font-black text-ink/15">?</p>
            )}

            {phase === "spinning" && (
              <p className="font-serif text-4xl font-black text-ink/60">{REEL[reelIndex]}</p>
            )}

            {phase === "error" && (
              <p className="text-sm text-accent">連線出了點問題，請再試一次。</p>
            )}

            {phase === "done" && result?.won && (
              <>
                <p className="text-xs tracking-[0.3em] text-accent">恭喜中獎</p>
                <p className="mt-2 font-serif text-5xl font-black text-accent">9 折</p>
                <div className="mt-5 flex w-full items-stretch border border-ink">
                  <code className="flex-1 select-all px-3 py-2.5 font-mono text-base tracking-wider">
                    {result.code}
                  </code>
                  <button
                    type="button"
                    onClick={() => copyCode(result.code)}
                    className="shrink-0 bg-ink px-4 text-sm text-paper transition hover:bg-accent"
                  >
                    {copied ? "已複製" : "複製"}
                  </button>
                </div>
                <p className="mt-3 text-xs text-muted">請截圖或複製保存，開賣時結帳輸入即可折抵</p>
              </>
            )}

            {phase === "done" && result && !result.won && (
              <>
                <p className="font-serif text-3xl font-black">銘謝惠顧</p>
                <p className="mt-3 text-sm text-muted">這次沒抽中，謝謝參加！</p>
              </>
            )}
          </div>

          {/* 操作按鈕 */}
          <div className="mt-6">
            {(phase === "ready" || phase === "error") && (
              <button
                type="button"
                onClick={draw}
                className="h-12 w-full bg-ink tracking-widest text-paper transition hover:bg-accent"
              >
                {phase === "error" ? "再試一次" : "開始抽獎"}
              </button>
            )}
            {phase === "spinning" && (
              <button
                type="button"
                disabled
                className="h-12 w-full cursor-wait bg-ink/60 tracking-widest text-paper"
              >
                抽獎中…
              </button>
            )}
            {phase === "done" && (
              <Link
                href="/#notify"
                onClick={close}
                className="flex h-12 w-full items-center justify-center border border-ink text-sm tracking-widest transition hover:bg-ink hover:text-paper"
              >
                登記開賣通知，別錯過使用時機 →
              </Link>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
