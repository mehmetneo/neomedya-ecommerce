import { NextRequest, NextResponse } from 'next/server'

// Admin token doğrulama fonksiyonu
function verifyAdminToken(token: string) {
  if (!token) return false
  
  // Token formatını kontrol et
  if (!token.startsWith('admin_')) return false
  
  // Token'ı parçala
  const parts = token.split('_')
  if (parts.length !== 3) return false
  
  const timestamp = parseInt(parts[1])
  const now = Date.now()
  
  // Token'ın 24 saat geçerli olması
  if (now - timestamp > 24 * 60 * 60 * 1000) return false
  
  return true
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Admin paneli koruması
  if (pathname.startsWith('/admin')) {
    // Admin auth API'sine ve login sayfasına erişime izin ver
    if (pathname === '/api/admin/auth' || pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Admin token'ını kontrol et
    const adminToken = request.cookies.get('admin_token')?.value

    if (!adminToken || !verifyAdminToken(adminToken)) {
      // Admin giriş sayfasına yönlendir
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ]
} 