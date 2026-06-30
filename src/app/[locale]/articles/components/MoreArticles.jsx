import ArticleCard from "@/app/components/cards/ArticlesCard";
import React from "react";
import ArticleDetails from "./ArticleDetails";


export default function MoreArticles({ locale, articles = [] }) {
  return (
    <div className="grid grid-cols-12 gap-6 mt-[50px]">
      <div className="col-span-12">
        <h1 className="text-custom18 font-bold text-white">ابقَ على اطلاع </h1>
      </div>
      {articles.map((article, index) => (
        <div key={article.id} className="col-span-12 md:col-span-6 lg:col-span-4">
          <ArticleDetails locale={locale} article={article} index={index} />
        </div>
      ))}
    </div>
  );
}
