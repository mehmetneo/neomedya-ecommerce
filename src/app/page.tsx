'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Products from '@/components/Products'
import Categories from '@/components/Categories'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'
import Cart from '@/components/Cart'

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  return (
    <div className="min-h-screen bg-white">
      <Header onCartClick={() => setIsCartOpen(true)} cartCount={cartCount} />
      <main>
        <Hero />
        <Categories />
        <Products />
        <Newsletter />
      </main>
      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
} 