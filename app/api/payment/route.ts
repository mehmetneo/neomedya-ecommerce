import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, items, buyer, paymentMethod, cardInfo } = body

    // Geçici olarak başarılı döndür
    return NextResponse.json({
      success: true,
      message: 'Ödeme başarıyla tamamlandı',
      paymentId: 'temp-' + Date.now(),
      data: { status: 'success', paymentStatus: 'SUCCESS' }
    })
  } catch (error) {
    console.error('Ödeme hatası:', error)
    return NextResponse.json({
      success: false,
      message: 'Ödeme işlemi sırasında bir hata oluştu',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 })
  }
} 