import { NextRequest, NextResponse } from 'next/server'

// Dynamic route olarak işaretle
export const dynamic = 'force-dynamic'

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'payment_pending'

interface Order {
  id: string
  status: OrderStatus
  date: string
  total: number
  items: any[]
  shipping: any
  payment: any
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, newStatus } = body

    if (!orderId || !newStatus) {
      return NextResponse.json({ 
        error: 'Sipariş ID ve yeni durum gerekli' 
      }, { status: 400 })
    }

    // localStorage'dan siparişleri al
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    
    // Siparişi bul
    const orderIndex = allOrders.findIndex((order: Order) => order.id === orderId)
    
    if (orderIndex === -1) {
      return NextResponse.json({ 
        error: 'Sipariş bulunamadı' 
      }, { status: 404 })
    }

    // Sipariş durumunu güncelle
    allOrders[orderIndex].status = newStatus
    allOrders[orderIndex].updatedAt = new Date().toISOString()

    // localStorage'a kaydet
    localStorage.setItem('orders', JSON.stringify(allOrders))

    console.log(`✅ Admin: Sipariş ${orderId} durumu "${newStatus}" olarak güncellendi`)

    return NextResponse.json({
      success: true,
      message: 'Sipariş durumu başarıyla güncellendi',
      order: allOrders[orderIndex]
    })

  } catch (error) {
    console.error('Sipariş durumu güncelleme hatası:', error)
    return NextResponse.json({ 
      error: 'Sipariş durumu güncellenirken bir hata oluştu' 
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('orderId')

    if (!orderId) {
      return NextResponse.json({ 
        error: 'Sipariş ID gerekli' 
      }, { status: 400 })
    }

    // Simüle edilmiş sipariş verisi (static generation için)
    const mockOrder = {
      id: orderId,
      status: 'pending' as OrderStatus,
      date: new Date().toISOString(),
      total: 0,
      items: [],
      shipping: {},
      payment: {}
    }

    return NextResponse.json({
      success: true,
      order: mockOrder
    })

  } catch (error) {
    console.error('Sipariş getirme hatası:', error)
    return NextResponse.json({ 
      error: 'Sipariş getirilirken bir hata oluştu' 
    }, { status: 500 })
  }
} 