"use client";

import { useState } from "react";
import Link from "next/link";
import ArticleCard from "./cards/ArticlesCard";
import FeaturedArticleCard from "./cards/FeaturedArticeCard";
import { useHome } from "@/hooks/useHome";
import LoadingCard from "./LoadingCard";
import ErrorState from "./ErrorState";
import { getDictionary } from "@/lib/getDictionary";

export default function ArticlesSection({ locale }) {
  const isArabic = locale === "ar";
  const dict = getDictionary(locale);
  const [activeIndex, setActiveIndex] = useState(0);

    const { data, isLoading, error } = useHome(locale);
    const articles = data?.topics || [];
  const activeArticle = articles[activeIndex];
  
    if (isLoading) return <LoadingCard />;
  
    if (error) return <ErrorState />;

  return (
    <section className=" py-28">
      <div className="mx-auto max-w-[1200px] px-6 mb-20">
        <div className="mb-16 md:block lg:flex items-center justify-between">
          <div className="text-start">
            <span className="mb-5 inline-flex rounded-full bg-secondary/10 px-6 py-2 text-custom14 text-secondary">
              {dict?.articles?.title}
            </span>

            <h2 className="text-custom26 font-bold mb-4 text-white">
              {dict?.articles?.subtitle}
            </h2>
          </div>

          <Link
            href={`/${locale}/articles`}
            className="rounded-full lg:mt-2 md:mt-4 block text-center bg-secondary px-6 py-3 text-custom14 text-white transition hover:bg-[#b98f45]"
          >
            {dict?.articles?.viewAll}
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="lg:col-span-6 col-span-12">
            <FeaturedArticleCard article={activeArticle} locale={locale} />
          </div>

          <div className="space-y-6 lg:col-span-6 col-span-12">
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