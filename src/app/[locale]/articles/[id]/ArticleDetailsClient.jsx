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

  /*
   * SEO:
   * - The page title below is the only H1.
   * - Remove a duplicated title from the beginning of article.content
   *   when the CMS has stored the article title inside the content.
   * - Convert any remaining H1 tags inside the article body to H2.
   */

  const normalizeText = (value = "") =>
    value
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&#39;/gi, "'")
      .replace(/&quot;/gi, '"')
      .replace(/\s+/g, " ")
      .trim();

  const removeDuplicatedTitle = (html = "", title = "") => {
    if (!html || !title) return html;

    const normalizedTitle = normalizeText(title);

    /*
     * Check only the first heading in the article content.
     * We do not remove headings elsewhere in the article.
     */
    return html.replace(
      /^(\s|&nbsp;|<p>\s*<\/p>|<p>(?:\s|&nbsp;)*<\/p>)*<(h1|h2)([^>]*)>([\s\S]*?)<\/\2>/i,
      (fullMatch, prefix, tag, attributes, headingContent) => {
        const normalizedHeading = normalizeText(headingContent);

        if (normalizedHeading === normalizedTitle) {
          return "";
        }

        return fullMatch;
      }
    );
  };

  let safeArticleContent = removeDuplicatedTitle(
    article.content || "",
    article.title || ""
  );

  /*
   * Safety net:
   * The article body must never introduce another H1.
   * All body H1 elements become H2.
   */
  safeArticleContent = safeArticleContent
    .replace(/<h1(\s[^>]*)?>/gi, (match, attributes = "") => {
      return `<h2${attributes || ""}>`;
    })
    .replace(/<\/h1\s*>/gi, "</h2>");

  return (
    <main className="bg-primary">
      <section className="container py-[160px]">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 text-center">
            <span className="mb-2 inline-block px-6 py-3 text-custom14 font-[700] text-secondary">
              {article.category?.title}
            </span>

            <h1 className="mx-auto w-full text-custom31 font-[700] leading-relaxed text-white">
              {article.title}
            </h1>
          </div>

          <div className="col-span-12">
            <div className="relative mx-auto my-10 h-[300px] w-full overflow-hidden rounded-[20px] sm:h-[350px] lg:h-[500px]">
              <Image
                src={article.image || "/images/icon-1.png"}
                alt={article.title || "article"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-fill object-center"
              />
            </div>
          </div>

          <article className="col-span-12 text-start lg:col-span-9">
            <div
              className="
                article-content
                w-full
                lg:mx-[80%]
                text-custom16
                leading-9
                text-[#95A47C]
                [&_h2]:mb-3
                [&_h2]:mt-8
                [&_h2]:text-custom24
                [&_h2]:font-bold
                [&_h2]:text-white
                [&_h3]:mb-4
                [&_h3]:mt-7
                [&_h3]:text-custom20
                [&_h3]:font-bold
                [&_h3]:text-white
                [&_p]:mb-6
                [&_p]:leading-9
              "
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
                {dict?.articles?.canConsultationNow}
              </p>

              <Link
                href={`/${locale}/contact`}
                className="inline-flex rounded-full bg-primary px-5 py-2 text-custom14 font-bold text-white transition"
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
