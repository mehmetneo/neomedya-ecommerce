import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Veri dosyası yolu
const dataFilePath = path.join(process.cwd(), 'data', 'orders.json')

// Veri dosyasını oku
async function readOrders() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // Dosya yoksa boş array döndür
    return []
  }
}

// Veri dosyasına yaz
async function writeOrders(orders: any[]) {
  try {
    // data klasörünü oluştur (yoksa)
    const dataDir = path.dirname(dataFilePath)
    await fs.mkdir(dataDir, { recursive: true })
    
    await fs.writeFile(dataFilePath, JSON.stringify(orders, null, 2))
  } catch (error) {
    console.error('Veri yazma hatası:', error)
    throw error
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

    // Static generation için mock veri
    const mockOrder = {
      id: orderId,
      status: 'pending',
      date: new Date().toISOString(),
      total: 0,
      items: [],
      shipping: {},
      payment: {}
    }

    return NextResponse.json({
      success: true,
      status: mockOrder.status,
      order: mockOrder
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
    const body = await request.json()
    const { orderId, status } = body

    if (!orderId || !status) {
      return NextResponse.json({ 
        error: 'Sipariş ID ve durum gerekli' 
      }, { status: 400 })
    }

    const orders = await readOrders()
    const orderIndex = orders.findIndex((order: any) => order.id === orderId)

    if (orderIndex === -1) {
      return NextResponse.json({ 
        error: 'Sipariş bulunamadı' 
      }, { status: 404 })
    }

    orders[orderIndex].status = status
    orders[orderIndex].updatedAt = new Date().toISOString()
    
    await writeOrders(orders)

    console.log(`✅ API: Sipariş ${orderId} durumu "${status}" olarak güncellendi`)

    return NextResponse.json({
      success: true,
      message: 'Sipariş durumu başarıyla güncellendi',
      order: orders[orderIndex]
    })
  } catch (error) {
    console.error('Sipariş durumu güncelleme hatası:', error)
    return NextResponse.json({ 
      error: 'Sipariş durumu güncellenirken bir hata oluştu' 
    }, { status: 500 })
  }
} 