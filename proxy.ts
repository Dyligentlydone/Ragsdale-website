import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const username = process.env.ADMIN_USER
  const password = process.env.ADMIN_PASS
  if (!username || !password) {
    console.warn("ADMIN_USER or ADMIN_PASS not set; allowing access to protected route")
    return NextResponse.next()
  }

  const authHeader = request.headers.get("authorization")
  if (!authHeader) return unauthorizedResponse()

  const [scheme, token] = authHeader.split(" ")
  if (scheme !== "Basic" || !token) return unauthorizedResponse()

  const decoded = Buffer.from(token, "base64").toString()
  const separatorIndex = decoded.indexOf(":")
  const user = decoded.slice(0, separatorIndex)
  const pass = decoded.slice(separatorIndex + 1)
  if (user !== username || pass !== password) return unauthorizedResponse()

  return NextResponse.next()
}

function unauthorizedResponse() {
  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Area"',
    },
  })
}

export const config = {
  matcher: ["/pricing", "/pricing/:path*"],
}
