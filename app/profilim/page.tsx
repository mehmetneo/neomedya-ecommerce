'use client'

import { useState } from 'react'
import Header from '@/components/Header'

export default function ProfilimPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoading, setIsLoading] = useState(false)

  const userInfo = {
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    email: 'ahmet@email.com',
    phone: '0555 123 45 67',
    address: 'İstanbul, Türkiye',
    birthDate: '1990-01-01'
  }

  const orders = [
    { id: '#1234', date: '2024-01-15', total: '₺299.99', status: 'Tamamlandı' },
    { id: '#1235', date: '2024-01-10', total: '₺199.99', status: 'Kargoda' },
    { id: '#1236', date: '2024-01-05', total: '₺599.99', status: 'Tamamlandı' }
  ]

  const handleSave = () => {
    setIsLoading(true)
    setTimeout(() => {
      alert('Profil bilgileri güncellendi!')
      setIsLoading(false)
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header onCartClick={() => {}} cartItemCount={0} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profilim</h1>
          <p className="text-gray-600">Hesap bilgilerinizi yönetin</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'profile', name: 'Profil Bilgileri', icon: '👤' },
              { id: 'orders', name: 'Siparişlerim', icon: '📦' },
              { id: 'addresses', name: 'Adreslerim', icon: '📍' },
              { id: 'security', name: 'Güvenlik', icon: '🔒' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon} {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Kişisel Bilgiler</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Ad</label>
                <input
                  type="text"
                  defaultValue={userInfo.firstName}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Soyad</label>
                <input
                  type="text"
                  defaultValue={userInfo.lastName}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">E-posta</label>
                <input
                  type="email"
                  defaultValue={userInfo.email}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Telefon</label>
                <input
                  type="tel"
                  defaultValue={userInfo.phone}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Doğum Tarihi</label>
                <input
                  type="date"
                  defaultValue={userInfo.birthDate}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Adres</label>
                <textarea
                  rows={3}
                  defaultValue={userInfo.address}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 disabled:opacity-50"
              >
                {isLoading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
              </button>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Sipariş Geçmişi</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sipariş No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tutar</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.total}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'Tamamlandı' ? 'bg-green-100 text-green-800' :
                          order.status === 'Kargoda' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900">Detay</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Adreslerim</h3>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
                + Yeni Adres Ekle
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium text-gray-900">Ev Adresi</h4>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Varsayılan
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  Atatürk Mahallesi, Cumhuriyet Caddesi No:123<br />
                  Kadıköy/İstanbul
                </p>
                <div className="flex space-x-2">
                  <button className="text-primary-600 hover:text-primary-900 text-sm">Düzenle</button>
                  <button className="text-red-600 hover:text-red-900 text-sm">Sil</button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium text-gray-900">İş Adresi</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Levent Mahallesi, Büyükdere Caddesi No:456<br />
                  Beşiktaş/İstanbul
                </p>
                <div className="flex space-x-2">
                  <button className="text-primary-600 hover:text-primary-900 text-sm">Düzenle</button>
                  <button className="text-red-600 hover:text-red-900 text-sm">Sil</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Şifre Değiştir</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mevcut Şifre</label>
                  <input
                    type="password"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Yeni Şifre</label>
                  <input
                    type="password"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Yeni Şifre Tekrar</label>
                  <input
                    type="password"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
                  Şifreyi Değiştir
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">İki Faktörlü Doğrulama</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Hesabınızı daha güvenli hale getirin</p>
                </div>
                <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                  Etkinleştir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
} 