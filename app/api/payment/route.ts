import { NextRequest, NextResponse } from 'next/server'
import { createPayment, createCardPayment } from '@/lib/iyzico'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, items, buyer, paymentMethod, cardInfo } = body

    if (paymentMethod === 'card') {
      // Kredi kartı ile ödeme
      const result: any = await createCardPayment(amount, 'TRY', cardInfo, buyer, items)
      
      if (result.status === 'success') {
        return NextResponse.json({
          success: true,
          message: 'Ödeme başarıyla tamamlandı',
          paymentId: result.paymentId,
          data: result
        })
      } else {
        return NextResponse.json({
          success: false,
          message: 'Ödeme başarısız',
          error: result.errorMessage
        }, { status: 400 })
      }
    } else {
      // iyzico checkout form ile ödeme
      const basketId = `basket_${Date.now()}`
      const result: any = await createPayment(amount, 'TRY', basketId, buyer, items)
      
      if (result.status === 'success') {
        return NextResponse.json({
          success: true,
          message: 'Ödeme formu oluşturuldu',
          checkoutFormContent: result.checkoutFormContent,
          token: result.token
        })
      } else {
        return NextResponse.json({
          success: false,
          message: 'Ödeme formu oluşturulamadı',
          error: result.errorMessage
        }, { status: 400 })
      }
    }
  } catch (error) {
    console.error('Ödeme hatası:', error)
    return NextResponse.json({
      success: false,
      message: 'Ödeme işlemi sırasında bir hata oluştu',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 })
  }
} 