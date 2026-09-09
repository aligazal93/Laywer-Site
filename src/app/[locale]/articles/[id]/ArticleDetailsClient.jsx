"use client";

import Image from "next/image";
import Link from "next/link";
import MoreArticles from "../components/MoreArticles";
import { getDictionary } from "@/lib/getDictionary";

export default function ArticleDetailsClient({
  locale = "ar",
  article,
  relatedArticles = [],
}) {
  const dict = getDictionary(locale);

  if (!article) {
    return (
      <section className="bg-primary py-[200px] text-center text-white">
        المقال غير متوفر
      </section>
    );
  }

  // منع وجود H1 إضافي داخل محتوى المقال
  // ليبقى عنوان المقال الرئيسي هو H1 الوحيد في الصفحة
  const safeArticleContent = (article.content || "")
    .replace(/<h1(\s[^>]*)?>/gi, "<h2$1>")
    .replace(/<\/h1>/gi, "</h2>");

  return (
    <main className="bg-primary">
      <section className="container py-[160px]">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 text-center">
            <span className="mb-2 inline-block px-6 py-3 text-custom14 font-[700] text-secondary">
              {article.category?.title}
            </span>

            <h1 className="mx-auto w-full text-custom32 font-[700] leading-relaxed text-white">
              {article.title}
            </h1>
          </div>

          <div className="col-span-12">
            <div className="relative my-[10px] overflow-hidden rounded-[24px]">
              <div className="relative mx-auto my-10 h-[300px] w-full overflow-hidden rounded-[28px] sm:h-[350px] lg:h-[500px] lg:w-[90%]">
                <Image
                  src={article.image || "/images/icon-1.png"}
                  alt={article.title || "article"}
                  fill
                  priority
                  className="object-fill object-center"
                />
              </div>
            </div>
          </div>

          <article className="col-span-12 text-start lg:col-span-9">
            <h2 className="mb-2 text-custom20 font-bold leading-relaxed text-white md:text-custom36">
              {article.title}
            </h2>

            <div
              className={`
                article-content w-full lg:w-[80%]
                text-custom16 leading-9 text-[#95AAC7]
                [&_h2]:mb-5 [&_h2]:mt-8 [&_h2]:text-custom24 [&_h2]:font-bold [&_h2]:text-white
                [&_h3]:mb-4 [&_h3]:mt-7 [&_h3]:text-custom20 [&_h3]:font-bold [&_h3]:text-white
                [&_p]:mb-6 [&_p]:leading-9
              `}
              dangerouslySetInnerHTML={{
                __html: safeArticleContent,
              }}
            />
          </article>

          <aside className="col-span-12 lg:col-span-3">
            <div className="sticky top-[120px] rounded-[14px] bg-secondary p-6 text-center">
              <h3 className="mb-2 text-custom18 font-bold text-white">
                {dict?.articles?.needConsultation}
              </h3>

              <p className="mb-2 text-custom14 leading-6 text-white/80">
                {dict?.articles?.canConsulationNow}
              </p>

              <Link
                href={`/${locale}#contact`}
                className="inline-flex rounded-full bg-primary px-5 py-2 text-custom14 font-bold text-white transition-all duration-300 hover:bg-primary/80"
              >
                {dict?.header?.book}
              </Link>
            </div>
          </aside>

          <div className="col-span-12">
            <MoreArticles
              locale={locale}
              articles={relatedArticles}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
