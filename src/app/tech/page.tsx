'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Smartphone, Search, ShoppingCart, Heart, Star, Filter, Grid, List, ArrowLeft, User, ShoppingBag, Percent, Clock, Zap } from 'lucide-react'

const Tech = () => {
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const featuredProducts = [
    { id: 1, name: "iPhone 15 Pro", price: 89999, originalPrice: 99999, image: "📱", rating: 4.9, reviews: 234, brand: "Apple", discount: 10, inStock: true },
    { id: 2, name: "MacBook Air M2", price: 129999, originalPrice: 129999, image: "💻", rating: 4.8, reviews: 156, brand: "Apple", discount: 0, inStock: true },
    { id: 3, name: "Samsung Galaxy S24", price: 69999, originalPrice: 79999, image: "📱", rating: 4.7, reviews: 189, brand: "Samsung", discount: 12, inStock: true },
    { id: 4, name: "AirPods Pro", price: 8999, originalPrice: 8999, image: "🎧", rating: 4.6, reviews: 345, brand: "Apple", discount: 0, inStock: true },
    { id: 5, name: "iPad Air", price: 39999, originalPrice: 44999, image: "📱", rating: 4.8, reviews: 123, brand: "Apple", discount: 11, inStock: true },
    { id: 6, name: "Sony WH-1000XM5", price: 15999, originalPrice: 17999, image: "🎧", rating: 4.9, reviews: 89, brand: "Sony", discount: 11, inStock: true }
  ]

  const categories = [
    { name: "Telefonlar", icon: "📱", count: 450, href: "/tech/telefonlar" },
    { name: "Bilgisayarlar", icon: "💻", count: 320, href: "/tech/bilgisayarlar" },
    { name: "Aksesuarlar", icon: "🎧", count: 280, href: "/tech/aksesuarlar" },
    { name: "Kamera", icon: "📷", count: 190, href: "/tech/kamera" },
    { name: "Gaming", icon: "🎮", count: 340, href: "/tech/gaming" },
    { name: "Akıllı Ev", icon: "🏠", count: 210, href: "/tech/akilli-ev" }
  ]

  const addToCart = (product: any) => {
    setCartCount(prev => prev + 1)
    alert(`${product.name} sepete eklendi!`)
  }

  const addToWishlist = (product: any) => {
    setWishlistCount(prev => prev + 1)
    alert(`${product.name} favorilere eklendi!`)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Colorful Gradient Header */}
      <section className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white pt-20 sm:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 mb-6">
              <span className="text-cyan-300">💻</span>
              <span className="text-sm font-medium">Teknoloji Platformu</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
              Teknoloji & Elektronik
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              En son teknoloji ürünleri ve elektronik cihazlar. 
              Apple, Samsung, Sony ve daha fazlası.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tech/telefonlar" className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg">
                Telefonlar
              </Link>
              <Link href="/tech/bilgisayarlar" className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg">
                Bilgisayarlar
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Categories */}
        <section className="mb-8 sm:mb-12">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Kategoriler</h2>
            <p className="text-base sm:text-lg text-gray-600">Teknoloji dünyasının en iyi ürünleri</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="bg-white rounded-lg shadow-md p-3 sm:p-4 text-center hover:shadow-lg transition-all"
              >
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{category.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">{category.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{category.count.toLocaleString()} ürün</p>
                <div className="mt-2">
                  <span className="inline-block bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-semibold">
                    Keşfet →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Flash Sale Banner */}
        <section className="mb-8 sm:mb-12">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg p-4 sm:p-6 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">⚡ FLASH SALE</h3>
                <p className="text-base sm:text-lg opacity-90 mb-3">Teknoloji ürünlerinde %30'a varan indirimler!</p>
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                  <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
                    <span className="text-sm font-semibold">⏰ 23:59:45</span>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
                    <span className="text-sm font-semibold">🔥 %30 İndirim</span>
                  </div>
                </div>
              </div>
              <Link href="/tech/indirim" className="bg-white text-purple-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                İndirimleri Gör
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Öne Çıkan Ürünler</h2>
            <p className="text-base sm:text-lg text-gray-600">En popüler teknoloji ürünleri</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
                <div className="p-4 sm:p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl sm:text-5xl mb-3">{product.image}</div>
                    <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                    <div className="flex items-center justify-center gap-1 mb-3">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm text-gray-600">{product.rating}</span>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-lg sm:text-xl font-bold text-gray-900">₺{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through ml-2">₺{product.originalPrice}</span>
                      )}
                    </div>
                    {product.discount > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        %{product.discount} İndirim
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      🛒 Sepete Ekle
                    </button>
                    <button
                      onClick={() => addToWishlist(product)}
                      className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      ❤️
                    </button>
                  </div>
                  
                  {!product.inStock && (
                    <div className="mt-2 text-center">
                      <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
                        Stokta Yok
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Tech 