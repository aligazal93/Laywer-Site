"use client";
import React from "react";
import { useParams } from "next/navigation";
import ArticlesTabs from "./components/ArticlesTabs";
import { useTopics } from "@/hooks/useTopics";
import LoadingCard from "@/app/components/LoadingCard";
import ErrorState from "@/app/components/ErrorState";
import { getDictionary } from "@/lib/getDictionary";

export default function ArticlesPage() {
  const { locale = "ar" } = useParams();

  const dict = getDictionary(locale);

  const { data, isLoading, error } = useTopics(locale);
  const categories = data?.categories || [];

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorState />;


  return (
    <section className="container py-[200px]">
      <div className="grid grid-cols-12">
        <div className="col-span-12 text-center">
          <span className="mb-2 inline-block px-6 py-3 text-custom14 font-[700] text-secondary">
            {dict?.legalContent?.badge}
          </span>

          <h1 className="mx-auto w-full text-custom32 font-[700] leading-relaxed text-white">
            {dict?.legalContent?.title}
          </h1>

          <p className="mx-auto mt-2 w-full text-custom16 leading-8 text-white">
            {dict?.legalContent?.description}
          </p>
        </div>

        <div className="col-span-12">
          <ArticlesTabs categories={categories} locale={locale} />
        </div>
      </div>
    </section>
  );
}