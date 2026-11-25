"use client";

import { openWelcome, useVisitor } from "@/lib/visitor";

// 首頁主視覺上方的問候語；沒有稱呼時不顯示
export default function WelcomeGreeting() {
  const visitor = useVisitor();
  if (!visitor || !("name" in visitor)) return null;

  return (
    <p className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="font-display text-xl italic text-muted">Hello,</span>
      <span className="font-serif text-xl font-black text-accent sm:text-2xl">{visitor.name}</span>
      <span className="text-sm text-ink/70">— 歡迎來到寶島果園</span>
      <button
        type="button"
        onClick={openWelcome}
        className="text-xs text-muted underline underline-offset-4 transition hover:text-accent"
      >
        更改
      </button>
    </p>
  );
}
