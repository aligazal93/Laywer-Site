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
   * SEO rules:
   *
   * 1. article.title below is the ONLY H1 on the page.
   *
   * 2. Some articles coming from the CMS may contain the article title
   *    again inside article.content as H1 or H2.
   *
   * 3. Remove ONLY the first H1/H2 whose text exactly matches
   *    article.title, even if other HTML appears before it.
   *
   * 4. Convert any remaining H1 inside article.content to H2.
   *
   * This keeps the article heading structure safe without modifying
   * legitimate H2/H3 headings inside the article.
   */

  const decodeBasicEntities = (value = "") =>
    value
      .replace(/&nbsp;/gi, " ")
      .replace(/&#160;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, '"')
      .replace(/&#34;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/&apos;/gi, "'")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">");

  const normalizeText = (value = "") =>
    decodeBasicEntities(value)
      .replace(/<[^>]*>/g, " ")
      .replace(/\u00a0/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const removeFirstMatchingTitleHeading = (html = "", title = "") => {
    if (!html || !title) return html;

    const normalizedTitle = normalizeText(title);

    if (!normalizedTitle) return html;

    let matchingTitleRemoved = false;

    return html.replace(
      /<(h1|h2)\b([^>]*)>([\s\S]*?)<\/\1\s*>/gi,
      (fullMatch, tagName, attributes, headingContent) => {
        /*
         * Once the duplicated title has been removed,
         * leave every other H1/H2 untouched at this stage.
         */
        if (matchingTitleRemoved) {
          return fullMatch;
        }

        const normalizedHeading = normalizeText(headingContent);

        /*
         * Exact normalized-text comparison only.
         * Similar headings are NOT removed.
         */
        if (normalizedHeading === normalizedTitle) {
          matchingTitleRemoved = true;
          return "";
        }

        return fullMatch;
      }
    );
  };

  /*
   * Step 1:
   * Remove the first duplicated H1/H2 matching article.title,
   * regardless of HTML appearing before it.
   */
  let safeArticleContent = removeFirstMatchingTitleHeading(
    article.content || "",
    article.title || ""
  );

  /*
   * Step 2:
   * Safety net for SEO.
   * No H1 is allowed inside the CMS article body.
   * Any remaining body H1 becomes H2.
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

            {/* The only H1 on the article page */}
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
