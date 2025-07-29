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
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
      description: 'Erkek kıyafetleri'
    },
    {
      name: 'Kadın',
      href: '/kadin',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=500&fit=crop',
      description: 'Kadın kıyafetleri'
    },
    {
      name: 'Çocuk',
      href: '/cocuk',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=500&fit=crop',
      description: 'Çocuk kıyafetleri'
    },
    {
      name: 'Ayakkabı',
      href: '/ayakkabi',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop',
      description: 'Ayakkabı koleksiyonu'
    },
    {
      name: 'Aksesuar',
      href: '/aksesuar',
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=500&fit=crop',
      description: 'Aksesuar ürünleri'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItemCount} />
      
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
                <div className="relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
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