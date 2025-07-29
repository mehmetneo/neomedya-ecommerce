import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency, description } = body

    // Simüle edilmiş Stripe ödeme
    // Gerçek uygulamada Stripe SDK kullanılır
    const paymentResult = {
      success: true,
      paymentId: `stripe_${Date.now()}`,
      amount: amount,
      currency: currency,
      description: description,
      method: 'stripe'
    }

    return NextResponse.json(paymentResult)
  } catch (error) {
    console.error('Stripe ödeme hatası:', error)
    return NextResponse.json({
      success: false,
      message: 'Stripe ödeme işlemi sırasında bir hata oluştu',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 })
  }
} 