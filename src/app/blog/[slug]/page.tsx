import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PostMeta from "@/components/PostMeta";
import { type Block, getPost, getSortedPosts, posts } from "@/content/posts";

// 建置時預先產生每一篇文章的頁面；不在清單內的網址由 PostContent 的 notFound() 回 404
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title}｜寶島果園`,
    description: post.excerpt,
  };
}

// 頁首、頁尾不依賴網址，先顯示；文章內容依網址參數在 Suspense 內載入，讓切換頁面能立即有畫面
export default function PostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <>
      <Header />
      <Suspense fallback={<ArticleSkeleton />}>
        {params.then(({ slug }) => (
          <PostContent slug={slug} />
        ))}
      </Suspense>
      <Footer />
    </>
  );
}

function ArticleSkeleton() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 sm:px-6" aria-busy>
      <div className="mx-auto max-w-3xl animate-pulse pb-10 pt-10 sm:pb-14 sm:pt-16">
        <div className="mb-10 h-4 w-16 bg-line" />
        <div className="h-3 w-48 bg-line" />
        <div className="mt-6 h-12 w-full bg-line" />
        <div className="mt-3 h-12 w-2/3 bg-line" />
      </div>
      <div className="mx-auto aspect-[16/9] max-w-5xl animate-pulse bg-line" />
    </main>
  );
}

function PostContent({ slug }: { slug: string }) {
  const post = getPost(slug);
  if (!post) notFound();

  const others = getSortedPosts().filter((p) => p.slug !== post.slug);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <article>
        {/* 標題區 */}
        <header className="mx-auto max-w-3xl pb-10 pt-10 sm:pb-14 sm:pt-16">
          <Link
            href="/blog"
            className="group mb-10 inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
          >
            <span className="transition group-hover:-translate-x-1">←</span>
            芒果誌
          </Link>
          <PostMeta category={post.category} date={post.date} minutes={post.readMinutes} />
          <h1 className="mt-5 font-serif text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-ink/75">{post.excerpt}</p>
        </header>

        {/* 封面圖：比內文寬，做出版面層次 */}
        <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden bg-line">
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            fill
            preload
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
        </div>

        {/* 內文 */}
        <div className="mx-auto max-w-2xl py-12 sm:py-16">
          {post.body.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}
        </div>
      </article>

      {/* 其他文章 */}
      <section className="border-t border-line pb-16 pt-12 sm:pb-24 sm:pt-16">
        <p className="mb-8 text-xs tracking-[0.3em] text-muted">繼續閱讀</p>
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-6 lg:gap-12">
          {others.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group grid grid-cols-3 gap-5">
              <div className="relative aspect-square overflow-hidden bg-line">
                <Image
                  src={p.cover.src}
                  alt={p.cover.alt}
                  fill
                  sizes="(min-width: 640px) 15vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="col-span-2">
                <PostMeta category={p.category} date={p.date} minutes={p.readMinutes} />
                <h2 className="mt-3 font-serif text-lg font-black leading-snug transition group-hover:text-accent sm:text-xl">
                  {p.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

// 依內容類型渲染文章段落
function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mb-5 mt-12 font-serif text-2xl font-black leading-snug first:mt-0 sm:text-3xl">
          {block.text}
        </h2>
      );
    case "p":
      return <p className="mb-6 text-[1.0625rem] leading-9 text-ink/85">{block.text}</p>;
    case "list":
      return (
        <ul className="mb-8 space-y-3 border-l border-accent pl-5">
          {block.items.map((item) => (
            <li key={item} className="leading-8 text-ink/85">
              {item}
            </li>
          ))}
        </ul>
      );
    case "tip":
      return (
        <aside className="my-10 bg-ink px-6 py-7 text-paper sm:px-8">
          <p className="font-display text-sm italic text-accent">Tip</p>
          <p className="mt-2 font-serif text-xl font-black">{block.title}</p>
          <p className="mt-3 leading-8 text-paper/80">{block.text}</p>
        </aside>
      );
  }
}
