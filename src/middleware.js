// src/middleware.js
import { NextResponse } from "next/server";

const roleSegment = {
  "Super Admin":           "super-admin",
  "Training Center Admin": "admin",
  "Training Site Admin":   "admin",
  "Instructor":            "instructor",
  "Student":               "student",
  "Client":                "client",
};

const roleDefaultPage = {
  "Super Admin":           "class_and_students/upcoming_classes",
  "Training Center Admin": "class_and_students/classes",
  "Training Site Admin":   "class_and_students/classes",
  "Instructor":            "class_and_students/classes",
  "Student":               "class_and_students/classes",
  "Client":                "class_and_students/classes",
};

function getRoleHome(role, allowedSites) {
  const segment     = roleSegment[role];
  const defaultPage = roleDefaultPage[role];
  const firstSite   = allowedSites?.split(",")?.[0];

  if (!segment || !firstSite) return "/login";

  return `/dashboard/${segment}/${firstSite}/${defaultPage}`;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token        = request.cookies.get("token")?.value;
  const role         = request.cookies.get("role")?.value;
  const allowedSites = request.cookies.get("allowed_sites")?.value;

  // Not logged in
  if (!token || !role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // /dashboard root → redirect to full role home with ts
  if (pathname === "/dashboard") {
    // allowed_sites not set yet (still loading) → wait
    if (!allowedSites) {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL(getRoleHome(role, allowedSites), request.url)
    );
  }

  // Role-level access check
  const segment = roleSegment[role];
  const hasRoleAccess = pathname.startsWith(`/dashboard/${segment}/`);

  if (!hasRoleAccess) {
    if (!allowedSites) return NextResponse.next();
    return NextResponse.redirect(
      new URL(getRoleHome(role, allowedSites), request.url)
    );
  }

  // Training site access check
  const tsMatch = pathname.match(/\/dashboard\/[^/]+\/(\d+)/);
  if (tsMatch) {
    const requestedTs     = tsMatch[1];
    const allowedSiteList = allowedSites?.split(",") ?? [];

    if (!allowedSiteList.includes(requestedTs)) {
      if (!allowedSites) return NextResponse.next();
      return NextResponse.redirect(
        new URL(getRoleHome(role, allowedSites), request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};