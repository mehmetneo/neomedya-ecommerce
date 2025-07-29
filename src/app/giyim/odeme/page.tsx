'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CreditCard, Building2, AlertCircle, Clock, Shield, Truck, RotateCcw, CheckCircle } from 'lucide-react'

const GiyimOdeme = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    bankName: '',
    accountName: '',
    iban: ''
  })

  const orderSummary = [
    { name: "Nike Air Max 270", price: 1299, quantity: 1, size: "42" },
    { name: "Levi's 501 Jeans", price: 599, quantity: 2, size: "32" },
    { name: "Zara Basic T-Shirt", price: 199, quantity: 1, size: "L" }
  ]

  const subtotal = orderSummary.reduce((total, item) => total + (item.price * item.quantity), 0)
  const shipping = 0 // Ücretsiz kargo
  const total = subtotal + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setOrderCompleted(true)
    }, 3000)
  }

  if (orderCompleted) {
    return (
      <main className="min-h-screen bg-gray-50">
        {/* Site Selection Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">NEOMEDYA E-TİCARET PLATFORMLARI</h2>
                <p className="text-sm opacity-90">Farklı temalar ve özellikler</p>
              </div>
              <div className="flex gap-4 mt-4 md:mt-0">
                <Link href="/ev" className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors">
                  NEOMEDYA EV
                </Link>
                <Link href="/tech" className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  NEOMEDYA TECH
                </Link>
                <Link href="/giyim" className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  NEOMEDYA GİYİM
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Siparişiniz Tamamlandı!</h1>
            <p className="text-gray-600 mb-8">
              Siparişiniz başarıyla alındı. Sipariş numaranız: <span className="font-semibold text-purple-600">#NEOMEDYA-2024-001</span>
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Sipariş Detayları</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Toplam Tutar:</span>
                  <span className="font-semibold">{total.toLocaleString()} TL</span>
                </div>
                <div className="flex justify-between">
                  <span>Ödeme Yöntemi:</span>
                  <span className="font-semibold">
                    {paymentMethod === 'credit-card' ? 'Kredi Kartı' : 
                     paymentMethod === 'bank-transfer' ? 'Havale/EFT' : 'Kapıda Ödeme'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Teslimat Adresi:</span>
                  <span className="font-semibold">{formData.address}, {formData.city}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/giyim"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Alışverişe Devam Et
              </Link>
              <Link
                href="/giyim/profil"
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
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
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">NEOMEDYA E-TİCARET PLATFORMLARI</h2>
              <p className="text-sm opacity-90">Farklı temalar ve özellikler</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/ev" className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors">
                NEOMEDYA EV
              </Link>
              <Link href="/tech" className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                NEOMEDYA TECH
              </Link>
              <Link href="/giyim" className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                NEOMEDYA GİYİM
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/giyim/sepet" className="text-purple-600 hover:text-purple-700">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Ödeme</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/giyim" className="p-2 text-gray-700 hover:text-purple-600 transition-colors">🏠</Link>
              <Link href="/giyim/profil" className="p-2 text-gray-700 hover:text-purple-600 transition-colors">👤</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Delivery Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Teslimat Bilgileri</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ad * <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Soyad * <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta * <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon * <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adres * <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Şehir * <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      İlçe * <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Posta Kodu
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Ödeme Yöntemi</h2>
                
                <div className="space-y-4">
                  {/* Credit Card */}
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-purple-500">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit-card"
                      checked={paymentMethod === 'credit-card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Kredi Kartı</span>
                    </div>
                  </label>

                  {paymentMethod === 'credit-card' && (
                    <div className="ml-8 p-4 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Son Kullanma Tarihi *</label>
                          <input
                            type="text"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                          <input
                            type="text"
                            name="cardCvv"
                            value={formData.cardCvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            maxLength={4}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bank Transfer */}
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-purple-500">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank-transfer"
                      checked={paymentMethod === 'bank-transfer'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Havale/EFT</span>
                    </div>
                  </label>

                  {paymentMethod === 'bank-transfer' && (
                    <div className="ml-8 p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Banka Adı *</label>
                          <input
                            type="text"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Hesap Sahibi *</label>
                          <input
                            type="text"
                            name="accountName"
                            value={formData.accountName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">IBAN *</label>
                          <input
                            type="text"
                            name="iban"
                            value={formData.iban}
                            onChange={handleInputChange}
                            placeholder="TR00 0000 0000 0000 0000 0000 00"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cash on Delivery */}
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-purple-500">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash-on-delivery"
                      checked={paymentMethod === 'cash-on-delivery'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div className="flex items-center gap-3">
                      <Truck className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Kapıda Ödeme</span>
                    </div>
                  </label>

                  {/* PayTR (Coming Soon) */}
                  <div className="flex items-center p-4 border border-gray-200 rounded-lg opacity-50 cursor-not-allowed">
                    <input
                      type="radio"
                      disabled
                      className="mr-3"
                    />
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span className="font-medium text-gray-400">PayTR (Yakında açılacak)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Message */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-blue-800 font-medium">SSL Güvenlik Sertifikası</span>
                </div>
                <p className="text-sm text-blue-700 mt-1">
                  Tüm ödeme işlemleriniz 256-bit SSL şifreleme ile korunmaktadır.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
                  isProcessing
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {isProcessing ? 'İşleniyor...' : `${total.toLocaleString()} TL Öde`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Sipariş Özeti</h2>
              
              <div className="space-y-4 mb-6">
                {orderSummary.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">Beden: {item.size} • Adet: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-gray-900">{(item.price * item.quantity).toLocaleString()} TL</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ara Toplam</span>
                  <span className="font-medium">{subtotal.toLocaleString()} TL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kargo</span>
                  <span className="font-medium text-green-600">Ücretsiz</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Toplam</span>
                    <span>{total.toLocaleString()} TL</span>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-green-600" />
                  <span>Ücretsiz kargo</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-green-600" />
                  <span>30 gün iade garantisi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Güvenli ödeme</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default GiyimOdeme 