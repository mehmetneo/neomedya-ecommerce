'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminOrdersPage from './orders/page'
import AdminUsersPage from './users/page'
import AdminProductsPage from './products/page'
import AdminSettingsPage from './settings/page'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [adminUser, setAdminUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<any[]>([])
  const router = useRouter()

  // Admin authentication kontrolü
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('🔍 Admin authentication kontrolü başlatılıyor...')
        
        const response = await fetch('/api/admin/auth', {
          credentials: 'include' // Cookie'leri dahil et
        })
        
        console.log('📡 API yanıtı:', response.status)
        
        const data = await response.json()
        console.log('📋 API data:', data)

        if (!data.authenticated) {
          console.log('❌ Authentication başarısız, login sayfasına yönlendiriliyor...')
          router.push('/admin/login')
          return
        }

        console.log('✅ Authentication başarılı, admin kullanıcısı set ediliyor...')
        setAdminUser(data.user)
      } catch (error) {
        console.error('❌ Auth kontrol hatası:', error)
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  // Siparişleri yükle
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetch('/api/admin/orders')
        const data = await response.json()
        
        if (data.success) {
          setOrders(data.orders)
        }
      } catch (error) {
        console.error('Sipariş yükleme hatası:', error)
      }
    }

    if (adminUser) {
      loadOrders()
    }
  }, [adminUser])

  // Çıkış fonksiyonu
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { 
        method: 'DELETE',
        credentials: 'include'
      })
      router.push('/admin/login')
    } catch (error) {
      console.error('Çıkış hatası:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Admin paneli yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Neomedya
                </h1>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 font-medium">Admin Paneli</span>
            </div>

            {/* Admin Kullanıcı Bilgisi ve Çıkış */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{adminUser?.username}</p>
                <p className="text-xs text-gray-500">{adminUser?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'users', name: 'Kullanıcılar', icon: '👥' },
              { id: 'orders', name: 'Siparişler', icon: '📦' },
              { id: 'products', name: 'Ürünler', icon: '🛍️' },
              { id: 'settings', name: 'Ayarlar', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Güvenlik Uyarısı */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Güvenlik Uyarısı</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    Bu admin paneli sadece yetkili kullanıcılar içindir. Tüm işlemler loglanmaktadır.
                  </p>
                </div>
              </div>
            </div>

            {/* İstatistikler */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 text-lg">👥</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Toplam Kullanıcı</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 text-lg">📦</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Toplam Sipariş</p>
                    <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <span className="text-yellow-600 text-lg">💰</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Toplam Gelir</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₺{orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 text-lg">🔒</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Toplam Ürün</p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Test Bildirimi */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Test Bildirimi</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium relative">
                  Test Bildirimi
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    5
                  </span>
                </button>
              </div>
            </div>

            {/* Son Siparişler */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Son Siparişler</h3>
              {orders.length === 0 ? (
                <p className="text-gray-500">Henüz sipariş bulunmuyor</p>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Sipariş #{order.id}</p>
                        <p className="text-sm text-gray-500">{order.shipping.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">₺{order.total.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dağılım Grafikleri */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Kategori Dağılımı</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Erkek', count: 3, percentage: 37.5 },
                    { name: 'Kadın', count: 2, percentage: 25 },
                    { name: 'Çocuk', count: 1, percentage: 12.5 },
                    { name: 'Ayakkabı', count: 1, percentage: 12.5 },
                    { name: 'Aksesuar', count: 1, percentage: 12.5 }
                  ].map((category) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{category.name}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">{category.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Sipariş Durumu</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Tamamlandı', count: orders.filter(o => o.status === 'delivered').length, color: 'bg-green-600' },
                    { name: 'Hazırlanıyor', count: orders.filter(o => o.status === 'processing').length, color: 'bg-blue-600' },
                    { name: 'Kargoda', count: orders.filter(o => o.status === 'shipped').length, color: 'bg-purple-600' },
                    { name: 'İptal', count: orders.filter(o => o.status === 'cancelled').length, color: 'bg-red-600' }
                  ].map((status) => (
                    <div key={status.name} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{status.name}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className={`${status.color} h-2 rounded-full`} style={{ width: `${(status.count / orders.length) * 100}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-500">{status.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && <AdminUsersPage />}

        {activeTab === 'orders' && <AdminOrdersPage />}

        {activeTab === 'products' && <AdminProductsPage />}

        {activeTab === 'settings' && <AdminSettingsPage />}
      </div>
    </div>
  )
} 