"use client";

import ArticleCard from "@/app/components/cards/ArticlesCard";
import { useState } from "react";
import ArticleDetails from "./ArticleDetails";

const tabs = [
  { id: "all", title: "الكل" },
  { id: "commercial", title: "القانون التجاري" },
  { id: "arbitration", title: "التحكيم" },
  { id: "realestate", title: "العقارات" },
  { id: "consulting", title: "الاستشارات" },
];

const articles = [
  {
    id: "1",
    slug: "contract-review",
    title: "ما الذي يجب أن تعرفه قبل توقيع أي عقد",
    description:
      "إدارة الإجراءات القانونية ومتابعة جميع مراحل العمل، مع التواصل المستمر لضمان وضوح الخطوات وحماية مصالح العميل.",
    image: "/images/pic-2.png",
    category: "commercial",
  },
  {
    id: "2",
    slug: "real-estate",
    title: "حقوق المالك في مواجهة المستأجر",
    description:
      "إدارة الإجراءات القانونية ومتابعة جميع مراحل العمل، مع التواصل المستمر لضمان وضوح الخطوات وحماية مصالح العميل.",
    image: "/images/pic-2.png",
    category: "realestate",
  },
  {
    id: "3",
    title: "أسئلة تطرحها في أول لقاء مع محاميك",
    description:
      "إدارة الإجراءات القانونية ومتابعة جميع مراحل العمل، مع التواصل المستمر لضمان وضوح الخطوات وحماية مصالح العميل.",
    image: "/images/pic-2.png",
    category: "consulting",
  },
  {
    id:"4",
    title: "أسئلة تطرحها في أول لقاء مع محاميك",
    description:
      "إدارة الإجراءات القانونية ومتابعة جميع مراحل العمل، مع التواصل المستمر لضمان وضوح الخطوات وحماية مصالح العميل.",
    image: "/images/pic-2.png",
    category: "arbitration",
  },
];

export default function ArticlesTabs( { locale } ) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredArticles =
    activeTab === "all"
      ? articles
      : articles.filter((article) => article.category === activeTab);

  return (
    <section className="bg-primary pb-28 mt-[50px]">
      <div className="container">
        <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full border px-6 py-3 text-custom14 font-[600] transition ${
                activeTab === tab.id
                  ? "border-secondary bg-secondary text-white"
                  : "border-[#263B58] bg-transparent text-white hover:border-secondary hover:text-secondary"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-6">
          {filteredArticles.map((article, index) => (
            <div
              key={index}
              className="col-span-12 md:col-span-6 lg:col-span-4"
            >
              <ArticleDetails locale={locale} article={article} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
