import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData()
    const token = body.get('token') as string

    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'Token bulunamadı'
      }, { status: 400 })
    }

    // Geçici olarak başarılı döndür
    return NextResponse.json({
      success: true,
      message: 'Ödeme başarıyla tamamlandı',
      paymentId: 'temp-' + Date.now(),
      data: { status: 'success', paymentStatus: 'SUCCESS' }
    })
  } catch (error) {
    console.error('Callback hatası:', error)
    return NextResponse.json({
      success: false,
      message: 'Callback işlemi sırasında bir hata oluştu',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 })
  }
} 