import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Dynamic route olarak işaretle
export const dynamic = 'force-dynamic'

// Admin bilgileri (gerçek uygulamada veritabanından alınır)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'neomedya2024!', // Güçlü şifre
  email: 'admin@neomedya.com'
}

// JWT benzeri token oluştur (basit simülasyon)
function generateAdminToken() {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2)
  return `admin_${timestamp}_${random}`
}

// Token doğrulama
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    console.log('🔐 Admin giriş denemesi:', username)

    // Admin bilgilerini kontrol et
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Admin token oluştur
      const token = generateAdminToken()
      
      console.log('✅ Token oluşturuldu:', token)
      
      // Cookie ayarla (httpOnly, secure, sameSite)
      const cookieStore = await cookies()
      cookieStore.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60, // 24 saat
        path: '/'
      })

      console.log('✅ Admin girişi başarılı:', username)
      console.log('🍪 Cookie set edildi')
      
      return NextResponse.json({
        success: true,
        message: 'Admin girişi başarılı',
        user: {
          username: ADMIN_CREDENTIALS.username,
          email: ADMIN_CREDENTIALS.email
        }
      })
    } else {
      console.log('❌ Admin girişi başarısız:', username)
      
      return NextResponse.json({
        success: false,
        error: 'Kullanıcı adı veya şifre hatalı'
      }, { status: 401 })
    }
  } catch (error) {
    console.error('Admin giriş hatası:', error)
    return NextResponse.json({
      success: false,
      error: 'Giriş işlemi sırasında bir hata oluştu'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Cookie'den token'ı al
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value

    console.log('🔍 Token kontrolü yapılıyor...')
    console.log('🍪 Cookie token:', token ? 'Mevcut' : 'Yok')

    if (!token || !verifyAdminToken(token)) {
      console.log('❌ Token geçersiz veya yok')
      return NextResponse.json({
        success: false,
        authenticated: false,
        error: 'Geçersiz veya süresi dolmuş token'
      }, { status: 401 })
    }

    console.log('✅ Token geçerli')
    return NextResponse.json({
      success: true,
      authenticated: true,
      user: {
        username: ADMIN_CREDENTIALS.username,
        email: ADMIN_CREDENTIALS.email
      }
    })
  } catch (error) {
    console.error('Admin token kontrol hatası:', error)
    return NextResponse.json({
      success: false,
      authenticated: false,
      error: 'Token kontrolü sırasında bir hata oluştu'
    }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    // Admin token'ını sil
    const cookieStore = await cookies()
    cookieStore.delete('admin_token')
    
    console.log('✅ Admin çıkışı başarılı')
    
    return NextResponse.json({
      success: true,
      message: 'Admin çıkışı başarılı'
    })
  } catch (error) {
    console.error('Admin çıkış hatası:', error)
    return NextResponse.json({
      success: false,
      error: 'Çıkış işlemi sırasında bir hata oluştu'
    }, { status: 500 })
  }
} 