'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Smartphone, Star, ShoppingCart, Heart, Filter, Search } from 'lucide-react'

const Telefonlar = () => {
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [selectedBrand, setSelectedBrand] = useState('all')
  const [priceRange, setPriceRange] = useState('all')

  const phones = [
    { id: 1, name: "iPhone 15 Pro", price: 45999, brand: "Apple", image: "📱", rating: 4.8, reviews: 124, discount: 0 },
    { id: 2, name: "Samsung Galaxy S24 Ultra", price: 39999, brand: "Samsung", image: "📱", rating: 4.7, reviews: 89, discount: 10 },
    { id: 3, name: "Xiaomi 14 Pro", price: 28999, brand: "Xiaomi", image: "📱", rating: 4.6, reviews: 67, discount: 0 },
    { id: 4, name: "Google Pixel 8 Pro", price: 35999, brand: "Google", image: "📱", rating: 4.5, reviews: 45, discount: 15 },
    { id: 5, name: "OnePlus 12", price: 24999, brand: "OnePlus", image: "📱", rating: 4.4, reviews: 78, discount: 0 },
    { id: 6, name: "iPhone 14", price: 32999, brand: "Apple", image: "📱", rating: 4.6, reviews: 156, discount: 20 },
    { id: 7, name: "Samsung Galaxy A55", price: 15999, brand: "Samsung", image: "📱", rating: 4.3, reviews: 92, discount: 0 },
    { id: 8, name: "Huawei P60 Pro", price: 41999, brand: "Huawei", image: "📱", rating: 4.7, reviews: 34, discount: 0 },
    { id: 9, name: "OPPO Find X7", price: 27999, brand: "OPPO", image: "📱", rating: 4.4, reviews: 56, discount: 0 },
    { id: 10, name: "Nothing Phone (2)", price: 18999, brand: "Nothing", image: "📱", rating: 4.2, reviews: 43, discount: 0 },
    { id: 11, name: "iPhone 13", price: 25999, brand: "Apple", image: "📱", rating: 4.5, reviews: 234, discount: 25 },
    { id: 12, name: "Samsung Galaxy S23", price: 29999, brand: "Samsung", image: "📱", rating: 4.6, reviews: 167, discount: 0 }
  ]

  const brands = ['all', 'Apple', 'Samsung', 'Xiaomi', 'Google', 'OnePlus', 'Huawei', 'OPPO', 'Nothing']

  const filteredPhones = phones.filter(phone => {
    const brandMatch = selectedBrand === 'all' || phone.brand === selectedBrand
    const priceMatch = priceRange === 'all' || 
      (priceRange === 'low' && phone.price < 20000) ||
      (priceRange === 'mid' && phone.price >= 20000 && phone.price < 35000) ||
      (priceRange === 'high' && phone.price >= 35000)
    return brandMatch && priceMatch
  })

  const addToCart = (phone: any) => {
    setCartCount(prev => prev + 1)
    alert(`${phone.name} sepete eklendi!`)
  }

  const addToWishlist = (phone: any) => {
    setWishlistCount(prev => prev + 1)
    alert(`${phone.name} favorilere eklendi!`)
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
              <Link href="/tech-store" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                TechStore
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Telefonlar</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/arama" className="p-2 text-gray-700 hover:text-blue-600 transition-colors">
                🔍
              </Link>
              <Link href="/sepet" className="p-2 text-gray-700 hover:text-blue-600 transition-colors">
                🛒 <span className="bg-blue-600 text-white text-xs rounded-full px-1">{cartCount}</span>
              </Link>
              <Link href="/profil" className="p-2 text-gray-700 hover:text-blue-600 transition-colors">👤</Link>
              <div className="flex items-center space-x-2 ml-4">
                <Link href="/profil" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Giriş Yap
                </Link>
                <Link href="/profil" className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                  Üye Ol
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Smartphone className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Telefonlar</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              En yeni akıllı telefonlar, en uygun fiyatlarla. 
              Apple, Samsung, Xiaomi ve daha fazlası!
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
                value={selectedBrand} 
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
              >
                {brands.map(brand => (
                  <option key={brand} value={brand}>
                    {brand === 'all' ? 'Tüm Markalar' : brand}
                  </option>
                ))}
              </select>

              <select 
                value={priceRange} 
                onChange={(e) => setPriceRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
              >
                <option value="all">Tüm Fiyatlar</option>
                <option value="low">20.000 TL Altı</option>
                <option value="mid">20.000 - 35.000 TL</option>
                <option value="high">35.000 TL Üstü</option>
              </select>
            </div>

            <div className="text-sm text-gray-600">
              {filteredPhones.length} ürün bulundu
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPhones.length === 0 ? (
            <div className="text-center py-12">
              <Smartphone className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ürün bulunamadı</h3>
              <p className="text-gray-600">Seçtiğiniz filtrelere uygun ürün bulunamadı.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPhones.map((phone) => (
                <div key={phone.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6">
                  <div className="relative">
                    {phone.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        %{phone.discount} İndirim
                      </div>
                    )}
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-6xl">{phone.image}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{phone.name}</h3>
                      <p className="text-sm text-gray-600">{phone.brand}</p>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{phone.rating}</span>
                      <span className="text-sm text-gray-400">({phone.reviews})</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {phone.discount > 0 ? (
                        <>
                          <span className="text-lg font-bold text-red-600">
                            {calculateDiscountedPrice(phone.price, phone.discount).toLocaleString()} TL
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            {phone.price.toLocaleString()} TL
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          {phone.price.toLocaleString()} TL
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(phone)}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Sepete Ekle
                      </button>
                      <button
                        onClick={() => addToWishlist(phone)}
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

export default Telefonlar 