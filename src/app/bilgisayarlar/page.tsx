'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Laptop, Star, ShoppingCart, Heart, Filter, Cpu, Monitor } from 'lucide-react'

const Bilgisayarlar = () => {
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [selectedType, setSelectedType] = useState('all')
  const [priceRange, setPriceRange] = useState('all')

  const computers = [
    { id: 1, name: "MacBook Air M2", price: 32999, type: "Laptop", brand: "Apple", image: "💻", rating: 4.8, reviews: 89, discount: 0 },
    { id: 2, name: "MacBook Pro M3", price: 45999, type: "Laptop", brand: "Apple", image: "💻", rating: 4.9, reviews: 67, discount: 0 },
    { id: 3, name: "Dell XPS 13", price: 28999, type: "Laptop", brand: "Dell", image: "💻", rating: 4.6, reviews: 124, discount: 15 },
    { id: 4, name: "HP Spectre x360", price: 25999, type: "Laptop", brand: "HP", image: "💻", rating: 4.5, reviews: 78, discount: 0 },
    { id: 5, name: "Lenovo ThinkPad X1", price: 31999, type: "Laptop", brand: "Lenovo", image: "💻", rating: 4.7, reviews: 92, discount: 0 },
    { id: 6, name: "ASUS ROG Strix", price: 18999, type: "Laptop", brand: "ASUS", image: "💻", rating: 4.4, reviews: 156, discount: 20 },
    { id: 7, name: "MSI Gaming Laptop", price: 22999, type: "Laptop", brand: "MSI", image: "💻", rating: 4.3, reviews: 67, discount: 0 },
    { id: 8, name: "Acer Swift 3", price: 15999, type: "Laptop", brand: "Acer", image: "💻", rating: 4.2, reviews: 89, discount: 0 },
    { id: 9, name: "iMac 24\" M3", price: 39999, type: "Desktop", brand: "Apple", image: "🖥️", rating: 4.8, reviews: 45, discount: 0 },
    { id: 10, name: "Mac Studio", price: 59999, type: "Desktop", brand: "Apple", image: "🖥️", rating: 4.9, reviews: 23, discount: 0 },
    { id: 11, name: "Dell OptiPlex", price: 12999, type: "Desktop", brand: "Dell", image: "🖥️", rating: 4.3, reviews: 134, discount: 25 },
    { id: 12, name: "HP Pavilion", price: 9999, type: "Desktop", brand: "HP", image: "🖥️", rating: 4.1, reviews: 78, discount: 0 }
  ]

  const types = ['all', 'Laptop', 'Desktop']
  const brands = ['all', 'Apple', 'Dell', 'HP', 'Lenovo', 'ASUS', 'MSI', 'Acer']

  const filteredComputers = computers.filter(computer => {
    const typeMatch = selectedType === 'all' || computer.type === selectedType
    const priceMatch = priceRange === 'all' || 
      (priceRange === 'low' && computer.price < 20000) ||
      (priceRange === 'mid' && computer.price >= 20000 && computer.price < 40000) ||
      (priceRange === 'high' && computer.price >= 40000)
    return typeMatch && priceMatch
  })

  const addToCart = (computer: any) => {
    setCartCount(prev => prev + 1)
    alert(`${computer.name} sepete eklendi!`)
  }

  const addToWishlist = (computer: any) => {
    setWishlistCount(prev => prev + 1)
    alert(`${computer.name} favorilere eklendi!`)
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
              <Link href="/tech-store" className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                TechStore
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Bilgisayarlar</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/arama" className="p-2 text-gray-700 hover:text-green-600 transition-colors">
                🔍
              </Link>
              <Link href="/sepet" className="p-2 text-gray-700 hover:text-green-600 transition-colors">
                🛒 <span className="bg-green-600 text-white text-xs rounded-full px-1">{cartCount}</span>
              </Link>
              <Link href="/profil" className="p-2 text-gray-700 hover:text-green-600 transition-colors">👤</Link>
              <div className="flex items-center space-x-2 ml-4">
                <Link href="/profil" className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  Giriş Yap
                </Link>
                <Link href="/profil" className="border border-green-600 text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
                  Üye Ol
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Laptop className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Bilgisayarlar</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              En güçlü laptop ve masaüstü bilgisayarlar. 
              Apple, Dell, HP ve daha fazlası!
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
                value={selectedType} 
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-300 focus:outline-none"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'Tüm Türler' : type}
                  </option>
                ))}
              </select>

              <select 
                value={priceRange} 
                onChange={(e) => setPriceRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-300 focus:outline-none"
              >
                <option value="all">Tüm Fiyatlar</option>
                <option value="low">20.000 TL Altı</option>
                <option value="mid">20.000 - 40.000 TL</option>
                <option value="high">40.000 TL Üstü</option>
              </select>
            </div>

            <div className="text-sm text-gray-600">
              {filteredComputers.length} ürün bulundu
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredComputers.length === 0 ? (
            <div className="text-center py-12">
              <Laptop className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ürün bulunamadı</h3>
              <p className="text-gray-600">Seçtiğiniz filtrelere uygun ürün bulunamadı.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredComputers.map((computer) => (
                <div key={computer.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6">
                  <div className="relative">
                    {computer.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        %{computer.discount} İndirim
                      </div>
                    )}
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-6xl">{computer.image}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{computer.name}</h3>
                      <p className="text-sm text-gray-600">{computer.brand} • {computer.type}</p>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{computer.rating}</span>
                      <span className="text-sm text-gray-400">({computer.reviews})</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {computer.discount > 0 ? (
                        <>
                          <span className="text-lg font-bold text-red-600">
                            {calculateDiscountedPrice(computer.price, computer.discount).toLocaleString()} TL
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            {computer.price.toLocaleString()} TL
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          {computer.price.toLocaleString()} TL
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(computer)}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Sepete Ekle
                      </button>
                      <button
                        onClick={() => addToWishlist(computer)}
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

export default Bilgisayarlar 