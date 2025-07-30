'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Home, Search, ShoppingCart, Heart, Star, Filter, Grid, List, ArrowLeft, User, ShoppingBag, Percent, Clock, Zap } from 'lucide-react'

const Ev = () => {
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const featuredProducts = [
    { id: 1, name: "Modern Koltuk Takımı", price: 8999, originalPrice: 11999, image: "🛋️", rating: 4.8, reviews: 156, brand: "IKEA", discount: 25, inStock: true },
    { id: 2, name: "LED TV 55\"", price: 12999, originalPrice: 12999, image: "📺", rating: 4.9, reviews: 89, brand: "Samsung", discount: 0, inStock: true },
    { id: 3, name: "Yemek Masası", price: 2999, originalPrice: 3999, image: "🪑", rating: 4.7, reviews: 234, brand: "IKEA", discount: 25, inStock: true },
    { id: 4, name: "Halı 2x3m", price: 899, originalPrice: 899, image: "🟫", rating: 4.5, reviews: 67, brand: "Zara Home", discount: 0, inStock: true },
    { id: 5, name: "Lambader", price: 599, originalPrice: 799, image: "💡", rating: 4.6, reviews: 123, brand: "IKEA", discount: 25, inStock: true },
    { id: 6, name: "Dekoratif Yastık", price: 299, originalPrice: 399, image: "🛏️", rating: 4.4, reviews: 89, brand: "H&M Home", discount: 25, inStock: true }
  ]

  const categories = [
    { name: "Oturma Odası", icon: "🛋️", count: 450, href: "/ev/oturma-odasi" },
    { name: "Yatak Odası", icon: "🛏️", count: 320, href: "/ev/yatak-odasi" },
    { name: "Mutfak", icon: "🍳", count: 280, href: "/ev/mutfak" },
    { name: "Banyo", icon: "🚿", count: 190, href: "/ev/banyo" },
    { name: "Aydınlatma", icon: "💡", count: 340, href: "/ev/aydinlatma" },
    { name: "Bahçe", icon: "🌱", count: 210, href: "/ev/bahce" }
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
      <section className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white pt-20 sm:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 mb-6">
              <span className="text-yellow-300">🏠</span>
              <span className="text-sm font-medium">Ev & Yaşam Platformu</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
              Ev & Dekorasyon
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Evinizi güzelleştiren mobilyalar ve dekorasyon ürünleri. 
              Modern tasarım, uygun fiyatlar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ev/oturma-odasi" className="bg-white text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg">
                Oturma Odası
              </Link>
              <Link href="/ev/mutfak" className="bg-white text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg">
                Mutfak
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
            <p className="text-base sm:text-lg text-gray-600">Eviniz için ihtiyacınız olan her şey</p>
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
                  <span className="inline-block bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-semibold">
                    Keşfet →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Flash Sale Banner */}
        <section className="mb-8 sm:mb-12">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg p-4 sm:p-6 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">⚡ FLASH SALE</h3>
                <p className="text-base sm:text-lg opacity-90 mb-3">Mobilya ve dekorasyonda %40'a varan indirimler!</p>
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                  <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
                    <span className="text-sm font-semibold">⏰ 23:59:45</span>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
                    <span className="text-sm font-semibold">🔥 %40 İndirim</span>
                  </div>
                </div>
              </div>
              <Link href="/ev/indirim" className="bg-white text-red-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                İndirimleri Gör
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Öne Çıkan Ürünler</h2>
            <p className="text-base sm:text-lg text-gray-600">En popüler ev ve yaşam ürünleri</p>
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
                      className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
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

export default Ev 