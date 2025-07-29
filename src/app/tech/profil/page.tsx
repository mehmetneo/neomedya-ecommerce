'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, User, ShoppingBag, Heart, Settings, LogOut, Edit, Shield, CreditCard, Truck, Star } from 'lucide-react'

const Profil = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [user] = useState({
    name: "Ahmet Yılmaz",
    email: "ahmet.yilmaz@email.com",
    phone: "+90 555 123 4567",
    address: "Atatürk Mahallesi, Teknoloji Caddesi No:123, İstanbul",
    memberSince: "2023"
  })

  const orders = [
    { id: "TECH-2024-001", date: "2024-01-15", status: "Teslim Edildi", total: 87997, items: 3 },
    { id: "TECH-2024-002", date: "2024-01-20", status: "Kargoda", total: 45999, items: 1 },
    { id: "TECH-2024-003", date: "2024-01-25", status: "Hazırlanıyor", total: 12999, items: 1 }
  ]

  const wishlist = [
    { id: 1, name: "Samsung Galaxy S24 Ultra", price: 39999, image: "📱", brand: "Samsung" },
    { id: 2, name: "MacBook Pro 14 M3", price: 59999, image: "💻", brand: "Apple" },
    { id: 3, name: "Sony A7 IV", price: 45999, image: "📷", brand: "Sony" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Teslim Edildi': return 'text-green-600 bg-green-100'
      case 'Kargoda': return 'text-blue-600 bg-blue-100'
      case 'Hazırlanıyor': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Site Selection Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">NEOMEDYA E-TİCARET PLATFORMLARI</h2>
              <p className="text-sm opacity-90">Farklı temalar ve özellikler</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/ev" className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors">
                NEOMEDYA EV
              </Link>
              <Link href="/tech" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                NEOMEDYA TECH
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/tech" className="text-blue-600 hover:text-blue-700">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Profil</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/tech/sepet" className="p-2 text-gray-700 hover:text-blue-600 transition-colors">🛒</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span>Profil Bilgileri</span>
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
                  <span>Siparişlerim</span>
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'wishlist' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Heart className="h-5 w-5" />
                  <span>Favorilerim</span>
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

              <div className="border-t mt-6 pt-6">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut className="h-5 w-5" />
                  <span>Çıkış Yap</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Profil Bilgileri</h2>
                  <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                    <Edit className="h-4 w-4" />
                    <span>Düzenle</span>
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
                      <input
                        type="text"
                        value={user.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                      <input
                        type="email"
                        value={user.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                      <input
                        type="tel"
                        value={user.phone}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Üyelik Tarihi</label>
                      <input
                        type="text"
                        value={user.memberSince}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Adres</label>
                    <textarea
                      value={user.address}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Siparişlerim</h2>
                
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">Sipariş #{order.id}</h3>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          {order.items} ürün • {order.total.toLocaleString()} TL
                        </div>
                        <Link 
                          href={`/tech/siparis/${order.id}`}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Detayları Gör
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Favorilerim</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-4xl">{item.image}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
                      <p className="font-bold text-gray-900 mb-4">{item.price.toLocaleString()} TL</p>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                          Sepete Ekle
                        </button>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          <Heart className="h-4 w-4 text-red-500 fill-current" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Hesap Ayarları</h2>
                
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold text-gray-900">Güvenlik</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Şifre değiştirme ve güvenlik ayarları</p>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Şifre Değiştir
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <CreditCard className="h-5 w-5 text-green-600" />
                      <h3 className="font-semibold text-gray-900">Ödeme Yöntemleri</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Kayıtlı kartlarınızı yönetin</p>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Kartları Yönet
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Truck className="h-5 w-5 text-orange-600" />
                      <h3 className="font-semibold text-gray-900">Teslimat Adresleri</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Teslimat adreslerinizi düzenleyin</p>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Adresleri Yönet
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Star className="h-5 w-5 text-yellow-600" />
                      <h3 className="font-semibold text-gray-900">Bildirimler</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">E-posta ve SMS bildirim ayarları</p>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Bildirimleri Yönet
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Profil 