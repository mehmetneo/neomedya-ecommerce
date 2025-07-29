'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'

interface Order {
  id: string
  items: any[]
  shipping: any
  payment: any
  total: number
  date: string
  status: string
}

export default function SiparisBasariliPage() {
  const [order, setOrder] = useState<Order | null>(null)
  const [orderStatus, setOrderStatus] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Son siparişi localStorage'dan al
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    if (orders.length > 0) {
      const lastOrder = orders[orders.length - 1]
      setOrder(lastOrder)
      setOrderStatus(lastOrder.status)
    }
    setLoading(false)
  }, [])

  // Sipariş durumunu kontrol et
  const checkOrderStatus = async (orderId: string) => {
    try {
      // Gerçek uygulamada API'den alınır
      const ordersData = localStorage.getItem('orders')
      if (ordersData) {
        const allOrders = JSON.parse(ordersData)
        const order = allOrders.find((o: Order) => o.id === orderId)
        if (order) {
          setOrderStatus(order.status)
        }
      }
    } catch (error) {
      console.error('Sipariş durumu kontrol hatası:', error)
    }
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

  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'pending': return 'Siparişiniz alındı ve hazırlanmaya başlanacak'
      case 'processing': return 'Siparişiniz hazırlanıyor ve paketleniyor'
      case 'shipped': return 'Siparişiniz kargoya verildi ve yolda'
      case 'delivered': return 'Siparişiniz başarıyla teslim edildi'
      case 'cancelled': return 'Siparişiniz iptal edildi'
      case 'payment_pending': return 'Havale ödemesi bekleniyor, dekont onaylandıktan sonra hazırlanacak'
      default: return 'Sipariş durumu bilinmiyor'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'processing':
        return (
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        )
      case 'shipped':
        return (
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-14 0h14" />
          </svg>
        )
      case 'delivered':
        return (
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'payment_pending':
        return (
          <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        )
      default:
        return (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header onCartClick={() => {}} cartItemCount={0} />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </main>
    )
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header onCartClick={() => {}} cartItemCount={0} />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sipariş Bulunamadı</h2>
            <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const isBankTransfer = order.payment?.method === 'bank-transfer'
  const isPending = orderStatus === 'pending' || orderStatus === 'payment_pending'

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header onCartClick={() => {}} cartItemCount={0} />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isBankTransfer && orderStatus === 'payment_pending' ? 'Siparişiniz Alındı!' : 'Siparişiniz Başarıyla Tamamlandı!'}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Sipariş numaranız: <span className="font-semibold text-blue-600">{order.id}</span>
          </p>
          {isBankTransfer && orderStatus === 'payment_pending' ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Havale Bekleniyor</h3>
              <p className="text-yellow-700 mb-4">
                Siparişiniz alındı! Lütfen aşağıdaki hesap bilgilerine havale yapın ve dekontu admin ile paylaşın.
              </p>
              <div className="bg-white rounded-lg p-4 text-left">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Banka:</span>
                    <span>Garanti BBVA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Hesap Sahibi:</span>
                    <span>Neomedya E-ticaret Ltd. Şti.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">IBAN:</span>
                    <span className="font-mono">TR12 0006 2000 0000 0000 0000 00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Tutar:</span>
                    <span className="font-bold text-blue-600">₺{order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Referans:</span>
                    <span className="font-mono">{order.id}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Önemli:</strong> Havale yaptıktan sonra dekontu admin ile paylaşın. 
                  Dekont onaylandıktan sonra siparişiniz hazırlanacak.
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">
              Siparişiniz hazırlanmaya başlanmıştır. Kargo takip bilgileri e-posta adresinize gönderilecektir.
            </p>
          )}

          {/* E-posta Bildirimi */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <h3 className="font-medium text-green-800">E-posta Gönderildi</h3>
                <p className="text-sm text-green-700">
                  Sipariş onay e-postası <strong>{order.shipping.email}</strong> adresine gönderildi. 
                  E-posta kutunuzu kontrol edin.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sipariş Detayları</h2>
          
          {/* Order Items */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Ürünler</h3>
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-600">
                    {item.color} • {item.size} • {item.quantity} adet
                  </p>
                </div>
                <span className="font-semibold text-gray-900">
                  ₺{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Toplam</span>
              <span className="text-2xl font-bold text-blue-600">₺{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Teslimat Bilgileri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Teslimat Adresi</h3>
              <p className="text-gray-600">
                {order.shipping.firstName} {order.shipping.lastName}<br />
                {order.shipping.address}<br />
                {order.shipping.city} {order.shipping.postalCode}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">İletişim Bilgileri</h3>
              <p className="text-gray-600">
                {order.shipping.email}<br />
                {order.shipping.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sipariş Durumu</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-4">
                {getStatusIcon(orderStatus)}
                <div>
                  <h3 className="font-medium text-gray-900">{getStatusText(orderStatus)}</h3>
                  <p className="text-sm text-gray-600">{getStatusDescription(orderStatus)}</p>
                </div>
              </div>
            </div>

            {/* Durum Güncelleme Butonu */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-3">
                Sipariş durumunuzu güncellemek için aşağıdaki butona tıklayın:
              </p>
              <button
                onClick={() => checkOrderStatus(order.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Durumu Güncelle
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Link
            href="/"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
          >
            Alışverişe Devam Et
          </Link>
          <Link
            href="/siparislerim"
            className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors text-center block"
          >
            Siparişlerimi Görüntüle
          </Link>
          {isBankTransfer && orderStatus === 'payment_pending' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Dekont Paylaşımı:</strong> Havale yaptıktan sonra dekontu{' '}
                <a href="mailto:destek@neomedya.com" className="text-blue-600 hover:underline font-medium">
                  destek@neomedya.com
                </a>{' '}
                adresine gönderebilirsiniz.
              </p>
            </div>
          )}
          <div className="text-sm text-gray-600">
            Sorularınız için <a href="mailto:destek@neomedya.com" className="text-blue-600 hover:underline">destek@neomedya.com</a> adresine yazabilirsiniz
          </div>
        </div>
      </div>
    </main>
  )
} 