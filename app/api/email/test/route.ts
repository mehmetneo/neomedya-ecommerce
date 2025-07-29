import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ 
        error: 'E-posta adresi gerekli' 
      }, { status: 400 })
    }

    // Basit test e-postası
    const testEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Test E-postası</title>
      </head>
      <body>
        <h1>Test E-postası</h1>
        <p>Bu bir test e-postasıdır. E-posta sistemi çalışıyor!</p>
        <p>Gönderim zamanı: ${new Date().toLocaleString('tr-TR')}</p>
      </body>
      </html>
    `

    // E-posta gönderme simülasyonu
    console.log('📧 Test e-postası gönderiliyor...')
    console.log('Alıcı:', email)
    console.log('Konu: Test E-postası - Neomedya')
    console.log('İçerik uzunluğu:', testEmailHtml.length, 'karakter')
    
    // Simülasyon: E-posta başarıyla gönderildi
    const messageId = `test_${Date.now()}`
    
    console.log('✅ Test e-postası başarıyla gönderildi:', messageId)

    return NextResponse.json({
      success: true,
      message: 'Test e-postası başarıyla gönderildi',
      messageId: messageId,
      details: {
        to: email,
        subject: 'Test E-postası - Neomedya',
        contentLength: testEmailHtml.length,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Test e-posta hatası:', error)
    return NextResponse.json({ 
      error: 'Test e-postası gönderilirken bir hata oluştu' 
    }, { status: 500 })
  }
} 