"use client";

import { useActionState } from "react";
import { subscribe, type SubscribeState } from "@/app/actions";

const initialState: SubscribeState = { status: "idle", message: "" };

export default function SubscribeForm() {
  const [state, formAction, pending] = useActionState(subscribe, initialState);

  // 登記成功後，表單換成確認訊息
  if (state.status === "success") {
    return (
      <div role="status" className="border-t border-accent pt-6">
        <p className="font-display text-2xl italic text-accent">Thank you.</p>
        <p className="mt-2 leading-8 text-paper/80">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate>
      <label htmlFor="subscribe-email" className="mb-3 block text-xs tracking-[0.3em] text-paper/50">
        開賣通知
      </label>
      <div className="flex border-b border-paper/40 transition focus-within:border-accent max-sm:flex-col max-sm:border-b-0">
        <input
          id="subscribe-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="你的 email"
          aria-invalid={state.status === "error"}
          aria-describedby={state.status === "error" ? "subscribe-error" : undefined}
          className="min-w-0 flex-1 bg-transparent py-4 text-lg text-paper placeholder:text-paper/35 focus:outline-none max-sm:border-b max-sm:border-paper/40 max-sm:focus:border-accent"
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 bg-accent px-6 py-4 tracking-widest text-paper transition hover:bg-paper hover:text-ink disabled:cursor-wait disabled:opacity-60 max-sm:mt-4"
        >
          {pending ? "送出中…" : "開賣通知我 →"}
        </button>
      </div>

      {/* 防機器人的隱藏欄位，真人不會看到 */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />

      {state.status === "error" && (
        <p id="subscribe-error" role="alert" className="mt-3 text-sm text-accent">
          {state.message}
        </p>
      )}
      <p className="mt-4 text-xs leading-6 text-paper/45">
        只會在開賣時寄送通知，不會提供給第三方，也可以隨時取消。
      </p>
    </form>
  );
}
