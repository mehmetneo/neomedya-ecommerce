'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Star, Heart, Filter, Grid, List, Percent, Clock, Zap } from 'lucide-react'

const GiyimIndirim = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [cartCount, setCartCount] = useState(0)

  const discountedProducts = [
    {
      id: 1,
      name: "Nike Air Max 270",
      price: 899,
      originalPrice: 1599,
      image: "👟",
      brand: "Nike",
      rating: 4.8,
      reviews: 156,
      discount: 44,
      inStock: true,
      sizes: ["40", "41", "42", "43", "44"],
      timeLeft: "2 saat"
    },
    {
      id: 2,
      name: "Levi's 501 Jeans",
      price: 399,
      originalPrice: 799,
      image: "👖",
      brand: "Levi's",
      rating: 4.7,
      reviews: 234,
      discount: 50,
      inStock: true,
      sizes: ["30", "32", "34", "36"],
      timeLeft: "4 saat"
    },
    {
      id: 3,
      name: "Zara Elbise",
      price: 299,
      originalPrice: 599,
      image: "👗",
      brand: "Zara",
      rating: 4.6,
      reviews: 189,
      discount: 50,
      inStock: true,
      sizes: ["XS", "S", "M", "L"],
      timeLeft: "1 saat"
    },
    {
      id: 4,
      name: "H&M Hoodie",
      price: 199,
      originalPrice: 499,
      image: "🧥",
      brand: "H&M",
      rating: 4.6,
      reviews: 123,
      discount: 60,
      inStock: true,
      sizes: ["S", "M", "L", "XL"],
      timeLeft: "3 saat"
    },
    {
      id: 5,
      name: "Adidas Ultraboost 22",
      price: 1299,
      originalPrice: 1899,
      image: "👟",
      brand: "Adidas",
      rating: 4.9,
      reviews: 89,
      discount: 32,
      inStock: true,
      sizes: ["40", "41", "42", "43", "44"],
      timeLeft: "5 saat"
    },
    {
      id: 6,
      name: "Tommy Hilfiger Polo",
      price: 199,
      originalPrice: 399,
      image: "👕",
      brand: "Tommy Hilfiger",
      rating: 4.4,
      reviews: 78,
      discount: 50,
      inStock: true,
      sizes: ["S", "M", "L", "XL"],
      timeLeft: "2 saat"
    },
    {
      id: 7,
      name: "Puma RS-X",
      price: 599,
      originalPrice: 1099,
      image: "👟",
      brand: "Puma",
      rating: 4.4,
      reviews: 89,
      discount: 45,
      inStock: true,
      sizes: ["40", "41", "42", "43", "44"],
      timeLeft: "6 saat"
    },
    {
      id: 8,
      name: "Calvin Klein İç Giyim",
      price: 149,
      originalPrice: 299,
      image: "👙",
      brand: "Calvin Klein",
      rating: 4.3,
      reviews: 67,
      discount: 50,
      inStock: true,
      sizes: ["S", "M", "L"],
      timeLeft: "1 saat"
    }
  ]

  const addToCart = (product: any) => {
    setCartCount(prev => prev + 1)
    alert(`${product.name} sepete eklendi!`)
  }

  const addToWishlist = (product: any) => {
    alert(`${product.name} favorilere eklendi!`)
  }

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
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/giyim" className="text-purple-600 hover:text-purple-700">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">İndirimli Ürünler</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/giyim/sepet" className="p-2 text-gray-700 hover:text-purple-600 transition-colors">
                🛒 <span className="bg-purple-600 text-white text-xs rounded-full px-1">{cartCount}</span>
              </Link>
              <Link href="/giyim/profil" className="p-2 text-gray-700 hover:text-purple-600 transition-colors">👤</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg p-8 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Zap className="h-8 w-8 mr-2" />
              <h2 className="text-3xl md:text-4xl font-bold">⚡ FLASH SALE</h2>
            </div>
            <p className="text-lg opacity-90 mb-6">
              Seçili ürünlerde %50'ye varan indirimler! Fırsatları kaçırma!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Clock className="h-4 w-4" />
                <span>Son 6 saat</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Percent className="h-4 w-4" />
                <span>%50 İndirim</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span>🔥 Sınırlı Stok</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and View Options */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Filter className="h-4 w-4" />
              <span>Filtrele</span>
            </button>
            <span className="text-gray-600">{discountedProducts.length} indirimli ürün bulundu</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {discountedProducts.map((product) => (
            <div key={product.id} className={`bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow ${
              viewMode === 'list' ? 'flex gap-4 p-4' : 'p-4'
            }`}>
              <div className={`relative ${viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : ''}`}>
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  %{product.discount} İndirim
                </div>
                <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  ⏰ {product.timeLeft}
                </div>
                {!product.inStock && (
                  <div className="absolute bottom-2 right-2 bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
                    Stokta Yok
                  </div>
                )}
                <div className={`bg-gradient-to-br from-red-100 to-pink-100 rounded-lg flex items-center justify-center ${
                  viewMode === 'list' ? 'w-32 h-32' : 'aspect-square'
                }`}>
                  <span className="text-4xl">{product.image}</span>
                </div>
              </div>
              
              <div className={`flex-1 ${viewMode === 'list' ? 'flex flex-col justify-between' : 'mt-4'}`}>
                <div>
                  <h3 className={`font-semibold text-gray-900 ${viewMode === 'list' ? 'text-lg' : 'text-sm'}`}>
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{product.brand}</p>
                  
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`font-bold text-red-600 ${viewMode === 'list' ? 'text-lg' : 'text-sm'}`}>
                      {product.price.toLocaleString()} TL
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      {product.originalPrice.toLocaleString()} TL
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-red-600 font-semibold">
                      {product.discount}% Tasarruf
                    </span>
                    <span className="text-xs text-orange-600">
                      ⏰ {product.timeLeft}
                    </span>
                  </div>
                  
                  {viewMode === 'list' && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-600">Bedenler: {product.sizes.join(', ')}</p>
                    </div>
                  )}
                </div>
                
                <div className={`flex gap-2 ${viewMode === 'list' ? 'mt-4' : 'mt-3'}`}>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                      product.inStock
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {product.inStock ? 'Hemen Al' : 'Stokta Yok'}
                  </button>
                  <button
                    onClick={() => addToWishlist(product)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Heart className="h-3 w-3 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
            Daha Fazla İndirimli Ürün
          </button>
        </div>
      </div>
    </main>
  )
}

export default GiyimIndirim 