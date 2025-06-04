import { NextResponse } from "next/server";

export function middleware(req) {
  try {
    const token = req?.cookies?.get("userToken")?.value;
    const url = req?.nextUrl;
   
    if (
      (!token && url?.pathname === "/addBlog") ||
      (!token && url?.pathname === "/blogList")
    ) {
      return NextResponse.redirect(new URL("/login", req?.url));
    }

    if (token && url?.pathname === "/login") {
      return NextResponse.redirect(new URL("/", req?.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("❌ Middleware error:", error);
  }
}

export const config = {
  matcher: ["/", "/login", "/blogList", "/addBlog"],
};
