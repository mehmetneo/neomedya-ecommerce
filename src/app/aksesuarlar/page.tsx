'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Headphones, Star, ShoppingCart, Heart, Filter, Watch, Camera } from 'lucide-react'

const Aksesuarlar = () => {
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')

  const accessories = [
    { id: 1, name: "AirPods Pro 2", price: 5999, category: "Kulaklık", brand: "Apple", image: "🎧", rating: 4.8, reviews: 234, discount: 0 },
    { id: 2, name: "Sony WH-1000XM5", price: 8999, category: "Kulaklık", brand: "Sony", image: "🎧", rating: 4.9, reviews: 156, discount: 15 },
    { id: 3, name: "Samsung Galaxy Buds2", price: 2999, category: "Kulaklık", brand: "Samsung", image: "🎧", rating: 4.6, reviews: 89, discount: 0 },
    { id: 4, name: "Apple Watch Series 9", price: 12999, category: "Saat", brand: "Apple", image: "⌚", rating: 4.7, reviews: 178, discount: 0 },
    { id: 5, name: "Samsung Galaxy Watch 6", price: 7999, category: "Saat", brand: "Samsung", image: "⌚", rating: 4.5, reviews: 92, discount: 20 },
    { id: 6, name: "Garmin Fenix 7", price: 15999, category: "Saat", brand: "Garmin", image: "⌚", rating: 4.8, reviews: 67, discount: 0 },
    { id: 7, name: "GoPro Hero 11", price: 8999, category: "Kamera", brand: "GoPro", image: "📷", rating: 4.6, reviews: 134, discount: 0 },
    { id: 8, name: "DJI Pocket 3", price: 12999, category: "Kamera", brand: "DJI", image: "📷", rating: 4.7, reviews: 78, discount: 10 },
    { id: 9, name: "Canon EOS R10", price: 24999, category: "Kamera", brand: "Canon", image: "📷", rating: 4.8, reviews: 45, discount: 0 },
    { id: 10, name: "MacBook Pro Case", price: 899, category: "Kılıf", brand: "Apple", image: "💼", rating: 4.3, reviews: 156, discount: 0 },
    { id: 11, name: "iPhone 15 Pro Case", price: 599, category: "Kılıf", brand: "Apple", image: "💼", rating: 4.4, reviews: 234, discount: 0 },
    { id: 12, name: "Samsung Wireless Charger", price: 799, category: "Şarj", brand: "Samsung", image: "🔌", rating: 4.2, reviews: 89, discount: 0 }
  ]

  const categories = ['all', 'Kulaklık', 'Saat', 'Kamera', 'Kılıf', 'Şarj']
  const brands = ['all', 'Apple', 'Samsung', 'Sony', 'Garmin', 'GoPro', 'DJI', 'Canon']

  const filteredAccessories = accessories.filter(accessory => {
    const categoryMatch = selectedCategory === 'all' || accessory.category === selectedCategory
    const priceMatch = priceRange === 'all' || 
      (priceRange === 'low' && accessory.price < 5000) ||
      (priceRange === 'mid' && accessory.price >= 5000 && accessory.price < 15000) ||
      (priceRange === 'high' && accessory.price >= 15000)
    return categoryMatch && priceMatch
  })

  const addToCart = (accessory: any) => {
    setCartCount(prev => prev + 1)
    alert(`${accessory.name} sepete eklendi!`)
  }

  const addToWishlist = (accessory: any) => {
    setWishlistCount(prev => prev + 1)
    alert(`${accessory.name} favorilere eklendi!`)
  }

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount / 100)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/tech-store" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                TechStore
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Aksesuarlar</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/arama" className="p-2 text-gray-700 hover:text-purple-600 transition-colors">
                🔍
              </Link>
              <Link href="/sepet" className="p-2 text-gray-700 hover:text-purple-600 transition-colors">
                🛒 <span className="bg-purple-600 text-white text-xs rounded-full px-1">{cartCount}</span>
              </Link>
              <Link href="/profil" className="p-2 text-gray-700 hover:text-purple-600 transition-colors">👤</Link>
              <div className="flex items-center space-x-2 ml-4">
                <Link href="/profil" className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                  Giriş Yap
                </Link>
                <Link href="/profil" className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
                  Üye Ol
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Headphones className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Aksesuarlar</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              En kaliteli teknoloji aksesuarları. 
              Kulaklık, saat, kamera ve daha fazlası!
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white py-6 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Filtreler:</span>
              
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-300 focus:outline-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Tüm Kategoriler' : category}
                  </option>
                ))}
              </select>

              <select 
                value={priceRange} 
                onChange={(e) => setPriceRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-300 focus:outline-none"
              >
                <option value="all">Tüm Fiyatlar</option>
                <option value="low">5.000 TL Altı</option>
                <option value="mid">5.000 - 15.000 TL</option>
                <option value="high">15.000 TL Üstü</option>
              </select>
            </div>

            <div className="text-sm text-gray-600">
              {filteredAccessories.length} ürün bulundu
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredAccessories.length === 0 ? (
            <div className="text-center py-12">
              <Headphones className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ürün bulunamadı</h3>
              <p className="text-gray-600">Seçtiğiniz filtrelere uygun ürün bulunamadı.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAccessories.map((accessory) => (
                <div key={accessory.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6">
                  <div className="relative">
                    {accessory.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        %{accessory.discount} İndirim
                      </div>
                    )}
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-6xl">{accessory.image}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{accessory.name}</h3>
                      <p className="text-sm text-gray-600">{accessory.brand} • {accessory.category}</p>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{accessory.rating}</span>
                      <span className="text-sm text-gray-400">({accessory.reviews})</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {accessory.discount > 0 ? (
                        <>
                          <span className="text-lg font-bold text-red-600">
                            {calculateDiscountedPrice(accessory.price, accessory.discount).toLocaleString()} TL
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            {accessory.price.toLocaleString()} TL
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          {accessory.price.toLocaleString()} TL
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(accessory)}
                        className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Sepete Ekle
                      </button>
                      <button
                        onClick={() => addToWishlist(accessory)}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Heart className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">NEOMEDYA TECH</h3>
            <p className="text-gray-400 mb-6">Modern teknoloji ürünleri ve dijital çözümler</p>
            <div className="flex justify-center space-x-4">
              <Link href="/hakkimizda" className="text-gray-400 hover:text-white transition-colors">Hakkımızda</Link>
              <Link href="/iletisim" className="text-gray-400 hover:text-white transition-colors">İletişim</Link>
              <Link href="/yardim" className="text-gray-400 hover:text-white transition-colors">Yardım</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default Aksesuarlar 