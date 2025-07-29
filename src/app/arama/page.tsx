'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, Heart, Eye, Star, ArrowLeft, X } from 'lucide-react'

const Arama = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)

  const allProducts = [
    { id: 1, name: "Modern Koltuk Takımı", price: 8999, image: "🛋️", category: "Oturma Odası", rating: 4.8, reviews: 124, discount: 15 },
    { id: 2, name: "LED Aydınlatma Seti", price: 1299, image: "💡", category: "Aydınlatma", rating: 4.8, reviews: 234, discount: 30 },
    { id: 3, name: "Mutfak Seti (6'lı)", price: 3499, image: "🍽️", category: "Mutfak", rating: 4.8, reviews: 189, discount: 25 },
    { id: 4, name: "Banyo Aksesuarları Seti", price: 899, image: "🚿", category: "Banyo", rating: 4.7, reviews: 145, discount: 20 },
    { id: 5, name: "Bahçe Mobilyası Seti", price: 2499, image: "🌿", category: "Bahçe", rating: 4.8, reviews: 167, discount: 30 },
    { id: 6, name: "Yatak Odası Seti", price: 5999, image: "🛏️", category: "Yatak Odası", rating: 4.9, reviews: 289, discount: 35 },
    { id: 7, name: "Kahve Makinesi", price: 2499, image: "☕", category: "Mutfak", rating: 4.9, reviews: 267, discount: 30 },
    { id: 8, name: "Avize (Kristal)", price: 3499, image: "✨", category: "Aydınlatma", rating: 4.9, reviews: 167, discount: 15 },
    { id: 9, name: "Havlu Takımı (6'lı)", price: 599, image: "🛁", category: "Banyo", rating: 4.8, reviews: 234, discount: 15 },
    { id: 10, name: "Çiçek Saksıları (5'li)", price: 899, image: "🌸", category: "Bahçe", rating: 4.6, reviews: 123, discount: 20 },
    { id: 11, name: "Dolap (3 Kapılı)", price: 3499, image: "🚪", category: "Yatak Odası", rating: 4.7, reviews: 156, discount: 20 },
    { id: 12, name: "TV Ünitesi", price: 3499, image: "📺", category: "Oturma Odası", rating: 4.7, reviews: 156, discount: 10 }
  ]

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddToCart = (productId: number) => {
    setCartCount(prev => prev + 1)
  }

  const handleAddToWishlist = (productId: number) => {
    setWishlistCount(prev => prev + 1)
  }

  const handleClearSearch = () => {
    setSearchTerm('')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                Ana Sayfa
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Arama</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-700 hover:text-orange-600 transition-colors relative">
                🔍
              </button>
              <button className="p-2 text-gray-700 hover:text-orange-600 transition-colors relative">
                🛒
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button className="p-2 text-gray-700 hover:text-orange-600 transition-colors relative">
                ❤️
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button className="p-2 text-gray-700 hover:text-orange-600 transition-colors">👤</button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Ürün Ara</h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto mb-8">
              Aradığınız ürünü bulun
            </p>
            
            {/* Search Input */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Ürün adı veya kategori ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 text-gray-900 rounded-lg border-0 focus:ring-2 focus:ring-orange-300 focus:outline-none"
                />
                {searchTerm && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {searchTerm ? `"${searchTerm}" için arama sonuçları` : 'Tüm Ürünler'}
            </h2>
            <p className="text-gray-600">
              {searchTerm 
                ? `${filteredProducts.length} ürün bulundu` 
                : 'En popüler ev dekorasyon ürünleri'
              }
            </p>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6 group">
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      <span className="text-6xl">{product.image}</span>
                    </div>
                    
                    {/* Discount Badge */}
                    {product.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        %{product.discount} İNDİRİM
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex flex-col gap-2">
                        <button 
                          onClick={() => handleAddToWishlist(product.id)}
                          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
                        >
                          <Heart className="h-4 w-4 text-red-500" />
                        </button>
                        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
                          <Eye className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-sm text-gray-500">{product.category}</span>
                    <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews})</span>
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-center gap-2">
                      {product.discount > 0 ? (
                        <>
                          <span className="text-lg font-bold text-gray-900">
                            ₺{(product.price * (1 - product.discount / 100)).toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ₺{product.price.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          ₺{product.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => handleAddToCart(product.id)}
                      className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Sepete Ekle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ürün Bulunamadı</h3>
              <p className="text-gray-600 mb-8">
                "{searchTerm}" için sonuç bulunamadı. Farklı anahtar kelimeler deneyin.
              </p>
              <button 
                onClick={handleClearSearch}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
              >
                Tüm Ürünleri Göster
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">NEOMEDYA E TİCARET PLATFORMLARI</h3>
            <p className="text-gray-400 mb-6">Modern e-ticaret platformları ve ev dekorasyon ürünleri</p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Hakkımızda</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">İletişim</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Yardım</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default Arama 