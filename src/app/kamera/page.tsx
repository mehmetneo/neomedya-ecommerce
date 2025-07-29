'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Camera, Star, ShoppingCart, Heart, Filter, Video, Image } from 'lucide-react'

const Kamera = () => {
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [selectedType, setSelectedType] = useState('all')
  const [priceRange, setPriceRange] = useState('all')

  const cameras = [
    { id: 1, name: "Canon EOS R10", price: 24999, type: "DSLR", brand: "Canon", image: "📷", rating: 4.8, reviews: 89, discount: 0 },
    { id: 2, name: "Nikon Z50", price: 21999, type: "Mirrorless", brand: "Nikon", image: "📷", rating: 4.7, reviews: 67, discount: 15 },
    { id: 3, name: "Sony A7 IV", price: 45999, type: "Mirrorless", brand: "Sony", image: "📷", rating: 4.9, reviews: 124, discount: 0 },
    { id: 4, name: "Fujifilm X-T5", price: 32999, type: "Mirrorless", brand: "Fujifilm", image: "📷", rating: 4.6, reviews: 78, discount: 0 },
    { id: 5, name: "GoPro Hero 11", price: 8999, type: "Action", brand: "GoPro", image: "📷", rating: 4.6, reviews: 134, discount: 0 },
    { id: 6, name: "DJI Pocket 3", price: 12999, type: "Action", brand: "DJI", image: "📷", rating: 4.7, reviews: 78, discount: 10 },
    { id: 7, name: "Insta360 X3", price: 7999, type: "Action", brand: "Insta360", image: "📷", rating: 4.5, reviews: 92, discount: 0 },
    { id: 8, name: "Canon EOS 90D", price: 18999, type: "DSLR", brand: "Canon", image: "📷", rating: 4.4, reviews: 156, discount: 20 },
    { id: 9, name: "Nikon D7500", price: 15999, type: "DSLR", brand: "Nikon", image: "📷", rating: 4.3, reviews: 89, discount: 0 },
    { id: 10, name: "Sony ZV-E10", price: 17999, type: "Vlog", brand: "Sony", image: "📷", rating: 4.7, reviews: 67, discount: 0 },
    { id: 11, name: "Canon EOS M50", price: 12999, type: "Mirrorless", brand: "Canon", image: "📷", rating: 4.5, reviews: 234, discount: 25 },
    { id: 12, name: "Panasonic Lumix GH6", price: 39999, type: "Mirrorless", brand: "Panasonic", image: "📷", rating: 4.8, reviews: 45, discount: 0 }
  ]

  const types = ['all', 'DSLR', 'Mirrorless', 'Action', 'Vlog']
  const brands = ['all', 'Canon', 'Nikon', 'Sony', 'Fujifilm', 'GoPro', 'DJI', 'Insta360', 'Panasonic']

  const filteredCameras = cameras.filter(camera => {
    const typeMatch = selectedType === 'all' || camera.type === selectedType
    const priceMatch = priceRange === 'all' || 
      (priceRange === 'low' && camera.price < 20000) ||
      (priceRange === 'mid' && camera.price >= 20000 && camera.price < 40000) ||
      (priceRange === 'high' && camera.price >= 40000)
    return typeMatch && priceMatch
  })

  const addToCart = (camera: any) => {
    setCartCount(prev => prev + 1)
    alert(`${camera.name} sepete eklendi!`)
  }

  const addToWishlist = (camera: any) => {
    setWishlistCount(prev => prev + 1)
    alert(`${camera.name} favorilere eklendi!`)
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
              <Link href="/tech-store" className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                TechStore
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Kamera</h1>
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
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Camera className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Kamera</h1>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              En profesyonel fotoğraf ve video kameraları. 
              Canon, Nikon, Sony ve daha fazlası!
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
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-300 focus:outline-none"
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
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-300 focus:outline-none"
              >
                <option value="all">Tüm Fiyatlar</option>
                <option value="low">20.000 TL Altı</option>
                <option value="mid">20.000 - 40.000 TL</option>
                <option value="high">40.000 TL Üstü</option>
              </select>
            </div>

            <div className="text-sm text-gray-600">
              {filteredCameras.length} ürün bulundu
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCameras.length === 0 ? (
            <div className="text-center py-12">
              <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ürün bulunamadı</h3>
              <p className="text-gray-600">Seçtiğiniz filtrelere uygun ürün bulunamadı.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCameras.map((camera) => (
                <div key={camera.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6">
                  <div className="relative">
                    {camera.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        %{camera.discount} İndirim
                      </div>
                    )}
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-6xl">{camera.image}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{camera.name}</h3>
                      <p className="text-sm text-gray-600">{camera.brand} • {camera.type}</p>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{camera.rating}</span>
                      <span className="text-sm text-gray-400">({camera.reviews})</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {camera.discount > 0 ? (
                        <>
                          <span className="text-lg font-bold text-red-600">
                            {calculateDiscountedPrice(camera.price, camera.discount).toLocaleString()} TL
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            {camera.price.toLocaleString()} TL
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          {camera.price.toLocaleString()} TL
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(camera)}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Sepete Ekle
                      </button>
                      <button
                        onClick={() => addToWishlist(camera)}
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

export default Kamera 