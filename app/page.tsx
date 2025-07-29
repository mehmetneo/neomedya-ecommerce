'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Cart from '@/components/Cart'
import FeaturedProducts from '@/components/FeaturedProducts'

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)

  useEffect(() => {
    // Sepet sayısını localStorage'dan al
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart)
        const totalItems = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0)
        setCartItemCount(totalItems)
      } catch (error) {
        setCartItemCount(0)
      }
    }

    // Sepet güncellemelerini dinle
    const handleCartUpdated = () => {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        try {
          const cartItems = JSON.parse(savedCart)
          const totalItems = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0)
          setCartItemCount(totalItems)
        } catch (error) {
          setCartItemCount(0)
        }
      }
    }

    window.addEventListener('cartUpdated', handleCartUpdated)

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdated)
    }
  }, [])

  const categories = [
    {
      name: 'Erkek',
      href: '/erkek',
      description: 'Erkek kıyafetleri',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Kadın',
      href: '/kadin',
      description: 'Kadın kıyafetleri',
      color: 'from-pink-500 to-pink-600'
    },
    {
      name: 'Çocuk',
      href: '/cocuk',
      description: 'Çocuk kıyafetleri',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Ayakkabı',
      href: '/ayakkabi',
      description: 'Ayakkabı koleksiyonu',
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Aksesuar',
      href: '/aksesuar',
      description: 'Aksesuar ürünleri',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const clearLocalStorage = () => {
    localStorage.removeItem('products')
    alert('LocalStorage temizlendi! Şimdi kategorilerdeki ürünler görünecek.')
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItemCount} />
      
      {/* Debug butonu - sadece geliştirme için */}
      <div className="fixed top-20 right-4 z-50">
        <button
          onClick={clearLocalStorage}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg"
        >
          🧹 LocalStorage Temizle
        </button>
      </div>
      
      <Hero />
      
      {/* Öne Çıkan Ürünler */}
      <FeaturedProducts />
      
      {/* Kategoriler */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kategoriler</h2>
            <p className="text-lg text-gray-600">İhtiyacınız olan her şey burada</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link 
                key={category.name}
                href={category.href}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative h-64">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-6xl mb-4">
                        {category.name === 'Erkek' && '👔'}
                        {category.name === 'Kadın' && '👗'}
                        {category.name === 'Çocuk' && '👶'}
                        {category.name === 'Ayakkabı' && '👟'}
                        {category.name === 'Aksesuar' && '💍'}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Özellikler */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Neden Bizi Seçmelisiniz?</h2>
            <p className="text-lg text-gray-600">Kaliteli ürünler, hızlı teslimat, güvenli ödeme</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hızlı Teslimat</h3>
              <p className="text-gray-600">Siparişleriniz 24 saat içinde kargoya verilir</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Güvenli Ödeme</h3>
              <p className="text-gray-600">SSL sertifikalı güvenli ödeme sistemi</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Kolay İade</h3>
              <p className="text-gray-600">14 gün içinde ücretsiz iade hakkı</p>
            </div>
          </div>
        </div>
      </section>

      {/* Test E-posta Butonu */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">E-posta Sistemi Test</h2>
            <p className="text-gray-600 mb-6">
              E-posta sistemini test etmek için aşağıdaki butona tıklayın
            </p>
            <Link 
              href="/test-email"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              E-posta Test Sayfası
            </Link>
          </div>
        </div>
      </section>
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
} 