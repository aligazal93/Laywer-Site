import { NextResponse } from "next/server";

function createContentSecurityPolicy(nonce) {
  const isDevelopment = process.env.NODE_ENV === "development";

  return `
    default-src 'self';

    script-src
      'self'
      'nonce-${nonce}'
      'strict-dynamic'
      ${isDevelopment ? "'unsafe-eval'" : ""}
      https://www.googletagmanager.com
      https://www.google-analytics.com;

    style-src
      'self'
      'unsafe-inline'
      https://fonts.googleapis.com;

    img-src
      'self'
      data:
      blob:
      https:
      https://admin.alilaw.ae
      https://www.google-analytics.com
      https://www.googletagmanager.com
      https://stats.g.doubleclick.net;

    font-src
      'self'
      data:
      https://fonts.gstatic.com;

    connect-src
      'self'
      https://admin.alilaw.ae
      https://www.google-analytics.com
      https://analytics.google.com
      https://region1.google-analytics.com
      https://www.googletagmanager.com
      https://stats.g.doubleclick.net;

    frame-src
      'self'
      https://www.google.com
      https://maps.google.com;

    media-src
      'self'
      blob:
      https:;

    worker-src
      'self'
      blob:;

    manifest-src
      'self';

    object-src
      'none';

    base-uri
      'self';

    form-action
      'self';

    frame-ancestors
      'none';

    script-src-attr
      'none';

    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function proxy(request) {
  const pathname = request.nextUrl.pathname;

  // إنشاء nonce مختلف وآمن لكل Request
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const contentSecurityPolicy =
    createContentSecurityPolicy(nonce);

  // تمرير الـ nonce إلى Next.js حتى يضيفه إلى سكربتات الموقع
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-nonce", nonce);

  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicy
  );

  // تحويل الصفحة الرئيسية إلى النسخة العربية
  if (pathname === "/") {
    const redirectResponse = NextResponse.redirect(
      new URL("/ar", request.url)
    );

    redirectResponse.headers.set(
      "Content-Security-Policy",
      contentSecurityPolicy
    );

    return redirectResponse;
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicy
  );

  return response;
}

export const config = {
  matcher: [
    {
      /*
       * تشغيل Proxy على صفحات الموقع فقط، مع استبعاد:
       * API
       * ملفات Next.js
       * الصور والخطوط
       * robots وsitemap
       */
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images|fonts|icons).*)",

      // عدم تشغيل Proxy على طلبات Next Link Prefetch
      missing: [
        {
          type: "header",
          key: "next-router-prefetch",
        },
        {
          type: "header",
          key: "purpose",
          value: "prefetch",
        },
      ],
    },
  ],
};