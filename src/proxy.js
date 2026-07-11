import {
    NextResponse
} from "next/server";

function createContentSecurityPolicy(nonce) {
    const isDevelopment = process.env.NODE_ENV === "development";

    return `
    default-src 'self';

    script-src
      'self'
      'nonce-${nonce}'
      'strict-dynamic'
      ${isDevelopment ? "'unsafe-eval'" : ""};

    script-src-attr 'none';

    style-src
      'self'
      'unsafe-inline';

    img-src
      'self'
      data:
      blob:
      https://admin.alilaw.ae;

    font-src
      'self'
      data:;

    connect-src
      'self'
      https://admin.alilaw.ae;

    frame-src
      'self'
      https://www.google.com
      https://maps.google.com;

    media-src
      'self'
      blob:;

    worker-src
      'self'
      blob:;

    manifest-src
      'self';

    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
        .replace(/\s{2,}/g, " ")
        .trim();
}

export function proxy(request) {
    const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

    const contentSecurityPolicy =
        createContentSecurityPolicy(nonce);

    const requestHeaders = new Headers(request.headers);

    requestHeaders.set("x-nonce", nonce);
    requestHeaders.set(
        "Content-Security-Policy",
        contentSecurityPolicy
    );

    if (request.nextUrl.pathname === "/") {
        const response = NextResponse.redirect(
            new URL("/ar", request.url)
        );

        response.headers.set(
            "Content-Security-Policy",
            contentSecurityPolicy
        );

        return response;
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
        "/",
        "/ar/:path*",
        "/en/:path*",
    ],
};