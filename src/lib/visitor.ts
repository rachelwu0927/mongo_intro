import { useMemo, useSyncExternalStore } from "react";

// 訪客稱呼：只存在使用者自己的瀏覽器（localStorage），不會送到伺服器
const KEY = "mango-visitor-v1";
export const NAME_MAX_LENGTH = 20;

export type Visitor = { name: string } | { skipped: true };

const listeners = new Set<() => void>();
// localStorage 無法使用時（如部分無痕模式）的備援，至少在這次瀏覽中有效
let memory: string | null = null;

function readRaw(): string | null {
  try {
    return localStorage.getItem(KEY) ?? memory;
  } catch {
    return memory;
  }
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // 其他分頁修改時也同步
  const onStorage = (e: StorageEvent) => e.key === KEY && onChange();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function saveVisitor(visitor: Visitor) {
  const raw = JSON.stringify(visitor);
  memory = raw;
  try {
    localStorage.setItem(KEY, raw);
  } catch {
    // 寫入失敗時使用 memory 備援
  }
  listeners.forEach((l) => l());
}

/** 是否已經回應過歡迎視窗（輸入稱呼或略過） */
export function hasVisitorRecord() {
  return readRaw() !== null;
}

/** 讀取訪客資料；伺服器端與尚未載入時為 null */
export function useVisitor(): Visitor | null {
  const raw = useSyncExternalStore(subscribe, readRaw, () => null);
  return useMemo(() => {
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Visitor;
    } catch {
      return null;
    }
  }, [raw]);
}

// 讓「更改稱呼」按鈕可以重新打開歡迎視窗
const OPEN_EVENT = "mango:open-welcome";
export function openWelcome() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}
export function onOpenWelcome(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
