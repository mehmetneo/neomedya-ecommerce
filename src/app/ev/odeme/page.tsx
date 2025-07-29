'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CreditCard, Building2, Truck, Lock, CheckCircle, AlertCircle, Clock } from 'lucide-react'

const Odeme = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  })

  const orderSummary = {
    subtotal: 12500,
    shipping: 0,
    tax: 2250,
    total: 14750,
    items: [
      { name: "Modern Koltuk Takımı", price: 8500, quantity: 1 },
      { name: "LED Aydınlatma Seti", price: 4000, quantity: 1 }
    ]
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setOrderComplete(true)
    }, 3000)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  if (orderComplete) {
    return (
      <main className="min-h-screen bg-gray-50">
        {/* Site Selection Banner */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">NEOMEDYA E-TİCARET PLATFORMLARI</h2>
                <p className="text-sm opacity-90">Farklı temalar ve özellikler</p>
              </div>
              <div className="flex gap-4 mt-4 md:mt-0">
                <Link href="/ev" className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  NEOMEDYA EV
                </Link>
                <Link href="/tech" className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  NEOMEDYA TECH
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Siparişiniz Başarıyla Tamamlandı!</h1>
            <p className="text-gray-600 mb-6">
              Sipariş numaranız: <span className="font-semibold text-orange-600">EV-2024-001</span>
            </p>
            <p className="text-gray-600 mb-8">
              Siparişiniz hazırlandığında size e-posta ile bilgilendirme yapılacaktır.
            </p>
            <div className="space-y-4">
              <Link 
                href="/ev" 
                className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors block"
              >
                Alışverişe Devam Et
              </Link>
              <Link 
                href="/ev/profil" 
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors block"
              >
                Siparişlerimi Görüntüle
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Site Selection Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">NEOMEDYA E-TİCARET PLATFORMLARI</h2>
              <p className="text-sm opacity-90">Farklı temalar ve özellikler</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/ev" className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                NEOMEDYA EV
              </Link>
              <Link href="/tech" className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                NEOMEDYA TECH
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/ev/sepet" className="text-orange-600 hover:text-orange-700">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Ödeme</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/ev/sepet" className="p-2 text-gray-700 hover:text-orange-600 transition-colors">🛒</Link>
              <Link href="/ev/profil" className="p-2 text-gray-700 hover:text-orange-600 transition-colors">👤</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Payment Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Teslimat Bilgileri</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ad *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Soyad *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">E-posta *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefon *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adres *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Şehir *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">İlçe *</label>
                    <input
                      type="text"
                      name="district"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Posta Kodu</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Ödeme Yöntemi</h3>
                  
                  <div className="space-y-4">
                    {/* Credit Card */}
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit-card"
                        checked={paymentMethod === 'credit-card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-orange-600 focus:ring-orange-500"
                      />
                      <CreditCard className="h-5 w-5 text-orange-600" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Kredi Kartı</div>
                        <div className="text-sm text-gray-600">Visa, MasterCard, American Express</div>
                      </div>
                    </label>

                    {/* Bank Transfer */}
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank-transfer"
                        checked={paymentMethod === 'bank-transfer'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-orange-600 focus:ring-orange-500"
                      />
                      <Building2 className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Havale / EFT</div>
                        <div className="text-sm text-gray-600">Banka hesabına transfer</div>
                      </div>
                    </label>

                    {/* Cash on Delivery */}
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash-on-delivery"
                        checked={paymentMethod === 'cash-on-delivery'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-orange-600 focus:ring-orange-500"
                      />
                      <Truck className="h-5 w-5 text-orange-600" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Kapıda Ödeme</div>
                        <div className="text-sm text-gray-600">Teslimat sırasında ödeme</div>
                      </div>
                    </label>

                    {/* PayTR (Disabled) */}
                    <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50 opacity-60">
                      <input
                        type="radio"
                        disabled
                        className="text-gray-400"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-500">PayTR</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Yakında açılacak
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Credit Card Details */}
                  {paymentMethod === 'credit-card' && (
                    <div className="mt-6 p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-4">Kart Bilgileri</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Kart Numarası *</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Kart Üzerindeki İsim *</label>
                          <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ay</label>
                            <select
                              name="expiryMonth"
                              value={formData.expiryMonth}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                              <option value="">Ay</option>
                              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                <option key={month} value={month.toString().padStart(2, '0')}>
                                  {month.toString().padStart(2, '0')}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Yıl</label>
                            <select
                              name="expiryYear"
                              value={formData.expiryYear}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                              <option value="">Yıl</option>
                              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                                <option key={year} value={year}>{year}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                            <input
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              maxLength={4}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bank Transfer Details */}
                  {paymentMethod === 'bank-transfer' && (
                    <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-blue-50">
                      <h4 className="font-medium text-gray-900 mb-4">Banka Hesap Bilgileri</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Banka:</span>
                          <span className="font-medium">Neomedya Bank</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">IBAN:</span>
                          <span className="font-medium">TR12 3456 7890 1234 5678 9012 34</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Hesap Sahibi:</span>
                          <span className="font-medium">NEOMEDYA EV DEKORASYON A.Ş.</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tutar:</span>
                          <span className="font-medium text-orange-600">{orderSummary.total.toLocaleString()} TL</span>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center gap-2 text-yellow-800">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm">Havale yaptıktan sonra dekontunuzu info@neomedya.com adresine gönderin.</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cash on Delivery Info */}
                  {paymentMethod === 'cash-on-delivery' && (
                    <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-orange-50">
                      <h4 className="font-medium text-gray-900 mb-4">Kapıda Ödeme</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-orange-800">
                          <Truck className="h-4 w-4" />
                          <span>Kargo ücreti: 15 TL</span>
                        </div>
                        <div className="flex items-center gap-2 text-orange-800">
                          <Lock className="h-4 w-4" />
                          <span>Güvenli teslimat</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Lock className="h-4 w-4" />
                  <span>Ödeme bilgileriniz SSL ile şifrelenerek korunmaktadır.</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                    isProcessing
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-orange-600 text-white hover:bg-orange-700'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      İşleniyor...
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5" />
                      Güvenli Ödeme Yap
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Sipariş Özeti</h2>
              
              <div className="space-y-4 mb-6">
                {orderSummary.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-600">Adet: {item.quantity}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{(item.price * item.quantity).toLocaleString()} TL</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ara Toplam</span>
                  <span className="font-semibold">{orderSummary.subtotal.toLocaleString()} TL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kargo</span>
                  <span className="font-semibold">
                    {orderSummary.shipping === 0 ? 'Ücretsiz' : `${orderSummary.shipping} TL`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">KDV (%18)</span>
                  <span className="font-semibold">{orderSummary.tax.toLocaleString()} TL</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Toplam</span>
                    <span className="text-lg font-bold text-gray-900">{orderSummary.total.toLocaleString()} TL</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-green-600" />
                  <span>256-bit SSL güvenlik</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-orange-600" />
                  <span>1-3 iş günü teslimat</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>14 gün iade garantisi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Odeme 