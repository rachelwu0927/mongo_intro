import { formatDate } from "@/content/posts";

// 文章的分類、日期、閱讀時間
export default function PostMeta({
  category,
  date,
  minutes,
}: {
  category: string;
  date: string;
  minutes: number;
}) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-[0.2em] text-muted">
      <span className="text-accent">{category}</span>
      <span className="h-px w-6 bg-line" />
      <time dateTime={date} className="font-display text-sm tracking-normal">
        {formatDate(date)}
      </time>
      <span>·</span>
      <span>{minutes} 分鐘閱讀</span>
    </p>
  );
}
