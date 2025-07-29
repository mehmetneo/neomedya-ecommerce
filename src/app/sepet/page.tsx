'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart,
  Heart,
  CreditCard,
  Truck,
  Shield,
  CheckCircle
} from 'lucide-react'

interface CartItem {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  quantity: number
  brand: string
  category: string
}

const Sepet = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [couponCode, setCouponCode] = useState('')
  const [isCouponApplied, setIsCouponApplied] = useState(false)

  useEffect(() => {
    // Demo sepet verileri
    const demoCart = [
      {
        id: 1,
        name: "Nike Air Max 270",
        price: 1299,
        originalPrice: 1599,
        image: "👟",
        quantity: 1,
        brand: "Nike",
        category: "Spor Ayakkabı"
      },
      {
        id: 2,
        name: "Levi's 501 Jeans",
        price: 599,
        originalPrice: 799,
        image: "👖",
        quantity: 2,
        brand: "Levi's",
        category: "Kot Pantolon"
      },
      {
        id: 3,
        name: "Zara Basic T-Shirt",
        price: 199,
        originalPrice: 199,
        image: "👕",
        quantity: 1,
        brand: "Zara",
        category: "T-Shirt"
      }
    ]
    setCartItems(demoCart)
  }, [])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const addToWishlist = (item: CartItem) => {
    alert(`${item.name} favorilere eklendi!`)
  }

  const applyCoupon = () => {
    if (couponCode.trim()) {
      setIsCouponApplied(true)
      alert('Kupon kodu uygulandı! %10 indirim')
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discount = isCouponApplied ? subtotal * 0.1 : 0
  const shipping = subtotal > 500 ? 0 : 29.99
  const total = subtotal - discount + shipping

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sepetiniz Boş</h2>
            <p className="text-gray-600 mb-8">Alışverişe başlamak için ürünlerimize göz atın.</p>
            <Link 
              href="/giyim" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Alışverişe Başla
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Sepetim</h1>
              <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                {cartItems.length} ürün
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Panel - Ürün Listesi */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Sepetinizdeki Ürünler</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-center gap-4">
                      {/* Ürün Resmi */}
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">{item.image}</span>
                      </div>
                      
                      {/* Ürün Bilgileri */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.brand} • {item.category}</p>
                        
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 text-gray-900 font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-gray-900">
                                ₺{(item.price * item.quantity).toLocaleString()}
                              </span>
                              {item.originalPrice > item.price && (
                                <span className="text-sm text-gray-500 line-through">
                                  ₺{(item.originalPrice * item.quantity).toLocaleString()}
                                </span>
                              )}
                            </div>
                            {item.originalPrice > item.price && (
                              <span className="text-sm text-green-600">
                                %{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)} indirim
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Aksiyon Butonları */}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => addToWishlist(item)}
                          className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                          title="Favorilere Ekle"
                        >
                          <Heart className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                          title="Kaldır"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ Panel - Özet */}
          <div className="space-y-6">
            {/* Sipariş Özeti */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Sipariş Özeti</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ara Toplam</span>
                  <span className="font-medium">₺{subtotal.toLocaleString()}</span>
                </div>
                
                {isCouponApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>İndirim (%10)</span>
                    <span>-₺{discount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Kargo</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Ücretsiz' : `₺${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Toplam</span>
                    <span>₺{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Kupon Kodu */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Kupon kodu"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={applyCoupon}
                    disabled={!couponCode.trim() || isCouponApplied}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Uygula
                  </button>
                </div>
              </div>
            </div>

            {/* Ödeme Butonu */}
            <Link
              href="/odeme"
              className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <CreditCard className="h-5 w-5" />
              Ödemeye Geç
            </Link>

            {/* Güvenlik Bilgileri */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Güvenli Ödeme</h4>
                  <p className="text-sm text-blue-700">
                    SSL şifreleme ile güvenli ödeme. Kişisel bilgileriniz korunur.
                  </p>
                </div>
              </div>
            </div>

            {/* Kargo Bilgileri */}
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Ücretsiz Kargo</h4>
                  <p className="text-sm text-green-700">
                    ₺500 üzeri alışverişlerde ücretsiz kargo.
                  </p>
                </div>
              </div>
            </div>

            {/* İade Bilgileri */}
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-orange-900 mb-1">Kolay İade</h4>
                  <p className="text-sm text-orange-700">
                    14 gün içinde ücretsiz iade hakkı.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sepet 