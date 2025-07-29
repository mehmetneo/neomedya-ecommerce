'use client'

import { useState } from 'react'

export default function TestEmailPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleTestEmail = async () => {
    if (!email) {
      alert('Lütfen e-posta adresi girin')
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/email/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Test e-postası gönderilemedi' })
    } finally {
      setLoading(false)
    }
  }

  const handleTestOrderEmail = async () => {
    if (!email) {
      alert('Lütfen e-posta adresi girin')
      return
    }

    setLoading(true)
    setResult(null)

    try {
      // Test sipariş verisi
      const testOrder = {
        id: `TEST-${Date.now()}`,
        items: [
          {
            id: '1',
            name: 'Test Ürün 1',
            price: 99.99,
            quantity: 2,
            size: 'M',
            color: 'Mavi',
            image: 'https://via.placeholder.com/150'
          },
          {
            id: '2',
            name: 'Test Ürün 2',
            price: 149.99,
            quantity: 1,
            size: 'L',
            color: 'Siyah',
            image: 'https://via.placeholder.com/150'
          }
        ],
        shipping: {
          firstName: 'Test',
          lastName: 'Kullanıcı',
          email: email,
          phone: '+90 555 123 4567',
          address: 'Test Mahallesi, Test Sokak No:1',
          city: 'İstanbul',
          postalCode: '34000'
        },
        payment: {
          method: 'bank-transfer',
          bankInfo: {
            bankName: 'Garanti BBVA',
            accountName: 'Neomedya E-ticaret Ltd. Şti.',
            iban: 'TR12 0006 2000 0000 0000 0000 00'
          }
        },
        total: 349.97,
        date: new Date().toISOString(),
        status: 'payment_pending'
      }

      const response = await fetch('/api/email/order-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order: testOrder })
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Sipariş e-postası gönderilemedi' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">E-posta Test Sayfası</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-posta Adresi
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <button
              onClick={handleTestEmail}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Gönderiliyor...' : 'Basit Test E-postası Gönder'}
            </button>

            <button
              onClick={handleTestOrderEmail}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Gönderiliyor...' : 'Sipariş E-postası Gönder'}
            </button>
          </div>

          {result && (
            <div className={`mt-4 p-4 rounded-md ${
              result.success 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <h3 className={`font-medium ${
                result.success ? 'text-green-800' : 'text-red-800'
              }`}>
                {result.success ? '✅ Başarılı' : '❌ Hata'}
              </h3>
              <p className={`text-sm mt-1 ${
                result.success ? 'text-green-700' : 'text-red-700'
              }`}>
                {result.message || result.error}
              </p>
              {result.details && (
                <div className="mt-2 text-xs text-gray-600">
                  <pre className="bg-gray-100 p-2 rounded">
                    {JSON.stringify(result.details, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h3 className="font-medium text-yellow-800 mb-2">📝 Not</h3>
          <p className="text-sm text-yellow-700">
            Bu sayfa e-posta sistemini test etmek için oluşturulmuştur. 
            Gerçek e-posta göndermek için environment variables ayarlamanız gerekir.
          </p>
        </div>
      </div>
    </div>
  )
} 