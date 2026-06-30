"use client";

import { useState } from "react";
import Link from "next/link";
import ArticleCard from "./cards/ArticlesCard";
import FeaturedArticleCard from "./cards/FeaturedArticeCard";

const articles = [
  {
    title: "متى تحتاج إلى استشارة قانونية قبل اتخاذ القرار؟",
    description:
      "إدارة الإجراءات القانونية ومتابعة جميع مراحل العمل مع التواصل المستمر لضمان وضوح الخطوات.",
    image: "/images/pic-2.png",
  },
  {
    title: "أهمية المراجعة القانونية قبل توقيع العقود",
    description:
      "إدارة الإجراءات القانونية ومتابعة جميع مراحل العمل مع التواصل المستمر لضمان وضوح الخطوات.",
    image: "/images/pic-2.png",
  },
  {
    title: "الامتثال القانوني ودوره في استقرار الشركات",
    description:
      "إدارة الإجراءات القانونية ومتابعة جميع مراحل العمل مع التواصل المستمر لضمان وضوح الخطوات.",
    image: "/images/pic-2.png",
  },
];

export default function ArticlesSection({ locale }) {
  const isArabic = locale === "ar";
  const [activeIndex, setActiveIndex] = useState(0);
  const activeArticle = articles[activeIndex];

  return (
    <section className="bg-primary py-28">
      <div className="mx-auto max-w-[1200px] px-6 mb-20">
        <div className="mb-16 md:block lg:flex items-end justify-between">
          <div className="text-start">
            <span className="mb-5 inline-flex rounded-full bg-secondary/10 px-5 py-2 text-custom12 text-secondary">
              • الرؤى القانونية
            </span>

            <h2 className="text-custom36 font-bold mb-4 text-white">
              تحليلات قانونية تساعد على اتخاذ قرارات أكثر وضوحًا.
            </h2>
          </div>

          <Link
            href={`/${locale}/articles`}
            className="rounded-full lg:mt-2 md:mt-4 block text-center bg-secondary px-6 py-3 text-custom14 text-white transition hover:bg-[#b98f45]"
          >
            عرض جميع المقالات
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="lg:col-span-6 col-span-12">
            <FeaturedArticleCard article={activeArticle} locale={locale} />
          </div>

          <div className="space-y-3 lg:col-span-6 col-span-12">
            {articles.map((article, index) => (
              <ArticleCard
                key={index}
                article={article}
                index={index}
                locale={locale}
                isActive={activeIndex === index}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}