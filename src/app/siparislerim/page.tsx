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
    const checkUserStatus = () => {
      try {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.log('localStorage erişim hatası:', error)
      }
    }

    checkUserStatus()
    
    // localStorage değişikliklerini dinle
    const handleStorageChange = () => {
      checkUserStatus()
    }

    window.addEventListener('storage', handleStorageChange)
    
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

    return () => {
      window.removeEventListener('storage', handleStorageChange)
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Giriş Yapmanız Gerekiyor</h2>
          <p className="text-gray-600 mb-6">Siparişlerinizi görüntülemek için giriş yapın.</p>
          <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Siparişlerim</h1>
              <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                {orders.length} sipariş
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Henüz Siparişiniz Yok</h2>
            <p className="text-gray-600 mb-8">İlk siparişinizi vermek için alışverişe başlayın.</p>
            <Link 
              href="/giyim" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const statusInfo = getStatusInfo(order.status)
              const StatusIcon = statusInfo.icon
              
              return (
                <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${statusInfo.bgColor}`}>
                          <StatusIcon className={`h-5 w-5 ${statusInfo.color}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{order.orderNumber}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(order.date).toLocaleDateString('tr-TR')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                          {statusInfo.text}
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                          ₺{order.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl">{item.image}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                            <p className="text-sm text-gray-500">
                              Adet: {item.quantity} • ₺{item.price.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="font-medium text-gray-900">
                              ₺{(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Order Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
                      <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        <Eye className="h-4 w-4" />
                        Detayları Gör
                      </button>
                      
                      {order.trackingNumber && (
                        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-blue-300 rounded-lg text-blue-700 hover:bg-blue-50 transition-colors">
                          <Truck className="h-4 w-4" />
                          Kargo Takip
                        </button>
                      )}
                      
                      <button className="flex items-center justify-center gap-2 px-4 py-2 border border-green-300 rounded-lg text-green-700 hover:bg-green-50 transition-colors">
                        <MessageSquare className="h-4 w-4" />
                        Değerlendir
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Siparislerim 