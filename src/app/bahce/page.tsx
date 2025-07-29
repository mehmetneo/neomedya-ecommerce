'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { TreePine, ShoppingCart, Heart, Eye, Star, ArrowLeft } from 'lucide-react'

const Bahce = () => {
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)

  const products = [
    { id: 1, name: "Bahçe Mobilyası Seti", price: 2499, image: "🌿", rating: 4.8, reviews: 167, discount: 30 },
    { id: 2, name: "Çiçek Saksıları (5'li)", price: 899, image: "🌸", rating: 4.6, reviews: 123, discount: 20 },
    { id: 3, name: "Bahçe Lambası", price: 799, image: "🏮", rating: 4.7, reviews: 98, discount: 15 },
    { id: 4, name: "Bahçe Masası", price: 1899, image: "🪑", rating: 4.5, reviews: 76, discount: 10 },
    { id: 5, name: "Sulama Sistemi", price: 1299, image: "💧", rating: 4.9, reviews: 189, discount: 25 },
    { id: 6, name: "Bahçe Dekorasyonu", price: 599, image: "🦋", rating: 4.4, reviews: 67, discount: 0 },
    { id: 7, name: "Bahçe Şezlongu", price: 899, image: "🪑", rating: 4.7, reviews: 145, discount: 20 },
    { id: 8, name: "Bahçe Çitleri", price: 699, image: "🌿", rating: 4.6, reviews: 89, discount: 15 },
    { id: 9, name: "Bahçe Aletleri", price: 499, image: "🪓", rating: 4.8, reviews: 234, discount: 30 },
    { id: 10, name: "Bahçe Çiçekleri", price: 399, image: "🌺", rating: 4.5, reviews: 156, discount: 10 },
    { id: 11, name: "Bahçe Salıncağı", price: 1499, image: "🪑", rating: 4.9, reviews: 267, discount: 35 },
    { id: 12, name: "Bahçe Dekoratif Taş", price: 299, image: "🪨", rating: 4.3, reviews: 78, discount: 0 }
  ]

  const handleAddToCart = (productId: number) => {
    setCartCount(prev => prev + 1)
  }

  const handleAddToWishlist = (productId: number) => {
    setWishlistCount(prev => prev + 1)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                Ana Sayfa
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Bahçe</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/arama" className="p-2 text-gray-700 hover:text-green-600 transition-colors relative">
                🔍
              </Link>
              <Link href="/sepet" className="p-2 text-gray-700 hover:text-green-600 transition-colors relative">
                🛒
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button className="p-2 text-gray-700 hover:text-green-600 transition-colors relative">
                ❤️
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
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
      <section className="bg-gradient-to-r from-green-500 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🌿</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Bahçe Koleksiyonu</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Doğal ve şık bahçe ürünleri. Bahçenizi cennete çevirin!
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Bahçe Ürünleri</h2>
            <p className="text-gray-600">Doğal ve şık bahçe ürünleri</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6 group">
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
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
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Sepete Ekle
                  </button>
                </div>
              </div>
            ))}
          </div>
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

export default Bahce 