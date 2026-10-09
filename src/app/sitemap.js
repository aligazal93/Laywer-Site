const baseUrl = "https://alilaw.ae";

export const dynamic = "force-dynamic";

const locales = ["ar", "en"];

const pages = [
  "",
  "/about-us",
  "/articles",
  "/contact",
  "/privacy-policy",
  "/terms-conditions",
];

const apiBase = process.env.NEXT_PUBLIC_API_URL;

function extractItems(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.topics)) return payload.topics;
  if (Array.isArray(payload?.data?.topics)) return payload.data.topics;
  return [];
}

async function fetchArticles(locale) {
  if (!apiBase) {
    console.error("Sitemap: NEXT_PUBLIC_API_URL is missing");
    return [];
  }

  try {
    const endpoint =
      apiBase.replace(/\/$/, "") + "/topics";

    const response = await fetch(endpoint, {
      headers: {
        Accept: "application/json",
        lang: locale,
        "Accept-Language": locale,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
    });

    if (!response.ok) {
      throw new Error("API status " + response.status);
    }

    const payload = await response.json();
    const items = extractItems(payload);

    return items
      .filter((item) => {
        const id = Number(item?.id);
        return Number.isSafeInteger(id) && id > 0;
      })
      .map((item) => ({
        url: baseUrl + "/" + locale +
          "/articles/" + Number(item.id),
        changeFrequency: "monthly",
        priority: 0.9,
      }));
  } catch (error) {
    console.error(
      "Sitemap articles error:",
      locale,
      error.message
    );
    return [];
  }
}

export default async function sitemap() {
  const staticPages = locales.flatMap((locale) =>
    pages.map((page) => ({
      url: baseUrl + "/" + locale + page,
      changeFrequency: "weekly",
      priority: page === "" ? 1 : 0.8,
    }))
  );

  const articleGroups = await Promise.all(
    locales.map((locale) => fetchArticles(locale))
  );

  const unique = new Map();

  for (const entry of [
    ...staticPages,
    ...articleGroups.flat(),
  ]) {
    unique.set(entry.url, entry);
  }

  return Array.from(unique.values());
}
