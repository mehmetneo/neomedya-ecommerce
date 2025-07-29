'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const Giyim = () => {
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)

  const featuredProducts = [
    { id: 1, name: "Nike Air Max 270", price: 1299, originalPrice: 1599, image: "👟", rating: 4.8, reviews: 156, brand: "Nike", discount: 19, inStock: true },
    { id: 2, name: "Adidas Ultraboost 22", price: 1899, originalPrice: 1899, image: "👟", rating: 4.9, reviews: 89, brand: "Adidas", discount: 0, inStock: true },
    { id: 3, name: "Levi's 501 Jeans", price: 599, originalPrice: 799, image: "👖", rating: 4.7, reviews: 234, brand: "Levi's", discount: 25, inStock: true },
    { id: 4, name: "Zara Basic T-Shirt", price: 199, originalPrice: 199, image: "👕", rating: 4.5, reviews: 67, brand: "Zara", discount: 0, inStock: true },
    { id: 5, name: "H&M Hoodie", price: 399, originalPrice: 499, image: "🧥", rating: 4.6, reviews: 123, brand: "H&M", discount: 20, inStock: true },
    { id: 6, name: "Puma RS-X", price: 899, originalPrice: 1099, image: "👟", rating: 4.4, reviews: 89, brand: "Puma", discount: 18, inStock: true }
  ]

  const categories = [
    { name: "Erkek", icon: "👨", count: 1250, href: "/giyim/erkek" },
    { name: "Kadın", icon: "👩", count: 1890, href: "/giyim/kadin" },
    { name: "Çocuk", icon: "👶", count: 650, href: "/giyim/cocuk" },
    { name: "Spor", icon: "⚽", count: 890, href: "/giyim/spor" },
    { name: "Ayakkabı", icon: "👟", count: 720, href: "/giyim/ayakkabi" },
    { name: "Aksesuar", icon: "👜", count: 450, href: "/giyim/aksesuar" }
  ]

  const addToCart = (product: any) => {
    setCartCount(prev => prev + 1)
    alert(`${product.name} sepete eklendi!`)
  }

  const addToWishlist = (product: any) => {
    setWishlistCount(prev => prev + 1)
    alert(`${product.name} favorilere eklendi!`)
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Moda & Stil
            </h1>
            <p className="text-lg mb-6 opacity-90">
              En trend giyim ürünleri, ayakkabılar ve aksesuarlar
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/giyim/erkek" className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Erkek Koleksiyonu
              </Link>
              <Link href="/giyim/kadin" className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Kadın Koleksiyonu
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kategoriler</h2>
            <p className="text-lg text-gray-600">İhtiyacınız olan ürünleri bulun</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count.toLocaleString()} ürün</p>
                <div className="mt-2">
                  <span className="inline-block bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs font-semibold">
                    Keşfet →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Flash Sale Banner */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">⚡ FLASH SALE</h3>
                <p className="text-lg opacity-90 mb-3">Seçili ürünlerde %50'ye varan indirimler!</p>
                <div className="flex items-center gap-4">
                  <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
                    <span className="text-sm font-semibold">⏰ 23:59:45</span>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
                    <span className="text-sm font-semibold">🔥 1,234 ürün</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-6xl mb-2">🎉</div>
                <p className="text-sm opacity-90">Sınırlı süre!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Öne Çıkan Ürünler</h2>
            <p className="text-lg text-gray-600">En popüler ve trend ürünler</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-3">{product.image}</div>
                    {product.discount > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        -%{product.discount}
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute top-2 left-2 bg-gray-500 text-white text-xs px-2 py-1 rounded">
                        Tükendi
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.brand}</p>
                    
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-400">({product.reviews})</span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 mb-4">
                      {product.discount > 0 ? (
                        <>
                          <span className="text-2xl font-bold text-red-600">{product.price}₺</span>
                          <span className="text-lg text-gray-400 line-through">{product.originalPrice}₺</span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-gray-900">{product.price}₺</span>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold"
                      >
                        🛒 Sepete Ekle
                      </button>
                      <button
                        onClick={() => addToWishlist(product)}
                        className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        ❤️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Giyim 