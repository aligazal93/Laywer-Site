import React from "react";
import ArticlesTabs from "./components/ArticlesTabs";

export default async function ArticlesPage({ params }) {
  const { locale } = await params;
  const isArabic = locale === "ar";

  return (
    <section className="container py-[200px]">
      <div className="grid grid-cols-12">
        <div className="col-span-12 text-center">
          <span className="mb-2 inline-block  px-6 py-3 text-custom14 font-[700] text-secondary">
            المحتوى القانوني
          </span>

          <h1 className="mx-auto w-full text-custom32 font-[700] leading-relaxed text-white">
            مقالات في القانون، بلغة تُقرأ.
          </h1>

          <p className="mx-auto mt-2 w-full text-custom16 leading-8 text-white">
            آراء ومقالات في المسائل القانونية — مكتوبة بأسلوب مباشر لمن يريد أن
            يفهم، لا أن يُقنَع. {isArabic ? "عربي" : "english"}
          </p>
        </div>
        <div className="col-span-12">
          <ArticlesTabs locale={locale} />
        </div>
      </div>
    </section>
  );
}
