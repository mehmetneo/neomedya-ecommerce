'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Star, ShoppingCart, Heart, Filter, Percent, Zap, Clock } from 'lucide-react'

const Indirim = () => {
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDiscount, setSelectedDiscount] = useState('all')

  const discountedProducts = [
    { id: 1, name: "iPhone 14", price: 32999, originalPrice: 39999, discount: 20, category: "Telefon", brand: "Apple", image: "📱", rating: 4.6, reviews: 156 },
    { id: 2, name: "Samsung Galaxy S24 Ultra", price: 39999, originalPrice: 45999, discount: 15, category: "Telefon", brand: "Samsung", image: "📱", rating: 4.7, reviews: 89 },
    { id: 3, name: "Dell XPS 13", price: 28999, originalPrice: 34999, discount: 18, category: "Bilgisayar", brand: "Dell", image: "💻", rating: 4.6, reviews: 124 },
    { id: 4, name: "Google Pixel 8 Pro", price: 35999, originalPrice: 41999, discount: 15, category: "Telefon", brand: "Google", image: "📱", rating: 4.5, reviews: 45 },
    { id: 5, name: "Sony WH-1000XM5", price: 8999, originalPrice: 10999, discount: 20, category: "Aksesuar", brand: "Sony", image: "🎧", rating: 4.9, reviews: 156 },
    { id: 6, name: "ASUS ROG Strix", price: 18999, originalPrice: 23999, discount: 25, category: "Bilgisayar", brand: "ASUS", image: "💻", rating: 4.4, reviews: 156 },
    { id: 7, name: "Canon EOS R10", price: 24999, originalPrice: 29999, discount: 17, category: "Kamera", brand: "Canon", image: "📷", rating: 4.8, reviews: 89 },
    { id: 8, name: "Nikon Z50", price: 21999, originalPrice: 25999, discount: 15, category: "Kamera", brand: "Nikon", image: "📷", rating: 4.7, reviews: 67 },
    { id: 9, name: "Samsung Galaxy Watch 6", price: 7999, originalPrice: 9999, discount: 20, category: "Aksesuar", brand: "Samsung", image: "⌚", rating: 4.5, reviews: 92 },
    { id: 10, name: "DJI Pocket 3", price: 12999, originalPrice: 14999, discount: 13, category: "Kamera", brand: "DJI", image: "📷", rating: 4.7, reviews: 78 },
    { id: 11, name: "Canon EOS 90D", price: 18999, originalPrice: 22999, discount: 20, category: "Kamera", brand: "Canon", image: "📷", rating: 4.4, reviews: 156 },
    { id: 12, name: "Canon EOS M50", price: 12999, originalPrice: 15999, discount: 25, category: "Kamera", brand: "Canon", image: "📷", rating: 4.5, reviews: 234 }
  ]

  const categories = ['all', 'Telefon', 'Bilgisayar', 'Kamera', 'Aksesuar']
  const discountRanges = ['all', '10-15', '15-20', '20+']

  const filteredProducts = discountedProducts.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory
    const discountMatch = selectedDiscount === 'all' || 
      (selectedDiscount === '10-15' && product.discount >= 10 && product.discount < 15) ||
      (selectedDiscount === '15-20' && product.discount >= 15 && product.discount < 20) ||
      (selectedDiscount === '20+' && product.discount >= 20)
    return categoryMatch && discountMatch
  })

  const addToCart = (product: any) => {
    setCartCount(prev => prev + 1)
    alert(`${product.name} sepete eklendi!`)
  }

  const addToWishlist = (product: any) => {
    setWishlistCount(prev => prev + 1)
    alert(`${product.name} favorilere eklendi!`)
  }

  const calculateSavings = (originalPrice: number, currentPrice: number) => {
    return originalPrice - currentPrice
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/tech-store" className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                TechStore
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">İndirimli Ürünler</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/arama" className="p-2 text-gray-700 hover:text-red-600 transition-colors">
                🔍
              </Link>
              <Link href="/sepet" className="p-2 text-gray-700 hover:text-red-600 transition-colors">
                🛒 <span className="bg-red-600 text-white text-xs rounded-full px-1">{cartCount}</span>
              </Link>
              <Link href="/profil" className="p-2 text-gray-700 hover:text-red-600 transition-colors">👤</Link>
              <div className="flex items-center space-x-2 ml-4">
                <Link href="/profil" className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                  Giriş Yap
                </Link>
                <Link href="/profil" className="border border-red-600 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
                  Üye Ol
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Percent className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">İndirimli Ürünler</h1>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              En büyük indirimler, en uygun fiyatlar! 
              Kaçırılmayacak fırsatlar sizi bekliyor.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 text-white">
                  <Clock className="h-5 w-5" />
                  <span className="font-semibold">Sınırlı Süre!</span>
                </div>
              </div>
            </div>
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
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-300 focus:outline-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Tüm Kategoriler' : category}
                  </option>
                ))}
              </select>

              <select 
                value={selectedDiscount} 
                onChange={(e) => setSelectedDiscount(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-300 focus:outline-none"
              >
                {discountRanges.map(range => (
                  <option key={range} value={range}>
                    {range === 'all' ? 'Tüm İndirimler' : `%${range} İndirim`}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm text-gray-600">
              {filteredProducts.length} ürün bulundu
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Percent className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">İndirimli ürün bulunamadı</h3>
              <p className="text-gray-600">Seçtiğiniz filtrelere uygun indirimli ürün bulunamadı.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6 relative">
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
                    %{product.discount} İndirim
                  </div>
                  
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-6xl">{product.image}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.brand} • {product.category}</p>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                      <span className="text-sm text-gray-400">({product.reviews})</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-red-600">
                          {product.price.toLocaleString()} TL
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          {product.originalPrice.toLocaleString()} TL
                        </span>
                      </div>
                      <div className="text-xs text-green-600 font-medium">
                        {calculateSavings(product.originalPrice, product.price).toLocaleString()} TL tasarruf
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Sepete Ekle
                      </button>
                      <button
                        onClick={() => addToWishlist(product)}
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

      {/* Special Offers */}
      <section className="py-12 bg-gradient-to-r from-red-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Özel Fırsatlar</h2>
            <p className="text-gray-600">Kaçırılmayacak indirimler ve kampanyalar</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-8 w-8 text-yellow-500" />
                <h3 className="text-lg font-bold text-gray-900">Flash İndirimler</h3>
              </div>
              <p className="text-gray-600 mb-4">24 saat süreyle geçerli özel indirimler</p>
              <div className="text-2xl font-bold text-red-600">%50'ye Varan</div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-8 w-8 text-blue-500" />
                <h3 className="text-lg font-bold text-gray-900">Sınırlı Süre</h3>
              </div>
              <p className="text-gray-600 mb-4">Stoklarla sınırlı özel fırsatlar</p>
              <div className="text-2xl font-bold text-blue-600">Hemen Al</div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Percent className="h-8 w-8 text-green-500" />
                <h3 className="text-lg font-bold text-gray-900">Kategori İndirimleri</h3>
              </div>
              <p className="text-gray-600 mb-4">Kategori bazlı özel indirimler</p>
              <div className="text-2xl font-bold text-green-600">%30 İndirim</div>
            </div>
          </div>
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

export default Indirim 