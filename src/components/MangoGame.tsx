"use client";

import { useEffect, useRef, useState } from "react";

// 一局 15 秒
const DURATION_MS = 15_000;
// 畫布的邏輯尺寸，實際顯示大小由 CSS 縮放
const W = 640;
const H = 440;
const BASKET_Y = H - 50;
const BASKET_HALF = 44;
// 用鍵盤操作時，籃子每秒移動的距離
const BASKET_SPEED = 560;
// 最高分記在 localStorage，純娛樂用
const BEST_KEY = "mango-game-best-v1";

type Phase = "ready" | "playing" | "done";
type Mango = { x: number; y: number; vy: number; golden: boolean; spin: number };
type Pop = { x: number; y: number; text: string; life: number };

function loadBest(): number {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveBest(score: number) {
  try {
    localStorage.setItem(BEST_KEY, String(score));
  } catch {
    // 無痕模式等情況可能無法寫入，不影響遊戲
  }
}

export default function MangoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("ready");
  const [score, setScore] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(DURATION_MS / 1000);
  const [best, setBest] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);

  const start = () => {
    setScore(0);
    setSecondsLeft(DURATION_MS / 1000);
    setIsNewBest(false);
    setPhase("playing");
  };

  // 遊戲進行中的主迴圈；所有會逐格變動的資料都放在區域變數，不經過 React state
  useEffect(() => {
    if (phase !== "playing") return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // 依螢幕像素密度調整畫布解析度，避免高解析螢幕上模糊
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const mangoes: Mango[] = [];
    const pops: Pop[] = [];
    const keys = new Set<string>();
    let basketX = W / 2;
    let points = 0;
    let nextSpawn = 0;
    const startedAt = performance.now();
    let last = startedAt;
    let raf = 0;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      if (e.type === "keydown") keys.add(e.key);
      else keys.delete(e.key);
    };
    // 滑鼠與手指都用 pointer 事件，換算成畫布座標
    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      basketX = ((e.clientX - rect.left) / rect.width) * W;
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    canvas.addEventListener("pointermove", onPointer);
    canvas.addEventListener("pointerdown", onPointer);

    const draw = (elapsed: number) => {
      ctx.clearRect(0, 0, W, H);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // 地面線
      ctx.strokeStyle = "rgba(243, 238, 228, 0.15)";
      ctx.beginPath();
      ctx.moveTo(0, BASKET_Y + 34);
      ctx.lineTo(W, BASKET_Y + 34);
      ctx.stroke();

      for (const m of mangoes) {
        ctx.save();
        ctx.translate(m.x, m.y);
        ctx.rotate((m.spin * elapsed) / 1000);
        if (m.golden) {
          ctx.shadowColor = "#facc15";
          ctx.shadowBlur = 24;
        }
        ctx.font = m.golden ? "46px serif" : "38px serif";
        ctx.fillText("🥭", 0, 0);
        ctx.restore();
      }

      ctx.font = "68px serif";
      ctx.fillText("🧺", basketX, BASKET_Y);

      ctx.font = "bold 26px serif";
      for (const p of pops) {
        ctx.globalAlpha = Math.max(p.life / 0.7, 0);
        ctx.fillStyle = p.text === "+3" ? "#facc15" : "#f3eee4";
        ctx.fillText(p.text, p.x, p.y);
      }
      ctx.globalAlpha = 1;
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const elapsed = now - startedAt;
      // 越接近結束，芒果掉得越快、越密
      const progress = Math.min(elapsed / DURATION_MS, 1);

      if (keys.has("ArrowLeft")) basketX -= BASKET_SPEED * dt;
      if (keys.has("ArrowRight")) basketX += BASKET_SPEED * dt;
      basketX = Math.min(Math.max(basketX, BASKET_HALF), W - BASKET_HALF);

      if (elapsed >= nextSpawn) {
        const golden = Math.random() < 0.12;
        mangoes.push({
          x: 30 + Math.random() * (W - 60),
          y: -30,
          vy: (170 + progress * 190) * (0.85 + Math.random() * 0.3) * (golden ? 1.3 : 1),
          golden,
          spin: (Math.random() - 0.5) * 6,
        });
        nextSpawn = elapsed + 700 - progress * 400;
      }

      for (let i = mangoes.length - 1; i >= 0; i--) {
        const m = mangoes[i];
        m.y += m.vy * dt;
        const caught = Math.abs(m.y - BASKET_Y) < 18 && Math.abs(m.x - basketX) < BASKET_HALF;
        if (caught) {
          const gain = m.golden ? 3 : 1;
          points += gain;
          pops.push({ x: m.x, y: BASKET_Y - 44, text: `+${gain}`, life: 0.7 });
          mangoes.splice(i, 1);
        } else if (m.y > H + 30) {
          mangoes.splice(i, 1);
        }
      }

      for (let i = pops.length - 1; i >= 0; i--) {
        pops[i].y -= 50 * dt;
        pops[i].life -= dt;
        if (pops[i].life <= 0) pops.splice(i, 1);
      }

      draw(elapsed);
      setScore(points);
      setSecondsLeft(Math.max(Math.ceil((DURATION_MS - elapsed) / 1000), 0));

      if (elapsed >= DURATION_MS) {
        const prevBest = loadBest();
        if (points > prevBest) saveBest(points);
        setBest(Math.max(points, prevBest));
        setIsNewBest(points > prevBest);
        setPhase("done");
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
      canvas.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("pointerdown", onPointer);
    };
  }, [phase]);

  return (
    <div>
      {/* 分數與剩餘時間 */}
      <div className="flex items-end justify-between border-b border-line pb-4">
        <p className="text-sm tracking-widest text-muted">
          得分
          <span className="ml-3 font-display text-4xl not-italic text-ink">{score}</span>
        </p>
        <p className="text-sm tracking-widest text-muted">
          剩餘
          <span
            className={`ml-3 font-display text-4xl ${
              phase === "playing" && secondsLeft <= 5 ? "text-accent" : "text-ink"
            }`}
          >
            {secondsLeft}
          </span>
          <span className="ml-1">秒</span>
        </p>
      </div>

      <div className="relative mt-6 bg-ink">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          aria-label="接芒果遊戲畫面"
          className="block aspect-[640/440] w-full touch-none select-none"
        />

        {phase !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/80 px-6 text-center text-paper">
            {phase === "ready" ? (
              <>
                <p className="font-display text-lg italic text-paper/60">Catch the mangoes!</p>
                <p className="mt-2 font-serif text-3xl font-black sm:text-4xl">接芒果</p>
                <p className="mt-4 max-w-sm text-sm leading-7 text-paper/75">
                  移動滑鼠、用手指拖曳，或按 ← → 鍵移動籃子。
                  <br />
                  芒果 +1 分，發光的金芒果 +3 分。
                </p>
              </>
            ) : (
              <>
                <p className="text-xs tracking-[0.3em] text-yellow-400">
                  {isNewBest ? "新紀錄！" : "時間到"}
                </p>
                <p className="mt-2 font-display text-7xl">{score}</p>
                <p className="mt-2 text-sm text-paper/60">最高分 {best}</p>
              </>
            )}
            <button
              type="button"
              onClick={start}
              className="mt-8 bg-accent px-8 py-3 tracking-widest text-paper transition hover:bg-paper hover:text-ink"
            >
              {phase === "ready" ? "開始遊戲" : "再玩一次"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
