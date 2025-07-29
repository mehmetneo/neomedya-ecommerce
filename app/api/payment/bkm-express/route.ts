import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency, description } = body

    // Simüle edilmiş BKM Express ödeme
    // Gerçek uygulamada BKM Express SDK kullanılır
    const paymentResult = {
      success: true,
      paymentId: `bkm_${Date.now()}`,
      amount: amount,
      currency: currency,
      description: description,
      method: 'bkm-express'
    }

    return NextResponse.json(paymentResult)
  } catch (error) {
    console.error('BKM Express ödeme hatası:', error)
    return NextResponse.json({
      success: false,
      message: 'BKM Express ödeme işlemi sırasında bir hata oluştu',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 })
  }
} 