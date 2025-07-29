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
    const orders = await readOrders()
    
    console.log('📦 Admin: Siparişler getiriliyor...')
    console.log('📊 Toplam sipariş sayısı:', orders.length)
    
    return NextResponse.json({
      success: true,
      orders: orders,
      total: orders.length
    })
  } catch (error) {
    console.error('❌ Admin sipariş getirme hatası:', error)
    return NextResponse.json({
      success: false,
      error: 'Siparişler getirilirken bir hata oluştu'
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, status } = body

    console.log('🔄 Admin: Sipariş durumu güncelleniyor...')
    console.log('📋 Sipariş ID:', orderId)
    console.log('📊 Yeni durum:', status)

    const orders = await readOrders()
    const orderIndex = orders.findIndex((order: any) => order.id === orderId)

    if (orderIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Sipariş bulunamadı'
      }, { status: 404 })
    }

    // Sipariş durumunu güncelle
    orders[orderIndex].status = status
    orders[orderIndex].updatedAt = new Date().toISOString()
    
    // Dosyaya kaydet
    await writeOrders(orders)

    console.log('✅ Admin: Sipariş durumu başarıyla güncellendi')

    return NextResponse.json({
      success: true,
      message: 'Sipariş durumu başarıyla güncellendi',
      order: orders[orderIndex]
    })
  } catch (error) {
    console.error('❌ Admin sipariş güncelleme hatası:', error)
    return NextResponse.json({
      success: false,
      error: 'Sipariş güncellenirken bir hata oluştu'
    }, { status: 500 })
  }
} 