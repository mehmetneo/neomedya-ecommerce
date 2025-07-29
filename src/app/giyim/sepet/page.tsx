'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, Heart, Star } from 'lucide-react'

const GiyimSepet = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Nike Air Max 270",
      price: 1299,
      originalPrice: 1599,
      image: "👟",
      brand: "Nike",
      size: "42",
      quantity: 1,
      inStock: true
    },
    {
      id: 2,
      name: "Levi's 501 Jeans",
      price: 599,
      originalPrice: 799,
      image: "👖",
      brand: "Levi's",
      size: "32",
      quantity: 2,
      inStock: true
    },
    {
      id: 3,
      name: "Zara Basic T-Shirt",
      price: 199,
      originalPrice: 199,
      image: "👕",
      brand: "Zara",
      size: "L",
      quantity: 1,
      inStock: true
    }
  ])

  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 4,
      name: "Adidas Ultraboost 22",
      price: 1899,
      originalPrice: 1899,
      image: "👟",
      brand: "Adidas",
      size: "41",
      inStock: true
    },
    {
      id: 5,
      name: "H&M Hoodie",
      price: 399,
      originalPrice: 499,
      image: "🧥",
      brand: "H&M",
      size: "M",
      inStock: true
    }
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const moveToCart = (item: any) => {
    setCartItems(prev => [...prev, { ...item, quantity: 1 }])
    setWishlistItems(prev => prev.filter(wishItem => wishItem.id !== item.id))
  }

  const removeFromWishlist = (id: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id))
  }

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  const originalTotal = cartItems.reduce((total, item) => total + (item.originalPrice * item.quantity), 0)
  const savings = originalTotal - cartTotal

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
              <Link href="/giyim" className="text-purple-600 hover:text-purple-700">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Sepetim</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/giyim" className="p-2 text-gray-700 hover:text-purple-600 transition-colors">🏠</Link>
              <Link href="/giyim/profil" className="p-2 text-gray-700 hover:text-purple-600 transition-colors">👤</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <ShoppingBag className="h-6 w-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">Sepetim ({cartItems.length} ürün)</h2>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Sepetiniz boş</h3>
                  <p className="text-gray-600 mb-6">Alışverişe başlamak için ürünlerimize göz atın</p>
                  <Link
                    href="/giyim"
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Alışverişe Başla
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center w-20 h-20 flex-shrink-0">
                        <span className="text-2xl">{item.image}</span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.brand} • Beden: {item.size}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-600">4.8 (156)</span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            {item.price < item.originalPrice ? (
                              <div>
                                <span className="font-bold text-red-600">{item.price.toLocaleString()} TL</span>
                                <span className="text-sm text-gray-400 line-through ml-2">{item.originalPrice.toLocaleString()} TL</span>
                              </div>
                            ) : (
                              <span className="font-bold text-gray-900">{item.price.toLocaleString()} TL</span>
                            )}
                            <p className="text-xs text-gray-500">Birim fiyat</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <Heart className="h-6 w-6 text-pink-600" />
                <h2 className="text-xl font-bold text-gray-900">Favorilerim ({wishlistItems.length} ürün)</h2>
              </div>

              {wishlistItems.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Henüz favori ürününüz yok</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center w-20 h-20 flex-shrink-0">
                        <span className="text-2xl">{item.image}</span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.brand} • Beden: {item.size}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-600">4.7 (89)</span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="text-sm text-gray-600">
                            {item.price < item.originalPrice ? (
                              <div>
                                <span className="font-bold text-red-600">{item.price.toLocaleString()} TL</span>
                                <span className="text-gray-400 line-through ml-2">{item.originalPrice.toLocaleString()} TL</span>
                              </div>
                            ) : (
                              <span className="font-bold text-gray-900">{item.price.toLocaleString()} TL</span>
                            )}
                          </div>
                          
                          <button
                            onClick={() => moveToCart(item)}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                          >
                            Sepete Ekle
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Sipariş Özeti</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ara Toplam ({cartItems.length} ürün)</span>
                  <span className="font-medium">{cartTotal.toLocaleString()} TL</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>İndirim</span>
                    <span>-{savings.toLocaleString()} TL</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Kargo</span>
                  <span className="font-medium text-green-600">Ücretsiz</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Toplam</span>
                    <span>{cartTotal.toLocaleString()} TL</span>
                  </div>
                  {savings > 0 && (
                    <p className="text-sm text-green-600 mt-1">
                      {savings.toLocaleString()} TL tasarruf ettiniz!
                    </p>
                  )}
                </div>
              </div>

              <Link
                href="/giyim/odeme"
                className={`w-full py-3 px-4 rounded-lg font-semibold text-center transition-colors ${
                  cartItems.length > 0
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Ödemeye Geç
              </Link>

              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Ücretsiz kargo</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>30 gün iade garantisi</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
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

export default GiyimSepet 