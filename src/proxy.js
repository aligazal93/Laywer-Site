import { NextResponse } from "next/server";

const CSP_HEADER = "Content-Security-Policy";

function createContentSecurityPolicy(nonce) {
  const isDevelopment = process.env.NODE_ENV === "development";

  const directives = [
    "default-src 'self'",

    [
      "script-src 'self'",
      `'nonce-${nonce}'`,
      "'strict-dynamic'",

      // React يحتاج unsafe-eval في Development فقط.
      isDevelopment ? "'unsafe-eval'" : "",

      // Fallback للمتصفحات القديمة ودعم Google Tag Manager.
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://*.google-analytics.com",
    ]
      .filter(Boolean)
      .join(" "),

    // منع onclick وonerror وأي JavaScript داخل HTML attributes.
    "script-src-attr 'none'",

    // Next.js يضع nonce على style tags التي ينشئها.
    [
      "style-src 'self'",
      isDevelopment ? "'unsafe-inline'" : `'nonce-${nonce}'`,
    ].join(" "),

    /*
     * مطلوب بسبب Framer Motion وأي عنصر يستخدم:
     * style={{ ... }}
     *
     * هذا يسمح بخصائص CSS المضمنة فقط،
     * ولا يسمح بتشغيل JavaScript داخلي.
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

    ["media-src 'self'", "blob:", "https://admin.alilaw.ae"].join(" "),

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
  /*
   * هذه هي نسخة CSP التي تصل إلى المتصفح
   * وإلى MDN Observatory.
   */
  response.headers.set(CSP_HEADER, contentSecurityPolicy);

  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );

  response.headers.set("X-Content-Type-Options", "nosniff");

  response.headers.set("X-Frame-Options", "DENY");

  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
  );

  response.headers.set("Cross-Origin-Resource-Policy", "same-site");

  response.headers.set("X-DNS-Prefetch-Control", "on");

  return response;
}

export function proxy(request) {
  /*
   * توليد nonce مختلف مع كل Request.
   */
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const contentSecurityPolicy = createContentSecurityPolicy(nonce);

  const requestHeaders = new Headers(request.headers);

  /*
   * نرسل nonce إلى Server Components
   * حتى يمكن قراءته داخل layout.js.
   */
  requestHeaders.set("x-nonce", nonce);

  /*
   * هذه النسخة مطلوبة داخل الـRequest
   * حتى يستخرج Next.js الـnonce ويضيفه
   * إلى سكربتات Next.js وReact الداخلية.
   */
  requestHeaders.set(CSP_HEADER, contentSecurityPolicy);

  const { pathname } = request.nextUrl;

  /*
   * تحويل الصفحة الرئيسية إلى النسخة العربية.
   */
  if (pathname === "/") {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = "/ar";

    const redirectResponse = NextResponse.redirect(redirectUrl, 308);

    return applySecurityHeaders(redirectResponse, contentSecurityPolicy);
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return applySecurityHeaders(response, contentSecurityPolicy);
}

export const config = {
  matcher: ["/", "/ar/:path*", "/en/:path*"],
};
