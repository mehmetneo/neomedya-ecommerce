import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Dynamic route olarak işaretle
export const dynamic = 'force-dynamic'

// Veri dosyası yolu
const dataFilePath = path.join(process.cwd(), 'data', 'orders.json')
const usersFilePath = path.join(process.cwd(), 'data', 'users.json')

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

// Kullanıcıları oku
async function readUsers() {
  try {
    const data = await fs.readFile(usersFilePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // Dosya yoksa boş array döndür
    return []
  }
}

// Kullanıcıları yaz
async function writeUsers(users: any[]) {
  try {
    const dataDir = path.dirname(usersFilePath)
    await fs.mkdir(dataDir, { recursive: true })
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2))
  } catch (error) {
    console.error('Kullanıcı yazma hatası:', error)
    throw error
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

    // Kullanıcının sipariş sayısını ve toplam harcamasını güncelle
    try {
      const users = await readUsers()
      const userEmail = order.shipping?.email
      
      if (userEmail) {
        const userIndex = users.findIndex((user: any) => user.email === userEmail)
        
        if (userIndex !== -1) {
          // Kullanıcının sipariş sayısını artır
          users[userIndex].orderCount = (users[userIndex].orderCount || 0) + 1
          
          // Toplam harcamasını güncelle
          const orderTotal = order.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
          users[userIndex].totalSpent = (users[userIndex].totalSpent || 0) + orderTotal
          
          await writeUsers(users)
          console.log('✅ Kullanıcı istatistikleri güncellendi:', userEmail)
        }
      }
    } catch (error) {
      console.error('❌ Kullanıcı istatistikleri güncellenirken hata:', error)
    }

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

    // Static generation için mock veri
    const mockOrders = userEmail ? [
      {
        id: 'ORDER-001',
        status: 'pending',
        date: new Date().toISOString(),
        total: 299.99,
        items: [
          { name: 'Test Ürün', price: 299.99, quantity: 1 }
        ],
        shipping: { email: userEmail, name: 'Test Kullanıcı' },
        payment: { method: 'bank-transfer' }
      }
    ] : []

    return NextResponse.json({
      success: true,
      orders: mockOrders,
      total: mockOrders.length
    })
  } catch (error) {
    console.error('❌ Sipariş getirme hatası:', error)
    return NextResponse.json({
      success: false,
      error: 'Siparişler getirilirken bir hata oluştu'
    }, { status: 500 })
  }
} 