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
   * - article.title is the main H1.
   * - Remove the first H1/H2 inside CMS content if it is the same
   *   as article.title.
   * - Ignore harmless spacing differences around punctuation.
   * - Convert every remaining H1 inside CMS content to H2.
   */

  const decodeBasicEntities = (value = "") =>
    value
      .replace(/&nbsp;|&#160;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&quot;|&#34;/gi, '"')
      .replace(/&#39;|&apos;/gi, "'")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">");

  const normalizeHeadingText = (value = "") =>
    decodeBasicEntities(value)
      // Remove HTML tags inside headings
      .replace(/<[^>]*>/g, " ")

      // Normalize non-breaking spaces
      .replace(/\u00a0/g, " ")

      // Normalize spaces around Arabic and English punctuation
      .replace(/\s*([:：،,؛;!?؟\-–—])\s*/g, "$1")

      // Normalize remaining whitespace
      .replace(/\s+/g, " ")

      .trim();

  const removeDuplicatedArticleTitle = (html = "", title = "") => {
    if (!html || !title) {
      return html;
    }

    const normalizedTitle = normalizeHeadingText(title);

    if (!normalizedTitle) {
      return html;
    }

    let duplicateRemoved = false;

    return html.replace(
      /<(h1|h2)\b([^>]*)>([\s\S]*?)<\/\1\s*>/gi,
      (fullMatch, tagName, attributes, headingContent) => {
        if (duplicateRemoved) {
          return fullMatch;
        }

        const normalizedHeading =
          normalizeHeadingText(headingContent);

        if (normalizedHeading === normalizedTitle) {
          duplicateRemoved = true;
          return "";
        }

        return fullMatch;
      }
    );
  };

  /*
   * STEP 1:
   * Remove the first duplicated article title from CMS content.
   */
  let safeArticleContent = removeDuplicatedArticleTitle(
    article.content || "",
    article.title || ""
  );

  /*
   * STEP 2:
   * Prevent CMS content from creating another H1.
   * Any remaining H1 becomes H2.
   */
  safeArticleContent = safeArticleContent
    .replace(/<h1\b([^>]*)>/gi, "<h2$1>")
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
