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

export default function ProfilimPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Kullanıcı giriş kontrolü
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/giris')
      return
    }

    setCurrentUser(JSON.parse(userData))

    // Kullanıcı bilgilerini al
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const testUsers = [
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

    // Test kullanıcılarından veya kayıtlı kullanıcılardan bul
    let foundUser = testUsers.find(u => u.id === JSON.parse(userData).id)
    if (!foundUser) {
      foundUser = users.find((u: User) => u.id === JSON.parse(userData).id)
    }

    setUser(foundUser || null)
  }, [router])

  const handleSave = async () => {
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      // Kullanıcı bilgilerini güncelle
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const updatedUsers = users.map((u: User) => 
        u.id === user?.id ? { ...u, ...user } : u
      )
      localStorage.setItem('users', JSON.stringify(updatedUsers))

      setSuccess('Profil bilgileriniz başarıyla güncellendi!')
      
      setTimeout(() => {
        setSuccess('')
      }, 3000)
    } catch (error) {
      setError('Güncelleme sırasında bir hata oluştu.')
    }

    setIsLoading(false)
  }

  const getGenderText = (gender: string) => {
    switch (gender) {
      case 'erkek': return 'Erkek'
      case 'kadin': return 'Kadın'
      case 'diger': return 'Diğer'
      default: return gender
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onCartClick={() => {}} cartItemCount={0} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => {}} cartItemCount={0} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Başlık */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profilim</h1>
            <p className="text-gray-600">Hesap bilgilerinizi yönetin</p>
          </div>

          {/* Tab Menüsü */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'profile'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Profil Bilgileri
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'security'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Güvenlik
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'orders'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Siparişlerim
                </button>
              </nav>
            </div>

            {/* Tab İçeriği */}
            <div className="p-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  {/* Başarı ve Hata Mesajları */}
                  {success && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex">
                        <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="ml-3 text-sm text-green-600">{success}</p>
                      </div>
                    </div>
                  )}

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

                  {/* Profil Bilgileri */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ad Soyad
                      </label>
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-posta
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        value={user.phone}
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Doğum Tarihi
                      </label>
                      <input
                        type="date"
                        value={user.birthDate}
                        onChange={(e) => setUser({ ...user, birthDate: e.target.value })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cinsiyet
                      </label>
                      <select
                        value={user.gender}
                        onChange={(e) => setUser({ ...user, gender: e.target.value })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="erkek">Erkek</option>
                        <option value="kadin">Kadın</option>
                        <option value="diger">Diğer</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Şehir
                      </label>
                      <input
                        type="text"
                        value={user.city}
                        onChange={(e) => setUser({ ...user, city: e.target.value })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adres
                    </label>
                    <textarea
                      rows={3}
                      value={user.address}
                      onChange={(e) => setUser({ ...user, address: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Posta Kodu
                      </label>
                      <input
                        type="text"
                        value={user.postalCode}
                        onChange={(e) => setUser({ ...user, postalCode: e.target.value })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Üyelik Tarihi
                      </label>
                      <input
                        type="text"
                        value={formatDate(user.createdAt)}
                        disabled
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                      />
                    </div>
                  </div>

                  {/* Kaydet Butonu */}
                  <div className="flex justify-end">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex">
                      <svg className="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <p className="ml-3 text-sm text-yellow-700">
                        Güvenlik ayarları yakında eklenecek.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="text-center py-8">
                  <Link
                    href="/siparislerim"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Siparişlerimi Görüntüle
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 