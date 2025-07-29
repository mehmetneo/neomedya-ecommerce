'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TestEmailPage() {
  const [email, setEmail] = useState('01neo001@gmail.com')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  const sendTestEmail = async () => {
    setLoading(true)
    setResult('')
    
    try {
      const response = await fetch('/api/email/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      
      if (data.success) {
        setResult('✅ Test e-postası başarıyla gönderildi! Gmail hesabınızı kontrol edin.')
      } else {
        setResult('❌ E-posta gönderilemedi: ' + data.message)
      }
    } catch (error) {
      setResult('❌ Hata oluştu: ' + String(error))
    } finally {
      setLoading(false)
    }
  }

  const sendOrderConfirmationEmail = async () => {
    setLoading(true)
    setResult('')
    
    try {
      const orderData = {
        id: 'TEST-' + Date.now(),
        items: [
          { name: 'Test Ürün 1', price: 99.99, quantity: 2 },
          { name: 'Test Ürün 2', price: 149.99, quantity: 1 }
        ],
        shipping: {
          name: 'Test Kullanıcı',
          email: email,
          address: 'Test Adres',
          city: 'Test Şehir',
          phone: '+90 555 123 4567'
        },
        payment: {
          method: 'Banka Transferi',
          status: 'Beklemede'
        },
        total: 349.97,
        status: 'Beklemede'
      }

      const response = await fetch('/api/email/order-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order: orderData }),
      })

      const data = await response.json()
      
      if (data.success) {
        setResult('✅ Sipariş onay e-postası başarıyla gönderildi! Gmail hesabınızı kontrol edin.')
      } else {
        setResult('❌ E-posta gönderilemedi: ' + data.message)
      }
    } catch (error) {
      setResult('❌ Hata oluştu: ' + String(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              📧 E-posta Sistemi Test Sayfası
            </h1>
            <p className="text-lg text-gray-600">
              E-posta sistemini test etmek için aşağıdaki butonları kullanın
            </p>
          </div>

          <div className="space-y-6">
            {/* E-posta Adresi */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-posta Adresi
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="E-posta adresinizi girin"
              />
            </div>

            {/* Test Butonları */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={sendTestEmail}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? '⏳ Gönderiliyor...' : '📧 Test E-postası Gönder'}
              </button>

              <button
                onClick={sendOrderConfirmationEmail}
                disabled={loading}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? '⏳ Gönderiliyor...' : '📦 Sipariş Onay E-postası Gönder'}
              </button>
            </div>

            {/* Sonuç */}
            {result && (
              <div className={`p-4 rounded-lg ${
                result.includes('✅') 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {result}
              </div>
            )}

            {/* Bilgi */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">ℹ️ Bilgi</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Test e-postası basit bir mesaj içerir</li>
                <li>• Sipariş onay e-postası detaylı sipariş bilgileri içerir</li>
                <li>• E-postalar Gmail hesabınıza gönderilir</li>
                <li>• Environment variables ayarlanmışsa gerçek e-posta gönderilir</li>
                <li>• Ayarlanmamışsa simülasyon modunda çalışır</li>
              </ul>
            </div>

            {/* Geri Dön */}
            <div className="text-center">
              <Link
                href="/"
                className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                ← Ana Sayfaya Dön
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 