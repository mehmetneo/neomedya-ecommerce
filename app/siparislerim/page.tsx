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
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Siparişleri localStorage'dan yükle
  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem('orders')
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders)
        setOrders(parsedOrders)
      } else {
        // Test siparişleri oluştur
        const testOrders: Order[] = [
          {
            id: 'ORDER-001',
            date: new Date().toISOString(),
            total: 299.99,
            items: [
              { name: 'Premium T-Shirt', price: 89.99, quantity: 2 },
              { name: 'Kot Pantolon', price: 199.99, quantity: 1 }
            ],
            status: 'pending',
            shipping: {
              name: 'Test Kullanıcı',
              email: 'test@example.com',
              phone: '+90 555 123 4567',
              address: 'Test Adres'
            },
            payment: {
              method: 'bank-transfer'
            }
          },
          {
            id: 'ORDER-002',
            date: new Date(Date.now() - 86400000).toISOString(), // 1 gün önce
            total: 599.99,
            items: [
              { name: 'Kadın Elbise', price: 299.99, quantity: 1 },
              { name: 'Spor Ayakkabı', price: 299.99, quantity: 1 }
            ],
            status: 'shipped',
            shipping: {
              name: 'Test Kullanıcı',
              email: 'test@example.com',
              phone: '+90 555 123 4567',
              address: 'Test Adres'
            },
            payment: {
              method: 'credit-card'
            }
          }
        ]
        setOrders(testOrders)
        localStorage.setItem('orders', JSON.stringify(testOrders))
      }
    } catch (error) {
      console.error('Sipariş yükleme hatası:', error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      setLastUpdate(new Date())
      setLoading(false)
    }, 1000)
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Beklemede'
      case 'processing': return 'Hazırlanıyor'
      case 'shipped': return 'Kargoda'
      case 'delivered': return 'Teslim Edildi'
      case 'cancelled': return 'İptal Edildi'
      case 'payment_pending': return 'Ödeme Bekleniyor'
      default: return 'Bilinmiyor'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'payment_pending': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'processing':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        )
      case 'shipped':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-14 0h14" />
          </svg>
        )
      case 'delivered':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }

  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'pending': return 'Siparişiniz alındı ve hazırlanmaya başlanacak'
      case 'processing': return 'Siparişiniz hazırlanıyor ve paketleniyor'
      case 'shipped': return 'Siparişiniz kargoya verildi ve yolda'
      case 'delivered': return 'Siparişiniz başarıyla teslim edildi'
      case 'cancelled': return 'Siparişiniz iptal edildi'
      case 'payment_pending': return 'Havale ödemesi bekleniyor'
      default: return 'Sipariş durumu bilinmiyor'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header onCartClick={() => {}} cartItemCount={0} />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header onCartClick={() => {}} cartItemCount={0} />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Siparişlerim</h1>
            <p className="text-gray-600">
              Son güncelleme: {lastUpdate.toLocaleTimeString('tr-TR')}
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Güncelleniyor...' : 'Yenile'}
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Henüz Siparişiniz Yok
            </h3>
            <p className="text-gray-600 mb-6">
              İlk siparişinizi vermek için alışverişe başlayın
            </p>
            <Link
              href="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Sipariş #{order.id}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {formatDate(order.date)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                    {getStatusIcon(order.status)}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    {getStatusDescription(order.status)}
                  </p>
                </div>

                {/* Order Items */}
                <div className="space-y-3 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          {item.quantity} adet × ₺{item.price}
                        </p>
                      </div>
                      <span className="font-semibold text-gray-900">
                        ₺{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Toplam</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₺{order.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Teslimat Bilgileri</h4>
                  <div className="text-sm text-gray-600">
                    <p><strong>Ad Soyad:</strong> {order.shipping.name}</p>
                    <p><strong>E-posta:</strong> {order.shipping.email}</p>
                    <p><strong>Telefon:</strong> {order.shipping.phone}</p>
                    <p><strong>Adres:</strong> {order.shipping.address}</p>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Ödeme Bilgileri</h4>
                  <div className="text-sm text-gray-600">
                    <p><strong>Ödeme Yöntemi:</strong> {order.payment.method}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 