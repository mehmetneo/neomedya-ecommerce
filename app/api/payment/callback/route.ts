import { NextRequest, NextResponse } from 'next/server'
import { checkPaymentStatus } from '@/lib/iyzico'

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

    // Ödeme durumunu kontrol et
    const result: any = await checkPaymentStatus(token)

    if (result.status === 'success' && result.paymentStatus === 'SUCCESS') {
      // Ödeme başarılı - siparişi güncelle
      return NextResponse.json({
        success: true,
        message: 'Ödeme başarıyla tamamlandı',
        paymentId: result.paymentId,
        data: result
      })
    } else {
      // Ödeme başarısız
      return NextResponse.json({
        success: false,
        message: 'Ödeme başarısız',
        error: result.errorMessage || 'Ödeme işlemi tamamlanamadı'
      }, { status: 400 })
    }
  } catch (error) {
    console.error('Callback hatası:', error)
    return NextResponse.json({
      success: false,
      message: 'Callback işlemi sırasında bir hata oluştu',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 })
  }
} 