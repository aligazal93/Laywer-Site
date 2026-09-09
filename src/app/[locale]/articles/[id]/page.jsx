import ArticleDetailsClient from "./ArticleDetailsClient";

const SITE_URL = "https://alilaw.ae";
const API_URL = "https://admin.alilaw.ae/api/v1/";

function stripHtml(html = "") {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function getArticle(id, locale) {
  try {
    if (!id) return null;

    const response = await fetch(`${API_URL}topics/${id}`, {
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
        "Article API error:",
        response.status,
        response.statusText
      );
      return null;
    }

    const data = await response.json();

    return data?.topic || null;
  } catch (error) {
    console.error("Article fetch error:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { locale = "ar", id } = await params;

  const article = await getArticle(id, locale);
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
    stripHtml(article.content || "").slice(0, 160) ||
    (locale === "ar"
      ? "مقال قانوني للمحامي علي سعيد الشامسي."
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

  return (
    <ArticleDetailsClient
      id={id}
      locale={locale}
    />
  );
}
