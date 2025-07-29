import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency, description } = body

    // Simüle edilmiş PayTR ödeme
    // Gerçek uygulamada PayTR SDK kullanılır
    const paymentResult = {
      success: true,
      paymentId: `paytr_${Date.now()}`,
      amount: amount,
      currency: currency,
      description: description,
      method: 'paytr'
    }

    return NextResponse.json(paymentResult)
  } catch (error) {
    console.error('PayTR ödeme hatası:', error)
    return NextResponse.json({
      success: false,
      message: 'PayTR ödeme işlemi sırasında bir hata oluştu',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 })
  }
} 