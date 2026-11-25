import type { ReactNode } from "react";

export default function Glass({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/50 bg-white/25 shadow-[0_8px_32px_rgba(31,38,135,0.18)] backdrop-blur-xl ${className}`}
    >
      {/* 上半部的亮面反光 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent" />
      <div className="relative">{children}</div>
    </div>
  );
}
