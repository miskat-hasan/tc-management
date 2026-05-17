// src/middleware.js
import { NextResponse } from "next/server";
import { roleDefaultPage, roleSegment } from "./config";

function getRoleHome(role, allowedSites) {
  const segment = roleSegment[role];
  const defaultPage = roleDefaultPage[role];
  const firstSite = allowedSites?.split(",")?.[0];

  if (!segment || !firstSite) return "/login";

  if (segment === "student" || segment === "client") {
    return `/dashboard/${segment}/${defaultPage}`;
  } else {
    return `/dashboard/${segment}/${firstSite}/${defaultPage}`;
  }
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  const allowedSites = request.cookies.get("allowed_sites")?.value;

  if (!token || !role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/dashboard") {
    if (!allowedSites) {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL(getRoleHome(role, allowedSites), request.url),
    );
  }

  // Role-level access check
  const segment = roleSegment[role];
  const hasRoleAccess = pathname.startsWith(`/dashboard/${segment}/`);

  if (!hasRoleAccess) {
    if (!allowedSites) return NextResponse.next();
    return NextResponse.redirect(
      new URL(getRoleHome(role, allowedSites), request.url),
    );
  }

  // Training site access check
  const tsMatch = pathname.match(/\/dashboard\/[^/]+\/(\d+)/);
  if (tsMatch) {
    const requestedTs = tsMatch[1];
    const allowedSiteList = allowedSites?.split(",") ?? [];

    if (!allowedSiteList.includes(requestedTs)) {
      if (!allowedSites) return NextResponse.next();
      return NextResponse.redirect(
        new URL(getRoleHome(role, allowedSites), request.url),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
