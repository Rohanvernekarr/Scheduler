import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  // Grab the first segment before the first dot (handles localhost and real domains)
  const subdomain = hostname.split(".")[0];

  if (subdomain === "rohan") {
    const portfolioUrl =
      process.env.PORTFOLIO_URL || "http://localhost:3002";

    const url = request.nextUrl.clone();
    const target = new URL(url.pathname + url.search, portfolioUrl);

    return NextResponse.rewrite(target);
  }

  return NextResponse.next();
}

export const config = {
  // Run on every route except Next.js internals and static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
