import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const protectedPaths = ["/admin"];
  const isProtectedRoute = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedRoute && !token) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (token && pathname === "/login") {
    return NextResponse.redirect(
      new URL("/admin/class_and_students/upcoming_classes", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
