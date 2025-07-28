'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Cart from '@/components/Cart'

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItemCount] = useState(1)

  return (
    <main className="min-h-screen">
      <Header onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItemCount} />
      
      <Hero />
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </main>
  )
} 