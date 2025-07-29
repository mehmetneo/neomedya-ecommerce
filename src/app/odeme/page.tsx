'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CreditCard, ShoppingCart, Heart, Eye, Star, ArrowLeft, Upload, CheckCircle, AlertCircle } from 'lucide-react'

const Odeme = () => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [showReceiptUpload, setShowReceiptUpload] = useState(false)
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const cartItems = [
    { id: 1, name: "Modern Koltuk Takımı", price: 8999, image: "🛋️", quantity: 1, discount: 15 },
    { id: 2, name: "LED Aydınlatma Seti", price: 1299, image: "💡", quantity: 2, discount: 30 },
    { id: 3, name: "Mutfak Seti (6'lı)", price: 3499, image: "🍽️", quantity: 1, discount: 25 }
  ]

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const discountedPrice = item.price * (1 - item.discount / 100)
      return total + (discountedPrice * item.quantity)
    }, 0)
  }

  const calculateShipping = () => {
    return calculateSubtotal() > 1000 ? 0 : 99
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping()
  }

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method)
    if (method === 'havale') {
      setShowReceiptUpload(true)
    } else {
      setShowReceiptUpload(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setReceiptFile(file)
    }
  }

  const handlePlaceOrder = () => {
    if (paymentMethod === 'havale' && !receiptFile) {
      alert('Lütfen havale dekontunu yükleyin!')
      return
    }
    setOrderPlaced(true)
  }

  const handleAddToCart = (productId: number) => {
    setCartCount(prev => prev + 1)
  }

  const handleAddToWishlist = (productId: number) => {
    setWishlistCount(prev => prev + 1)
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                  Ana Sayfa
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Sipariş Tamamlandı</h1>
              </div>
            </div>
          </div>
        </header>

        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="text-6xl mb-4">✅</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Siparişiniz Alındı!</h1>
              <p className="text-gray-600 mb-6">
                Sipariş numaranız: <span className="font-bold text-orange-600">#ORD-{Date.now()}</span>
              </p>
              <p className="text-gray-600 mb-8">
                Siparişiniz başarıyla oluşturuldu. Sipariş durumunuzu profil sayfanızdan takip edebilirsiniz.
              </p>
              <div className="flex gap-4 justify-center">
                <Link 
                  href="/"
                  className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                >
                  Alışverişe Devam Et
                </Link>
                <Link 
                  href="/profil"
                  className="border border-orange-600 text-orange-600 px-6 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors"
                >
                  Siparişlerimi Gör
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/sepet" className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                Sepete Dön
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Ödeme</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/arama" className="p-2 text-gray-700 hover:text-orange-600 transition-colors relative">
                🔍
              </Link>
              <Link href="/sepet" className="p-2 text-gray-700 hover:text-orange-600 transition-colors relative">
                🛒
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button className="p-2 text-gray-700 hover:text-orange-600 transition-colors relative">
                ❤️
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <Link href="/profil" className="p-2 text-gray-700 hover:text-orange-600 transition-colors">👤</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Payment Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">💳</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Ödeme</h1>
            <p className="text-xl text-gray-600">Güvenli ödeme seçenekleri</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Methods */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Ödeme Yöntemi Seçin</h2>
                
                <div className="space-y-4">
                  {/* Kapıda Ödeme */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="kapida"
                        checked={paymentMethod === 'kapida'}
                        onChange={() => handlePaymentMethodChange('kapida')}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">Kapıda Ödeme</h3>
                            <p className="text-sm text-gray-600">Kargo tesliminde nakit veya kart ile ödeme</p>
                          </div>
                          <div className="text-2xl">💵</div>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Havale */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="havale"
                        checked={paymentMethod === 'havale'}
                        onChange={() => handlePaymentMethodChange('havale')}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">Havale / EFT</h3>
                            <p className="text-sm text-gray-600">Banka hesabına havale ile ödeme</p>
                          </div>
                          <div className="text-2xl">🏦</div>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* PayTR */}
                  <div className="border border-gray-200 rounded-lg p-4 opacity-50">
                    <div className="flex items-center cursor-not-allowed">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paytr"
                        disabled
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">PayTR (Yakında)</h3>
                            <p className="text-sm text-gray-600">Güvenli online ödeme sistemi</p>
                          </div>
                          <div className="text-2xl">🔒</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Havale Bilgileri */}
                {paymentMethod === 'havale' && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">Havale Bilgileri</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Banka:</span>
                        <span className="font-medium">Garanti BBVA</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hesap Sahibi:</span>
                        <span className="font-medium">HomeDecor Ltd. Şti.</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">IBAN:</span>
                        <span className="font-medium font-mono">TR12 0006 2000 0000 0000 0000 00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tutar:</span>
                        <span className="font-medium">₺{calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>
                    
                    {/* Dekont Yükleme */}
                    {showReceiptUpload && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Havale Dekontu Yükleyin *
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="receipt-upload"
                          />
                          <label htmlFor="receipt-upload" className="cursor-pointer">
                            <span className="text-orange-600 hover:text-orange-700 font-medium">
                              Dekont Seç
                            </span>
                            <span className="text-gray-500"> veya sürükleyip bırakın</span>
                          </label>
                          {receiptFile && (
                            <div className="mt-2 text-sm text-green-600 flex items-center justify-center">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              {receiptFile.name} yüklendi
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Kapıda Ödeme Bilgileri */}
                {paymentMethod === 'kapida' && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <h3 className="font-semibold text-gray-900">Kapıda Ödeme</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Siparişiniz kargoya verildikten sonra kapıda ödeme seçeneği ile ödeyebilirsiniz.
                      Kargo ücreti ₺{calculateShipping()} olarak hesaplanmıştır.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Sipariş Özeti</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ara Toplam</span>
                    <span className="font-medium">₺{calculateSubtotal().toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kargo</span>
                    <span className="font-medium">
                      {calculateShipping() === 0 ? 'Ücretsiz' : `₺${calculateShipping()}`}
                    </span>
                  </div>
                  
                  {calculateShipping() > 0 && (
                    <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                      ₺{1000 - calculateSubtotal()} daha alışveriş yapın, kargo ücretsiz!
                    </div>
                  )}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Toplam</span>
                      <span>₺{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={handlePlaceOrder}
                  disabled={!paymentMethod || (paymentMethod === 'havale' && !receiptFile)}
                  className={`w-full py-4 rounded-lg font-medium transition-colors mt-6 ${
                    !paymentMethod || (paymentMethod === 'havale' && !receiptFile)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-orange-600 text-white hover:bg-orange-700'
                  }`}
                >
                  {paymentMethod === 'havale' && !receiptFile 
                    ? 'Dekont Yükleyin' 
                    : 'Siparişi Tamamla'
                  }
                </button>
                
                <div className="mt-4 text-center">
                  <Link href="/sepet" className="text-orange-600 hover:text-orange-700 text-sm">
                    Sepete Dön
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">NEOMEDYA E TİCARET PLATFORMLARI</h3>
            <p className="text-gray-400 mb-6">Modern e-ticaret platformları ve ev dekorasyon ürünleri</p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Hakkımızda</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">İletişim</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Yardım</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default Odeme 