import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const user = request.cookies.get("user")?.value
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")

  if (isAdminRoute) {
    if (!token || !user) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    try {
      const userData = JSON.parse(user)
      if (userData.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"]
} 