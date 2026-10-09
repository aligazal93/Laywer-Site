import { NextResponse } from "next/server";

const CSP_HEADER = "Content-Security-Policy";

/*
 * AliLaw - Security & URL Canonicalization
 * Preserve security headers, CSP, and article URLs.
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
    ].filter(Boolean).join(" "),
    "script-src-attr 'none'",
    [
      "style-src 'self'",
      isDevelopment ? "'unsafe-inline'" : `'nonce-${nonce}'`,
    ].join(" "),
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
    !isDevelopment ? "upgrade-insecure-requests" : "",
  ];

  return directives
    .filter(Boolean)
    .join("; ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function applySecurityHeaders(response, contentSecurityPolicy) {
  response.headers.set(CSP_HEADER, contentSecurityPolicy);
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin"
  );
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
  );
  response.headers.set("Cross-Origin-Resource-Policy", "same-site");
  response.headers.set("X-DNS-Prefetch-Control", "on");
  return response;
}

function getCanonicalArticlePath(pathname) {
  const match = pathname.match(
    /^\/(ar|en)\/articles\/([1-9]\d*)(?:-[^/]*)?\/?$/
  );

  if (!match) {
    return null;
  }

  const canonicalPath = `/${match[1]}/articles/${match[2]}`;

  if (pathname === canonicalPath) {
    return null;
  }

  return canonicalPath;
}

export function proxy(request) {
  const nonce = Buffer.from(
    crypto.randomUUID()
  ).toString("base64");

  const contentSecurityPolicy = createContentSecurityPolicy(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(CSP_HEADER, contentSecurityPolicy);

  const { pathname } = request.nextUrl;

  /*
   * Redirect www.alilaw.ae to alilaw.ae.
   * Preserve paths and query parameters.
   */
  if (
    request.nextUrl.hostname.toLowerCase() === "www.alilaw.ae"
  ) {
    const destination = request.nextUrl.clone();
    destination.hostname = "alilaw.ae";
    destination.protocol = "https:";

    return applySecurityHeaders(
      NextResponse.redirect(destination, 308),
      contentSecurityPolicy
    );
  }

  /*
   * Redirect homepage to Arabic.
   */
  if (pathname === "/") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/ar";

    return applySecurityHeaders(
      NextResponse.redirect(redirectUrl, 308),
      contentSecurityPolicy
    );
  }

  /*
   * Redirect legacy article slugs to short URLs.
   */
  const canonicalArticlePath = getCanonicalArticlePath(pathname);

  if (canonicalArticlePath) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = canonicalArticlePath;
    redirectUrl.search = "";

    return applySecurityHeaders(
      NextResponse.redirect(redirectUrl, 308),
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

  return applySecurityHeaders(response, contentSecurityPolicy);
}

/*
 * Apply redirects to all public pages.
 * Keep static assets and API routes excluded.
 */
export const config = {
  matcher: [
    "/",
    "/ar/:path*",
    "/en/:path*",
    "/sitemap.xml",
    "/robots.txt",
  ],
};
