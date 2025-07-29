'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Eye,
  Star,
  MessageSquare
} from 'lucide-react'

interface Order {
  id: string
  orderNumber: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: Array<{
    id: number
    name: string
    price: number
    quantity: number
    image: string
  }>
  trackingNumber?: string
}

const Siparislerim = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('neomedyauser')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      
      // Demo sipariş verileri
      const demoOrders: Order[] = [
        {
          id: '1',
          orderNumber: 'ORD-2024-001',
          date: '2024-01-15',
          status: 'delivered',
          total: 1299,
          items: [
            { id: 1, name: 'Nike Air Max 270', price: 1299, quantity: 1, image: '👟' }
          ],
          trackingNumber: 'TRK123456789'
        },
        {
          id: '2',
          orderNumber: 'ORD-2024-002',
          date: '2024-01-20',
          status: 'shipped',
          total: 899,
          items: [
            { id: 2, name: 'Adidas T-Shirt', price: 299, quantity: 1, image: '👕' },
            { id: 3, name: 'Levi\'s Jeans', price: 600, quantity: 1, image: '👖' }
          ],
          trackingNumber: 'TRK987654321'
        },
        {
          id: '3',
          orderNumber: 'ORD-2024-003',
          date: '2024-01-25',
          status: 'processing',
          total: 1599,
          items: [
            { id: 4, name: 'Zara Dress', price: 1599, quantity: 1, image: '👗' }
          ]
        }
      ]
      setOrders(demoOrders)
    } catch (error) {
      console.log('localStorage erişim hatası:', error)
    }
  }, [])

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { text: 'Beklemede', icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-100' }
      case 'processing':
        return { text: 'Hazırlanıyor', icon: Package, color: 'text-blue-600', bgColor: 'bg-blue-100' }
      case 'shipped':
        return { text: 'Kargoda', icon: Truck, color: 'text-purple-600', bgColor: 'bg-purple-100' }
      case 'delivered':
        return { text: 'Teslim Edildi', icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100' }
      case 'cancelled':
        return { text: 'İptal Edildi', icon: AlertCircle, color: 'text-red-600', bgColor: 'bg-red-100' }
      default:
        return { text: 'Bilinmiyor', icon: AlertCircle, color: 'text-gray-600', bgColor: 'bg-gray-100' }
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-4 text-lg font-medium text-gray-900">Giriş Yapın</h2>
            <p className="mt-2 text-gray-600">Siparişlerinizi görüntülemek için giriş yapın.</p>
            <Link 
              href="/profil"
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Giriş Yap
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Siparişlerim</h1>
              <p className="text-gray-600">Sipariş geçmişiniz</p>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Henüz siparişiniz yok</h3>
              <p className="mt-2 text-gray-600">İlk siparişinizi vermek için alışverişe başlayın.</p>
              <Link 
                href="/giyim"
                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Alışverişe Başla
              </Link>
            </div>
          ) : (
            orders.map((order) => {
              const statusInfo = getStatusInfo(order.status)
              const StatusIcon = statusInfo.icon
              
              return (
                <div key={order.id} className="bg-white rounded-lg shadow-sm border">
                  {/* Order Header */}
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Sipariş #{order.orderNumber}
                        </h3>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                          <StatusIcon className="h-4 w-4 mr-1" />
                          {statusInfo.text}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                              {item.image}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">Adet: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">₺{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Actions */}
                    <div className="mt-6 pt-6 border-t">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Toplam</p>
                          <p className="text-lg font-bold text-gray-900">₺{order.total}</p>
                          {order.trackingNumber && (
                            <p className="text-sm text-gray-600 mt-1">
                              Takip No: {order.trackingNumber}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            <Eye className="h-4 w-4 mr-1" />
                            Detaylar
                          </button>
                          {order.status === 'delivered' && (
                            <>
                              <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                <Star className="h-4 w-4 mr-1" />
                                Değerlendir
                              </button>
                              <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Destek
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default Siparislerim 