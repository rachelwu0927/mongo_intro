"use server";

import { randomBytes, randomInt } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type SubscribeState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribe(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return { status: "error", message: "請輸入有效的 email。" };
  }

  // 目前先不儲存名單，只回覆使用者
  return { status: "success", message: "感謝你的支持，請等待好消息！" };
}

// ── 抽獎 ──────────────────────────────────────────────

export type LotteryResult = { won: true; code: string } | { won: false };

// 中獎機率（百分比）
const WIN_RATE = 10;
// 中獎的優惠碼存在 data/coupons.json，開賣時可用來核對優惠碼是否有效
const COUPON_FILE = path.join(process.cwd(), "data", "coupons.json");

type Coupon = { code: string; discount: string; createdAt: string };

// 在伺服器端決定結果，使用者無法從瀏覽器竄改中獎機率
export async function drawLottery(): Promise<LotteryResult> {
  if (randomInt(100) >= WIN_RATE) return { won: false };

  // 例：MANGO90-3F9A2C（6 碼十六進位，約 1,600 萬種組合）
  const code = `MANGO90-${randomBytes(3).toString("hex").toUpperCase()}`;

  let list: Coupon[] = [];
  try {
    list = JSON.parse(await readFile(COUPON_FILE, "utf8"));
  } catch {
    // 檔案還不存在：從空清單開始
  }
  list.push({ code, discount: "9 折", createdAt: new Date().toISOString() });
  await mkdir(path.dirname(COUPON_FILE), { recursive: true });
  await writeFile(COUPON_FILE, JSON.stringify(list, null, 2), "utf8");

  return { won: true, code };
}