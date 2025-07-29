'use client'

import React from 'react'
import Link from 'next/link'
import { Smartphone, Laptop, Headphones, Camera, Watch, Gamepad } from 'lucide-react'

const TechStore = () => {
  const products = [
    { id: 1, name: "iPhone 15 Pro", price: 45999, image: "📱", category: "Telefon" },
    { id: 2, name: "MacBook Air M2", price: 32999, image: "💻", category: "Bilgisayar" },
    { id: 3, name: "AirPods Pro", price: 5999, image: "🎧", category: "Aksesuar" },
    { id: 4, name: "Sony A7 IV", price: 45999, image: "📷", category: "Kamera" },
    { id: 5, name: "Apple Watch", price: 8999, image: "⌚", category: "Saat" },
    { id: 6, name: "PS5 Console", price: 15999, image: "🎮", category: "Oyun" },
  ]

  const categories = [
    { name: "Telefonlar", icon: Smartphone, color: "from-blue-500 to-blue-600" },
    { name: "Bilgisayarlar", icon: Laptop, color: "from-green-500 to-green-600" },
    { name: "Aksesuarlar", icon: Headphones, color: "from-purple-500 to-purple-600" },
    { name: "Kamera", icon: Camera, color: "from-red-500 to-red-600" },
    { name: "Saatler", icon: Watch, color: "from-orange-500 to-orange-600" },
    { name: "Oyun", icon: Gamepad, color: "from-pink-500 to-pink-600" }
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Site Selection Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">E-Ticaret Sitesi Seçin</h2>
              <p className="text-sm opacity-90">Farklı temalar ve özellikler</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/" className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                NEOMEDYA (Ev)
              </Link>
              <Link href="/tech-store" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                TechStore (Elektronik)
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">NEOMEDYA TECH</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link 
                href="/telefonlar"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Telefonlar
              </Link>
              <Link 
                href="/bilgisayarlar"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Bilgisayarlar
              </Link>
              <Link 
                href="/aksesuarlar"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Aksesuarlar
              </Link>
              <Link 
                href="/kamera"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Kamera
              </Link>
              <Link 
                href="/indirim"
                className="text-red-600 hover:text-red-700 px-3 py-2 text-sm font-bold transition-colors"
              >
                İNDİRİM
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/arama" className="p-2 text-gray-700 hover:text-blue-600 transition-colors">🔍</Link>
              <Link href="/sepet" className="p-2 text-gray-700 hover:text-blue-600 transition-colors">🛒</Link>
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
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                En Yeni
                <span className="block text-yellow-300">Teknoloji</span>
              </h1>
              <p className="text-xl text-gray-100 max-w-md">
                En son teknoloji ürünleri, akıllı cihazlar ve dijital aksesuarlar. 
                Geleceği keşfet!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                  href="/telefonlar"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Alışverişe Başla
                </Link>
                <Link
                  href="/indirim"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Yeni Ürünler
                </Link>
              </div>
            </div>
            <div className="text-center">
              <div className="text-8xl mb-4">🚀</div>
              <div className="text-2xl font-bold">Teknoloji</div>
              <div className="text-sm text-gray-200">Geleceğin Ürünleri</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kategoriler</h2>
            <p className="text-gray-600">Teknoloji dünyasını keşfedin</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                                <Link
                  key={index}
                  href={index === 0 ? "/telefonlar" : index === 1 ? "/bilgisayarlar" : index === 2 ? "/aksesuarlar" : index === 3 ? "/kamera" : index === 4 ? "/indirim" : "/indirim"}
                  className={`bg-gradient-to-br ${category.color} p-6 rounded-xl text-white cursor-pointer hover:scale-105 transition-transform block`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                      <p className="text-sm opacity-90">En yeni ürünler</p>
                    </div>
                    <Icon className="h-12 w-12 opacity-80" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Öne Çıkan Ürünler</h2>
            <p className="text-gray-600">En popüler teknoloji ürünleri</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-6xl">{product.image}</span>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-gray-500">{product.category}</span>
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <div className="text-xl font-bold text-gray-900">₺{product.price.toLocaleString()}</div>
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
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

export default TechStore 