import ArticlesTabs from "./components/ArticlesTabs";
import { getDictionary } from "@/lib/getDictionary";

const API_URL = "https://admin.alilaw.ae/api/v1/";

async function getArticlesData(locale) {
  try {
    const response = await fetch(`${API_URL}topics`, {
      headers: {
        lang: locale,
        "Accept-Language": locale,
        Accept: "application/json",
      },
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      console.error(
        "Articles API error:",
        response.status,
        response.statusText
      );
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Articles fetch error:", error);
    return null;
  }
}

export default async function ArticlesPage({ params }) {
  const { locale = "ar" } = await params;

  const dict = getDictionary(locale);
  const data = await getArticlesData(locale);

  const categories = data?.categories || [];
  const articles = data?.topics || [];

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
          <ArticlesTabs
            categories={categories}
            articles={articles}
            locale={locale}
          />
        </div>
      </div>
    </section>
  );
}
