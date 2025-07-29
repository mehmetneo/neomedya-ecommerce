'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Trash2, Plus, Minus, CreditCard, Truck, Shield } from 'lucide-react'

const Sepet = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Modern Koltuk Takımı 3+3+1", price: 12999, image: "🛋️", quantity: 1, brand: "ModernHome" },
    { id: 2, name: "LED Avize Modern", price: 1299, image: "💡", quantity: 2, brand: "LightPro" },
    { id: 3, name: "TV Ünitesi Modern", price: 3999, image: "📺", quantity: 1, brand: "ModernHome" }
  ])

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

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 500 ? 0 : 99
  const tax = subtotal * 0.18
  const total = subtotal + shipping + tax

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
              <Link href="/ev" className="text-orange-600 hover:text-orange-700">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Alışveriş Sepeti</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/ev/profil" className="p-2 text-gray-700 hover:text-orange-600 transition-colors">👤</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sepetiniz Boş</h2>
            <p className="text-gray-600 mb-8">Alışverişe başlamak için ürünlerimizi keşfedin</p>
            <Link 
              href="/ev" 
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Sepetiniz ({cartItems.length} ürün)</h2>
                
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">{item.image}</span>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.brand}</p>
                        <p className="text-lg font-bold text-gray-900 mt-2">
                          {item.price.toLocaleString()} TL
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-12 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        
                        <p className="text-sm text-gray-600">
                          Toplam: {(item.price * item.quantity).toLocaleString()} TL
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Sipariş Özeti</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ara Toplam</span>
                    <span className="font-semibold">{subtotal.toLocaleString()} TL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kargo</span>
                    <span className="font-semibold">
                      {shipping === 0 ? 'Ücretsiz' : `${shipping} TL`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">KDV (%18)</span>
                    <span className="font-semibold">{tax.toLocaleString()} TL</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-900">Toplam</span>
                      <span className="text-lg font-bold text-gray-900">{total.toLocaleString()} TL</span>
                    </div>
                  </div>
                </div>

                <Link 
                  href="/ev/odeme" 
                  className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 mb-4"
                >
                  <CreditCard className="h-5 w-5" />
                  Ödemeye Geç
                </Link>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-green-600" />
                    <span>500 TL üzeri ücretsiz kargo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span>Güvenli ödeme</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default Sepet 