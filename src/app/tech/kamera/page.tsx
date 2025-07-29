'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Camera, ShoppingCart, Heart, Star, Filter, Grid, List, ArrowLeft, Zap } from 'lucide-react'

const Kamera = () => {
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [priceRange, setPriceRange] = useState([0, 200000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  const products = [
    { id: 1, name: "Sony A7 IV", price: 45999, originalPrice: 45999, image: "📷", rating: 4.8, reviews: 156, brand: "Sony", discount: 0, inStock: true, type: "Mirrorless", sensor: "Full Frame", resolution: "33MP" },
    { id: 2, name: "Canon EOS R6 Mark II", price: 39999, originalPrice: 44999, image: "📷", rating: 4.9, reviews: 89, brand: "Canon", discount: 12, inStock: true, type: "Mirrorless", sensor: "Full Frame", resolution: "24MP" },
    { id: 3, name: "Nikon Z6 II", price: 34999, originalPrice: 34999, image: "📷", rating: 4.7, reviews: 234, brand: "Nikon", discount: 0, inStock: true, type: "Mirrorless", sensor: "Full Frame", resolution: "24MP" },
    { id: 4, name: "GoPro Hero 11 Black", price: 3999, originalPrice: 4999, image: "📷", rating: 4.6, reviews: 67, brand: "GoPro", discount: 20, inStock: false, type: "Action", sensor: "1/1.9\"", resolution: "27MP" },
    { id: 5, name: "Fujifilm X-T5", price: 29999, originalPrice: 32999, image: "📷", rating: 4.5, reviews: 123, brand: "Fujifilm", discount: 10, inStock: true, type: "Mirrorless", sensor: "APS-C", resolution: "40MP" },
    { id: 6, name: "Panasonic Lumix S5", price: 24999, originalPrice: 24999, image: "📷", rating: 4.8, reviews: 89, brand: "Panasonic", discount: 0, inStock: true, type: "Mirrorless", sensor: "Full Frame", resolution: "24MP" },
    { id: 7, name: "DJI Pocket 3", price: 8999, originalPrice: 9999, image: "📷", rating: 4.7, reviews: 156, brand: "DJI", discount: 10, inStock: true, type: "Action", sensor: "1/1.3\"", resolution: "4K" },
    { id: 8, name: "Leica Q3", price: 89999, originalPrice: 89999, image: "📷", rating: 4.9, reviews: 89, brand: "Leica", discount: 0, inStock: true, type: "Compact", sensor: "Full Frame", resolution: "60MP" }
  ]

  const brands = ["Sony", "Canon", "Nikon", "Fujifilm", "Panasonic", "GoPro", "DJI", "Leica"]
  const categories = ["Mirrorless", "DSLR", "Action", "Compact", "Medium Format", "Film"]
  const sensors = ["Full Frame", "APS-C", "Micro Four Thirds", "1 inch", "Medium Format"]

  const addToCart = (product: any) => {
    setCartCount(prev => prev + 1)
    alert(`${product.name} sepete eklendi!`)
  }

  const addToWishlist = (product: any) => {
    setWishlistCount(prev => prev + 1)
    alert(`${product.name} favorilere eklendi!`)
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
  }

  const filteredProducts = products.filter(product => {
    const priceInRange = product.price >= priceRange[0] && product.price <= priceRange[1]
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
    return priceInRange && brandMatch
  })

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Site Selection Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-4">
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
              <Link href="/tech" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                NEOMEDYA TECH
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
              <Link href="/tech" className="text-blue-600 hover:text-blue-700">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Kamera</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/tech/sepet" className="p-2 text-gray-700 hover:text-blue-600 transition-colors">
                🛒 <span className="bg-blue-600 text-white text-xs rounded-full px-1">{cartCount}</span>
              </Link>
              <Link href="/tech/profil" className="p-2 text-gray-700 hover:text-blue-600 transition-colors">👤</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtreler
              </h3>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Fiyat Aralığı</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{priceRange[0].toLocaleString()} TL</span>
                    <span>{priceRange[1].toLocaleString()} TL</span>
                  </div>
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Markalar</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Kategoriler</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1 transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sensors */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Sensör Boyutu</h4>
                <div className="space-y-2">
                  {sensors.map((sensor) => (
                    <button
                      key={sensor}
                      className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 py-1 transition-colors"
                    >
                      {sensor}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Özellikler</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">4K Video</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">IBIS (Stabilizasyon)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">Su Geçirmez</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Fotoğraf ve Video Kameraları</h2>
                <p className="text-gray-600">{filteredProducts.length} ürün bulundu</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Products */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <div key={product.id} className={`bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow ${
                  viewMode === 'list' ? 'flex gap-4 p-4' : 'p-4'
                }`}>
                  <div className={`relative ${viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : ''}`}>
                    {product.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        %{product.discount} İndirim
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute top-2 right-2 bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
                        Stokta Yok
                      </div>
                    )}
                    <div className={`bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center ${
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
                      <p className="text-xs text-gray-500 mt-1">{product.brand} • {product.type} • {product.sensor} • {product.resolution}</p>
                      
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">{product.rating}</span>
                        <span className="text-xs text-gray-400">({product.reviews})</span>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-2">
                        {product.discount > 0 ? (
                          <>
                            <span className={`font-bold text-red-600 ${viewMode === 'list' ? 'text-lg' : 'text-sm'}`}>
                              {product.price.toLocaleString()} TL
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                              {product.originalPrice.toLocaleString()} TL
                            </span>
                          </>
                        ) : (
                          <span className={`font-bold text-gray-900 ${viewMode === 'list' ? 'text-lg' : 'text-sm'}`}>
                            {product.price.toLocaleString()} TL
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className={`flex gap-2 ${viewMode === 'list' ? 'mt-4' : 'mt-3'}`}>
                      <button
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                          product.inStock
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {product.inStock ? 'Sepete Ekle' : 'Stokta Yok'}
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
          </div>
        </div>
      </div>
    </main>
  )
}

export default Kamera 