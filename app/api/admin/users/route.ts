import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Dynamic route olarak işaretle
export const dynamic = 'force-dynamic'

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json')

interface User {
  id: string
  name: string
  email: string
  phone: string
  joinDate: string
  orderCount: number
  totalSpent: number
  status: 'active' | 'inactive'
}

async function readUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // Dosya yoksa boş array döndür
    return []
  }
}

async function writeUsers(users: User[]): Promise<void> {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2))
}

export async function GET() {
  try {
    const users = await readUsers()
    console.log('👥 Admin: Kullanıcılar getiriliyor...')
    console.log(`📊 Toplam kullanıcı sayısı: ${users.length}`)
    
    return NextResponse.json({
      success: true,
      users: users
    })
  } catch (error) {
    console.error('❌ Admin kullanıcı getirme hatası:', error)
    return NextResponse.json(
      { success: false, error: 'Kullanıcılar yüklenemedi' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone } = body

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'İsim ve e-posta gerekli' },
        { status: 400 }
      )
    }

    const users = await readUsers()
    
    // E-posta kontrolü
    const existingUser = users.find(user => user.email === email)
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Bu e-posta adresi zaten kayıtlı' },
        { status: 400 }
      )
    }

    const newUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
      phone: phone || '',
      joinDate: new Date().toISOString().split('T')[0],
      orderCount: 0,
      totalSpent: 0,
      status: 'active'
    }

    users.push(newUser)
    await writeUsers(users)

    console.log('✅ Yeni kullanıcı kaydedildi:', newUser.email)
    
    return NextResponse.json({
      success: true,
      user: newUser
    })
  } catch (error) {
    console.error('❌ Kullanıcı kaydetme hatası:', error)
    return NextResponse.json(
      { success: false, error: 'Kullanıcı kaydedilemedi' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, status } = body

    if (!userId || !status) {
      return NextResponse.json(
        { success: false, error: 'Kullanıcı ID ve durum gerekli' },
        { status: 400 }
      )
    }

    const users = await readUsers()
    const userIndex = users.findIndex(user => user.id === userId)
    
    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      )
    }

    users[userIndex].status = status
    await writeUsers(users)

    console.log('✅ Kullanıcı durumu güncellendi:', userId, status)
    
    return NextResponse.json({
      success: true,
      user: users[userIndex]
    })
  } catch (error) {
    console.error('❌ Kullanıcı güncelleme hatası:', error)
    return NextResponse.json(
      { success: false, error: 'Kullanıcı güncellenemedi' },
      { status: 500 }
    )
  }
} 