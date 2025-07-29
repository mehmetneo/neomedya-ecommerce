'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'

interface User {
  id: string
  name: string
  email: string
  password: string
  phone: string
  address: string
  city: string
  postalCode: string
  birthDate: string
  gender: string
  isAdmin: boolean
  createdAt: string
}

const testUsers: User[] = [
  { 
    id: 'admin_001',
    name: 'Admin Kullanıcı',
    email: 'admin@neomedya.com', 
    password: 'admin123',
    phone: '0555 123 45 67',
    address: 'Test Adres',
    city: 'İstanbul',
    postalCode: '34000',
    birthDate: '1990-01-01',
    gender: 'erkek',
    isAdmin: true,
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  { 
    id: 'test_001',
    name: 'Test Kullanıcı',
    email: 'test@neomedya.com', 
    password: 'test123',
    phone: '0555 987 65 43',
    address: 'Test Adres 2',
    city: 'Ankara',
    postalCode: '06000',
    birthDate: '1995-05-15',
    gender: 'kadin',
    isAdmin: false,
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  { 
    id: 'demo_001',
    name: 'Demo Kullanıcı',
    email: 'demo@neomedya.com', 
    password: 'demo123',
    phone: '0555 555 55 55',
    address: 'Demo Adres',
    city: 'İzmir',
    postalCode: '35000',
    birthDate: '1988-12-25',
    gender: 'erkek',
    isAdmin: false,
    createdAt: '2024-01-01T00:00:00.000Z'
  }
]

export default function GirisPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Kullanıcı zaten giriş yapmışsa ana sayfaya yönlendir
    const user = localStorage.getItem('user')
    if (user) {
      router.push('/')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Önce test kullanıcılarından kontrol et
      let foundUser = testUsers.find(user => user.email === email && user.password === password)
      
      // Test kullanıcılarında yoksa kayıtlı kullanıcılardan ara
      if (!foundUser) {
        const registeredUsers = JSON.parse(localStorage.getItem('users') || '[]')
        foundUser = registeredUsers.find((user: User) => user.email === email && user.password === password)
      }

      if (foundUser) {
        // Giriş başarılı
        const userData = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          isAdmin: foundUser.isAdmin,
          isLoggedIn: true
        }
        
        localStorage.setItem('user', JSON.stringify(userData))
        
        // Sepet verilerini koru
        const cart = localStorage.getItem('cart')
        if (cart) {
          localStorage.setItem('checkoutItems', cart)
        }
        
        router.push('/')
      } else {
        setError('E-posta veya şifre hatalı!')
      }
    } catch (error) {
      setError('Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.')
    }
    
    setIsLoading(false)
  }

  const handleTestUserClick = (user: User) => {
    setEmail(user.email)
    setPassword(user.password)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header onCartClick={() => {}} cartItemCount={0} />
      
      <div className="flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo ve Başlık */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hoş Geldiniz</h1>
            <p className="text-gray-600">Hesabınıza giriş yapın</p>
          </div>

          {/* Giriş Formu */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* E-posta */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta Adresi
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="ornek@email.com"
                    required
                  />
                </div>
              </div>

              {/* Şifre */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Şifre
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Hata Mesajı */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex">
                    <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="ml-3 text-sm text-red-600">{error}</p>
                  </div>
                </div>
              )}

              {/* Beni Hatırla */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Beni hatırla
                  </label>
                </div>
                <Link href="#" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                  Şifremi unuttum
                </Link>
              </div>

              {/* Giriş Butonu */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Giriş yapılıyor...
                  </div>
                ) : (
                  'Giriş Yap'
                )}
              </button>
            </form>

            {/* Test Kullanıcıları */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Test Kullanıcıları:</h3>
              <div className="space-y-2">
                {testUsers.map((user, index) => (
                  <button
                    key={index}
                    onClick={() => handleTestUserClick(user)}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                  >
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email} / {user.password}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Kayıt Ol Linki */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Hesabınız yok mu?{' '}
                <Link href="/kayit" className="font-medium text-blue-600 hover:text-blue-500">
                  Yeni hesap oluşturun
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 