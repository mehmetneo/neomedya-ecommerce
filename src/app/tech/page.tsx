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
    { id: 1, name: "iPhone 15 Pro", price: 45999, originalPrice: 49999, image: "📱", rating: 4.9, reviews: 234, brand: "Apple", discount: 8, inStock: true, category: "Telefon" },
    { id: 2, name: "MacBook Air M2", price: 32999, originalPrice: 32999, image: "💻", rating: 4.8, reviews: 156, brand: "Apple", discount: 0, inStock: true, category: "Laptop" },
    { id: 3, name: "Samsung Galaxy S24", price: 28999, originalPrice: 31999, image: "📱", rating: 4.7, reviews: 189, brand: "Samsung", discount: 9, inStock: true, category: "Telefon" },
    { id: 4, name: "AirPods Pro", price: 5999, originalPrice: 5999, image: "🎧", rating: 4.6, reviews: 89, brand: "Apple", discount: 0, inStock: true, category: "Aksesuar" },
    { id: 5, name: "Sony WH-1000XM5", price: 8999, originalPrice: 9999, image: "🎧", rating: 4.8, reviews: 123, brand: "Sony", discount: 10, inStock: true, category: "Aksesuar" },
    { id: 6, name: "iPad Air", price: 18999, originalPrice: 18999, image: "📱", rating: 4.7, reviews: 67, brand: "Apple", discount: 0, inStock: true, category: "Tablet" }
  ]

  const categories = [
    { name: "Telefonlar", icon: "📱", count: 1250, href: "/tech/telefonlar" },
    { name: "Bilgisayarlar", icon: "💻", count: 890, href: "/tech/bilgisayarlar" },
    { name: "Aksesuarlar", icon: "🎧", count: 1560, href: "/tech/aksesuarlar" },
    { name: "Kamera", icon: "📷", count: 450, href: "/tech/kamera" },
    { name: "Oyun", icon: "🎮", count: 320, href: "/tech/oyun" },
    { name: "Tablet", icon: "📱", count: 280, href: "/tech/tablet" }
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
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Teknoloji & Elektronik
            </h1>
            <p className="text-xl mb-8 opacity-90">
              En son teknoloji ürünleri ve elektronik aletler
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tech/telefonlar" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Telefonlar
              </Link>
              <Link href="/tech/bilgisayarlar" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Bilgisayarlar
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories - Moved to top and made more prominent */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kategoriler</h2>
            <p className="text-lg text-gray-600">En son teknoloji ürünlerini keşfedin</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all transform hover:scale-105 border-2 border-transparent hover:border-blue-200"
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{category.name}</h3>
                <p className="text-sm text-gray-600 font-medium">{category.count.toLocaleString()} ürün</p>
                <div className="mt-3">
                  <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                    Keşfet →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Flash Sale Banner */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl p-8 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-3">⚡ FLASH SALE</h3>
                <p className="text-xl opacity-90 mb-4">Seçili teknoloji ürünlerinde %30'a varan indirimler!</p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-6 w-6" />
                    <span className="text-lg">Son 4 saat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Percent className="h-6 w-6" />
                    <span className="text-lg">%30 İndirim</span>
                  </div>
                </div>
              </div>
              <Link
                href="/tech/indirim"
                className="bg-white text-green-500 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                İndirimleri Gör
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Öne Çıkan Ürünler</h2>
              <p className="text-gray-600">En popüler ve trend teknoloji ürünlerimizi keşfedin</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {featuredProducts.map((product) => (
              <div key={product.id} className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 ${
                viewMode === 'list' ? 'flex gap-6 p-6' : 'p-6'
              }`}>
                <div className={`relative ${viewMode === 'list' ? 'w-40 h-40 flex-shrink-0' : ''}`}>
                  {product.discount > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-sm px-3 py-1 rounded-full font-bold">
                      %{product.discount} İndirim
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute top-3 right-3 bg-gray-500 text-white text-sm px-3 py-1 rounded-full font-bold">
                      Stokta Yok
                    </div>
                  )}
                  <div className={`bg-gradient-to-br from-blue-100 to-green-100 rounded-xl flex items-center justify-center ${
                    viewMode === 'list' ? 'w-40 h-40' : 'aspect-square'
                  }`}>
                    <span className="text-6xl">{product.image}</span>
                  </div>
                </div>
                
                <div className={`flex-1 ${viewMode === 'list' ? 'flex flex-col justify-between' : 'mt-4'}`}>
                  <div>
                    <h3 className={`font-bold text-gray-900 ${viewMode === 'list' ? 'text-xl' : 'text-lg'}`}>
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">{product.brand} • {product.category}</p>
                    
                    <div className="flex items-center gap-1 mt-3">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 font-semibold">{product.rating}</span>
                      <span className="text-sm text-gray-400">({product.reviews})</span>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-3">
                      {product.discount > 0 ? (
                        <>
                          <span className={`font-bold text-red-600 ${viewMode === 'list' ? 'text-xl' : 'text-lg'}`}>
                            {product.price.toLocaleString()} TL
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            {product.originalPrice.toLocaleString()} TL
                          </span>
                        </>
                      ) : (
                        <span className={`font-bold text-gray-900 ${viewMode === 'list' ? 'text-xl' : 'text-lg'}`}>
                          {product.price.toLocaleString()} TL
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className={`flex gap-3 ${viewMode === 'list' ? 'mt-6' : 'mt-4'}`}>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                        product.inStock
                          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {product.inStock ? 'Sepete Ekle' : 'Stokta Yok'}
                    </button>
                    <button
                      onClick={() => addToWishlist(product)}
                      className="p-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors"
                    >
                      <Heart className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
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