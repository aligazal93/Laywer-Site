const baseUrl = "https://alilaw.ae";

export default function sitemap() {
    const locales = ["ar", "en"];

    const pages = [
        "",
        "/about-us",
        "/articles",
        "/contact",
        "/privacy-policy",
        "/terms-conditions",
    ];

    return locales.flatMap((locale) =>
        pages.map((page) => ({
            url: `${baseUrl}/${locale}${page}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: page === "" ? 1 : 0.8,
        }))
    );
}