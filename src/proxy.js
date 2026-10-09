
import { NextResponse } from "next/server";

const CSP_HEADER = "Content-Security-Policy";

/*
 * AliLaw - Security & Article URL Canonicalization
 *
 * - Preserve existing CSP and security headers.
 * - Preserve the Arabic homepage redirect.
 * - Redirect legacy article slugs to short URLs.
 * - Preserve Arabic and English article separation.
 * - Avoid modifying article content or metadata.
 */

function createContentSecurityPolicy(nonce) {
  const isDevelopment = process.env.NODE_ENV === "development";

  const directives = [
    "default-src 'self'",

    [
      "script-src 'self'",
      `'nonce-${nonce}'`,
      "'strict-dynamic'",
      isDevelopment ? "'unsafe-eval'" : "",
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://*.google-analytics.com",
    ]
      .filter(Boolean)
      .join(" "),

    "script-src-attr 'none'",

    [
      "style-src 'self'",
      isDevelopment
        ? "'unsafe-inline'"
        : `'nonce-${nonce}'`,
    ].join(" "),

    /*
     * Preserve inline CSS properties used by
     * Framer Motion and React components.
     */
    "style-src-attr 'unsafe-inline'",

    [
      "img-src 'self'",
      "data:",
      "blob:",
      "https://admin.alilaw.ae",
      "https://www.googletagmanager.com",
      "https://*.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://*.google-analytics.com",
    ].join(" "),

    "font-src 'self' data:",

    [
      "connect-src 'self'",
      "https://admin.alilaw.ae",
      "https://www.googletagmanager.com",
      "https://*.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://*.google-analytics.com",
      "https://analytics.google.com",
      "https://*.analytics.google.com",
      "https://www.google.com",
    ].join(" "),

    [
      "frame-src 'self'",
      "https://www.google.com",
      "https://maps.google.com",
      "https://www.googletagmanager.com",
    ].join(" "),

    [
      "media-src 'self'",
      "blob:",
      "https://admin.alilaw.ae",
    ].join(" "),

    "worker-src 'self' blob:",
    "manifest-src 'self'",

    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",

    !isDevelopment
      ? "upgrade-insecure-requests"
      : "",
  ];

  return directives
    .filter(Boolean)
    .join("; ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function applySecurityHeaders(
  response,
  contentSecurityPolicy
) {
  response.headers.set(
    CSP_HEADER,
    contentSecurityPolicy
  );

  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );

  response.headers.set(
    "X-Content-Type-Options",
    "nosniff"
  );

  response.headers.set(
    "X-Frame-Options",
    "DENY"
  );

  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin"
  );

  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
  );

  response.headers.set(
    "Cross-Origin-Resource-Policy",
    "same-site"
  );

  response.headers.set(
    "X-DNS-Prefetch-Control",
    "on"
  );

  return response;
}

/*
 * Canonical article URL normalization.
 *
 * Supported examples:
 *
 * /ar/articles/22-old-title
 *       -> /ar/articles/22
 *
 * /en/articles/22-old-title
 *       -> /en/articles/22
 *
 * /ar/articles/22/
 *       -> /ar/articles/22
 *
 * Already canonical URLs remain unchanged.
 *
 * Do not redirect unrelated paths.
 */
function getCanonicalArticlePath(pathname) {
  const match = pathname.match(
    /^\/(ar|en)\/articles\/([1-9]\d*)(?:-[^/]*)?\/?$/
  );

  if (!match) {
    return null;
  }

  const language = match[1];
  const articleId = match[2];

  const canonicalPath =
    `/${language}/articles/${articleId}`;

  if (pathname === canonicalPath) {
    return null;
  }

  return canonicalPath;
}

export function proxy(request) {
  /*
   * Generate a unique nonce for each request.
   */
  const nonce = Buffer.from(
    crypto.randomUUID()
  ).toString("base64");

  const contentSecurityPolicy =
    createContentSecurityPolicy(nonce);

  const requestHeaders = new Headers(
    request.headers
  );

  /*
   * Preserve nonce forwarding to Server Components.
   */
  requestHeaders.set(
    "x-nonce",
    nonce
  );

  /*
   * Preserve the request CSP required by Next.js.
   */
  requestHeaders.set(
    CSP_HEADER,
    contentSecurityPolicy
  );

  const { pathname } = request.nextUrl;

  /*
   * Redirect the homepage to Arabic.
   */
  if (pathname === "/") {
    const redirectUrl =
      request.nextUrl.clone();

    redirectUrl.pathname = "/ar";

    const redirectResponse =
      NextResponse.redirect(
        redirectUrl,
        308
      );

    return applySecurityHeaders(
      redirectResponse,
      contentSecurityPolicy
    );
  }

  /*
   * Redirect old article slugs to canonical paths.
   */
  const canonicalArticlePath =
    getCanonicalArticlePath(pathname);

  if (canonicalArticlePath) {
    const redirectUrl =
      request.nextUrl.clone();

    redirectUrl.pathname =
      canonicalArticlePath;

    // Avoid carrying tracking parameters into
    // the permanent canonical destination.
    redirectUrl.search = "";

    const redirectResponse =
      NextResponse.redirect(
        redirectUrl,
        308
      );

    return applySecurityHeaders(
      redirectResponse,
      contentSecurityPolicy
    );
  }

  /*
   * Continue normal Next.js processing.
   */
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return applySecurityHeaders(
    response,
    contentSecurityPolicy
  );
}

export const config = {
  matcher: [
    "/",
    "/ar/:path*",
    "/en/:path*",
  ],
};
