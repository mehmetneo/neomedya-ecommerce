'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Star, Heart, Filter, Grid, List, Search, X } from 'lucide-react'

const GiyimArama = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [cartCount, setCartCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])

  const allProducts = [
    {
      id: 1,
      name: "Levi's 501 Jeans",
      price: 599,
      originalPrice: 799,
      image: "👖",
      brand: "Levi's",
      category: "erkek",
      rating: 4.7,
      reviews: 234,
      discount: 25,
      inStock: true,
      sizes: ["30", "32", "34", "36"]
    },
    {
      id: 2,
      name: "Nike Air Max 270",
      price: 1299,
      originalPrice: 1599,
      image: "👟",
      brand: "Nike",
      category: "erkek",
      rating: 4.8,
      reviews: 156,
      discount: 19,
      inStock: true,
      sizes: ["40", "41", "42", "43", "44"]
    },
    {
      id: 3,
      name: "Zara Basic T-Shirt",
      price: 199,
      originalPrice: 199,
      image: "👕",
      brand: "Zara",
      category: "erkek",
      rating: 4.5,
      reviews: 67,
      discount: 0,
      inStock: true,
      sizes: ["S", "M", "L", "XL"]
    },
    {
      id: 4,
      name: "Zara Elbise",
      price: 399,
      originalPrice: 599,
      image: "👗",
      brand: "Zara",
      category: "kadin",
      rating: 4.6,
      reviews: 189,
      discount: 33,
      inStock: true,
      sizes: ["XS", "S", "M", "L"]
    },
    {
      id: 5,
      name: "H&M Bluz",
      price: 199,
      originalPrice: 299,
      image: "👚",
      brand: "H&M",
      category: "kadin",
      rating: 4.4,
      reviews: 156,
      discount: 33,
      inStock: true,
      sizes: ["S", "M", "L", "XL"]
    },
    {
      id: 6,
      name: "Nike Çocuk Spor Ayakkabı",
      price: 299,
      originalPrice: 399,
      image: "👟",
      brand: "Nike",
      category: "cocuk",
      rating: 4.8,
      reviews: 145,
      discount: 25,
      inStock: true,
      sizes: ["28", "30", "32", "34"]
    }
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === '') {
      setSearchResults([])
      return
    }

    const results = allProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    )
    setSearchResults(results)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
  }

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
              <h1 className="text-2xl font-bold text-gray-900">Arama</h1>
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
        {/* Search Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Ürün Ara</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Ürün adı, marka veya kategori ara..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            
            {searchQuery && (
              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  "{searchQuery}" için {searchResults.length} sonuç bulundu
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Quick Search Categories */}
        {!searchQuery && (
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popüler Aramalar</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "T-Shirt", icon: "👕", query: "t-shirt" },
                { name: "Kot Pantolon", icon: "👖", query: "kot" },
                { name: "Spor Ayakkabı", icon: "👟", query: "spor ayakkabı" },
                { name: "Elbise", icon: "👗", query: "elbise" },
                { name: "Bluz", icon: "👚", query: "bluz" },
                { name: "Hoodie", icon: "🧥", query: "hoodie" },
                { name: "Nike", icon: "🏃", query: "nike" },
                { name: "Zara", icon: "🛍️", query: "zara" }
              ].map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(category.query)}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="text-sm font-medium text-gray-900">{category.name}</div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Search Results */}
        {searchQuery && (
          <>
            {/* Filters and View Options */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <Filter className="h-4 w-4" />
                  <span>Filtrele</span>
                </button>
                <span className="text-gray-600">{searchResults.length} sonuç bulundu</span>
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

            {/* Results Grid */}
            {searchResults.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {searchResults.map((product) => (
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
                      <div className={`bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center ${
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
                              ? 'bg-purple-600 text-white hover:bg-purple-700'
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
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sonuç Bulunamadı</h3>
                <p className="text-gray-600 mb-4">
                  "{searchQuery}" için sonuç bulunamadı. Farklı anahtar kelimeler deneyin.
                </p>
                <button
                  onClick={clearSearch}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Yeni Arama Yap
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}

export default GiyimArama 