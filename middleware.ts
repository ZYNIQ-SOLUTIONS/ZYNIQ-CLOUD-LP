import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host') || ''

  // zyniq.cloud is the main landing site — serves all pages directly, no rewrite
  if (hostname === 'zyniq.cloud' || hostname.startsWith('zyniq.cloud:')) {
    return NextResponse.next()
  }

  // Define mapping of domain to path folder (subdomains only)
  const hostToPathMap: Record<string, string> = {
    'core.zyniq.cloud': '/core',
    'zyniq.solutions': '/solutions',
    'zyniq.studio': '/studio',
  }

  // Find exact match
  let targetPath = null
  for (const [domain, path] of Object.entries(hostToPathMap)) {
    if (hostname === domain || hostname === `${domain}:3555` || hostname === `${domain}:3333`) {
      targetPath = path
      break
    }
  }

  // If match found and we aren't already at that path (and not requesting a static asset)
  if (
    targetPath && 
    !url.pathname.startsWith(targetPath) && 
    !url.pathname.startsWith('/_next') &&
    !url.pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp)$/)
  ) {
    url.pathname = `${targetPath}${url.pathname === '/' ? '' : url.pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
