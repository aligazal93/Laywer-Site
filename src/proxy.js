import {
    NextResponse
} from "next/server";

export function proxy(request) {
    const pathname = request.nextUrl.pathname;

    if (pathname === "/") {
        return NextResponse.redirect(new URL("/ar", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/"],
};