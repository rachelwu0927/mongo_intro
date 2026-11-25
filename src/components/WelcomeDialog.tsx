"use client";

import { useEffect, useRef, type FormEvent } from "react";
import {
  NAME_MAX_LENGTH,
  hasVisitorRecord,
  onOpenWelcome,
  saveVisitor,
  useVisitor,
} from "@/lib/visitor";

export default function WelcomeDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const visitor = useVisitor();
  const currentName = visitor && "name" in visitor ? visitor.name : "";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    // 第一次造訪（還沒輸入稱呼、也沒略過）時自動打開
    if (!hasVisitorRecord()) dialog.showModal();
    // 「更改」按鈕觸發時重新打開
    return onOpenWelcome(() => {
      dialog.showModal();
      inputRef.current?.select();
    });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = String(new FormData(e.currentTarget).get("name") ?? "")
      .trim()
      .slice(0, NAME_MAX_LENGTH);
    if (!name) {
      inputRef.current?.focus();
      return;
    }
    saveVisitor({ name });
    dialogRef.current?.close();
  };

  const skip = () => {
    // 已經有稱呼時「略過」只是關閉，不清掉原本的稱呼
    if (!currentName) saveVisitor({ skipped: true });
    dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="welcome-title"
      // 按 Esc 關閉時視同略過，之後不再自動跳出
      onCancel={skip}
      className="m-auto w-[min(92vw,28rem)] bg-paper p-0 text-ink backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
    >
      <form onSubmit={handleSubmit} className="px-6 pb-8 pt-10 sm:px-10">
        <p className="font-display text-lg italic text-accent">Welcome</p>
        <h2 id="welcome-title" className="mt-2 font-serif text-3xl font-black">
          歡迎來到寶島果園
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink/75">我們該怎麼稱呼你呢？</p>

        <label htmlFor="welcome-name" className="sr-only">
          你的稱呼
        </label>
        <input
          ref={inputRef}
          id="welcome-name"
          name="name"
          type="text"
          required
          maxLength={NAME_MAX_LENGTH}
          autoComplete="nickname"
          placeholder="例如：小芒"
          defaultValue={currentName}
          key={currentName}
          className="mt-6 w-full border-b border-ink/40 bg-transparent py-3 text-lg placeholder:text-ink/30 focus:border-accent focus:outline-none"
        />
        <p className="mt-2 text-xs text-muted">只會存在你的瀏覽器裡，用來在網站上跟你打招呼。</p>

        <button
          type="submit"
          className="mt-8 h-12 w-full bg-ink tracking-widest text-paper transition hover:bg-accent"
        >
          進入網站
        </button>
        <button
          type="button"
          onClick={skip}
          className="mt-3 w-full py-2 text-sm text-muted transition hover:text-accent"
        >
          {currentName ? "取消" : "略過"}
        </button>
      </form>
    </dialog>
  );
}
