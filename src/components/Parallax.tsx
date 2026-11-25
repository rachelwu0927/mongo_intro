"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * 滾動視差：元素從畫面底部捲到頂部的過程中，位移 range% → -range%（以自身尺寸計算）。
 * range 為正 → 比頁面捲得慢（適合背景）；為負 → 比頁面捲得快（適合前景）。
 * 用在框內的圖片時，圖片要比外框多出 range% 以上的高度，避免露出空白。
 */
export default function Parallax({
  children,
  range = 10,
  axis = "y",
  className = "",
}: {
  children: ReactNode;
  range?: number;
  axis?: "x" | "y";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // 尊重使用者「減少動態效果」的系統設定
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // 以父層位置計算，避免自己的位移影響量測結果
    const anchor = el.parentElement ?? el;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = anchor.getBoundingClientRect();
      const vh = window.innerHeight;
      // 元素中心在畫面正中央時為 0，剛進入底部為 1，剛離開頂部為 -1
      const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      const offset = -Math.max(-1, Math.min(1, progress)) * range;
      el.style.transform =
        axis === "y" ? `translate3d(0, ${offset}%, 0)` : `translate3d(${offset}%, 0, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [range, axis]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
