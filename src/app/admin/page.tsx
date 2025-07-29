'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Eye, 
  Edit, 
  Plus,
  Search,
  Filter,
  Calendar,
  BarChart3,
  Package,
  CreditCard,
  Truck
} from 'lucide-react'

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState('dashboard')

  // Mock data
  const stats = {
    totalUsers: 1247,
    totalOrders: 892,
    totalRevenue: 1250000,
    growthRate: 12.5
  }

  const recentOrders = [
    { id: 'TECH-2024-004', customer: 'Ahmet Yılmaz', amount: 103836, status: 'Hazırlanıyor', date: '2024-01-28' },
    { id: 'EV-2024-001', customer: 'Fatma Demir', amount: 14750, status: 'Kargoda', date: '2024-01-27' },
    { id: 'TECH-2024-003', customer: 'Mehmet Kaya', amount: 45999, status: 'Teslim Edildi', date: '2024-01-26' }
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true)
    } else {
      alert('Hatalı kullanıcı adı veya şifre!')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">NEOMEDYA</h1>
            <p className="text-gray-600">Admin Panel</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kullanıcı Adı</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Giriş Yap
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Demo Giriş:</p>
            <p>Kullanıcı: admin</p>
            <p>Şifre: admin123</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">NEOMEDYA Admin</h1>
              <div className="flex gap-2">
                <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm">
                  Siteyi Görüntüle
                </Link>
                <span className="text-gray-400">|</span>
                <Link href="/tech" className="text-blue-600 hover:text-blue-700 text-sm">
                  TECH Platform
                </Link>
                <span className="text-gray-400">|</span>
                <Link href="/ev" className="text-orange-600 hover:text-orange-700 text-sm">
                  EV Platform
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Hoş geldin, Admin</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Çıkış</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'dashboard' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'products' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Package className="h-5 w-5" />
                  <span>Ürünler</span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'orders' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>Siparişler</span>
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'users' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Users className="h-5 w-5" />
                  <span>Kullanıcılar</span>
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'analytics' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <TrendingUp className="h-5 w-5" />
                  <span>Analitik</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'settings' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  <span>Ayarlar</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Toplam Kullanıcı</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Toplam Sipariş</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Toplam Gelir</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue.toLocaleString()} TL</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Büyüme Oranı</p>
                        <p className="text-2xl font-bold text-gray-900">%{stats.growthRate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Son Siparişler</h2>
                    <Link href="/admin/orders" className="text-blue-600 hover:text-blue-700 text-sm">
                      Tümünü Görüntüle
                    </Link>
                  </div>
                  
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <ShoppingBag className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{order.id}</p>
                            <p className="text-sm text-gray-600">{order.customer}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{order.amount.toLocaleString()} TL</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Teslim Edildi' ? 'bg-green-100 text-green-800' :
                            order.status === 'Kargoda' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Hızlı İşlemler</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <Plus className="h-5 w-5 text-blue-600" />
                      <span>Yeni Ürün Ekle</span>
                    </button>
                    <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <Edit className="h-5 w-5 text-green-600" />
                      <span>Ürün Düzenle</span>
                    </button>
                    <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <Settings className="h-5 w-5 text-purple-600" />
                      <span>Site Ayarları</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Ürün Yönetimi</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="h-4 w-4 inline mr-2" />
                    Yeni Ürün
                  </button>
                </div>
                
                <div className="mb-6">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Ürün ara..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Filter className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Ürün</th>
                        <th className="text-left py-3 px-4">Kategori</th>
                        <th className="text-left py-3 px-4">Fiyat</th>
                        <th className="text-left py-3 px-4">Stok</th>
                        <th className="text-left py-3 px-4">Durum</th>
                        <th className="text-left py-3 px-4">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">iPhone 15 Pro Max</td>
                        <td className="py-3 px-4">Telefon</td>
                        <td className="py-3 px-4">45.999 TL</td>
                        <td className="py-3 px-4">25</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Aktif</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-700">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-700">
                              <Eye className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Sipariş Yönetimi</h2>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{order.id}</h3>
                          <p className="text-sm text-gray-600">{order.customer}</p>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{order.amount.toLocaleString()} TL</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Teslim Edildi' ? 'bg-green-100 text-green-800' :
                            order.status === 'Kargoda' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Site Ayarları</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Genel Ayarlar</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Site Başlığı</label>
                        <input
                          type="text"
                          defaultValue="NEOMEDYA E-TİCARET PLATFORMLARI"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Site Açıklaması</label>
                        <textarea
                          rows={3}
                          defaultValue="Modern e-ticaret platformları"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Ödeme Ayarları</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>Kredi Kartı Ödemeleri</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>Havale/EFT Ödemeleri</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>Kapıda Ödeme</span>
                      </div>
                    </div>
                  </div>

                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Ayarları Kaydet
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default AdminDashboard 