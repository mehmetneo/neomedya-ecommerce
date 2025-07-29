'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'

type Order = {
  id: string
  date: string
  total: number
  items: any[]
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'payment_pending'
  shipping: {
    name: string
    email: string
    phone: string
    address: string
  }
  payment: {
    method: string
    bankInfo?: any
    cryptoInfo?: any
    cashInfo?: any
  }
  updatedAt?: string
}

export default function SiparislerimPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [orderStatuses, setOrderStatuses] = useState<{[key: string]: string}>({})
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Sipariş durumunu kontrol et
  const checkOrderStatus = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/status?orderId=${orderId}`)
      if (response.ok) {
        const data = await response.json()
        setOrderStatuses(prev => ({
          ...prev,
          [orderId]: data.status
        }))
      }
    } catch (error) {
      console.error('Sipariş durumu kontrol hatası:', error)
    }
  }

  // Tüm siparişlerin durumunu güncelle
  const refreshAllOrderStatuses = async () => {
    try {
      const userData = localStorage.getItem('userData')
      
      console.log('🔍 Siparişler kontrol ediliyor...')
      console.log('👤 Kullanıcı verisi:', userData)
      
      if (!userData) {
        console.log('❌ Kullanıcı verisi bulunamadı, test verisi oluşturuluyor...')
        // Test için kullanıcı verisi oluştur
        const testUserData = {
          email: 'mehmet@example.com',
          name: 'Mehmet Kaya'
        }
        localStorage.setItem('userData', JSON.stringify(testUserData))
        console.log('✅ Test kullanıcı verisi oluşturuldu:', testUserData)
      }

      const userEmail = JSON.parse(localStorage.getItem('userData') || '{}').email
      console.log('📧 Kullanıcı e-posta:', userEmail)

      if (!userEmail) {
        console.log('❌ Kullanıcı e-postası bulunamadı')
        setOrders([])
        setLoading(false)
        return
      }

      // API'den kullanıcının siparişlerini al
      const response = await fetch(`/api/orders?email=${encodeURIComponent(userEmail)}`)
      const data = await response.json()

      if (data.success) {
        console.log('✅ Kullanıcı siparişleri bulundu:', data.orders.length)
        setOrders(data.orders)
        setLastUpdate(new Date())

        // Her siparişin durumunu kontrol et
        for (const order of data.orders) {
          await checkOrderStatus(order.id)
        }
      } else {
        console.error('❌ Siparişler yüklenemedi:', data.error)
        setOrders([])
      }
    } catch (error) {
      console.error('❌ Sipariş yükleme hatası:', error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  // Otomatik yenileme (30 saniyede bir)
  useEffect(() => {
    refreshAllOrderStatuses()

    const interval = setInterval(() => {
      refreshAllOrderStatuses()
    }, 30000) // 30 saniye

    return () => clearInterval(interval)
  }, [])

  // Manuel yenileme
  const handleRefresh = () => {
    setLoading(true)
    refreshAllOrderStatuses().finally(() => setLoading(false))
  }

  const getStatusText = (status: string) => {
    const statusMap: {[key: string]: string} = {
      'pending': 'Beklemede',
      'processing': 'İşleniyor',
      'shipped': 'Kargoda',
      'delivered': 'Teslim Edildi',
      'cancelled': 'İptal Edildi',
      'payment_pending': 'Ödeme Bekleniyor'
    }
    return statusMap[status] || 'Bilinmiyor'
  }

  const getStatusColor = (status: string) => {
    const colorMap: {[key: string]: string} = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'processing': 'bg-blue-100 text-blue-800',
      'shipped': 'bg-purple-100 text-purple-800',
      'delivered': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
      'payment_pending': 'bg-orange-100 text-orange-800'
    }
    return colorMap[status] || 'bg-gray-100 text-gray-800'
  }

  const getStatusIcon = (status: string) => {
    const iconMap: {[key: string]: string} = {
      'pending': '⏳',
      'processing': '⚙️',
      'shipped': '🚚',
      'delivered': '✅',
      'cancelled': '❌',
      'payment_pending': '💰'
    }
    return iconMap[status] || '❓'
  }

  const getStatusDescription = (status: string) => {
    const descMap: {[key: string]: string} = {
      'pending': 'Siparişiniz alındı ve işleme alınacak',
      'processing': 'Siparişiniz hazırlanıyor',
      'shipped': 'Siparişiniz kargoya verildi',
      'delivered': 'Siparişiniz teslim edildi',
      'cancelled': 'Siparişiniz iptal edildi',
      'payment_pending': 'Ödeme onayı bekleniyor'
    }
    return descMap[status] || 'Durum bilgisi mevcut değil'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onCartClick={() => {}} cartItemCount={0} />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Siparişleriniz yükleniyor...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => {}} cartItemCount={0} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Başlık */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Siparişlerim</h1>
            <button
              onClick={handleRefresh}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Yenile
            </button>
          </div>

          {/* Son Güncelleme */}
          <div className="text-sm text-gray-500">
            Son güncelleme: {lastUpdate.toLocaleString('tr-TR')}
          </div>

          {/* Sipariş Listesi */}
          {orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz siparişiniz yok</h3>
              <p className="text-gray-500 mb-6">İlk siparişinizi vermek için alışverişe başlayın</p>
              <Link
                href="/"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Alışverişe Başla
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const currentStatus = orderStatuses[order.id] || order.status
                return (
                  <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
                    {/* Sipariş Başlığı */}
                    <div className="px-6 py-4 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            Sipariş #{order.id}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {formatDate(order.date)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ₺{order.total.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {order.items.length} ürün
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Sipariş Durumu */}
                    <div className="px-6 py-4 bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getStatusIcon(currentStatus)}</span>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(currentStatus)}`}>
                              {getStatusText(currentStatus)}
                            </span>
                            {order.updatedAt && (
                              <span className="text-xs text-gray-500">
                                Güncellendi: {formatDate(order.updatedAt)}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {getStatusDescription(currentStatus)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Sipariş Detayları */}
                    <div className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Teslimat Adresi */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Teslimat Adresi</h4>
                          <div className="text-sm text-gray-600">
                            <p className="font-medium">{order.shipping.name}</p>
                            <p>{order.shipping.address}</p>
                            <p>{order.shipping.phone}</p>
                            <p>{order.shipping.email}</p>
                          </div>
                        </div>

                        {/* Ödeme Bilgileri */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Ödeme Bilgileri</h4>
                          <div className="text-sm text-gray-600">
                            <p>Yöntem: {order.payment.method}</p>
                            {order.payment.method === 'bank-transfer' && order.payment.bankInfo && (
                              <div className="mt-2 p-3 bg-yellow-50 rounded-lg">
                                <p className="font-medium text-yellow-800">Havale Bekleniyor</p>
                                <p className="text-xs text-yellow-700 mt-1">
                                  Dekont gönderdikten sonra siparişiniz onaylanacak
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Ürün Listesi */}
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Ürünler</h4>
                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-500">
                                  Adet: {item.quantity} x ₺{item.price}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-gray-900">
                                  ₺{(item.quantity * item.price).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 