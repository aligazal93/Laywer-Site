const SITE_URL = "https://alilaw.ae";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

function toAbsoluteUrl(value, fallback) {
  if (!value) return fallback;

  try {
    return new URL(value, SITE_URL).toString();
  } catch {
    return fallback;
  }
}

function toBoolean(value, fallback = true) {
  if (value === undefined || value === null) {
    return fallback;
  }

  if (
    value === false ||
    value === 0 ||
    value === "0" ||
    value === "false"
  ) {
    return false;
  }

  return true;
}

export function extractSeoDetails(response) {
  return (
    response?.seo_details ||
    response?.data?.seo_details ||
    null
  );
}

export function buildSeoMetadata({
  seoDetails,
  locale = "ar",
  pathname = "",
  fallbackTitle,
  fallbackDescription,
  type = "website",
}) {
  const defaultTitle =
    fallbackTitle ||
    (locale === "ar"
      ? "علي سعيد الشامسي | محامٍ ومستشار قانوني"
      : "Ali Saeed Al Shamsi | Lawyer & Legal Consultant");

  const defaultDescription =
    fallbackDescription ||
    (locale === "ar"
      ? "الموقع الرسمي للمحامي والمستشار القانوني علي سعيد الشامسي في دولة الإمارات."
      : "The official website of lawyer and legal consultant Ali Saeed Al Shamsi in the UAE.");

  const title = seoDetails?.title || defaultTitle;

  const description =
    seoDetails?.meta_description || defaultDescription;

  const openGraphTitle =
    seoDetails?.open_graph_title || title;

  const openGraphDescription =
    seoDetails?.open_graph_description || description;

  const canonicalUrl = toAbsoluteUrl(
    seoDetails?.canonical_url,
    `${SITE_URL}/${locale}${pathname}`
  );

  const openGraphImage = toAbsoluteUrl(
    seoDetails?.open_image_url,
    DEFAULT_OG_IMAGE
  );

  const robotsIndex = toBoolean(
    seoDetails?.robots_index,
    true
  );

  const robotsFollow = toBoolean(
    seoDetails?.robots_follow,
    true
  );

  return {
    title: {
      absolute: title,
    },

    description,

    alternates: {
      canonical: canonicalUrl,
    },

    robots: {
      index: robotsIndex,
      follow: robotsFollow,

      googleBot: {
        index: robotsIndex,
        follow: robotsFollow,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      type,
      siteName: "Ali Saeed Al Shamsi",
      locale: locale === "ar" ? "ar_AE" : "en_US",
      title: openGraphTitle,
      description: openGraphDescription,
      url: canonicalUrl,

      images: [
        {
          url: openGraphImage,
          width: 1200,
          height: 630,
          alt: openGraphTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description: openGraphDescription,
      images: [openGraphImage],
    },
  };
}