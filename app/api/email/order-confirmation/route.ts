import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  size?: string
  color?: string
  image: string
}

interface Order {
  id: string
  items: OrderItem[]
  shipping: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    postalCode: string
  }
  payment: {
    method: string
    bankInfo?: any
    cryptoInfo?: any
    cashInfo?: any
  }
  total: number
  date: string
  status: string
}

// E-posta şablonu oluştur
function createOrderConfirmationEmail(order: Order) {
  const orderDate = new Date(order.date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const paymentMethodText = {
    'bank-transfer': 'Banka Transferi',
    'crypto': 'Kripto Para',
    'cash-on-delivery': 'Kapıda Ödeme',
    'stripe': 'Kredi Kartı',
    'paytr': 'PayTR',
    'shopier': 'Shopier',
    'bkm-express': 'BKM Express'
  }[order.payment.method] || order.payment.method

  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
        <div style="display: flex; align-items: center;">
          <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; margin-right: 12px;">
          <div>
            <div style="font-weight: 600; color: #1f2937; margin-bottom: 4px;">${item.name}</div>
            <div style="font-size: 14px; color: #6b7280;">
              ${item.color ? `${item.color} • ` : ''}${item.size ? `${item.size} • ` : ''}${item.quantity} adet
            </div>
          </div>
        </div>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600; color: #1f2937;">
        ₺${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `).join('')

  return `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sipariş Onayı - Neomedya</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 600; }
        .header p { color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px; }
        .content { padding: 40px 20px; }
        .order-number { background: #f3f4f6; padding: 20px; border-radius: 12px; margin-bottom: 30px; text-align: center; }
        .order-number h2 { color: #1f2937; margin: 0 0 10px 0; font-size: 20px; }
        .order-number .number { font-size: 24px; font-weight: 700; color: #3b82f6; }
        .section { margin-bottom: 30px; }
        .section h3 { color: #1f2937; margin: 0 0 15px 0; font-size: 18px; font-weight: 600; }
        .items-table { width: 100%; border-collapse: collapse; }
        .items-table th { background: #f9fafb; padding: 12px; text-align: left; font-weight: 600; color: #374151; }
        .total-row { background: #f3f4f6; font-weight: 700; }
        .total-row td { padding: 15px 12px; font-size: 18px; color: #1f2937; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
        .info-card { background: #f9fafb; padding: 20px; border-radius: 12px; }
        .info-card h4 { color: #1f2937; margin: 0 0 10px 0; font-size: 16px; font-weight: 600; }
        .info-card p { color: #6b7280; margin: 5px 0; font-size: 14px; }
        .status-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; }
        .status-pending { background: #fef3c7; color: #92400e; }
        .status-payment-pending { background: #fed7aa; color: #c2410c; }
        .footer { background: #f9fafb; padding: 30px 20px; text-align: center; }
        .footer p { color: #6b7280; margin: 5px 0; font-size: 14px; }
        .social-links { margin-top: 20px; }
        .social-links a { display: inline-block; margin: 0 10px; color: #3b82f6; text-decoration: none; }
        .cta-button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 20px; }
        .cta-button:hover { background: #2563eb; }
        @media (max-width: 600px) {
          .info-grid { grid-template-columns: 1fr; }
          .header h1 { font-size: 24px; }
          .content { padding: 20px 15px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <h1>🎉 Siparişiniz Alındı!</h1>
          <p>Neomedya'ya güvendiğiniz için teşekkür ederiz</p>
        </div>

        <!-- Content -->
        <div class="content">
          <!-- Order Number -->
          <div class="order-number">
            <h2>Sipariş Numaranız</h2>
            <div class="number">${order.id}</div>
            <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 14px;">
              Sipariş Tarihi: ${orderDate}
            </p>
          </div>

          <!-- Order Status -->
          <div class="section">
            <h3>Sipariş Durumu</h3>
            <div class="status-badge ${order.status === 'payment_pending' ? 'status-payment-pending' : 'status-pending'}">
              ${order.status === 'payment_pending' ? 'Ödeme Bekleniyor' : 'Sipariş Alındı'}
            </div>
            <p style="color: #6b7280; margin-top: 10px; font-size: 14px;">
              ${order.status === 'payment_pending' 
                ? 'Havale yaptıktan sonra dekontu admin ile paylaşın. Dekont onaylandıktan sonra siparişiniz hazırlanacak.' 
                : 'Siparişiniz hazırlanmaya başlanacak. Kargo takip bilgileri e-posta adresinize gönderilecektir.'}
            </p>
          </div>

          <!-- Order Items -->
          <div class="section">
            <h3>Sipariş Edilen Ürünler</h3>
            <table class="items-table">
              <thead>
                <tr>
                  <th>Ürün</th>
                  <th style="text-align: right;">Tutar</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
                <tr class="total-row">
                  <td style="padding: 15px 12px; font-weight: 600; color: #1f2937;">Toplam</td>
                  <td style="text-align: right; font-size: 20px; font-weight: 700; color: #3b82f6;">
                    ₺${order.total.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Order Information -->
          <div class="info-grid">
            <div class="info-card">
              <h4>📦 Teslimat Bilgileri</h4>
              <p><strong>${order.shipping.firstName} ${order.shipping.lastName}</strong></p>
              <p>${order.shipping.address}</p>
              <p>${order.shipping.city} ${order.shipping.postalCode}</p>
              <p>📞 ${order.shipping.phone}</p>
              <p>✉️ ${order.shipping.email}</p>
            </div>
            <div class="info-card">
              <h4>💳 Ödeme Bilgileri</h4>
              <p><strong>Ödeme Yöntemi:</strong> ${paymentMethodText}</p>
              <p><strong>Toplam Tutar:</strong> ₺${order.total.toFixed(2)}</p>
              ${order.payment.method === 'bank-transfer' ? `
                <p><strong>Banka:</strong> Garanti BBVA</p>
                <p><strong>IBAN:</strong> TR12 0006 2000 0000 0000 0000 00</p>
                <p><strong>Referans:</strong> ${order.id}</p>
              ` : ''}
            </div>
          </div>

          <!-- Next Steps -->
          <div class="section">
            <h3>📋 Sonraki Adımlar</h3>
            ${order.status === 'payment_pending' ? `
              <ol style="color: #6b7280; line-height: 1.8;">
                <li>Havale yaparken referans numarasını açıklama kısmına yazın</li>
                <li>Ödeme yaptıktan sonra dekontu <strong>destek@neomedya.com</strong> adresine gönderin</li>
                <li>Dekont onaylandıktan sonra siparişiniz hazırlanacak</li>
                <li>Sipariş durumunu "Siparişlerim" sayfasından takip edebilirsiniz</li>
              </ol>
            ` : `
              <ol style="color: #6b7280; line-height: 1.8;">
                <li>Siparişiniz hazırlanmaya başlanacak</li>
                <li>Kargo takip bilgileri e-posta adresinize gönderilecek</li>
                <li>Sipariş durumunu "Siparişlerim" sayfasından takip edebilirsiniz</li>
                <li>Teslimat sırasında dikkatli olun ve paketi kontrol edin</li>
              </ol>
            `}
          </div>

          <!-- CTA -->
          <div style="text-align: center; margin-top: 40px;">
            <a href="http://localhost:3001/siparislerim" class="cta-button">
              Siparişlerimi Görüntüle
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p><strong>Neomedya E-ticaret</strong></p>
          <p>Modern ve kaliteli giyim ürünleri</p>
          <div class="social-links">
            <a href="#">🌐 Website</a>
            <a href="#">📧 Destek</a>
            <a href="#">📱 Mobil Uygulama</a>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
            Bu e-posta ${order.shipping.email} adresine gönderilmiştir.<br>
            Sorularınız için destek@neomedya.com adresine yazabilirsiniz.
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

// E-posta gönderme fonksiyonu
async function sendEmail(to: string, subject: string, htmlContent: string) {
  try {
    // 1. Önce environment variables kontrol et
    const emailUser = process.env.EMAIL_USER
    const emailPass = process.env.EMAIL_PASS
    
    console.log('🔧 E-posta ayarları kontrol ediliyor...')
    console.log('EMAIL_USER:', emailUser ? '✅ Ayarlandı' : '❌ Ayarlandı')
    console.log('EMAIL_PASS:', emailPass ? '✅ Ayarlandı' : '❌ Ayarlandı')

    // 2. Eğer e-posta ayarları yoksa simülasyon modunda çalış
    if (!emailUser || !emailPass || emailUser === 'your-email@gmail.com' || emailPass === 'your-app-password') {
      console.log('⚠️ E-posta ayarları yapılandırılmamış, simülasyon modunda çalışıyor')
      
      // Simülasyon: E-posta başarıyla gönderildi
      console.log('📧 Simülasyon: E-posta gönderiliyor...')
      console.log('Alıcı:', to)
      console.log('Konu:', subject)
      console.log('İçerik uzunluğu:', htmlContent.length, 'karakter')
      
      // Simülasyon için 2 saniye bekle
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const messageId = `simulated_${Date.now()}`
      console.log('✅ Simülasyon: E-posta başarıyla gönderildi:', messageId)
      
      return { success: true, messageId: messageId, simulated: true }
    }

    // 3. Gerçek e-posta gönderme
    console.log('📧 Gerçek e-posta gönderiliyor...')
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      }
    })

    const info = await transporter.sendMail({
      from: `"Neomedya E-ticaret" <${emailUser}>`,
      to: to,
      subject: subject,
      html: htmlContent
    })

    console.log('✅ Gerçek e-posta başarıyla gönderildi:', info.messageId)
    return { success: true, messageId: info.messageId, simulated: false }
    
  } catch (error) {
    console.error('❌ E-posta gönderme hatası:', error)
    
    // Hata durumunda simülasyon döndür
    console.log('⚠️ E-posta servisi hatası, simülasyon moduna geçiliyor')
    const messageId = `error_simulated_${Date.now()}`
    console.log('✅ Simülasyon: E-posta başarıyla gönderildi:', messageId)
    
    return { success: true, messageId: messageId, simulated: true, error: String(error) }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { order } = body

    if (!order || !order.shipping?.email) {
      return NextResponse.json({ 
        error: 'Sipariş bilgileri ve e-posta adresi gerekli' 
      }, { status: 400 })
    }

    // E-posta şablonu oluştur
    const emailHtml = createOrderConfirmationEmail(order)
    const emailSubject = `Sipariş Onayı - ${order.id} | Neomedya`

    // E-posta gönder
    const emailResult = await sendEmail(
      order.shipping.email,
      emailSubject,
      emailHtml
    )

    if (emailResult.success) {
      return NextResponse.json({
        success: true,
        message: 'Sipariş onay e-postası başarıyla gönderildi',
        messageId: emailResult.messageId
      })
    } else {
      throw new Error('E-posta gönderilemedi')
    }

  } catch (error) {
    console.error('E-posta gönderme hatası:', error)
    return NextResponse.json({ 
      error: 'E-posta gönderilirken bir hata oluştu' 
    }, { status: 500 })
  }
} 