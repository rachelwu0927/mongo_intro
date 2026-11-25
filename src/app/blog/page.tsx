import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PostMeta from "@/components/PostMeta";
import { getSortedPosts } from "@/content/posts";

export const metadata: Metadata = {
  title: "芒果誌｜寶島果園",
  description: "挑選、料理與果園日常——關於芒果的大小事。",
};

export default function BlogPage() {
  const [featured, ...rest] = getSortedPosts();

  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24 lg:pb-32">
        {/* 頁首 */}
        <section className="grid grid-cols-12 gap-y-6 border-b border-line py-12 sm:py-16 lg:py-20">
          <div className="col-span-12 md:col-span-7">
            <p className="mb-6 font-display text-lg italic text-muted">Notes from the orchard</p>
            <h1 className="font-serif text-5xl font-black leading-tight tracking-tight sm:text-7xl">
              芒果誌
            </h1>
          </div>
          <p className="col-span-12 self-end leading-8 text-ink/75 md:col-span-5">
            挑選、料理與果園日常。在等待芒果成熟的季節裡，寫一些關於芒果的大小事。
          </p>
        </section>

        {/* 主打文章：電腦版左圖右文 */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group grid grid-cols-12 gap-y-6 border-b border-line py-10 sm:py-14 md:gap-x-8 lg:gap-x-12"
        >
          <div className="relative col-span-12 aspect-[4/3] overflow-hidden bg-line md:col-span-7">
            <Image
              src={featured.cover.src}
              alt={featured.cover.alt}
              fill
              preload
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
          <div className="col-span-12 flex flex-col justify-center md:col-span-5">
            <PostMeta category={featured.category} date={featured.date} minutes={featured.readMinutes} />
            <h2 className="mt-4 font-serif text-3xl font-black leading-snug transition group-hover:text-accent sm:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-4 leading-8 text-ink/75">{featured.excerpt}</p>
            <span className="mt-8 inline-flex items-center gap-3 text-sm tracking-widest">
              閱讀全文
              <span className="transition group-hover:translate-x-1">→</span>
            </span>
          </div>
        </Link>

        {/* 其他文章：平板以上兩欄 */}
        <div className="grid gap-y-12 pt-10 sm:grid-cols-2 sm:gap-x-6 sm:pt-14 lg:gap-x-12">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="relative aspect-[3/2] overflow-hidden bg-line">
                <Image
                  src={post.cover.src}
                  alt={post.cover.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-5">
                <PostMeta category={post.category} date={post.date} minutes={post.readMinutes} />
                <h2 className="mt-3 font-serif text-2xl font-black leading-snug transition group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mt-3 leading-7 text-ink/75">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
