import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency, description } = body

    // Simüle edilmiş PayPal ödeme
    // Gerçek uygulamada PayPal SDK kullanılır
    const paymentResult = {
      success: true,
      paymentId: `paypal_${Date.now()}`,
      amount: amount,
      currency: currency,
      description: description,
      method: 'paypal'
    }

    return NextResponse.json(paymentResult)
  } catch (error) {
    console.error('PayPal ödeme hatası:', error)
    return NextResponse.json({
      success: false,
      message: 'PayPal ödeme işlemi sırasında bir hata oluştu',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 })
  }
} 