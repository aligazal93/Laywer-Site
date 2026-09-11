import ArticleDetailsClient from "./ArticleDetailsClient";

const SITE_URL = "https://alilaw.ae";
const API_URL = "https://admin.alilaw.ae/api/v1/";

function stripHtml(html = "") {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function getArticleData(id, locale) {
  try {
    if (!id) return null;

    const response = await fetch(`${API_URL}topics/${id}`, {
      headers: {
        lang: locale,
        "Accept-Language": locale,
        Accept: "application/json",
      },
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      console.error(
        "Article API error:",
        response.status,
        response.statusText
      );
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Article fetch error:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { locale = "ar", id } = await params;

  const data = await getArticleData(id, locale);
  const article = data?.topic;

  const canonical = `${SITE_URL}/${locale}/articles/${id}`;

  if (!article) {
    return {
      title:
        locale === "ar"
          ? "المقالات القانونية | المحامي علي سعيد الشامسي"
          : "Legal Articles | Ali Saeed Al Shamsi",

      alternates: {
        canonical,
      },

      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const description =
    String(id) === "16" && locale === "ar"
      ? "الفرق بين السب والقذف في القانون الإماراتي، مع توضيح تعريف السب وتعريف القذف والفروق القانونية بينهما والعقوبات المقررة والسب والقذف الإلكتروني."
      : stripHtml(article.content || "").slice(0, 160) ||
        (locale === "ar"
          ? "مقال قانوني بقلم علي سعيد الشامسي."
          : "Legal article by Ali Saeed Al Shamsi.");

  return {
    title: article.title,
    description,

    alternates: {
      canonical,
      languages: {
        ar: `${SITE_URL}/ar/articles/${id}`,
        en: `${SITE_URL}/en/articles/${id}`,
      },
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: article.title,
      description,
      url: canonical,
      type: "article",

      siteName:
        locale === "ar"
          ? "المحامي علي سعيد الشامسي"
          : "Ali Saeed Al Shamsi",

      images: article.image
        ? [
            {
              url: article.image,
              alt: article.title,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: article.image ? [article.image] : [],
    },
  };
}

export default async function ArticleDetailsPage({ params }) {
  const { locale = "ar", id } = await params;

  const data = await getArticleData(id, locale);

  const article = data?.topic || null;
  const relatedArticles = data?.related_topics || [];

  return (
    <ArticleDetailsClient
      id={id}
      locale={locale}
      article={article}
      relatedArticles={relatedArticles}
    />
  );
}
