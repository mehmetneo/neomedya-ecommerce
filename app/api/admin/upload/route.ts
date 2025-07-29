import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Dosya bulunamadı' },
        { status: 400 }
      )
    }

    // Dosya türünü kontrol et
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Sadece resim dosyaları kabul edilir' },
        { status: 400 }
      )
    }

    // Dosya boyutunu kontrol et (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'Dosya boyutu 5MB\'dan küçük olmalıdır' },
        { status: 400 }
      )
    }

    // Dosya adını oluştur
    const timestamp = Date.now()
    const fileName = `${timestamp}-${file.name}`
    
    // Uploads klasörünü oluştur
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadsDir, { recursive: true })
    
    // Dosyayı kaydet
    const filePath = path.join(uploadsDir, fileName)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // URL'yi döndür
    const fileUrl = `/uploads/${fileName}`
    
    console.log('✅ Dosya yüklendi:', fileUrl)
    
    return NextResponse.json({
      success: true,
      url: fileUrl,
      fileName: fileName
    })
  } catch (error) {
    console.error('❌ Dosya yükleme hatası:', error)
    return NextResponse.json(
      { success: false, error: 'Dosya yüklenemedi' },
      { status: 500 }
    )
  }
} 