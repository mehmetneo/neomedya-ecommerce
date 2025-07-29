'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import { paymentSystems, createStripePayment, createPayTRPayment, createShopierPayment, createBKMExpressPayment, createBankTransfer, createCryptoPayment, createCashOnDelivery } from '@/lib/payment-systems'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
}

interface ShippingInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  identityNumber?: string
}

interface PaymentInfo {
  cardNumber: string
  cardName: string
  expiryMonth: string
  expiryYear: string
  cvv: string
}

export default function OdemePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  })
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  })
  const [paymentMethod, setPaymentMethod] = useState<string>('bank-transfer')
  const [isLoading, setIsLoading] = useState(false)
  const [activeStep, setActiveStep] = useState(1)
  const [selectedCrypto, setSelectedCrypto] = useState('BTC')
  const [showBankInfo, setShowBankInfo] = useState(false)
  const [bankTransferInfo, setBankTransferInfo] = useState({
    bankName: 'Garanti BBVA',
    accountName: 'Neomedya E-ticaret Ltd. Şti.',
    iban: 'TR12 0006 2000 0000 0000 0000 00',
    swift: 'TGBATRIS'
  })
  const router = useRouter()

  useEffect(() => {
    // Sepet verilerini localStorage'dan al
    const savedCart = localStorage.getItem('checkoutItems')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    } else {
      // Sepet boşsa ana sayfaya yönlendir
      router.push('/')
    }

    // Kullanıcı bilgilerini al
    const userData = localStorage.getItem('user')
    if (userData) {
      const user = JSON.parse(userData)
      setShippingInfo(prev => ({
        ...prev,
        firstName: user.name.split(' ')[0] || '',
        lastName: user.name.split(' ').slice(1).join(' ') || '',
        email: user.email || ''
      }))
    }
  }, [router])

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shippingCost = subtotal >= 150 ? 0 : 29.99
  const total = subtotal + shippingCost

  const handleShippingChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }))
  }

  const handlePaymentChange = (field: keyof PaymentInfo, value: string) => {
    setPaymentInfo(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (paymentMethod === 'bank-transfer') {
      setShowBankInfo(true)
      setIsLoading(false)
      return
    }

    // Kullanıcı verilerini kaydet
    const userData = {
      email: shippingInfo.email,
      name: `${shippingInfo.firstName} ${shippingInfo.lastName}`
    }
    localStorage.setItem('userData', JSON.stringify(userData))
    console.log('✅ Kullanıcı verisi kaydedildi:', userData)

    const order = {
      id: `ORD-${Date.now()}`,
      items: cartItems,
      shipping: {
        name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        email: shippingInfo.email,
        phone: shippingInfo.phone,
        address: `${shippingInfo.address}, ${shippingInfo.city} ${shippingInfo.postalCode}`
      },
      payment: { 
        method: paymentMethod, 
        total: total,
        reference: `ORD-${Date.now()}`
      },
      total: total,
      date: new Date().toISOString(),
      status: 'pending'
    }

    // Siparişi API ile kaydet
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order })
      })

      if (response.ok) {
        console.log('✅ Sipariş başarıyla kaydedildi')
      } else {
        console.error('❌ Sipariş kaydedilemedi')
      }
    } catch (error) {
      console.error('Sipariş kaydetme hatası:', error)
    }

    // E-posta gönder
    try {
      const emailResponse = await fetch('/api/email/order-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order })
      })

      if (emailResponse.ok) {
        console.log('✅ Sipariş onay e-postası gönderildi')
      } else {
        console.log('⚠️ E-posta gönderilemedi, ancak sipariş kaydedildi')
      }
    } catch (emailError) {
      console.error('E-posta gönderme hatası:', emailError)
      // E-posta hatası siparişi etkilemez
    }

    // Sepeti temizle
    localStorage.removeItem('cart')
    localStorage.removeItem('checkoutItems')

    alert('Siparişiniz başarıyla tamamlandı! Onay e-postası gönderildi.')
    router.push('/siparis-basarili')
    setIsLoading(false)
  }

  const handleBankTransferSubmit = async () => {
    // Kullanıcı verilerini kaydet
    const userData = {
      email: shippingInfo.email,
      name: `${shippingInfo.firstName} ${shippingInfo.lastName}`
    }
    localStorage.setItem('userData', JSON.stringify(userData))
    console.log('✅ Kullanıcı verisi kaydedildi:', userData)

    const order = {
      id: `ORD-${Date.now()}`,
      items: cartItems,
      shipping: {
        name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        email: shippingInfo.email,
        phone: shippingInfo.phone,
        address: `${shippingInfo.address}, ${shippingInfo.city} ${shippingInfo.postalCode}`
      },
      payment: { 
        method: 'bank-transfer', 
        bankInfo: bankTransferInfo,
        total: total,
        reference: `ORD-${Date.now()}`
      },
      total: total,
      date: new Date().toISOString(),
      status: 'payment_pending'
    }

    // Siparişi API ile kaydet
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order })
      })

      if (response.ok) {
        console.log('✅ Havale siparişi başarıyla kaydedildi')
      } else {
        console.error('❌ Havale siparişi kaydedilemedi')
      }
    } catch (error) {
      console.error('Havale siparişi kaydetme hatası:', error)
    }

    // E-posta gönder
    try {
      const emailResponse = await fetch('/api/email/order-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order })
      })

      if (emailResponse.ok) {
        console.log('✅ Havale sipariş onay e-postası gönderildi')
      } else {
        console.log('⚠️ E-posta gönderilemedi, ancak sipariş kaydedildi')
      }
    } catch (emailError) {
      console.error('E-posta gönderme hatası:', emailError)
      // E-posta hatası siparişi etkilemez
    }

    // Sepeti temizle
    localStorage.removeItem('cart')
    localStorage.removeItem('checkoutItems')

    alert('Siparişiniz alındı! Onay e-postası gönderildi. Havale yaptıktan sonra dekontu admin ile paylaşın.')
    router.push('/siparis-basarili')
  }

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header onCartClick={() => {}} cartItemCount={0} />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sepetiniz Boş</h2>
            <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Alışverişe Başla
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // Havale bilgileri gösteriliyorsa
  if (showBankInfo) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header onCartClick={() => {}} cartItemCount={0} />
        
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Havale Bilgileri</h1>
              <p className="text-gray-600">Aşağıdaki hesap bilgilerine havale yapabilirsiniz</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">Banka Hesap Bilgileri</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Banka:</span>
                  <span className="text-gray-900">{bankTransferInfo.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Hesap Sahibi:</span>
                  <span className="text-gray-900">{bankTransferInfo.accountName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">IBAN:</span>
                  <span className="text-gray-900 font-mono">{bankTransferInfo.iban}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">SWIFT:</span>
                  <span className="text-gray-900">{bankTransferInfo.swift}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Tutar:</span>
                  <span className="text-blue-600 font-bold">₺{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Referans:</span>
                  <span className="text-gray-900 font-mono">ORD-{Date.now()}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Önemli Bilgiler</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Havale yaparken referans numarasını açıklama kısmına yazın</li>
                <li>• Ödeme yaptıktan sonra dekontu admin ile paylaşın</li>
                <li>• Dekont onaylandıktan sonra siparişiniz hazırlanacak</li>
                <li>• Sipariş durumunu "Siparişlerim" sayfasından takip edebilirsiniz</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleBankTransferSubmit}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Siparişi Onayla
              </button>
              <button
                onClick={() => setShowBankInfo(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Geri Dön
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header onCartClick={() => {}} cartItemCount={0} />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ödeme</h1>
          <p className="text-gray-600">Siparişinizi tamamlamak için bilgilerinizi girin</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Teslimat Bilgileri</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.firstName}
                      onChange={(e) => handleShippingChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Soyad</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.lastName}
                      onChange={(e) => handleShippingChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                    <input
                      type="email"
                      required
                      value={shippingInfo.email}
                      onChange={(e) => handleShippingChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                    <input
                      type="tel"
                      required
                      value={shippingInfo.phone}
                      onChange={(e) => handleShippingChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
                    <textarea
                      required
                      rows={3}
                      value={shippingInfo.address}
                      onChange={(e) => handleShippingChange('address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Şehir</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.city}
                      onChange={(e) => handleShippingChange('city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Posta Kodu</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.postalCode}
                      onChange={(e) => handleShippingChange('postalCode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vergi Kimlik Numarası <span className="text-gray-400">(Opsiyonel)</span>
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.identityNumber || ''}
                      onChange={(e) => handleShippingChange('identityNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Varsa vergi kimlik numaranızı girin"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Ödeme Yöntemi</h2>
                
                {/* Ödeme Sistemi Seçenekleri */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {paymentSystems.map((system) => {
                    const isComingSoon = system.id === 'stripe' || system.id === 'paytr' || system.id === 'shopier' || system.id === 'bkm-express'
                    
                    return (
                      <div
                        key={system.id}
                        className={`p-4 border rounded-lg transition-all ${
                          isComingSoon 
                            ? 'border-gray-300 bg-gray-100 cursor-not-allowed opacity-60'
                            : paymentMethod === system.id
                              ? 'border-blue-500 bg-blue-50 cursor-pointer'
                              : 'border-gray-200 hover:border-blue-300 cursor-pointer'
                        }`}
                        onClick={() => !isComingSoon && setPaymentMethod(system.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{system.name}</h3>
                          {isComingSoon ? (
                            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Çok Yakında</span>
                          ) : (
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={system.id}
                              checked={paymentMethod === system.id}
                              onChange={() => setPaymentMethod(system.id)}
                              className="text-blue-600 focus:ring-blue-500"
                            />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{system.description}</p>
                        <div className="text-xs text-gray-500 space-y-1">
                          <div>Komisyon: {system.commission}</div>
                          <div>Kurulum: {system.setupTime}</div>
                          {isComingSoon ? (
                            <div className="text-orange-600 font-medium">Yakında aktif olacak</div>
                          ) : system.setupRequired && (
                            <div className="text-orange-600">Belge gerekli</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Kripto Para Seçimi */}
                {paymentMethod === 'crypto' && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Kripto Para Türü</h4>
                    <div className="flex gap-2">
                      {['BTC', 'ETH', 'USDT'].map((crypto) => (
                        <button
                          key={crypto}
                          type="button"
                          onClick={() => setSelectedCrypto(crypto)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedCrypto === crypto
                              ? 'bg-blue-500 text-white'
                              : 'bg-white border border-gray-200 text-gray-700 hover:bg-blue-50'
                          }`}
                        >
                          {crypto}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Güvenlik Bilgileri */}
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-green-800">SSL Güvenlik Sertifikası</span>
                  </div>
                  <p className="text-xs text-green-700 mt-1">
                    Tüm ödeme işlemleriniz 256-bit SSL şifreleme ile korunmaktadır.
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        İşleniyor...
                      </>
                    ) : (
                      'Siparişi Tamamla'
                    )}
                  </button>
                  <Link
                    href="/"
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors text-center"
                  >
                    Alışverişe Dön
                  </Link>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Sipariş Özeti</h2>
              
              {/* Cart Items */}
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {item.color} • {item.size} • {item.quantity} adet
                      </p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      ₺{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ara Toplam</span>
                  <span>₺{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Kargo</span>
                  <span>{shippingCost === 0 ? 'Ücretsiz' : `₺${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
                  <span>Toplam</span>
                  <span className="text-blue-600">₺{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    İşleniyor...
                  </>
                ) : (
                  'Siparişi Tamamla'
                )}
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Siparişinizi tamamlayarak{' '}
                <Link href="/kosullar" className="text-blue-600 hover:underline">
                  kullanım şartlarını
                </Link>{' '}
                kabul etmiş olursunuz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 