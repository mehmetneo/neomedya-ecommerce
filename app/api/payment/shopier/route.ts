import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency, description } = body

    // Simüle edilmiş Shopier ödeme
    // Gerçek uygulamada Shopier SDK kullanılır
    const paymentResult = {
      success: true,
      paymentId: `shopier_${Date.now()}`,
      amount: amount,
      currency: currency,
      description: description,
      method: 'shopier'
    }

    return NextResponse.json(paymentResult)
  } catch (error) {
    console.error('Shopier ödeme hatası:', error)
    return NextResponse.json({
      success: false,
      message: 'Shopier ödeme işlemi sırasında bir hata oluştu',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 })
  }
} 