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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { order } = body

    console.log('📦 Yeni sipariş kaydediliyor...')
    console.log('📋 Sipariş ID:', order.id)
    console.log('👤 Müşteri:', order.shipping.name)

    const orders = await readOrders()
    orders.push(order)
    await writeOrders(orders)

    console.log('✅ Sipariş başarıyla kaydedildi')

    return NextResponse.json({
      success: true,
      message: 'Sipariş başarıyla kaydedildi',
      order: order
    })
  } catch (error) {
    console.error('❌ Sipariş kaydetme hatası:', error)
    return NextResponse.json({
      success: false,
      error: 'Sipariş kaydedilirken bir hata oluştu'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userEmail = searchParams.get('email')

    const orders = await readOrders()
    
    if (userEmail) {
      // Belirli kullanıcının siparişlerini filtrele
      const userOrders = orders.filter((order: any) => order.shipping?.email === userEmail)
      return NextResponse.json({
        success: true,
        orders: userOrders,
        total: userOrders.length
      })
    }

    return NextResponse.json({
      success: true,
      orders: orders,
      total: orders.length
    })
  } catch (error) {
    console.error('❌ Sipariş getirme hatası:', error)
    return NextResponse.json({
      success: false,
      error: 'Siparişler getirilirken bir hata oluştu'
    }, { status: 500 })
  }
} 