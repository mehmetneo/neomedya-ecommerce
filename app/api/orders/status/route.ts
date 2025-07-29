import { NextRequest, NextResponse } from 'next/server'

// Dynamic route olarak işaretle
export const dynamic = 'force-dynamic'

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'payment_pending'

// Static sipariş verileri
const staticOrders = [
  {
    id: 'ORDER-001',
    status: 'pending' as OrderStatus,
    date: new Date().toISOString(),
    total: 299.99,
    items: [
      { name: 'Premium T-Shirt', price: 89.99, quantity: 2 },
      { name: 'Kot Pantolon', price: 199.99, quantity: 1 }
    ],
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
    status: 'shipped' as OrderStatus,
    date: new Date(Date.now() - 86400000).toISOString(),
    total: 599.99,
    items: [
      { name: 'Kadın Elbise', price: 299.99, quantity: 1 },
      { name: 'Spor Ayakkabı', price: 299.99, quantity: 1 }
    ],
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('orderId')

    if (!orderId) {
      return NextResponse.json({
        error: 'Sipariş ID gerekli'
      }, { status: 400 })
    }

    // Static sipariş verilerinden bul
    const order = staticOrders.find(o => o.id === orderId)
    
    if (!order) {
      return NextResponse.json({
        error: 'Sipariş bulunamadı'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      status: order.status,
      order: order
    })
  } catch (error) {
    console.error('Sipariş durumu getirme hatası:', error)
    return NextResponse.json({
      error: 'Sipariş durumu getirilirken bir hata oluştu'
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('orderId')
    const newStatus = searchParams.get('status') as OrderStatus

    if (!orderId || !newStatus) {
      return NextResponse.json({
        error: 'Sipariş ID ve yeni durum gerekli'
      }, { status: 400 })
    }

    // Static sipariş verilerinde güncelle
    const orderIndex = staticOrders.findIndex(o => o.id === orderId)
    
    if (orderIndex === -1) {
      return NextResponse.json({
        error: 'Sipariş bulunamadı'
      }, { status: 404 })
    }

    // Sipariş durumunu güncelle
    staticOrders[orderIndex].status = newStatus

    return NextResponse.json({
      success: true,
      message: 'Sipariş durumu güncellendi',
      order: staticOrders[orderIndex]
    })
  } catch (error) {
    console.error('Sipariş durumu güncelleme hatası:', error)
    return NextResponse.json({
      error: 'Sipariş durumu güncellenirken bir hata oluştu'
    }, { status: 500 })
  }
} 